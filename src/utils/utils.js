import moment from 'moment'
import { Icon, Menu } from 'antd'

// 埋点所需方法
export const pointFun = (obj, args) => {
  if(!window['_hmt']) return
  switch (obj.type) {
    case 'delete':
      let deleteName
      if (obj.valueIndex !== undefined) {
        deleteName = args[obj.valueIndex]
      } else {
        deleteName = args[args.length - 1]
      }
      if (deleteName) {
        window['_hmt'].push(['_trackEvent', '按钮', '点击', `${deleteName}`])
      }
      break
    case 'switch':
      let argsName = args[obj.valueIndex || 0]
      if (obj.valueChild !== undefined) {
        argsName = argsName[obj.valueChild]
      }
      if (argsName === obj.value) {
        window['_hmt'].push(['_trackEvent', '按钮', '点击', `${obj.name}`])
      }
      break
    case 'switchAll':
      let argsIndex, name, parentIndex
      if (obj.parentIndex !== undefined) {
        if (obj.parentChild !== undefined) {
          parentIndex = args[obj.parentIndex][obj.parentChild]
        } else {
          parentIndex = args[obj.parentIndex]
        }
        argsIndex = args[obj.valueIndex]
        name = obj.value[parentIndex] && obj.value[parentIndex][argsIndex]
      } else {
        argsIndex = args[obj.valueIndex || 0]
        name = obj.value[argsIndex]
      }
      if (name) {
        window['_hmt'].push(['_trackEvent', '按钮', '点击', `${name}`])
      }
      break
    default:
      window['_hmt'].push(['_trackEvent', '按钮', '点击', `${obj.name}`])
  }
}
// 埋点装饰器
export const buryingPoint = (obj = {}) => (target, name, descriptor) => {
  // 方法为类属性方法(装饰箭头函数)
  if (descriptor.initializer) {
    const replaceInitializer = function replaceInitializer() {
      const that = this
      const fn = descriptor.initializer.call(that)
      return function(...args) {
        pointFun(obj, args)
        return fn.call(this, ...args)
      }
    }
    return {
      enumerable: true,
      configurable: true,
      writable: true,
      initializer: replaceInitializer,
    }
  }
  const method = descriptor.value
  descriptor.value = function(...args) {
    pointFun(obj, args)
    let ret = method.apply(this, args)
    return ret
  }
  return descriptor
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val
}

export function getPagation(data, current, pageSize) {
  let cur = parseInt(current) || 1
  let per = parseInt(pageSize) || 20
  let res = {}
  let total = data.length
  let allPages = total % per ? Math.floor(total / per) + 1 : total / per
  cur = cur >= allPages ? allPages : parseInt(cur)
  let start = (cur - 1) * per
  res['pagination'] = { total: data.length, current: cur, pageSize: per }
  res['list'] = data.slice(start, start + per)
  return res
}

export function getNowChinese(){
  let now = new Date(),hour = now.getHours() ,word = ''
  if(hour < 6){ word = "凌晨好！"}
  else if (hour < 9){ word = "早上好！"}
  else if (hour < 12){ word = "上午好！"}
  else if (hour < 14){ word ="中午好！"}
  else if (hour < 17){ word = "下午好！"}
  else if (hour < 19){ word ="傍晚好！"}
  else if (hour < 22){ word ="晚上好！"}
  else {word ="夜里好！"}
  return word
}

export function getTimeDistance(type) {
  const now = new Date()
  const oneDay = 1000 * 60 * 60 * 24

  if (type === 'today') {
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    return [moment(now), moment(now.getTime() + (oneDay - 1000))]
  }

  if (type === 'week') {
    let day = now.getDay()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)

    if (day === 0) {
      day = 6
    } else {
      day -= 1
    }

    const beginTime = now.getTime() - day * oneDay

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))]
  }

  if (type === 'month') {
    const year = now.getFullYear()
    const month = now.getMonth()
    const nextDate = moment(now).add(1, 'months')
    const nextYear = nextDate.year()
    const nextMonth = nextDate.month()

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ]
  }

  if (type === 'year') {
    const year = now.getFullYear()

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)]
  }
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = []
  nodeList.forEach(node => {
    const item = node
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/')
    item.exact = true
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path))
    } else {
      if (item.children && item.component) {
        item.exact = false
      }
      arr.push(item)
    }
  })
  return arr
}

