import React, { PureComponent } from 'react';
import { PageBody, Tabs, $connect, TransfromDown, urlHashToJson } from 'yss-biz';

import TableForBusiness from './components/TableForBusiness';
import AboutMessageForBusiness from './components/AboutMessageForBusiness';

import TableForPledge from './components/TableForPledge';
import AboutMessageForPledge from './components/AboutMessageForPledge';

import TableDistribution from './components/TableDistribution';
import AboutMessageDistribution from './components/AboutMessageDistribution';

import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();

const { PageMain, Container } = PageBody;
const { TabPane } = Tabs;
class StandingBook extends PureComponent {
  render() {
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <PageMain>
            <Tabs onChange={this.tabChange}>
              <TabPane tab="本方债券台账" key="1">
                <TransfromDown>
                  <div>
                    <TableForBusiness {...this.props} {...this.state} />
                  </div>
                  <Container>
                    <AboutMessageForBusiness {...this.props} />
                  </Container>
                </TransfromDown>
              </TabPane>
              <TabPane tab="对方债券台账" key="2">
                <TransfromDown>
                  <div>
                    <TableForPledge {...this.props} {...this.state} />
                  </div>
                  <Container>
                    <AboutMessageForPledge {...this.props} />
                  </Container>
                </TransfromDown>
              </TabPane>
              <TabPane tab="分销台账查询" key="3">
                <TransfromDown>
                  <div>
                    <TableDistribution {...this.props} {...this.state} />
                  </div>
                  <Container>
                    <AboutMessageDistribution {...this.props} />
                  </Container>
                </TransfromDown>
              </TabPane>
            </Tabs>
          </PageMain>
        )}
      </PageBody>
    );
  }

  tabChange = async key => {
    const { toChangeTabType, setRowChecked, asyncHttpGetList } = this.props;
    let type = '';
    if (key == 1) {
      type = 'queryDataForBusiness';
    } else if (key == 2) {
      type = 'queryDataForPledgeBond';
    } else {
      type = 'queryDataForDistribution';
    }
    toChangeTabType && toChangeTabType({ type: key });
    setRowChecked && setRowChecked({ ids: [] });
    await asyncHttpGetList({ type });
  };

  async componentDidMount() {
    const { asyncHttpEntrustSide, asyncHttpGetList } = this.props;

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'standing-book', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpGetList({ type: 'queryDataForBusiness' });
    await asyncHttpEntrustSide({});
    // await asyncHttpCounterName();
    // await asyncHttpOpponentOptions({});
  }
}
export default $connect(StandingBook, 'bmtp-cash-manage/standing-book');
