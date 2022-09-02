import React, { PureComponent } from 'react';
import { PageBody, $connect, urlHashToJson } from 'yss-biz';
import BondSaleBack from './components/BondSaleBack';
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
              <BondSaleBack {...this.props} {...this.state}></BondSaleBack>
            </Container>
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const {
      asyncHttpGetList,
      asyncHttpGetMapCode
      // asyncGetBondInfoGroupByReport,
      // asyncGetTradeInstrIdGroupByReport
    } = this.props;

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'bond-sale-back', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });
    // await asyncGetBondInfoGroupByReport();
    // await asyncGetTradeInstrIdGroupByReport();
    await asyncHttpGetMapCode({ params: '1030404', types: 'settInstitution' }); //结算机构数据字典
    // 系统处理状态数据字典
    asyncHttpGetMapCode({ params: '1030109', types: 'systemHandleStatus' }).then(() => {
      asyncHttpGetList({});
    });
  }
}

export default $connect(PageComponent, 'bmtp-settle-manage/bond-sale-back');
