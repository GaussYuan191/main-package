import React, { PureComponent } from 'react';
import Detailed from './components/Detailed';
import { PageBody, $connect, urlHashToJson } from 'yss-biz';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
const { PageMain, Container } = PageBody;
class OfflineRetail extends PureComponent {
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
              <div>
                <Detailed {...this.props} {...this.state}></Detailed>
              </div>
            </Container>
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const { asyncHttpGetList, asyncHttpCounterpartyInfo } = this.props;

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'offline-retail', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpGetList({});
    // 获取对手方信息
    await asyncHttpCounterpartyInfo({});
  }
}
export default $connect(OfflineRetail, 'bmtp-settle-manage/offline-retail');
