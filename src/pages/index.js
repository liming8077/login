import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import _ from 'lodash'
import { Checkbox, Icon, Button, Card, Modal, message, Tooltip, Carousel } from 'antd'
import Login from 'components/Login'
import QRCode from 'qrcode.react'
import SelectAccount from 'components/SelectAccount'
import { getAuth } from 'utils/authority'
import { buryingPoint, pointFun, IconFont } from 'utils/utils'
import capslock from 'static/icon/capslock.svg'
import icon_wx from 'static/images/icon_wx.png'
import icon_dd from 'static/images/icon_dd.png'
import styles from './index.less' 

const { Tab, UserName, Password, SelectPhone, Submit } = Login

class LoginPage extends PureComponent {
  constructor(props) {
    super(props)
    this.codeWayIcon = require('static/images/code.png')
    this.accountWayIcon = require('static/images/pc.png')
    this.password = []
    this.sms = []
    this.time = null
    this.state = {
      scenario: 'web',
      autoLogin: true,
      isCodewayLogin: false,
      bTimeout: false,
      isSelectLogin: false,
      accountList: [],
      disable: true,
      disableSms: true,
      capital: false,
      qrcodeSuccess: false,
    }
  }
  componentDidMount() {
    const authority = getAuth()
    if (authority) {
      const { status, option } = authority
      if (status === 1) {
        this.props.dispatch({
          type: 'login/logout',
        })
      } else {
        this.setState({ isSelectLogin: status === 2, accountList: option })
      }
    }
    this.getQrcode()
    console.log(localStorage.getItem('dfws-lms-account'))
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.login.qrcode !== nextProps.login.qrcode) {
      const { login_token } = nextProps.login.qrcode
      clearInterval(this.time)
      this.time = setInterval(() => {
        this.startPoll(login_token)
      }, 3000)
    }
  }

  componentWillUnmount() {
    const isIE = !!window.ActiveXObject || 'ActiveXObject' in window
    if (!isIE) {
      window.removeEventListener('keypress', this.onKeyPress.bind(this))
      window.removeEventListener('keyup', this.onKeyUp.bind(this))
    }
    clearInterval(this.time)
  }

  startPoll = login_token => {
    const { dispatch } = this.props
    dispatch({
      type: 'login/qrCodeLogin',
      payload: {
        scenario: 'qrCodeLogin',
        login_token,
      },
      callback: res => {
        if (!res) {
          return clearInterval(this.time)
        }
        if (res.is_expire) {
          this.setState({
            bTimeout: true,
            qrcodeSuccess: false,
          })
          clearInterval(this.time)
        } else {
          if (res.is_sweep == 1 && res.login_status == 0) {
            this.setState({
              qrcodeSuccess: true,
            })
          }
          if (res.is_sweep == 1 && res.login_status == 1) {
            clearInterval(this.time)
            const values = {
              ...res,
              status: res.login_status,
            }
            dispatch({
              type: 'login/qrcodeLoginEnter',
              payload: _.omit(values, ['login_status', 'is_sweep']),
            })
          }
        }
      },
    })
  }

  getQrcode = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'login/fetchQrcode',
      payload: {
        scenario: 'qrCode',
      },
      callback: res => {
        if (res) {
          this.setState({
            bTimeout: false,
          })
        }
      },
    })
  }

  onKeyUp = event => {
    const { capital } = this.state
    const e = event || window.event
    if (e.keyCode === 20 && capital) {
      this.setState({ capital: false })
      return false
    }
  }

  onKeyPress = event => {
    const { capital } = this.state
    if (capital) {
      return
    }
    const e = event || window.event
    const keyCode = e.keyCode || e.which
    const isShift = e.shiftKey || keyCode == 16 || false
    if (
      (keyCode >= 65 && keyCode <= 90 && !isShift) ||
      (keyCode >= 97 && keyCode <= 122 && isShift)
    ) {
      this.setState({ capital: true })
    }
  }
  onTabChange = scenario => {
    this.setState({ scenario })
    if (scenario == 'web') {
      pointFun({ name: 'Password login' })
    } else {
      pointFun({ name: 'SMS login' })
    }
  }

  handleSubmit = (err, values) => {
    const { scenario, autoLogin } = this.state
    if (!err) {
      if (scenario === 'web' && values.user_name.trim() === '') {
        message.error('账户不能为空')
        return
      }
      let payload = {
        ...values,
        scenario,
        day: 0,
      }
      if (scenario === 'web') {
        payload = {
          ...values,
          password: values.password.trim(),
          user_name: values.user_name.trim(),
          domain: window.location.hostname,
          scenario,
          day: autoLogin ? 1 : 0,
        }
      }
      pointFun({ name: scenario === 'web' ? 'Password logining' : 'SMS logining' })
      this.props.dispatch({
        type: 'login/login',
        payload,
        callback: response => {
          const { status, user_type, option } = response
          if (user_type === 0) {
            window.location.href='/student/'
            // Modal.warning({
            //   title: '系统提醒',
            //   centered: true,
            //   content: '您无权限登录，请联系管理员',
            // })
          } else {
            this.setState({
              isSelectLogin: status === 2,
              accountList: option,
              isCodewayLogin: false,
            })
          }
        },
      })
    }
  }

  selectSubmit = id => {
    const { token } = getAuth()
    this.props.dispatch({
      type: 'login/selectLogin',
      payload: {
        id,
        token,
      },
    })
  }

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    })
  }

  changeLoginWay = () => {
    const { login_token } = this.props.login.qrcode
    this.setState(
      {
        isCodewayLogin: !this.state.isCodewayLogin,
      },
      () => {
        if (this.state.isCodewayLogin) {
          clearInterval(this.time)
        } else {
          clearInterval(this.time)
          this.time = setInterval(() => {
            this.startPoll(login_token)
          }, 3000)
        }
      }
    )
  }

  @buryingPoint({ name: 'Updating QR code' })
  reFreshCode = () => {
    this.setState(
      {
        bTimeout: false,
      },
      () => {
        this.getQrcode()
      }
    )
  }
  onSubmitState = e => {
    const { value, id } = e.target
    const isIE = !!window.ActiveXObject || 'ActiveXObject' in window
    if (!isIE && id === 'password' && value.length === 1) {
      console.log('addEventListener')
      e.target.addEventListener('keypress', this.onKeyPress.bind(this), false)
      e.target.addEventListener('keyup', this.onKeyUp.bind(this), false)
    }
    const { scenario } = this.state
    if (value.length > 0) {
      scenario === 'mobile'
        ? !this.sms.includes(id) && this.sms.push(id)
        : !this.password.includes(id) && this.password.push(id)
    } else {
      scenario === 'mobile'
        ? this.sms.splice(this.sms.findIndex(item => item === id), 1)
        : this.password.splice(this.password.findIndex(item => item === id), 1)
    }
    this.setState(
      scenario === 'mobile'
        ? { disableSms: this.sms.length !== 2 }
        : {
          disable:
            this.password.length !==
            (!this.password.includes('user_name') && localStorage.getItem('dfws-lms-account')
              ? 1
              : 2),
        }
    )
  }

  async back() {
    await this.getQrcode()
    this.setState({
      qrcodeSuccess: false,
    })
  }

  render() {
    const { submitting, login: { qrcode }, appid } = this.props
    const {
      scenario,
      isCodewayLogin,
      isSelectLogin,
      accountList,
      disable,
      disableSms,
      capital,
      bTimeout,
      qrcodeSuccess,
      autoLogin,
    } = this.state
    const afterCapsLock = capital ? <img src={capslock} /> : ''
    const tip = (
      <span>
        <Icon type="lock" /> {isCodewayLogin ? '二维码登录在这里' : '密码/短信登录在这里'}
      </span>
    )
    return (
      <div className={styles.login}>
        <div className={styles.main}>
          {isCodewayLogin ? (
            <Login
              defaultActiveKey={scenario}
              onTabChange={this.onTabChange}
              onSubmit={this.handleSubmit}
            >
              <Tab key="web" tab="密码登录">
                <UserName
                  name="user_name"
                  defaultValue={localStorage.getItem('dfws-lms-account') || ''}
                  placeholder="请输入账号"
                  onChange={this.onSubmitState}
                />
                <Password
                  name="password"
                  placeholder="请输入密码"
                  onChange={this.onSubmitState}
                  suffix={afterCapsLock}
                  ref={password => {
                    this.inputPassword = password
                  }}
                />
                <Submit loading={submitting} disabled={disable}>
                  登录
                </Submit>
                <div>
                  <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                    下次自动登录
                  </Checkbox>
                  <Link
                    className={styles.forgetpwd}
                    to="/user/reset-password"
                    onClick={() => pointFun({ name: 'Forget password' })}
                  >
                    忘记密码
                  </Link>
                </div>
                {window.location.host === 'lms3.9fist.com' &&
                  <div className={styles.snsapi_login}>
                    <div className={styles.tip}>第三方账号登录</div>
                    <div className={styles.list}>
                      <a
                        href={`https://open.work.weixin.qq.com/wwopen/sso/3rd_qrConnect?appid=wwe0a6196b48d584ad&response_type=code&scope=snsapi_login&state=wx&redirect_uri=https://lms3.9first.com/user/auth?state=wx&usertype=member`}
                      >
                        <img src={icon_wx} title="企业微信登录" />
                      </a>
                      {appid && (
                        <a
                          href={`https://oapi.dingtalk.com/connect/qrconnect?appid=${appid}&response_type=code&scope=snsapi_login&state=dd&redirect_uri=${
                            window.location.origin
                            }/user/auth`}
                        >
                          <img src={icon_dd} title="钉钉登录" />
                        </a>
                      )}
                    </div>
                  </div>
                }
              </Tab>
              <Tab key="mobile" tab="短信登录">
                <SelectPhone name="mobile" onChange={this.onSubmitState} />
                <Submit loading={submitting} disabled={disableSms}>
                  登录
                </Submit>
              </Tab>
            </Login>
          ) : isSelectLogin ? (
            <Card title="请确认登录的企业" bordered={false}>
              <SelectAccount data={accountList} onSubmit={this.selectSubmit} />
              <a
                href="javascript:;"
                onClick={() => this.setState({ isCodewayLogin: true, isSelectLogin: false })}
              >
                返回
              </a>
            </Card>
          ) : (
                <Card title="二维码登录" bordered={false} className={styles.codeLogin}>
                  {!qrcodeSuccess && (
                    <div>
                      <div className={styles.twoDimensioncode}>
                        {qrcode && (
                          <QRCode
                            value={JSON.stringify(qrcode)}
                            size={200}
                            style={{ margin: '0 auto' }}
                          />
                        )}
                        {bTimeout ? (
                          <div className={styles.mask}>
                            <div className={styles.text}>二维码已失效</div>
                            <div className={styles.btn} onClick={() => this.reFreshCode()}>
                              点击刷新
                        </div>
                          </div>
                        ) : null}
                      </div>
                      <div className={styles.codeText}>打开先之学院App</div>
                      <div className={styles.codeText}>
                        在「我的」页面,右上角扫一扫登录
                    <span
                          className={styles.codeText3}
                          onClick={() => this.reFreshCode()}
                          title="点击刷新"
                        >
                          <Icon
                            type="sync"
                            style={{
                              marginLeft: '3px',
                              marginRight: '3px',
                              color: '#2363e8',
                              cursor: 'pointer',
                            }}
                          />刷新
                    </span>
                      </div>
                    </div>
                  )}

                  {qrcodeSuccess && (
                    <div className={styles.qrcodeSuccess}>
                      <div className={styles.phone}>
                        <IconFont type="icon-shouji" style={{ fontSize: 200 }} />
                        <IconFont type="icon-ziyuanxhdpi" className={styles.check} />
                      </div>
                      <div style={{ fontSize: 16 }}>扫描成功</div>
                      <div className={styles.codeText}>请在手机上「确认登录」</div>
                      <div className={styles.back} onClick={() => this.back()}>
                        返回二维码登录
                  </div>
                    </div>
                  )}
                </Card>
              )}
          {!isSelectLogin ? (
            <Tooltip placement="left" title={tip} defaultVisible overlayClassName="qrcodetip">
              <img
                onClick={() => this.changeLoginWay()}
                className={styles.dimensionCode}
                src={isCodewayLogin ? this.codeWayIcon : this.accountWayIcon}
              />
            </Tooltip>
          ) : null}
        </div>
        <Button
          size="large"
          href="http://m.study.9first.com/lmsclient/android.html"
          className={styles.dowoload}
          target="_blank"
          type="primary"
          onClick={() => pointFun({ name: 'download app' })}
          block
        >
          下载先之学院App
        </Button>
      </div>
    )
  }
}

const mapStateToProps = ({  login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
})

export default connect(mapStateToProps)(LoginPage)
