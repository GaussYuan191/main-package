import React, { PureComponent, Fragment } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
class EnvConfig extends PureComponent {
  render() {
    const { logContent } = this.props;
    return (
      <Fragment>
        {logContent && (
          <div className="log-content" style={{ border: 0 }}>
            <TextArea
              style={{ height: '100%' }}
              readOnly
              // dangerouslySetInnerHTML={{
              //   __html: logContent
              // }}
              value={logContent}
            />
          </div>
        )}

        {/* {logContent && (
          <div
            id="historyLogContent"
            className="log-content"
            dangerouslySetInnerHTML={{
              __html: logContent
            }}
          ></div>
        )} */}
      </Fragment>
    );
  }
}

export default EnvConfig;
