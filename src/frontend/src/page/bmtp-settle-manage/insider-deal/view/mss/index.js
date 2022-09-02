import React, { Component } from 'react';
import { Tabs } from 'antd';

import Inside from './components/Inside'; //内部交易
import InstructionMessage from './components/InstructionMessage'; //指令信息
import BondSubsidiary from './components/BondSubsidiary'; //债券明细
import DrawMoney from './components/DrawMoney'; //划款指令信息
// import ContractMessage from './components/ContractMessage'; //合同信息
// import GuaranteeInformation from './components/GuaranteeInformation'; //担保信息

import { $connect, TransfromDown, PageBody, page, urlHashToJson } from 'yss-biz';

import toolStyle from './style/index.module.less';

import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();

const { PageMain } = PageBody;
const { TabPane } = Tabs;

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
            <TransfromDown>
              <div className={toolStyle.tabSpace}>
                <Inside {...this.props} {...this.state} />
              </div>
              <Tabs
                defaultActiveKey="1"
                className={`${toolStyle.mt10} darkStyle`}
                onChange={active => {
                  this.changeAboutActive(active);
                }}
              >
                <TabPane tab="债券明细" key="1">
                  <div className={toolStyle.tabSpace}>
                    <BondSubsidiary {...this.props} />
                  </div>
                </TabPane>
                <TabPane tab="买卖方信息" key="2">
                  <div className={toolStyle.tabSpace}>
                    <InstructionMessage {...this.props} />
                  </div>
                </TabPane>
                <TabPane tab="划款指令信息" key="3">
                  <div className={toolStyle.tabSpace}>
                    <DrawMoney {...this.props.drawMoneyTable} />
                  </div>
                </TabPane>
                {/* <TabPane tab="担保信息" key="4">
                <div className={toolStyle.tabSpace}>
                  <GuaranteeInformation {...this.props} />
                </div>
              </TabPane> */}
                {/* <TabPane tab="源结算指令/合同信息" key="5">
                <div className={toolStyle.tabSpace}>
                  <ContractMessage {...this.props} />
                </div>
              </TabPane> */}
              </Tabs>
            </TransfromDown>
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const {
      asyncHttpSearchBuyerInfo,
      asyncHttpSearchSellerInfo,
      asyncHttpBizCategoryType,
      asyncHttpCurrentTradingDay,
      asyncHttpGetList,
      toResetSearch
    } = this.props;

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'insider-deal', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpBizCategoryType();
    await asyncHttpSearchBuyerInfo({});
    await asyncHttpSearchSellerInfo({});
    await asyncHttpCurrentTradingDay({}).then(()=>{
      toResetSearch()
    });
    await asyncHttpGetList()
  }

  /***切换指令和全额指令 */
  changeActive = active => {
    const { asyncHttpSqDebtList } = this.props;
    let params = {
      ...page
    };

    if (active == 1) {
      asyncHttpSqDebtList({ params, type: 'settleInstructManage' });
    } else {
      asyncHttpSqDebtList({ params, type: 'fullInstruction' });
    }
  };

  /***切换关联 */
  changeAboutActive = active => {
    const {
      asyncHttpAboutBondInnerInfo, //买卖房信息
      asyncHttpAboutDrawMoney, //划款指令信息
      rowed,
      changeTab
    } = this.props;
    let params = {
      ...rowed
    };
    changeTab({ value: active });
    const action = {
      2: asyncHttpAboutBondInnerInfo, //买卖房信息
      3: asyncHttpAboutDrawMoney //划款指令信息
    };

    typeof action[active] == 'function' && action[active](params);
  };
}

export default $connect(PageComponent, 'bmtp-settle-manage/insider-deal');
