/**
 * 角色权限管理 View
 * @author txf
 */

import React from 'react';
import { Modal as modal } from 'antd';
import {
  SearchForm,
  ConfigableTable,
  Modal,
  withRoleBotton,
  withRoleTableBotton,
  setColumns,
  setTableInfo,
  rowSelectionFunc
} from 'yss-biz';
import DataAuthManageController from '../../controller/DataAuthManageController';
import AddDataAuthModal from './AddDataAuthModal';

class DataAuthManageView extends DataAuthManageController {
  constructor(props) {
    super(props);
  }
  render() {
    const { roleAuthList, roleAuthListTotal, queryParam, synchronizeFlag, isSofa } = this.props;
    const searchFormItem = [
      {
        name: 'product',
        label: '产品名称/代码',
        labelSize: '8em',
        type: 'Input',
        props: {
          placeholder: '请输入产品名称/代码查询',
          onChange: () => {}
        }
      }
    ];

    const buttonType = [
      {
        name: '授权',
        icon: 'plus',
        func: () => {
          this.changeModalVisible(true);
        }
      },
      {
        name: '批量撤销',
        icon: 'rollback',
        func: this.batchRevokeAuth
      },
      {
        name: '全部撤销',
        icon: 'close-square',
        func: () => {
          const that = this;
          modal.confirm({
            title: '确定撤销该角色所有授权吗?',
            onOk: () => {
              that.props.asyncHttpAllRevokeAuth().then(() => that.query());
            }
          });
        }
      },
      // 同步按钮功能受参数控制是否展示
      ...(synchronizeFlag
        ? [
            {
              name: '全量同步',
              icon: 'retweet',
              noAuth: true,
              func: () => {
                this.props.asyncHttpSynchronizeAllDataAuth().then(() => this.query());
              }
            }
          ]
        : [])
    ];

    const tableButtonType = [
      {
        name: '撤销',
        icon: 'rollback',
        func: (e, row) => {
          const { id, roleCode } = row;
          this.props.asyncHttpRevokeAuth({ id, roleCode });
        }
      },
      ...(synchronizeFlag
        ? [
            {
              name: '同步',
              icon: 'retweet',
              noAuth: true,
              func: (e, row) => {
                this.props.asyncHttpSynchronizeDataAuth([row.id]).then(() => this.query());
              }
            }
          ]
        : [])
    ];

    let columns = [
      {
        title: '序号',
        dataIndex: 'serialNumber',
        width: 60
      },
      {
        title: '产品代码',
        dataIndex: 'productCode',
        key: 'productCode',
        width: 250,
        ellipsis: true
      },
      {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        width: 200,
        ellipsis: true
      },
      {
        title: '数据编码',
        dataIndex: 'dataId',
        key: 'dataId',
        width: 250,
        ellipsis: true
      },
      ...(synchronizeFlag
        ? [
            {
              title: '是否同步成功',
              dataIndex: 'dataSynchronize',
              key: 'dataSynchronize',
              width: 150,
              ellipsis: true,
              render: text => (text === true ? '是' : text === false ? '否' : null)
            }
          ]
        : []),
      {
        title: '操作',
        key: 'option',
        width: 200,
        render: (e, row) => withRoleTableBotton(tableButtonType, this.props.btnAuth)(row)
      }
    ];

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
      total: roleAuthListTotal,
      pageSize: queryParam.reqPageSize,
      current: queryParam.reqPageNum
    };

    const rowSelection = rowSelectionFunc.call(this);
    return (
      <React.Fragment>
        <div style={{ paddingTop: '10px' }}></div>
        {/* <SearchForm
          labelSize="6em"
          lineOf={3}
          formItem={searchFormItem}
          refs={ref => (this.searchForm = ref)}
          handleSearch={this.query}
          moreTypeModal
          handleBeforeReset={() => true}
          handleReset={() => {}}
        /> */}
        {withRoleBotton(buttonType, this.props.btnAuth)}
        <ConfigableTable
          {...setTableInfo({
            columns: setColumns(columns),
            bordered: true,
            dataSource: roleAuthList,
            rowSelection,
            rowKey: 'id',
            height: 500,
            pagination
          })}
        />
        <Modal
          title={'数据角色权限-授权'}
          visible={this.state.modalVisible}
          okText="授权"
          onCancel={() => this.changeModalVisible(false)}
          width={1000}
        >
          <AddDataAuthModal
            changeModalVisible={this.changeModalVisible}
            asyncHttpAddDataRoleAuth={this.props.asyncHttpAddDataRoleAuth}
            productList={this.props.productList}
            asyncHttpGetProductList={this.props.asyncHttpGetProductList}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default DataAuthManageView;
