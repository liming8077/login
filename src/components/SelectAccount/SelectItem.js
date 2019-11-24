import React, { PureComponent } from 'react';
import { Steps, Icon } from 'antd';
import styles from './index.less';

const Step = Steps.Step;
export default class SelectItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      left: 0,
    };
  }
  next() {
    const { left } = this.state;
    const { data } = this.props;
    const current = this.state.current + 1;
    this.props.onChange(data[current])
    this.setState({ current, left: current === 1 ? 0 : left + 80 });
  }

  prev() {
    const { left } = this.state;
    const { data } = this.props;
    const current = this.state.current - 1;
    this.setState({ current, left: current === 3 ? 0 : left - 80 });
    this.props.onChange(data[current])
  }

  render() {
    const { current, left } = this.state;
    const { data } = this.props;
    return (
      <div className={styles.wrap}>
        <div className={styles.swiper}>
          <div>
            <Icon
              type="left"
              onClick={() => (current > 0 ? this.prev() : null)}
              style={{ fontSize: 16, color: current > 0 ? '#08c' : '#999' }}
            />
          </div>
          <div className={styles.item}>
            <Steps current={current} style={{ marginLeft: current === 0 ? 80 : -left }}>
              {data.map((item,index) => (
                <Step
                  key={`swiper-${index}`}
                  title={item.company_name}
                  icon={<img src={item.logo} className={styles.pic} />}
                />
              ))}
            </Steps>
          </div>
          <div>
            <Icon
              type="right"
              onClick={() => (current < data.length - 1 ? this.next() : null)}
              style={{ fontSize: 16, color: current < data.length - 1 ? '#08c' : '#999' }}
            />
          </div>
        </div>
        <div className={styles.title}>{data.length>0 && data[current].company_name}<span>({data.length>0 && data[current].author_name})</span></div>
      </div>
    );
  }
}
