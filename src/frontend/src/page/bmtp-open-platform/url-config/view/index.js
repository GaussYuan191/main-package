import React, { Component } from 'react';
// import { Tabs } from 'antd';
import { $connect, PageBody, urlHashToJson } from 'yss-biz';
import { authModels } from 'yss-biz-auth';
import CacheContent from './components/CacheContent';
const { functionCode, source } = urlHashToJson();
const { PageMain } = PageBody;
class PageComponent extends Component {
  state = {
    btnAuth: {}
  };
  render() {
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <PageMain>
            <CacheContent {...this.props} {...this.state} />
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const { asyncHttpCachePage, asyncHttpGetCode } = this.props;

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'url-config', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpCachePage({});
    // await asyncHttpGetCode({ id: '1050002', name: 'rocketmq' });
    // await asyncHttpGetCode({ id: '1050003', name: 'webservice' });
    // await asyncHttpGetCode({ id: '1050004', name: 'hessian' });
    // await asyncHttpGetCode({ id: '1050005', name: 'restful' });
  }
}

export default $connect(PageComponent, 'bmtp-open-platform/url-config');
