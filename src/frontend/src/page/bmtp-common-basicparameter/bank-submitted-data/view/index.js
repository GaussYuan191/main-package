import React, { PureComponent } from 'react';
import { PageBody, $connect, urlHashToJson } from 'yss-biz';
import BankSubmittedData from './components/BankSubmittedData';
// import Trusteeship from './components/trusteeship';
// import Settlement from './components/settlement';
// import Consignor from './components/consignor';
import './components/style.less';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
const { PageMain, Container } = PageBody;
// const { TabPane } = Tabs;

class PageComponent extends PureComponent {
  state = { btnAuth: {} };
  render() {
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <PageMain>
            <Container>
              <BankSubmittedData {...this.props} {...this.state}></BankSubmittedData>
            </Container>
          </PageMain>
        )}
      </PageBody>
    );
  }
  async componentDidMount() {
    const { asyncHttpGetList, asyncHttpGetCurTradeDate } = this.props;

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'bank-submitted-data', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });
    await asyncHttpGetCurTradeDate();
    await asyncHttpGetList({ type: 'tsv_queryElement' });
  }
}

export default $connect(PageComponent, 'bmtp-common-basicparameter/bank-submitted-data');