export function digitUppercase(n) {
  const fraction = ['角', '分']
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
  let num = Math.abs(n)
  let s = ''
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * 10 ** index) % 10] + item).replace(/零./, '')
  })
  s = s || '整'
  num = Math.floor(num)
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = ''
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p
      num = Math.floor(num / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }

  return s
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整')
}

export function SectionToChinese(section) {
  const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const chnUnitSection = ['', '万', '亿', '万亿', '亿亿']
  const chnUnitChar = ['', '十', '百', '千']
  let strIns = '',
    chnStr = ''
  let unitPos = 0
  let zero = true
  while (section > 0) {
    let v = section % 10
    if (v === 0) {
      if (!zero) {
        zero = true
        chnStr = chnNumChar[v] + chnStr
      }
    } else {
      zero = false
      strIns = chnNumChar[v]
      strIns += chnUnitChar[unitPos]
      chnStr = strIns + chnStr
    }
    unitPos++
    section = Math.floor(section / 10)
  }
  return chnStr
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!') // eslint-disable-line
  }
  const arr1 = str1.split('/')
  const arr2 = str2.split('/')
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2
  }
  return 3
}

function getRenderArr(routes) {
  const renderArr = []
  renderArr.push(routes[0])
  for (let i = 1; i < routes.length; i += 1) {
    const isAdd = true
    // 是否包含
    // isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    // 去重
    // renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    if (isAdd) {
      renderArr.push(routes[i])
    }
  }
  return renderArr
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  )
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''))
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes)
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1)
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    }
  })
  return renderRoutes
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g

export function isUrl(path) {
  return reg.test(path)
}

export function trim(value) {
  const reg = /^\s*(.*?)\s*$/
  return value.replace(reg, '$1')
}
// DataURL转Blob对象
export function dataURLToBlob(dataurl) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
// elcel导出
export function excelDownload(response) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(response.file, response.name) // 兼容IE10+
  } else {
    const csvURL = window.URL.createObjectURL(response.file)
    const tempLink = document.createElement('a')
    tempLink.href = csvURL
    tempLink.setAttribute('download', response.name)
    // window.URL.revokeObjectURL(csvURL)
    if (document.all) {
      tempLink.click()
    } else {
      const evt = document.createEvent('MouseEvents')
      evt.initEvent('click', true, true)
      tempLink.dispatchEvent(evt)
    }
  }
}

// 创建iconfont图标
export const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_887465_k8be3yuoa2.js',
})

// 搜索不区分大小写
export function treeSelectFilterTreeNode(input, treeNode) {
  const compare1 = treeNode.props.title.toLowerCase()
  const compare2 = input.toLowerCase()
  return compare1.indexOf(compare2) >= 0
}

// 截取字符串...
export function substring(value, len) {
  return value && value.length > len ? `${value.substring(0, len)}...` : value
}

// 验证各种好号段的手机号码
export function phoneNumberReg(countey) {
  if (countey === '86') {
    return {
      phoneReg: /^1[3456789]\d{9}$/,
      tip: '请输入正确的手机号',
    }
  }
  if (countey === '886') {
    return {
      phoneReg: /^09\d{8}$/,
      tip: '该手机号与归属地不匹配',
    }
  }
  if (countey === '852') {
    return {
      phoneReg: /^[6|9|5|8]\d{7}$/,
      tip: '该手机号与归属地不匹配',
    }
  }
  if (countey === '853') {
    return {
      phoneReg: /^6\d{7}$/,
      tip: '该手机号与归属地不匹配',
    }
  }
}
export function treeDataFormat(list, data) {
  if (list.length == 0) {
    return
  }
  const children = data || []
  const obj = []
  list.forEach(item => {
    if (item.parent_id === 0) {
      children.push({
        title: item.name,
        value: item.id,
        key: 0,
        parent_id: 0,
        children: [],
      })
    } else {
      children.forEach(itmes => {
        if (itmes.value == item.parent_id) {
          itmes.children.push({
            title: item.name,
            value: item.id,
            key: item.id,
            parent_id: item.parent_id,
            children: [],
          })
        } else if (!data) {
          obj.push(item)
        }
      })
    }
  })
  if (obj.length > 0) {
    treeDataFormat(obj, children[0].children)
  }
  return children
}

