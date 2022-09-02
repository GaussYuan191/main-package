import React, { PureComponent } from 'react';
import { $connect, PageBody, urlHashToJson } from 'yss-biz';
import { authModels } from 'yss-biz-auth';
import ForexSystemSetting from './components/ForexSystemSetting'; //上清所指令管理
const { functionCode, source } = urlHashToJson();
const { PageMain, Container } = PageBody;

class ForexSetting extends PureComponent {
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
              <ForexSystemSetting {...this.props} {...this.state} />
            </Container>
          </PageMain>
        )}
      </PageBody>
    );
  }
  async componentDidMount() {
    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'fund-name-product', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });
  }
}

export default $connect(ForexSetting, 'bmtp-common-basicparameter/fund-name-product');
