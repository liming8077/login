import React, { PureComponent } from 'react';
import { Input } from 'antd';
import style from './style.less';

export default class BindPhone extends PureComponent {
  state = {};

  onChange = () => {
    this.props.onChange();
  };

  render() {
    const { phone, form } = this.props;
    const { mobile,area_num } = phone;
    const { getFieldDecorator } = form;
    return (
      <div className={style.wrap}>
        {getFieldDecorator('mobile', {
          initialValue: mobile,
        })(
          <div>
            即将绑定手机号{' '}
            <span style={{ color: '#FF3B6D' }}>
              {mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
            </span>{' '}
            <a href="javascript:;" onClick={this.onChange}>
              修改
            </a>
            <Input type="hidden" />
          </div>
        )}
        {getFieldDecorator('area_num', {
          initialValue: area_num,
        })(<Input type="hidden" />)}
      </div>
    );
  }
}
