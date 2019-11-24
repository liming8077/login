import React, { PureComponent } from 'react';
import { Input, Form } from 'antd';
import { connect } from 'dva';
import SelectCode from './SelectCode';
import BindPhone from './BindPhone';
import ErrTip from '../../components/ErrTip';
import { phoneNumberReg } from '../../utils/utils';
import style from './style.less';

const FormItem = Form.Item;

class SelectPhone extends PureComponent {
  state = {
    tipFont: '获取验证码',
    disableCode: true,
    index: 60,
    msgCode: true,
    phoneReg: /^1[3456789]\d{9}$/,
    code: '',
    tip: '请输入正确的手机号',
    areaCode: [],
    isEdit: false,
  };
  componentDidMount() {
    const { phone } = this.props;
    if (phone) {
      this.setState({ isEdit: true });
    } else {
      this.onEdit();
    }
  }
  componentWillUnmount() {
    this.timer && this.onClear();
  }
  onEdit = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'common/config',
      payload: {
        field_name: 'area_num',
      },
      callback: response => {
        if (response) {
          this.setState({ areaCode: response.area_num, isEdit: false });
        }
      },
    });
  };
  onChangeCountey = value => {
    const { phoneReg, tip } = phoneNumberReg(value);
    this.setState({
      phoneReg,
      tip,
    });
    setTimeout(() => {
      this.props.form.validateFields(['mobile'], { force: true }, (err, values) => {});
    }, 0);
  };
  onClear = () => {
    this.setState({
      disableCode: true,
      index: 60,
      tipFont: '获取验证码',
    });
    clearInterval(this.timer);
  };
  getCode = () => {
    const { form, scenario, dispatch, phone } = this.props;
    form.validateFields(['area_num', 'mobile'], (err, values) => {
      if (err) return;
      if (this.state.disableCode) {
        if (phone) {
          values.area_num = phone.area_num;
        }
        dispatch({
          type: 'sms/send',
          payload: {
            ...values,
            scenario: scenario || 'login',
            mobile:values.mobile.trim(),
          },
          callback: response => {
            if (response) {
              this.setState({
                disableCode: false,
                tipFont: `已发送(60s)`,
              });
              this.timer = setInterval(() => {
                if (this.state.index <= 0) {
                  return this.onClear();
                }
                this.setState({
                  // disableCode: false,
                  index: this.state.index - 1,
                  tipFont: `已发送(${this.state.index - 1}s)`,
                });
              }, 999);
            } else {
              this.setState({
                disableCode: true,
                tipFont: `获取验证码`,
              });
            }
          },
        });
      }
    });
  };
  onChange = (e) => {
    const { value,name } = e.target;
    const {codeChange}=this.props;
    const reg = /^[0-9]{0,6}$/;
    if (reg.test(value) || value === '') {
      if(codeChange) codeChange(e);
      this.setState({[name]:value});
    }
  };
  render() {
    const {
      phoneReg,
      tip,
      msgCode,
      disableCode,
      tipFont,
      areaCode,
      isEdit,
      code,
    } = this.state;
    const { form, phoneValue } = this.props;
    const { getFieldDecorator } = form;
    const prefixSelector = (
      <SelectCode areaCode={areaCode} onChage={this.onChangeCountey} {...form} />
    );
    return (
      <div className={style.wrap}>
        <FormItem>
          {isEdit ? (
            <BindPhone {...this.props} onChange={this.onEdit} />
          ) : (
            <div className={style.formItem}>
              {getFieldDecorator('mobile', {
                initialValue: phoneValue || '',
                rules: [
                  {
                    pattern: phoneReg,
                    message: <ErrTip>{tip}</ErrTip>,
                  },
                  { required: true, message: <ErrTip>请输入手机号</ErrTip> },
                ],
                validateTrigger: 'onBlur',
              })(
                <Input
                  addonBefore={prefixSelector}
                  style={{ width: '100%' }}
                  placeholder="请输入常用手机号"
                  name="mobile"
                  maxLength={11}
                />
              )}
            </div>
          )}
        </FormItem>
        <FormItem>
          <div className={style.formItem}>
            {getFieldDecorator('code', {
              initialValue: code,
              rules: [
                {
                  required: msgCode,
                  message: <ErrTip>请输入短信验证码</ErrTip>,
                },
                {
                  validator: (rule, value, callback) => {
                    if (!/^[0-9]{6}$/.test(value) && value && value.length > 0) {
                      callback('请输入正确的验证码');
                    }
                    callback();
                  },
                },
              ],
              validateTrigger: 'onBlur',
            })(
              <div className={style.msgWrap}>
                <Input
                  className={style.msg}
                  value={code}
                  name="code"
                  id="code"
                  onChange={this.onChange}
                  placeholder="请输入短信验证码"
                  maxLength={6}
                />
                <div
                  className={`${style.getMsg} ${disableCode ? '' : style.disabledCode}`}
                  onClick={this.getCode}
                >
                  {tipFont}
                </div>
              </div>
            )}
          </div>
        </FormItem>
      </div>
    );
  }
}


const mapStateToProps = ({ loading }) => ({
  submitting: loading.effects['sms/send'],
})

export default connect(mapStateToProps)(SelectPhone)