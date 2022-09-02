/**
 * 角色赋权对话框
 * @props
 * @props
 */

import React from 'react';
import { Modal, message, Table, Icon, Checkbox } from 'antd';
import { $connect } from 'yss-biz';
class AuthorizeModal extends React.Component {
  constructor(props) {
    super(props);
    this.props.onRef && this.props.onRef(this);
    this.state = {
      roleCodeList: [],
      /**已展开节点key */
      expandedRowKeys: [],
      /**用户是否修改过 */
      isModified: false
    };
  }

  async componentDidMount() {
    const { modalInfo, asyncHttpGetRoleTree, asyncHttpGetMutexRoleCodeList } = this.props;
    await asyncHttpGetRoleTree({ userCode: modalInfo.userCodeList[0] });
    // .then(
    //   // 加载后展开所有节点
    //   state => {
    //     let roleTreeDataAllKeys = state?.get('roleTreeDataAllKeys');
    //     roleTreeDataAllKeys = roleTreeDataAllKeys.toJS
    //       ? roleTreeDataAllKeys.toJS()
    //       : roleTreeDataAllKeys;
    //     this.setState({ expandedRowKeys: roleTreeDataAllKeys || [] });
    //   }
    // );
    if (modalInfo.type === 'funcAuth') {
      await asyncHttpGetMutexRoleCodeList({});
    }
  }

  render() {
    const { modalInfo, mutexRoleCodeList, asyncHttpGetMutexRoleCodeList, roleTreeData } =
      this.props;
    const columns = [
      {
        title: (
          <span>
            <span style={{ paddingRight: '10px' }}>
              {modalInfo.type === 'dataAuth' ? '机构功能角色' : '机构数据角色'}
            </span>
            <Icon
              type={!this.state.expandedRowKeys.length ? 'plus-square' : 'minus-square'}
              onClick={this.handleToggleTable}
            />
          </span>
        ),
        dataIndex: 'orgName',
        key: 'treeCode',
        render: (text, record) => {
          return (
            <span
              key={record.key}
              title={record.orgName}
              className={record.roleName ? 'defaultText' : 'activeText'}
            >
              {record.roleName ? record.roleName : record.orgName}
            </span>
          );
        }
      }
    ];

    const rowSelection = {
      getCheckboxProps: record => {
        return {
          defaultChecked: record.checked == true, // 配置默认勾选的列
          disabled: record.type == 'O' || mutexRoleCodeList.includes(record.roleCode)
        };
      },
      onChange: async (selectedRowKeys, selectedRowItem, ws) => {
        // 机构功能角色授权,需要查询和更新互斥角色
        if (modalInfo.type === 'funcAuth') {
          const list = selectedRowItem.map(item => item.roleCode);
          await asyncHttpGetMutexRoleCodeList({ roleCodeList: list });
        }
        let roleCodeList = selectedRowItem.map(item => {
          return {
            roleCode: item.roleCode,
            roleName: item.roleName
          };
        });
        this.setState({
          roleCodeList: roleCodeList,
          isModified: true //可以赋权
        });
      },
      columnTitle: <Checkbox disabled />
    };
    return (
      <Table
        columns={columns}
        dataSource={roleTreeData}
        rowKey={'treeCode'} // treeCode行键用于处理展开, 来自bizUtils.formatTreeTableData处理时指定的键
        filterMultiple={true}
        defaultExpandAllRows={true}
        expandedRowKeys={this.state.expandedRowKeys}
        onExpandedRowsChange={this.handleExpand}
        pagination={false}
        rowSelection={rowSelection}
        restData={this.restData}
        scroll={{
          y: 480
        }}
      />
    );
  }

  /**处理全部展开/收起 */
  handleToggleTable = () => {
    this.setState({
      expandedRowKeys: this.state.expandedRowKeys.length ? [] : this.props.roleTreeDataAllKeys
    });
  };

  /**处理展开 */
  handleExpand = expandedRows => {
    this.setState({ expandedRowKeys: expandedRows });
  };

  /**处理提交 */
  handleSubmit = () => {
    if (!this.state.isModified) {
      message.warn('授权未变动, 请修改后提交');
      return;
    }
    const { modalInfo, asyncHttpAddRoleAuth, asyncHttpGetUserList } = this.props;
    const params = {
      roleCodeList: this.state.roleCodeList.map(item => item.roleCode),
      userCodeList: modalInfo.isBatch ? modalInfo.userCodeList : null,
      userCode: modalInfo.isBatch ? null : modalInfo.userCodeList[0]
    };
    asyncHttpAddRoleAuth(params).then(state => {
      // 弹窗关闭后刷新表格
      const modalInfo = state.get('modalInfo').toJS
        ? state.get('modalInfo').toJS()
        : state.get('modalInfo');
      !modalInfo.visible && asyncHttpGetUserList();
    });
  };
}

export default $connect(AuthorizeModal, 'dfas-auth-center/user-role-auth');
