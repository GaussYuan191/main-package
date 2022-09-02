import React, { PureComponent } from 'react';
import { Table, Modal } from 'antd';
// import { setTableInfo } from 'yss-biz';
// import { page } from 'yss-biz/utils/util/constant';
class HoldPositionsModal extends PureComponent {
  render() {
    // const { enclosureList } = this.props;

    return (
      <Table
        // {...setTableInfo({ columns, dataSource: enclosureList })}
        pagination={{
          // onChange: (page, pageSize) => { this.searchAccountByCondition(page, pageSize) },
          // onShowSizeChange: (current, size) => { this.searchAccountByCondition(current, size) },
          showSizeChanger: true,
          showQuickJumper: true,
          total: 20
        }}
      />
    );
  }
  delete(row) {
    const { asyncHttpDeleteEnlosure } = this.props;
    Modal.confirm({
      title: '删除',
      content: `是否删除${row.documentId}`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        asyncHttpDeleteEnlosure({ params: row });
      },
      onCancel: () => {}
    });
  }
  componentDidMount() {
    // const { documentId, asyncHttpGetEnlosure } = this.props;
    // let params = {
    //   documentId,
    //   ...page
    // }
    // asyncHttpGetEnlosure({
    //   params
    // })
  }
}

export default HoldPositionsModal;
