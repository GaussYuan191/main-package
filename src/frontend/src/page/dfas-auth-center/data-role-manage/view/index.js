import React, { PureComponent } from 'react';
import { PageBody, $connect, urlHashToJson } from 'yss-biz';
import DataAuthManage from './components/DataAuthManageView';
import SideRoleManage from './components/SideRoleManageView';
import { authModels } from 'yss-biz-auth';
import './styles/data-role-manage.less';
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
        <PageSide className="data-role-manage-left">
          <SideRoleManage {...this.props} {...this.state} />
        </PageSide>
        <PageMain className="data-role-manage-right">
          {!!this.props.treeActiveCode ? (
            <DataAuthManage {...this.props} {...this.state} />
          ) : (
            <span style={{ color: '#ff900d', fontSize: '20px' }}>请先在左侧选择角色以查看数据</span>
          )}
        </PageMain>
      </PageBody>
    );
  }

  async componentDidMount() {
    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'data-role-manage', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });
    // 查询系统是否开启同步
    await this.props.asyncHttpGetDataAuthSynchronize();
  }
}

export default $connect(PageComponent, 'dfas-auth-center/data-role-manage');
