/**
 * 角色权限管理 View
 * @author txf
 */

import React from 'react';
import { message, Checkbox } from 'antd';
import {
  SearchForm,
  DrapTable, // ConfigTable 缓存了columns会导致columns无法更新
  Modal,
  withRoleBotton,
  withRoleTableBotton,
  setColumns,
  setTableInfo,
  rowSelectionFunc
} from 'yss-biz';
import UserRoleAuthorizeController from '../../controller/UserRoleAuthorizeController';
import AuthorizeModal from './AuthorizeModal';

class UserRoleAuthorizeView extends UserRoleAuthorizeController {
  constructor(props) {
    super(props);
  }
  render() {
    const { queryParam, userTableData, userTableTotal, isSofa, modalInfo, changeModalInfo } =
      this.props;
    const searchFormItem = [
      {
        name: 'userCode',
        label: '用户名',
        labelSize: '8em',
        type: 'Input',
        props: {
          placeholder: '请输入用户名称模糊查询'
        }
      }
    ];
    const buttonType = [
      // sofa嵌入版没有功能授权功能
      !isSofa && {
        name: '功能角色授权',
        icon: 'project',
        func: () => {
          if (!this.state.ids.length) {
            message.error('请至少选择一条数据!');
            return;
          }
          changeModalInfo({
            type: 'funcAuth',
            isBatch: true,
            visible: true,
            userCodeList: this.state.userCodeList
          });
        }
      },

      // 页面数据角色相关功能参数控制是否展示
      this.state.showDataAuth && {
        name: '数据角色授权',
        icon: 'profile',
        func: () => {
          if (!this.state.ids.length) {
            message.error('请至少选择一条数据!');
            return;
          }
          changeModalInfo({
            type: 'dataAuth',
            isBatch: true,
            visible: true,
            userCodeList: this.state.userCodeList
          });
        }
      }
    ].filter(Boolean);

    const tableButtonType = [
      !isSofa && {
        name: '功能角色授权',
        icon: 'project',
        func: (e, row) => {
          const { userCode } = row;
          changeModalInfo({
            type: 'funcAuth',
            isBatch: false,
            visible: true,
            userCodeList: [userCode]
          });
        }
      },
      this.state.showDataAuth && {
        name: '数据角色授权',
        icon: 'profile',
        func: (e, row) => {
          const { userCode } = row;
          changeModalInfo({
            type: 'dataAuth',
            isBatch: false,
            visible: true,
            userCodeList: [userCode]
          });
        }
      }
    ].filter(Boolean);

    const columns = [
      {
        title: '序号',
        dataIndex: 'serialNumber',
        width: 60
      },
      {
        title: '用户编码',
        dataIndex: 'userCode',
        key: 'userCode',
        width: 100,
        ellipsis: true
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        width: 150,
        ellipsis: true
      },
      {
        title: '用户类型',
        dataIndex: 'userTypeName',
        key: 'userTypeName',
        width: 100,
        ellipsis: true
      },
      {
        title: '所属机构',
        dataIndex: 'orgList',
        key: 'orgList',
        width: 260,
        ellipsis: true,
        render: (text, record) => {
          if (!(record.orgList instanceof Array)) {
            return;
          }
          const orgStr = record.orgList
            .map(item => {
              return item.orgName || item.orgCode;
            })
            .join(' | ');

          return orgStr;
        }
      },
      !isSofa && {
        title: '所属功能角色',
        dataIndex: 'roleList',
        key: 'roleList',
        width: 260,
        ellipsis: true,
        render: (text, record) => {
          if (!(record.roleList instanceof Array)) {
            return;
          }
          const roleStr = record.roleList.map(item => item.roleName || item.roleCode).join(' | ');

          return roleStr;
        }
      },
      this.state.showDataAuth && {
        title: '所属数据角色',
        dataIndex: 'dataRoleList',
        key: 'dataRoleList',
        width: 260,
        ellipsis: true,
        render: (text, record) => {
          if (!(record.dataRoleList instanceof Array)) {
            return;
          }
          const roleStr = record.dataRoleList
            .map(item => {
              return item.roleName || item.roleCode;
            })
            .join(' | ');

          return roleStr;
        }
      },
      {
        title: '操作',
        key: `operation`,
        fixed: 'right',
        width: tableButtonType.length > 1 ? 300 : 160,
        render: (e, row) => withRoleTableBotton(tableButtonType, this.props.btnAuth)(row)
      }
    ].filter(Boolean);

    const pagination = {
      onChange: (page, pageSize) => {
        this.searchPage({ reqPageNum: page, reqPageSize: pageSize });
      },
      onShowSizeChange: (current, size) => {
        this.searchPage({ reqPageNum: current, reqPageSize: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      total: userTableTotal,
      pageSize: queryParam.reqPageSize,
      current: queryParam.reqPageNum
    };
    const rowSelection = {
      ...rowSelectionFunc.call(this, ids => {
        let orgListArray = ids.map(item => {
          return item.orgList.map(v => {
            return v.orgName || v.orgCode;
          });
        });
        //将机构转换成字符串
        let orgListString = orgListArray.map(item => {
          return item.join(' | ');
        });
        this.setState({
          userCodeList: ids.map(item => item.userCode),
          userOrgList: orgListString
        });
      }),
      getCheckboxProps: record => {
        const orgStr = record.orgList
          .map(item => {
            return item.orgName || item.orgCode;
          })
          .join(' | ');
        return {
          disabled: this.state.userCodeList.length && orgStr !== this.state.userOrgList[0]
        };
      },
      columnTitle: <Checkbox disabled />
    };
    return (
      <React.Fragment>
        <div style={{ paddingTop: '10px' }}></div>
        <SearchForm
          labelSize="4em"
          lineOf={3}
          formItem={searchFormItem}
          refs={ref => (this.$searchForm = ref)}
          handleSearch={this.query}
          moreTypeModal
          handleBeforeReset={() => true}
          handleReset={() => {
            this.query({});
          }}
        />
        {withRoleBotton(buttonType, this.props.btnAuth)}
        <DrapTable
          {...setTableInfo({
            dataSource: userTableData,
            columns: [...setColumns(columns)],
            rowSelection,
            rowKey: 'id',
            height: 600,
            pagination
          })}
          style={{ height: 610 }} // DrapTable需要手动添加外部高度限制
        />
        <Modal
          title={`${modalInfo.type === 'funcAuth' ? '功能' : '数据'}角色权限 - ${
            modalInfo.isBatch ? '批量' : ''
          }授权`}
          visible={modalInfo.visible}
          okText="授权"
          onCancel={this.closeAuthorizeModal}
          width={800}
        >
          <AuthorizeModal closeAuthorizeModal={this.closeAuthorizeModal} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default UserRoleAuthorizeView;
