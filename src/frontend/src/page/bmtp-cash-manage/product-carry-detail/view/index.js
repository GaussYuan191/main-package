import React, { PureComponent } from 'react';
import { PageBody, $connect, TransfromDown, urlHashToJson } from 'yss-biz';
import Detailed from './components/Detailed';
import AboutMessage from './components/AboutMessage';
import ModalMessage from './components/ModalMessage';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();

const { PageMain, Container } = PageBody;
class PositionChangeQuery extends PureComponent {
  state = {
    btnAuth: {}
  };

  render() {
    const { isOpenFormModal } = this.props;
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <PageMain>
            <Container>
              <TransfromDown position={this.props.position}>
                <div>
                  <Detailed {...this.props} {...this.state} />
                </div>
                <Container>
                  <AboutMessage {...this.props} />
                </Container>
              </TransfromDown>
            </Container>
            {!!isOpenFormModal.sign && <ModalMessage {...this.props} />}
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'product-carry-detail', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });
  }
}

export default $connect(PositionChangeQuery, 'bmtp-cash-manage/product-carry-detail');
