import React, { Component } from 'react';
import ExceptionHandling from './components/ExceptionHandling.js'; //异常处理
import ReceiveHandling from './components/ReceiveHandling.js'; //接收消息管理
import { $connect, PageBody, Tabs, urlHashToJson } from 'yss-biz';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
const { TabPane } = Tabs;
const { PageMain } = PageBody;
class PageComponent extends Component {
  state = { btnAuth: {} };
  render() {
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <PageMain>
            <Tabs
              onChange={activeKey => {
                this.props.changeTab(activeKey);
              }}
              defaultActiveKey="2"
            >
              <TabPane tab="接收消息管理" key="1">
                <div style={{ marginTop: '8px' }}></div>
                <ReceiveHandling {...this.props} {...this.state} />
              </TabPane>
              <TabPane tab="发送消息管理" key="2">
                <div style={{ marginTop: '8px' }}></div>
                <ExceptionHandling {...this.props} {...this.state} />
              </TabPane>
            </Tabs>
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const { asyncHttpGetList, asyncHttpGetReceiveHandlingList } = this.props;

    await asyncHttpGetReceiveHandlingList({});
    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'exception-handling', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpGetList();
    await asyncHttpGetReceiveHandlingList();
  }
}

export default $connect(PageComponent, 'bmtp-common-basicparameter/exception-handling');
