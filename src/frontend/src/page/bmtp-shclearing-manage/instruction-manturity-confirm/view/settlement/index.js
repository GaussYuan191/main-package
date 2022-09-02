import React, { Component } from 'react';
import { Tabs } from 'antd';
import ManturityInstruction from './components/ManturityInstruction'; //到期结算管理
import InstructionMessage from './components/InstructionMessage'; //指令信息
import BondSubsidiary from './components/BondSubsidiary'; //债券明细
import RunningWater from './components/RunningWater'; //成交流水
import ContractMessage from './components/ContractMessage'; //合同信息
import GuaranteeInformation from './components/GuaranteeInformation'; //担保信息
// import CapitalSubsidiary from './components/CapitalSubsidiary'; //资金明细
import PledgeInformation from './components/PledgeInformation'; //质押券信息
import QueryFullInstructionFrom from './components/QueryFullInstructionForm'; // 查询全额结算指令
import { $connect, TransfromDown, PageBody, urlHashToJson, Modal } from 'yss-biz';
import toolStyle from './style/index.module.less';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
const { PageMain } = PageBody;
const { TabPane } = Tabs;

/*
 * 关联信息根据业务品种显示相关关联页签:
 * 债券借贷有 债券明细和质押券信息
 * 质押式回购有 质押券信息
 * 买断式回购有 债券明细和担保信息
 * 其他有债券明细
 */
class PageComponent extends Component {
  state = {
    tableHight: 450,
    btnAuth: {},
    queryModalVisible: false
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
                <ManturityInstruction
                  {...this.props}
                  {...this.state}
                  tableHight={this.state.tableHight}
                  openQueryInstructionModal={this.changeQueryInstructionModalVisible}
                />
              </div>

              <Tabs
                defaultActiveKey="1"
                className={`${toolStyle.mt10} darkStyle`}
                onChange={active => {
                  this.changeAboutActive(active);
                }}
              >
                <TabPane tab="交易指令信息" key="1">
                  <div className={toolStyle.tabSpace}>
                    <InstructionMessage {...this.props} tableHight={this.state.tableHight} />
                  </div>
                </TabPane>
                {rowed.bizCategory !== '2' ? (
                  <TabPane tab="债券明细" key="2">
                    <div className={toolStyle.tabSpace}>
                      <BondSubsidiary {...this.props} />
                    </div>
                  </TabPane>
                ) : null}
                {/* <TabPane tab="资金明细" key="3">
                  <CapitalSubsidiary {...this.props} />
                </TabPane> */}
                {rowed.bizCategory == '3' ? (
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
                <TabPane tab="结算指令信息" key="6">
                  <div className={toolStyle.tabSpace}>
                    <ContractMessage {...this.props} />
                  </div>
                </TabPane>
                {rowed.bizCategory === '2' || rowed.bizCategory === '8' ? (
                  <TabPane tab="质押券信息" key="7">
                    <div className={toolStyle.tabSpace}>
                      <PledgeInformation {...this.props} />
                    </div>
                  </TabPane>
                ) : null}
              </Tabs>
            </TransfromDown>
            {/* 查询全额结算指令对话框 */}
            <Modal
              title="查询全额结算指令"
              width={500}
              destroyOnClose={true}
              visible={this.state.queryModalVisible}
              onCancel={() => {
                this.setState({ queryModalVisible: false });
              }}
            >
              <QueryFullInstructionFrom
                {...this.props}
                closeQueryInstructionModal={() => this.changeQueryInstructionModalVisible(false)}
              />
            </Modal>
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const {
      asyncHttpSqDebtList,
      asyncGetBusinessType,
      asyncGetTradeDirection,
      asyncHttpCurrentTradingDay,
      toResetSearch,
      asyncHttpGetmaturityFullInstructionPageList
    } = this.props;

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'instruction-manturity-confirm', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpSqDebtList({});
    await asyncGetBusinessType(); // 获取业务类别字典数据
    await asyncGetTradeDirection(); //获取交易方向

    // 初始化到期结算管理的交易日以及查询参数
    await asyncHttpCurrentTradingDay().then(() => {
      toResetSearch({
        queryElement: {}
      });
    });
    await asyncHttpGetmaturityFullInstructionPageList({});
  }

  /***设置高度 */
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
    const { asyncHttpAboutQuery, changeTab } = this.props;
    changeTab({ value: active });
    asyncHttpAboutQuery();
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
    let rightActive2 = active === '2' && bizCategory === '2';
    let rightActive4 = active === '4' && bizCategory !== '3';
    let rightActive7 = active === '7' && (bizCategory !== '2' || bizCategory !== '8');
    if (rightActive2 || rightActive4 || rightActive7) {
      changeTab({ value: 1 });
    }
  };
  /**修改查询全额结算指令对话框状态 */
  changeQueryInstructionModalVisible = visible => {
    this.setState({ queryModalVisible: visible === undefined ? true : visible });
  };
}

export default $connect(PageComponent, 'bmtp-shclearing-manage/instruction-manturity-confirm');
