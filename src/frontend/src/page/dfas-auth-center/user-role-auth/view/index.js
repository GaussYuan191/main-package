import React, { PureComponent } from 'react';
import { PageBody, $connect, urlHashToJson } from 'yss-biz';
import UserRoleAuthorize from './components/UserRoleAuthorizeView';
import OrgTree from './components/OrgTreeView';
import { authModels } from 'yss-biz-auth';
import './styles/user-role-auth.less';
const { functionCode, source } = urlHashToJson();
const { PageMain, PageSide } = PageBody;

class PageComponent extends PureComponent {
  state = {
    btnAuth: {}
  };
  render() {
    const authMsg = authModels.getState().get('authMsg').toJS();
    return authMsg.flag ? (
      <div className="no-auth">{authMsg.msg}</div>
    ) : (
      <PageBody>
        <PageSide className="user-role-auth-left">
          <OrgTree {...this.props} {...this.state} />
        </PageSide>
        <PageMain className="user-role-auth-right">
          <UserRoleAuthorize {...this.props} {...this.state} isSofa={source === 'sofa'} />
        </PageMain>
      </PageBody>
    );
  }

  async componentDidMount() {
    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'user-role-auth', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });
  }
}

export default $connect(PageComponent, 'dfas-auth-center/user-role-auth');
