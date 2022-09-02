import React, { PureComponent, Fragment } from 'react';
import { PageBody, $connect, urlHashToJson } from 'yss-biz';
import ParamTable from './components/ParamTable';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
const { PageMain, Container } = PageBody;
class SystemParam extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { btnAuth: {} };
  }
  render() {
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <Fragment>
        <PageBody>
          {authMsg.flag ? (
            <div className="no-auth">{authMsg.msg}</div>
          ) : (
            <PageMain>
              <Container>
                <ParamTable {...this.props} {...this.state} />
              </Container>
            </PageMain>
          )}
        </PageBody>
      </Fragment>
    );
  }
  async componentDidMount() {
    const { asyncGetTablesDatas } = this.props;
    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'system-parameter', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncGetTablesDatas({ ...this.props.paging });
  }
}
export default $connect(SystemParam, 'bmtp-common-basicparameter/system-parameter');
