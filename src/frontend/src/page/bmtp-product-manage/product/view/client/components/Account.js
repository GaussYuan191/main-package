import React, { PureComponent } from 'react';
import {
  ConfigableTable,
  Modal,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
} from 'yss-biz';
import AccountFormRule from './AccountFormRule';

class Account extends PureComponent {
  state = {
    isMoreShow: false,
    ids: []
  };

  render() {
    const {
      accountColumn,
      accountList,
      queryAccountElement,
      openFormModal,
      isOpenFormModal
    } = this.props;
    const columns = [
      ...setColumns(accountColumn),
      {
        title: '审核状态',
        dataIndex: 'checkStatusName',
        ellipsis: true,
        width: 150
      },
      {
        title: '账户状态',
        dataIndex: 'accountStatusName',
        ellipsis: true,
        width: 150
        // render: value => {
        //   const accountStatusArray = ['停用', '启用', '注销'];
        //   return accountStatusArray[value + ''];
        // }
      },
      {
        title: '备注',
        dataIndex: 'remarks',
        ellipsis: true,
        width: 150
      },

      {
        title: '审核人',
        dataIndex: 'checkUserName',
        ellipsis: true,
        width: 150
      },
      {
        title: '审核时间',
        dataIndex: 'checkTime',
        ellipsis: true,
        width: 150
      },
      {
        title: '创建人',
        dataIndex: 'createUserName',
        ellipsis: true,
        width: 150
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        ellipsis: true,
        width: 150
      },
      {
        title: '修改人',
        dataIndex: 'updateUserName',
        ellipsis: true,
        width: 150
      },
      {
        title: '修改时间',
        dataIndex: 'updateTime',
        ellipsis: true,
        width: 150
      }
    ];

    /***表格分页***/
    const pagination = {
      total: accountList.total,
      pageSize: queryAccountElement.reqPageSize,
      showSizeChanger: false,
      onChange: (page, pageSize) => {
        this.searchPage(page, pageSize);
      },
      onShowSizeChange: (current, size) => {
        this.searchNumPage(current, size);
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      }
    };

    /***点击索引获取行的ID** */
    let rowSelection = rowSelectionFunc.call(this);

    return (
      <>
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: accountList,
            rowSelection,
            pagination: pagination,
            height: 260
          })}
        />
        <Modal
          width={1000}
          title={
            isOpenFormModal.type === 'update'
              ? '修改产品关联账户'
              : isOpenFormModal.type === 'delete'
              ? '删除产品关联账户'
              : '新增产品关联账户'
          }
          visible={isOpenFormModal.status && isOpenFormModal.sign == 'account'}
          onCancel={() => {
            openFormModal({ type: 'add', status: false });
          }}
        >
          <AccountFormRule {...this.props}></AccountFormRule>
        </Modal>
      </>
    );
  }

  /**分页查询*/
  searchPage = (page, pageSize, productInfo) => {
    // const { asyncHttpGetAccount, queryAccountElement } = this.props;
    // let queryElement = {
    //   ...queryAccountElement,
    //   "reqPageNum": page,
    //   "reqPageSize": pageSize,
    //   productCode: productInfo.productCode
    // };
    // asyncHttpGetAccount({ params: filterNullElement(queryElement) });
  };
  /**分页查询多少页面*/
  searchNumPage = (current, size) => {
    // const { asyncQueryMoust, changeQueryElement} = this.props;
    // changeQueryElement({type:"queryProductElement",element:"reqPageNum",value:current});
    // changeQueryElement({type:"queryProductElement",element:"reqPageSize",value:size});
    // asyncQueryMoust();
  };

  /***查看附件详情 */
  seeEnclosure(row) {
    const { changeEnclosureRow } = this.props;
    changeEnclosureRow({ id: row.id });
  }
}

export default Account;
