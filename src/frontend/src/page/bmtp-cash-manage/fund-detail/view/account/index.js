import React, { PureComponent } from 'react';
import Detailed from './components/Detailed';
import CapitalAdjustment from './components/CapitalAdjustment';
import StatusModal from './components/StatusModal';
import { PageBody, $connect, urlHashToJson } from 'yss-biz';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
const { PageMain } = PageBody;
class CapitalDetails extends PureComponent {
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
            <Detailed {...this.props} {...this.state}></Detailed>
            {!!isOpenFormModal.status && isOpenFormModal.type !== 'see' && (
              <CapitalAdjustment {...this.props} />
            )}
            <StatusModal {...this.props}></StatusModal>
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const { asyncHttpGetMoneyList } = this.props;

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'fund-detail', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpGetMoneyList({});
  }
}

export default $connect(CapitalDetails, 'bmtp-cash-manage/fund-detail');
