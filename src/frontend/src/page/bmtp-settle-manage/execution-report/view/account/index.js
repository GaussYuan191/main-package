import React, { PureComponent } from 'react';
import CashSale from './components/CashSale';
import CollateralisedRepo from './components/CollateralisedRepo';
import CollateralisedRepoAbout from './components/CollateralisedRepoAbout';
import OutrightRepo from './components/OutrightRepo';
import OutrightRepoAbout from './components/OutrightRepoAbout';
import BondLending from './components/BondLending';
import BondLendingAbout from './components/BondLendingAbout';
import Distribution from './components/Distribution';
import BondSaleBack from './components/BondSaleBack';
import { PageBody, $connect, TransfromDown, urlHashToJson, Tabs } from 'yss-biz';
import { page } from 'yss-biz/utils/util/constant';
import { Row } from 'antd';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
const { TabPane } = Tabs;
const { PageMain } = PageBody;
class TransactionReturns extends PureComponent {
  state = { btnAuth: {}, tableHight: 500, modalHeight: '500px' };

  render() {
    const { licenseData } = this.props;
    const authMsg = authModels.getState().get('authMsg').toJS();
    let arr = [];
    if (licenseData && licenseData.length) {
      for (let n of licenseData) {
        arr.push(n.code);
      }
    }
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <PageMain>
            <Tabs
              onChange={activeKey => {
                this.changeTab(activeKey);
              }}
            >
              {arr.indexOf('1') != -1 ? (
                <TabPane tab="现券买卖" key="1">
                  <div style={{ height: '100vh' }}>
                    <CashSale {...this.props} {...this.state}></CashSale>
                  </div>
                </TabPane>
              ) : null}

              {arr.indexOf('2') != -1 ? (
                <TabPane tab="质押式回购" key="2">
                  <TransfromDown toggleMoreAfter={this.setTopTable}>
                    <div>
                      <CollateralisedRepo {...this.props} {...this.state}></CollateralisedRepo>
                    </div>
                    <Row>
                      <CollateralisedRepoAbout {...this.props} />
                    </Row>
                  </TransfromDown>
                </TabPane>
              ) : null}

              {arr.indexOf('3') != -1 ? (
                <TabPane tab="买断式回购" key="3">
                  <TransfromDown toggleMoreAfter={this.setTopTable}>
                    <div>
                      <OutrightRepo {...this.props} {...this.state}></OutrightRepo>
                    </div>
                    <Row>
                      <OutrightRepoAbout {...this.props} />
                    </Row>
                  </TransfromDown>
                </TabPane>
              ) : null}

              {arr.indexOf('4') != -1 || arr.indexOf('5') != -1 ? (
                <TabPane tab="分销" key="4">
                  <Distribution {...this.props} {...this.state}></Distribution>
                </TabPane>
              ) : null}

              {arr.indexOf('8') != -1 ? (
                <TabPane tab="债券借贷" key="5">
                  <TransfromDown toggleMoreAfter={this.setTopTable}>
                    <div>
                      <BondLending {...this.props} {...this.state}></BondLending>
                    </div>
                    <Row>
                      <BondLendingAbout {...this.props} />
                    </Row>
                  </TransfromDown>
                </TabPane>
              ) : null}

              {arr.indexOf('9') != -1 ? (
                <TabPane tab="债券回售" key="6">
                  <BondSaleBack {...this.props} {...this.state} />
                </TabPane>
              ) : null}
            </Tabs>
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const {
      asyncHttpSearchAccountByCondition,
      // asyncHttpSearchGetQueryCondition,
      // asyncHttpToGetInsterIds,
      // changeSpinning,
      // asyncHttpGetBondList,
      asyncHttpLicenseValite,
      // asyncHttpGetProductList,
      asyncHttpCurrentTradingDay,
      // asyncGetBondInfoGroupByReport,
      // asyncGetTradeInstrIdGroupByReport
    } = this.props;
    /***第一加成交回报页面***/
    let params = {
      ...page
    };

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'execution-report', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    //根据业务类别判断客户数据许可证书接口
    await asyncHttpLicenseValite().then(() => {});

    // 成交编号加载，现券买卖，质押式回购，买断式回购，债券借贷
    // await asyncHttpSearchGetQueryCondition({ type: 'executionReportBond' });
    // await asyncHttpSearchGetQueryCondition({ type: 'executionReportPledge' });
    // await asyncHttpSearchGetQueryCondition({ type: 'executionReportOutright' });
    // await asyncHttpSearchGetQueryCondition({ type: 'executionReportLending' });
    // await asyncHttpGetProductList({});
    await asyncHttpCurrentTradingDay({});
    await asyncHttpSearchAccountByCondition({
      params,
      type: 'executionReportBond'
    });
    // await asyncHttpToGetInsterIds({});
    // await asyncGetBondInfoGroupByReport();
    // await asyncGetTradeInstrIdGroupByReport();

    this.changeSize();
    window.addEventListener('resize', this.changeSize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.changeSize);
  }

  changeSize = () => {
    let w = document.body.clientHeight;
    if (w > 800) {
      this.setState({ modalHeight: '550px' });
    } else {
      this.setState({ modalHeight: '450px' });
    }
  };

  setTopTable = isSHow => {
    const availHeight = document.body.clientHeight;
    let tableHight;
    if (availHeight > 1000) {
      tableHight = 330;
    } else if (availHeight < 1000) {
      tableHight = 250;
    }
    this.setState({
      tableHight: !isSHow ? tableHight : 500
    });
  };

  changeTab(activeKey) {
    const {
      asyncHttpSearchAccountByCondition,
      asyncHttpGetBondList,
      queryBondSaleBackElement
    } = this.props;
    let params = {
      ...page
    };
    if (activeKey == '1') {
      //现卷买卖
      asyncHttpSearchAccountByCondition({
        params: params,
        type: 'executionReportBond'
      });
    } else if (activeKey == '2') {
      //质押式回购
      asyncHttpSearchAccountByCondition({
        params: params,
        type: 'executionReportPledge'
      });
    } else if (activeKey == '3') {
      //买断式回购
      asyncHttpSearchAccountByCondition({
        params: params,
        type: 'executionReportOutright'
      });
    } else if (activeKey == '4') {
      //分销
      asyncHttpSearchAccountByCondition({
        params: params,
        type: 'onlineExecutReport'
      });
    } else if (activeKey == '5') {
      //债券借贷
      asyncHttpSearchAccountByCondition({
        params: params,
        type: 'executionReportLending'
      });
    } else if (activeKey == '6') {
      //债券回售
      asyncHttpGetBondList(queryBondSaleBackElement);
    }
  }
}

export default $connect(TransactionReturns, 'bmtp-settle-manage/execution-report');
