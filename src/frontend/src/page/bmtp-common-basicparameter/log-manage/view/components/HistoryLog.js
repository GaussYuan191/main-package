import React, { PureComponent, Fragment } from 'react';

class HistoryLog extends PureComponent {
  render() {
    const { logContent } = this.props;
    return (
      <Fragment>
        {logContent && (
          <div
            id="historyLogContent"
            className="log-content"
            dangerouslySetInnerHTML={{
              __html: logContent
            }}
          />
        )}
      </Fragment>
    );
  }
}

export default HistoryLog;
