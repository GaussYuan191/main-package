import React, { PureComponent } from 'react';
import { PageBody, $connect, urlHashToJson } from 'yss-biz';
import FlowRemind from './components/FlowRemind';
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
              <FlowRemind {...this.props} {...this.state}></FlowRemind>
            </Container>
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const { asyncHttpGetTaskList } = this.props;

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'flow-remind', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpGetTaskList();
  }
}

export default $connect(PageComponent, 'bmtp-settle-manage/flow-remind');
