import React, { Component } from 'react';
import './style.less';
import Process from './components/Process'; //指令管理
import { $connect, PageBody, urlHashToJson } from 'yss-biz';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
const { PageMain, Container } = PageBody;
class ProcessMange extends Component {
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
              <Process {...this.props} {...this.state} />
            </Container>
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'process-manage', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });
  }
}

export default $connect(ProcessMange, 'bmtp-settle-manage/process-manage');
