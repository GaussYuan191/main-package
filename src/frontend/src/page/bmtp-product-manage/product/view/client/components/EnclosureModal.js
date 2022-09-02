import React, { Component } from 'react';
import { Modal, Table, Row } from 'antd';
import { modalInfo } from 'yss-biz/utils/util/constant';
import {
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  withRoleBotton,
  withRoleTableBotton
} from 'yss-biz';
import 'yss-biz/common/style/customAntd.less';
class EnclosureModal extends Component {
  render() {
    const {
      changeEnclosureRow,
      accountColumn,
      accountList,
      enclosureedId
    } = this.props;
    const columns = [
      ...setColumns(accountColumn),
      {
        title: '操作',
        key: 'operation',
        width: 300,
        fixed: 'right',
        align: 'center',
        render: item => withRoleTableBotton(ButtonTableType)(item)
      }
    ];
    let rowSelection = rowSelectionFunc.call(this);
    const ButtonTableType = [
      {
        name: '下载',
        roule: true
        // func: this.updateBondItem
      },

      {
        name: '删除',
        roule: true
        // func: this.deleteBondItem
      }
    ];
    const ButtonType = [
      {
        name: '删除',
        roule: true
        // func: () => { openClientsModal({ type: "add", status: true }) }
      },
      {
        name: '应用',
        roule: true
        // func: () => { openCapitalModal({ type: "add", status: true }) }
      },
      {
        name: '上传',
        roule: true
        // func: () => { asyncHttpBatchexamine({ type: "assetAccount", params: this.state.ids }) }
      },
      {
        name: '下载',
        roule: true
        // func: () => { asyncHttpUncheckAccount({ type: "assetAccount", params: this.state.ids }) }
      }
    ];
    return (
      <Modal
        {...modalInfo}
        width={1260}
        title="附件管理"
        visible={enclosureedId}
        onOk={this.submission}
        onCancel={() => {
          changeEnclosureRow({ id: 0 });
        }}
      >
        {withRoleBotton(ButtonType)}
        <Row>
          <Table {...setTableInfo({ columns, dataSource: accountList, rowSelection })} />
        </Row>
      </Modal>
    );
  }
}

export default EnclosureModal;
