import React, { Component } from 'react';
import { Tabs } from 'antd';
import DailyKnots from './components/DailyKnots'; //日结
import BondSubsidiary from './components/BondSubsidiary'; //债券明细
import { $connect, TransfromDown, PageBody, urlHashToJson } from 'yss-biz';
import toolStyle from './style/index.module.less';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
const { PageMain } = PageBody;
const { TabPane } = Tabs;
class PageComponent extends Component {
  state = {
    tableHight: 600,
    btnAuth: {}
  };
  render() {
    // 日志各项信息的数量对应，用于显示详细信息区域的各个数量值
    const { dailyNum } = this.props;
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <PageMain>
            <TransfromDown toggleMoreAfter={this.setTopTable}>
              <div>
                <DailyKnots {...this.props} {...this.state} tableHight={this.state.tableHight} />
              </div>
              <Tabs
                defaultActiveKey="1"
                className={`${toolStyle.mt10} darkStyle`}
                onChange={active => {
                  this.changeAboutActive(active);
                }}
              >
                <TabPane tab={`日志(执行中${dailyNum.execCount || 0})`} key="1">
                  <BondSubsidiary {...this.props} {...this.state} />
                </TabPane>
                <TabPane tab={`成功(执行完成${dailyNum.succCount || 0})`} key="2">
                  <BondSubsidiary {...this.props} {...this.state} />
                </TabPane>
                <TabPane tab={`失败(执行失败${dailyNum.failCount || 0})`} key="3">
                  <BondSubsidiary {...this.props} {...this.state} />
                </TabPane>
                <TabPane tab={`警告(执行警告${dailyNum.warnCount || 0})`} key="4">
                  <BondSubsidiary {...this.props} {...this.state} />
                </TabPane>
              </Tabs>
            </TransfromDown>
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const {
      asyncHttpDailyFirstList,
      // asyncHttpDailyFirstLogList,
      // asyncHttpDailyFirstLogNum,
      asyncHttpGetCurTradeDate
    } = this.props;

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'daily-first', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpGetCurTradeDate();
    await asyncHttpDailyFirstList({});
    // await asyncHttpDailyFirstLogNum({});
    // await asyncHttpDailyFirstLogList({ type: 'activeA' });
    const { changeQueryElement, currentTradeDate } = this.props;
    changeQueryElement({
      type: 'queryElement',
      value: { tradeDate: currentTradeDate || '' }
    });
  }
  setTopTable = isSHow => {
    const availHeight = document.body.clientHeight;
    let tableHight;
    if (availHeight > 1000) {
      tableHight = 330;
    } else if (availHeight < 1000) {
      tableHight = 250;
    }
    this.setState({
      tableHight: !isSHow ? tableHight : 600
    });
  };

  /***切换关联 */
  changeAboutActive = active => {
    const { changeAboutActive, asyncHttpDailyFirstLogList } = this.props;
    let type;
    switch (active) {
      case '1':
        type = 'activeA';
        break;
      case '2':
        type = 'activeB';
        break;
      case '3':
        type = 'activeC';
        break;
      case '4':
        type = 'activeD';
        break;
      default:
        type = '';
    }
    changeAboutActive({ value: type });
    asyncHttpDailyFirstLogList({ type });
  };
}

export default $connect(PageComponent, 'bmtp-common-basicparameter/daily-first');
