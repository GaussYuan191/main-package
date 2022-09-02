import React, { PureComponent } from 'react';
import Detailed from './components/Detailed';
import Relation from './components/Relation';
import { PageBody, $connect, TransfromDown, urlHashToJson } from 'yss-biz';
import { page } from 'yss-biz/utils/util/constant';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
const { PageMain, Container } = PageBody;
class BalanceInquiry extends PureComponent {
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
            <Container>
              <TransfromDown toggleMoreAfter={this.setTopTable}>
                <div>
                  <Detailed {...this.props} {...this.state}></Detailed>
                </div>
                <Container>
                  <Relation {...this.props} {...this.state}></Relation>
                </Container>
              </TransfromDown>
            </Container>
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const { asyncHttpAssetAccountBalanceList, asyncHttpGetCurTradeDate } = this.props;
    /***第一加资金余额信息***/
    let params = {
      ...page
    };

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'fund-balance', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpAssetAccountBalanceList({ params });
    await asyncHttpGetCurTradeDate();
  }
}
export default $connect(BalanceInquiry, 'bmtp-cash-manage/fund-balance');
