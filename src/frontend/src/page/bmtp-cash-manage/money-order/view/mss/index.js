import React, { Component } from 'react';
import Instruction from './components/Instruction'; //指令管理
import { $connect, PageBody, urlHashToJson, TransfromDown } from 'yss-biz';
import { authModels } from 'yss-biz-auth';
import AboutMessage from './components/AboutMessage';
const { functionCode, source } = urlHashToJson();
const { PageMain, Container } = PageBody;
class PageComponent extends Component {
  state = {
    btnAuth: {}
  };
  render() {
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <PageMain>
            <TransfromDown toggleMoreAfter={this.setTopTable}>
              <div>
                <Instruction {...this.props} {...this.state} />
              </div>
              <Container>
                <AboutMessage {...this.props} {...this.state} />
              </Container>
            </TransfromDown>
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const { asyncHttpCurrentTradingDay, asyncHttpGetList } = this.props;
    // let params = {
    //   ...page
    // }

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'money-order', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpCurrentTradingDay();
    await asyncHttpGetList({});
  }

  /***切换指令和全额指令 */
}

export default $connect(PageComponent, 'bmtp-cash-manage/money-order');
