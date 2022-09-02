import React from 'react';
import { Spin, Result, Button } from 'antd';
import styles from './index.module.less';
export default props => {
  const { isLoading, error, retry } = props;
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spin tip="正在加载中！" size="large" />
      </div>
    );
  } else if (error) {
    return (
      <Result
        status="error"
        title="页面加载失败！"
        extra={[
          <Button key="back" type="primary">
            返回
          </Button>,
          <Button key="retry" onClick={retry}>
            再试一次
          </Button>
        ]}
      />
    );
  } else {
    return null;
  }
};
