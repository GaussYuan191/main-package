import React, { PureComponent } from 'react';
import { PageBody, $connect, TransfromDown, urlHashToJson } from 'yss-biz';
import Settlement from './components/Settlement';
import About from './components/About';
import './components/style.less';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
const { PageMain, Container } = PageBody;

class PageComponent extends PureComponent {
  state = {
    tableHeight: 400,
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
            <Container>
              <TransfromDown toggleMoreAfter={this.setTopTable}>
                <div>
                  <Settlement
                    {...this.props}
                    {...this.state}
                    tableHeight={this.state.tableHeight}
                  ></Settlement>
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
    const { asyncHttpGetList } = this.props;

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'settlement-expense-settlement', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });
    await asyncHttpGetList({});
  }

  setTopTable = isSHow => {
    this.setState({
      tableHeight: !isSHow ? 300 : 600
    });
  };
}

export default $connect(PageComponent, 'bmtp-settle-manage/settlement-expense-settlement');
