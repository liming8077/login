import React, { PureComponent } from 'react';
import { Button } from 'antd';
import SelectItem from './SelectItem';
import styles from './index.less';

export default class SelectAccount extends PureComponent {
  state = {
    loading: false,
    current: null,
  };
  enterLoading = () => {
    const { data } = this.props;
    const { current } = this.state;
    const id = current ? current.id : data && data[0].id;
    this.setState({loading:true});
    this.props.onSubmit(id);
  };
  onChange = current => {
    this.setState({ current });
    console.log(current);
  };
  render() {
    const { data } = this.props;
    return (
      <div className={styles.wrap}>
        <SelectItem data={data} onChange={this.onChange} />
        <Button
          size="large"
          type="primary"
          block
          style={{ marginTop: 20, marginBottom: 15 }}
          loading={this.state.loading}
          onClick={this.enterLoading}
        >
          立即进入
        </Button>
      </div>
    );
  }
}
