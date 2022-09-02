import React, { PureComponent } from 'react';
import Capital from './components/Capital';
import Bond from './components/Bond';
import Tree from './components/Trees';
import { PageBody, $connect, page, Tabs, urlHashToJson } from 'yss-biz';
import './style.less';
import { authModels } from 'yss-biz-auth';
const { TabPane } = Tabs;
const { PageSide, PageMain } = PageBody;
const { functionCode, source } = urlHashToJson();
class Account extends PureComponent {
  state = { btnAuth: {} };
  render() {
    const { treeItemed, activeAccountKey } = this.props;
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <>
            <PageSide>
              {this.props.treeList.length ? (
                <Tree treeData={this.props.treeList} {...this.props}></Tree>
              ) : (
                ''
              )}
            </PageSide>
            <PageMain>
              <Tabs
                activeKey={activeAccountKey}
                onChange={activeKey => {
                  this.changeTab(activeKey);
                }}
              >
                <TabPane tab="资金账户" key="assetAccount">
                  <Capital {...this.props} {...this.state}></Capital>
                </TabPane>
                <TabPane tab="债券托管账户" key="bondAccount" disabled={treeItemed.floor == 2}>
                  <Bond {...this.props} {...this.state}></Bond>
                </TabPane>
              </Tabs>
            </PageMain>
          </>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const { asyncHttpFirstMount } = this.props;

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'account', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    /***第一加载资金页面***/
    await asyncHttpFirstMount();
  }
  changeTab(activeKey) {
    const { changeActiveAccountKey, asyncHttpAccountlList, queryCapitalElement, queryBandElement } =
      this.props;
    changeActiveAccountKey({ value: activeKey });
    if (activeKey == 'assetAccount') {
      asyncHttpAccountlList({ params: queryCapitalElement, type: 'assetAccount' });
    } else if (activeKey == 'bondAccount') {
      //加载债券托管账户列表
      asyncHttpAccountlList({ params: queryBandElement, type: 'bondAccount' });
    }
    // else {
    //   //加载交易账户列表
    //   asyncHttpAccountlList({ params: params, type: 'tradeAccount' });
    // }
  }
}

export default $connect(Account, 'bmtp-product-manage/account');
