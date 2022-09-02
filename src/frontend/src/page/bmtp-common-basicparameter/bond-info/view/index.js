import React, { PureComponent, Fragment } from 'react';
import { PageBody, $connect, urlHashToJson } from 'yss-biz';
import Bond from './components/Bond';
// import ModalMessage from './components/ModalMessage';
import { authModels } from 'yss-biz-auth';
import './style.less';
const { functionCode, source } = urlHashToJson();
const { PageMain, Container } = PageBody;
class BondInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { btnAuth: {} };
  }

  render() {
    // const { isOpenFormModal } = this.props;
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <Fragment>
        <PageBody>
          {authMsg.flag ? (
            <div className="no-auth">{authMsg.msg}</div>
          ) : (
            <PageMain>
              <Container>
                <Bond {...this.props} {...this.state} />
              </Container>
              {/* {!!isOpenFormModal.sign && (
              <ModalMessage {...this.props} toEmptySelect={this.toEmptySelect} />
            )} */}
            </PageMain>
          )}
        </PageBody>
      </Fragment>
    );
  }
  async componentDidMount() {
    const { asyncGetBondTableDatas, asyncGetCodeMenu } = this.props;
    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'bond-info', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncGetBondTableDatas({ ...this.props.paging });
    await asyncGetCodeMenu({ securityTypes: ['ZQ'] });
  }
}
export default $connect(BondInfo, 'bmtp-common-basicparameter/bond-info');