export function dropDownFormat(list=[], data) {
    return list.map((item)=>{
      if(item.children){
        return <Menu.SubMenu  key={item.key} title={item.title}>
        { this.renderMenu(item.children) }
        </Menu.SubMenu>
      }
      return <Menu.Item key={item.key} title={item.title}>{item.title}</Menu.Item>
    })
}

// 修改tree
export function treeEditFormat(list, payload) {
  const optItem = value => {
    if (value.value === payload.id) {
      if (value.parent_id != payload.parent_id) {
        let tree = treeAddFormat(treeDeleteFormat(list, payload.id), payload)
        const addItem = (v, id) => {
          v.parent_id = id
          v.id = v.value
          v.name = v.title
          tree = treeAddFormat(tree, v)
          v.children.map(p => {
            addItem(p, v.id)
          })
        }
        // 多层级菜单修改上级目录
        value.children.map(l => {
          addItem(l, payload.id)
        })
        return tree
      } else {
        value.parent_id = payload.parent_id
        value.title = payload.name
      }
    } else {
      value.children &&
        value.children.map(list => {
          optItem(list)
        })
    }
  }
  list.filter(value => {
    optItem(value)
  })
  return list
}

// 添加tree
export function treeAddFormat(list, payload) {
  if (!list) return
  const optItem = value => {
    if (value.value === payload.parent_id) {
      if (!value.children) {
        value.children = []
        value.isLeaf = true
      }
      const item = {
        key: payload.id.toString(),
        title: payload.name,
        value: payload.id,
        parent_id: payload.parent_id,
      }
      return value.children.push(item)
    } else {
      value.children &&
        value.children.map(list => {
          optItem(list)
        })
    }
  }
  list.filter(value => {
    optItem(value)
  })
  return list
}

// 删除tree
export function treeDeleteFormat(list, payload) {
  const optItem = value => {
    if (value.children) {
      const index = value.children.findIndex(item => item.value === payload)
      if (index === -1) {
        value.children &&
          value.children.map(list => {
            optItem(list)
          })
      } else {
        value.children.splice(index, 1)
        if (value.children.length === 0) {
          value.isLeaf = false
        }
      }
    }
  }
  list.filter(value => {
    optItem(value)
  })
  return list
}

// 根据某一个节点的过滤条件，获取其在一个森林的路径。
export function getPathByKey(value, key, arr) {
  const temppath = []
  try {
    function getNodePath(node) {
      // 这里可以自定义push的内容，而不是整个node,而且这里node也包含了children
      temppath.push(node)
      // 找到符合条件的节点，通过throw终止掉递归
      if (node[key].toString() === value) {
        throw 'GOT IT!'
      }
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i])
        }
        // 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        temppath.pop()
      } else {
        // 找到叶子节点时，删除路径当中的该叶子节点
        temppath.pop()
      }
    }
    for (let i = 0; i < arr.length; i++) {
      getNodePath(arr[i])
    }
  } catch (e) {
    return temppath
  }
}

export function childPathByKey(value, key, arr) {
  const data = []
  function rest(node) {
    for (const i in node) {
      data.push(node[i].key)
      if (node[i].children && node[i].children.length > 0) {
        rest(node[i].children)
      }
    }
  }
  function getSub(list) {
    for (const i in list) {
      if (list[i].children && list[i].children.length > 0) {
        getSub(list[i].children)
      }
      if (list[i].key.toString() === value) {
        rest(list[i].children)
        break
      }
    }
  }
  getSub(arr)
  return data
}
