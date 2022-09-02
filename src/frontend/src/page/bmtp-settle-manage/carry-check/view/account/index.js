import React, { PureComponent } from 'react';
// import { Tabs } from 'antd';
import HoldPositions from './components/HoldPositions';
import { PageBody, $connect, urlHashToJson } from 'yss-biz';
// import { page } from 'yss-biz/utils/util/constant';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
// const { TabPane } = Tabs;
const { PageMain } = PageBody;
class CheckPositions extends PureComponent {
  state = { btnAuth: {} };
  render() {
    // const { isSpinning } = this.props;
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <PageMain>
            <div style={{ height: '100vh' }}>
              <HoldPositions {...this.props} {...this.state}></HoldPositions>
            </div>
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const {
      asyncHttpSearchCheckList,
      asyncHttpAccountType,
      asyncHttpCurrentTradingDay
    } = this.props;

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'carry-check', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpCurrentTradingDay({});
    await asyncHttpSearchCheckList({});
    await asyncHttpAccountType({});
  }
}

export default $connect(CheckPositions, 'bmtp-settle-manage/carry-check');
