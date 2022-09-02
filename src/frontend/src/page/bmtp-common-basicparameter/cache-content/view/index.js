import React, { Component } from 'react';
// import { Tabs } from 'antd';
import { $connect, PageBody, urlHashToJson } from 'yss-biz';
import { authModels } from 'yss-biz-auth';
import CacheContent from './components/CacheContent';
const { functionCode, source } = urlHashToJson();
const { PageMain } = PageBody;
// const { TabPane } = Tabs;
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
    const { asyncHttpCachePage, asyncHttpGetRefreshList } = this.props;

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'cache-content', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpCachePage({});
    await asyncHttpGetRefreshList({});
  }
}

export default $connect(PageComponent, 'bmtp-common-basicparameter/cache-content');
