/* 手工匹配 */
import React, { PureComponent } from 'react';
import { message } from 'antd';
import { setColumns, setTableInfo, rowSelectionFunc, ConfigableTable } from 'yss-biz';

export default class HandleMatchModal extends PureComponent {
  componentDidMount() {
    this.props.onRef(this);
  }

  state = {
    ids: []
  };

  render() {
    const { onlineExecutTable, pageReqParm } = this.props;
    // const pagination = {
    //   onChange: (page, pageSize) => {
    //     this.searchPage({ reqPageNum: page, reqPageSize: pageSize });
    //   },
    //   onShowSizeChange: (current, size) => {
    //     this.searchPage({ reqPageNum: current, reqPageSize: size });
    //   },
    //   showTotal: total => {
    //     return <span>{`共${total}条`}</span>;
    //   },
    //   pageSize: pageReqParm.reqPageSize,
    //   current: pageReqParm.reqPageNum,
    //   total: onlineExecutTable.dataTotal
    // };
    return (
      <>
        <ConfigableTable
          {...setTableInfo({
            rowKey: 'id',
            className: 'yss-configable-table stripe-table',
            columns: [...setColumns(onlineExecutTable.columns)],
            dataSource: onlineExecutTable.data,
            height: 450,
            rowSelection: rowSelectionFunc.call(this)
            // pagination:pagination
          })}
          pagination={false}
        />
      </>
    );
  }
  // 清空勾选框
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  // 点击确定
  handleSubmit = () => {
    let dataList = this.state.ids;
    const { openFormModal } = this.props;
    if (this.props.onlineExecutTable.data.length == 0) {
      openFormModal({ status: false });
    } else {
      if (dataList.length < 1) {
        message.error('请勾选一条数据');
        this.toEmptySelect();
      } else if (dataList.length > 1) {
        message.error('只能选择一条数据');
        this.toEmptySelect();
      } else {
        let params = {
          tradeId: this.props.onlineExecutTable.tradeId,
          tradeInstrId: dataList[0].tradeInstrId
        };
        this.props.asyncHttpHandleMatchInstruction(params).then(() => {
          openFormModal({ status: false });
        });
      }
    }
  };
}
