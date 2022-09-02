import React, { PureComponent } from 'react';
import { modal } from 'antd';
import {
  ConfigableTable,
  withRoleBotton,
  withRoleTableBotton,
  setColumns,
  Modal,
  setTableInfo,
  rowSelectionFunc,
  filterNullElement
} from 'yss-biz';
import SubjectFormRule from './SubjectFormRule';

class Subject extends PureComponent {
  render() {
    const {
      subjectList,
      subjectColumn,
      openFormModal,
      isOpenFormModal,
      querySubjectElement
    } = this.props;
    const columns = [
      ...setColumns(subjectColumn),
      {
        title: '操作',
        key: 'operation',
        width: 100,
        fixed: 'right',
        align: 'center',
        render: row => withRoleTableBotton(ButtonTableType)(row)
      }
    ];

    const ButtonType = [
      {
        name: '新增',
        roule: true,
        func: () => {
          openFormModal({ type: 'add', status: true, sign: 'subject' });
        }
      },
      {
        name: '导出',
        roule: 'true',
        children: [
          {
            name: '导出全部',
            func: this.exportAll
          },
          {
            name: '导出当前页'
          },
          {
            name: '导出选择项',
            func: this.exportSelected
          }
        ]
      }
    ];

    const ButtonTableType = [
      {
        name: '删除',
        roule: true,
        func: this.deleteItem
      }
    ];

    /***表格分页***/
    const pagination = {
      total: subjectList.total,
      pageSize: querySubjectElement.reqPageSize,
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

    let rowSelection = rowSelectionFunc.call(this);
    return (
      <div className="custom">
        {withRoleBotton(ButtonType)}
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: subjectList,
            rowSelection,
            pagination,
            height: '200px'
          })}
        />
        <Modal
          width={1000}
          title="新增关联主体"
          visible={isOpenFormModal.status && isOpenFormModal.sign == 'subject'}
          onCancel={() => {
            const { changeConsignorSubjectListDown } = this.props;
            changeConsignorSubjectListDown({ value: null });
            openFormModal({ type: 'add', status: false });
          }}
        >
          <SubjectFormRule {...this.props}></SubjectFormRule>
        </Modal>
      </div>
    );
  }

  deleteItem = (e, item) => {
    let that = this;
    modal.confirm({
      title: '是否删除主体',
      content: item.publisherFullName,
      onOk: function () {
        const { asyncHttpDeleteSubject } = that.props;
        asyncHttpDeleteSubject({ id: item.id });
      }
    });
  };

  /***模糊查询*/
  query = () => {
    const { asyncHttpGetSubjectList, querySubjectElement, productInfo } = this.props;
    let queryElement = {
      productId: productInfo.productId,
      ...querySubjectElement
    };
    asyncHttpGetSubjectList({ params: filterNullElement(queryElement) });
  };

  /**分页查询*/
  searchPage = (page, pageSize) => {
    const { asyncHttpGetSubjectList, querySubjectElement, productInfo } = this.props;
    let queryElement = {
      ...querySubjectElement,
      reqPageNum: page,
      reqPageSize: pageSize,
      productId: productInfo.productId
    };
    asyncHttpGetSubjectList({ params: filterNullElement(queryElement) });
  };

  /**分页查询多少Size*/
  searchNumPage = (current, size) => {
    const { asyncHttpGetSubjectList, querySubjectElement, productInfo } = this.props;
    let queryElement = {
      ...querySubjectElement,
      reqPageNum: current,
      reqPageSize: size,
      productId: productInfo.productId
    };
    asyncHttpGetSubjectList({ params: filterNullElement(queryElement) });
  };

  /***查看附件详情 */
  seeEnclosure(row) {
    const { changeEnclosureRow } = this.props;
    changeEnclosureRow({ id: row.id });
  }
}

export default Subject;
