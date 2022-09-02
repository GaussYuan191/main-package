import React, { Component } from 'react';
import { Tabs } from 'antd';
import Contract from './components/Contract'; //合同管理
import InstructionMessage from './components/InstructionMessage'; //指令信息
import BondSubsidiary from './components/BondSubsidiary'; //债券明细
import RunningWater from './components/RunningWater'; //成交流水
import ContractMessage from './components/ContractMessage'; //合同信息
import GuaranteeInformation from './components/GuaranteeInformation'; //担保信息
import CapitalSubsidiary from './components/CapitalSubsidiary'; //资金明细
import PledgeInformation from './components/PledgeInformation'; //质押券信息
import { $connect, TransfromDown, PageBody, urlHashToJson } from 'yss-biz';

import toolStyle from './style/index.module.less';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
const { PageMain } = PageBody;
const { TabPane } = Tabs;

class PageComponent extends Component {
  state = {
    tableHight: 450,
    btnAuth: {}
  };
  render() {
    const { rowed } = this.props;
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <PageMain>
            <TransfromDown toggleMoreAfter={this.setTopTable}>
              <div className={toolStyle.tabSpace}>
                <Contract
                  {...this.props}
                  {...this.state}
                  toInitTab={this.toInitTab}
                  tableHight={this.state.tableHight}
                />
              </div>
              <Tabs
                defaultActiveKey="1"
                className={`${toolStyle.mt10} darkStyle`}
                onChange={active => {
                  this.changeAboutActive(active);
                }}
              >
                <TabPane tab="结算指令信息" key="1">
                  <div className={toolStyle.tabSpace}>
                    <InstructionMessage {...this.props} />
                  </div>
                </TabPane>
                <TabPane tab="债券明细" key="2">
                  <div className={toolStyle.tabSpace}>
                    <BondSubsidiary {...this.props} />
                  </div>
                </TabPane>
                <TabPane tab="资金明细" key="3">
                  <CapitalSubsidiary {...this.props} />
                </TabPane>
                {this.props.rowed.bizCategory == 'BT03' ? (
                  <TabPane tab="担保信息" key="4">
                    <div className={toolStyle.tabSpace}>
                      <GuaranteeInformation {...this.props} />
                    </div>
                  </TabPane>
                ) : null}
                <TabPane tab="成交流水" key="5">
                  <div className={toolStyle.tabSpace}>
                    <RunningWater {...this.props} />
                  </div>
                </TabPane>
                <TabPane tab="合同信息" key="6">
                  <div className={toolStyle.tabSpace}>
                    <ContractMessage {...this.props} />
                  </div>
                </TabPane>
                {rowed.bizCategory === 'BT02' ? (
                  <TabPane tab="质押券信息" key="7">
                    <div className={toolStyle.tabSpace}>
                      <PledgeInformation {...this.props} />
                    </div>
                  </TabPane>
                ) : null}
              </Tabs>
            </TransfromDown>
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const { asyncHttpQueryZJDList /*asyncHttpGetCounterAccount, asyncHttpGetContractAccount*/ } =
      this.props;
    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'settlement-contract', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpQueryZJDList({ type: 'contractManage' });
    // await asyncHttpGetCounterAccount({});
    // await asyncHttpGetContractAccount({});
  }

  setTopTable = isSHow => {
    const availHeight = document.body.clientHeight;
    let tableHight;
    if (availHeight > 900) {
      tableHight = 330;
    } else if (availHeight < 900) {
      tableHight = 250;
    }

    this.setState({
      tableHight: !isSHow ? tableHight : 450
    });
  };

  /***切换关联 */
  changeAboutActive = active => {
    const {
      asyncHttpSearchAboutZJList,
      asyncHttpSearcAboutDBList,
      asyncHttpSearcAboutAccont,
      asyncHttpSearcAboutInfo,
      asyncHttpSearcAboutContractList,
      asyncHttpSearcAboutDealDetailedList,
      rowed,
      changeTab
    } = this.props;
    let params = {
      ...rowed
    };
    /**单独查询资金账号**/

    /***保存当前的tab */
    changeTab({ value: active });
    const action = {
      1: asyncHttpSearcAboutInfo, //结算指令详情
      2: asyncHttpSearchAboutZJList, //债券明细
      3: asyncHttpSearcAboutAccont, //资金明细
      4: asyncHttpSearcAboutDBList, //担保信息
      5: asyncHttpSearcAboutDealDetailedList, //成交流水明细
      6: asyncHttpSearcAboutContractList, //合同信息
      7: asyncHttpSearcAboutDBList //质押券信息
    };
    action[active]({ params });
  };
  /*
   * @description初始化关联信息tab
   * @dsy
   * @param {string} active 当前展示关联信息tab的编号
   * @param {string} bizCategory 业务品种
   * 判断现在选中的业务品种有没有之前展示关联信息tab的编号，如果没有则显示编号为1的tab
   */
  toInitTab = (active, bizCategory) => {
    const { changeTab } = this.props;
    let rightActive4 = active === '4' && bizCategory !== 'BT03';
    let rightActive7 = active === '7' && bizCategory !== 'BT02';
    if (rightActive4 || rightActive7) {
      changeTab({ value: 1 });
    }
  };
}

export default $connect(PageComponent, 'bmtp-shclearing-manage/settlement-contract');
