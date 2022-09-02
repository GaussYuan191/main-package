import React, { PureComponent } from 'react';
import { PageBody, $connect, urlHashToJson } from 'yss-biz';
import { authModels } from 'yss-biz-auth';
import ExpenseEntry from './components/ExpenseEntry';
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
              <ExpenseEntry {...this.props} {...this.state}></ExpenseEntry>
            </Container>
          </PageMain>
        )}
      </PageBody>
    );
  }
  async componentDidMount() {
    const { asyncHttpGetChargeItemPageList } = this.props;

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'settlement-charge-item', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpGetChargeItemPageList();
  }
}

export default $connect(PageComponent, 'bmtp-settle-manage/settlement-charge-item');
