import React, { PureComponent } from 'react';
import { PageBody, $connect, TransfromDown, urlHashToJson } from 'yss-biz';
import Settlement from './components/Settlement';
import About from './components/About';
// import BondSaleBack from './components/BondSaleBack';
import './components/style.less';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
const { PageMain, Container } = PageBody;

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
              <TransfromDown>
                <div>
                  <Settlement {...this.props} {...this.state}></Settlement>
                </div>
                <div>
                  <About {...this.props} {...this.state}></About>
                </div>
              </TransfromDown>
            </Container>
          </PageMain>
        )}
      </PageBody>
    );
  }
  async componentDidMount() {
    const { asyncHttpGetList, asyncHttpBondAccount, asyncHttpCurrentTradingDay } = this.props;
    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'bond-interest-payment', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpCurrentTradingDay();
    await asyncHttpGetList({}); //默认传系统当前交易日
    await asyncHttpBondAccount({});
  }
}

export default $connect(PageComponent, 'bmtp-settle-manage/bond-interest-payment');
