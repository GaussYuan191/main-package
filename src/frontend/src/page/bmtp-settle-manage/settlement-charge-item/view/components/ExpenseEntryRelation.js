import React, { Component } from 'react';
import { ConfigableTable, setColumns, setTableInfo, rowSelectionFunc } from 'yss-biz';
import { message } from 'antd';
/**关联信息表格*/
class ExpenseEntryRelation extends Component {
  state = {
    total: 0,
    reqPageNum: 1,
    reqPageSize: 20,
    dataList: [],
    ids: []
  };
  render() {
    /**关联数据表头*/
    const settlementColumn = [
      {
        title: '序号',
        dataIndex: 'serialNumber'
      },
      ,
      {
        title: '费用缴纳开始日',
        dataIndex: 'chargeStartDate',
        width: 200
      },
      {
        title: '费用缴纳截止日',
        width: 200,
        dataIndex: 'chargeEndDate'
      },
      {
        title: '费用类型',
        width: 200,
        dataIndex: 'chargeTypeName'
      },
      {
        title: '创建时间',
        width: 200,
        dataIndex: 'createTime'
      },
      {
        title: '创建用户名',
        width: 200,
        dataIndex: 'createUserName'
      },
      {
        title: '费用计提开始日',
        width: 200,
        dataIndex: 'expenseStartDate'
      },
      {
        title: '费用计提截止日',
        width: 200,
        dataIndex: 'expenseEndDate'
      },
      {
        title: '本期应缴费金额(元)',
        width: 200,
        dataIndex: 'currentPayableAmount'
      },
      {
        title: '减免金额(元)',
        dataIndex: 'deductionAmount',
        width: 200
      },
      {
        title: '已缴金额(元)',
        dataIndex: 'paidFeeAmount',
        width: 250
      },
      {
        title: '应缴费金额合计(元)',
        dataIndex: 'payableTotalAmount',
        width: 150
      },
      {
        title: '往期未缴费金额(元)',
        dataIndex: 'previousUnpaidAmount',
        width: 150
      },
      {
        title: '审核状态',
        width: 200,
        dataIndex: 'checkStatusName'
      },
      {
        title: '审核时间',
        width: 200,
        dataIndex: 'checkTime'
      },
      {
        title: '审核人名称',
        width: 200,
        dataIndex: 'checkUserName'
      },
      {
        title: '缴费通知编号',
        dataIndex: 'paymentNotice',
        width: 150
      },

      {
        title: '结算结构名称',
        dataIndex: 'settleInstitutionName',
        width: 200
      },
      {
        title: '费用结算状态',
        dataIndex: 'settleStatusName',
        width: 200
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        width: 200
      },
      {
        title: '更新用户名',
        dataIndex: 'updateUserName',
        width: 200
      },
      {
        title: '管理人名称',
        width: 200,
        dataIndex: 'managerName'
      },
      {
        title: '收款人账号',
        dataIndex: 'beneficiaryAccount',
        width: 200
      },
      {
        title: '收款人开户行行号',
        dataIndex: 'beneficiaryBankCode',
        width: 200
      },
      {
        title: '收款人开户行名称',
        dataIndex: 'beneficiaryBankName',
        width: 200
      },
      {
        title: '收款人名称',
        dataIndex: 'beneficiaryName',
        width: 200
      },
      {
        title: '产品代码',
        dataIndex: 'productCode',
        width: 200
      },
      {
        title: '产品名称',
        width: 150,
        dataIndex: 'productName'
      },
      {
        title: '确认时间',
        dataIndex: 'auditTime',
        width: 200
      },
      {
        title: '确认人',
        dataIndex: 'auditUserId',
        width: 150
      },
      {
        title: '附言',
        dataIndex: 'remark',
        width: 150
      }
    ];
    /**表格分页*/
    const pagination = {
      total: this.state.total,
      current: this.state.reqPageNum,
      pageSize: this.state.reqPageSize,
      onChange: (page, pageSize) => {
        this.searchPage(page, pageSize);
      },
      onShowSizeChange: (current, size) => {
        this.searchPage(current, size);
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      }
    };

    /**点击索引获取行的ID*/
    let rowSelection = rowSelectionFunc.call(this);
    return (
      <>
        <ConfigableTable
          {...setTableInfo({
            columns: [...setColumns(settlementColumn)],
            dataSource: this.state.dataList,
            rowSelection,
            rowKey: 'id',
            pagination: pagination,
            height: 400
          })}
        />
      </>
    );
  }
  async componentDidMount() {
    const { asyncHttpGetParentRelationList } = this.props;
    const { reqPageNum, reqPageSize } = this.state;
    // 绑定实例
    this.props.onRef(this);
    // 获取表格数据
    await asyncHttpGetParentRelationList({
      params: { reqPageNum, reqPageSize },
      cb: data => {
        this.setState({ total: data.total, dataList: data.list });
      }
    });
  }
  /**分页查询*/
  searchPage = async (page, pageSize) => {
    const { asyncHttpGetParentRelationList } = this.props;
    await asyncHttpGetParentRelationList({
      params: { reqPageNum: page, reqPageSize: pageSize },
      cb: data => {
        this.setState({
          total: data.total,
          dataList: data.list,
          reqPageNum: page,
          reqPageSize: pageSize
        });
      }
    });
    this.toEmptySelect();
  };
  /**清空选项 */
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };
  // 点击确定
  handleSubmit = async () => {
    const { ids } = this.state;
    const { asyncHttpRelationList, childrenList, openFormModal, query } = this.props;
    let childrenIdList = childrenList.map(item => item.id);
    if (ids.length > 1) {
      message.error('只能选择一条数据！');
    } else if (ids.length == 0) {
      message.error('请选择一条数据！');
    } else {
      await asyncHttpRelationList({ chargeId: ids[0].id, chargeItemIdList: childrenIdList }).then(
        () => {
          // 关闭modal并且清空表格的勾选
          openFormModal({ status: false });
          // 关联成功重新获取页面数据
          query();
        }
      );
    }
  };
}

export default ExpenseEntryRelation;
