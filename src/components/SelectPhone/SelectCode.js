import React, { Component } from 'react'
import { Select } from 'antd'
import style from './style.less'

const Option = Select.Option

export default class SelectCode extends Component {
  state = {
    country: '86',
  }

  onChange = value => {
    this.setState(
      {
        country: value,
      },
      () => {
        this.props.onChage(value)
      }
    )
  }

  render() {
    const { areaCode = [], getFieldDecorator } = this.props
    return (
      <div className={style.wrap}>
        {getFieldDecorator('area_num', {
          initialValue: this.state.country,
        })(
          <Select
            onChange={this.onChange}
            style={{ width: 90 }}
            dropdownClassName={style.dropdown}
            dropdownMatchSelectWidth={false}
          >
            {areaCode.map(item => {
              return (
                <Option key={item.code} value={item.code}>
                  <span>+{item.code}</span>
                  <div>{item.country}</div>
                </Option>
              )
            })}
          </Select>
        )}
      </div>
    )
  }
}
