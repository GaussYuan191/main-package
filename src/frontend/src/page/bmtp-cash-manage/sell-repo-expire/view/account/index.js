import React, { PureComponent } from 'react';
import { Row } from 'antd';
import Detailed from './components/Detailed';
import Relation from './components/Relation';
import { PageBody, $connect, TransfromDown, urlHashToJson } from 'yss-biz';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
const { PageMain } = PageBody;
class BusinessQueries extends PureComponent {
  state = {
    btnAuth: {}
  };

  render() {
    // const { isSpinning } = this.props;
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <PageMain>
            <TransfromDown>
              <Row>
                <Detailed {...this.props} {...this.state}></Detailed>
              </Row>
              <Row>
                <div style={{ width: '90%', margin: '40px auto' }}>
                  <Relation {...this.props}></Relation>
                </div>
              </Row>
            </TransfromDown>
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const { asyncHttpGetAtureBusinessList } = this.props;

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'sell-repo-expire', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpGetAtureBusinessList({});
  }
}

export default $connect(BusinessQueries, 'bmtp-cash-manage/sell-repo-expire');
