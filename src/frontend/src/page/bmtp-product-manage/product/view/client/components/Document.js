import React, { PureComponent } from 'react';
import { Button } from 'antd';
import {
  ConfigableTable,
  withRoleBotton,
  withRoleTableBotton,
  UploadModal,
  ConfirmModal,
  SearchForm,
  Modal,
  setColumns,
  setTableInfo,
  rowSelectionFunc
} from 'yss-biz';
import ContractModal from './ContractModal';
const UploadFilesModal = UploadModal;
class Enclosure extends PureComponent {
  state = {
    isMoreShow: false,
    ids: []
  };
  render() {
    const {
      documentColumn,
      documentList,
      isOpenFormModal,
      openFormModal,
      changeQueryElement
    } = this.props;

    const columns = [
      ...setColumns(documentColumn),
      {
        title: '附件记录',
        key: 'operation1',
        width: 250,
        align: 'center',
        index: 6,
        render: row => (
          <Button
            type="link"
            onClick={() => {
              // let params = {
              //   ...page,
              //   documentId: row.id
              // };
              openFormModal({ status: true, sign: 'contract' });
              // asyncHttpGetEnclosure({
              //   params
              // })
            }}
          >
            查看
          </Button>
        )
      },
      {
        title: '操作',
        key: 'operation',
        width: 260,
        fixed: 'right',
        align: 'center',
        render: row => withRoleTableBotton(ButtonTableType)(row)
      }
    ];

    /***查询Input按钮 */
    let SearchformItem = [
      {
        name: 'documentType',
        label: '文档类型',
        type: 'Select',
        props: {
          placeholder: '请输入文档类型',
          getDics: 1030010,
          onChange(value) {
            changeQueryElement({ type: 'queryDocumentElement', element: 'type', value });
          }
        }
      }
    ];

    /***表格按钮***/
    const ButtonTableType = [
      // {
      //   name: '删除',
      //   roule: true,
      //   func: this.deleteItem
      // },
      {
        name: '上传',
        roule: true,
        func: this.updataFiles
      },
      {
        name: '下载',
        roule: true
        // func: this.deleteClientItem
      }
    ];

    /***按钮***/
    const ButtonType = [
      {
        name: '上传',
        roule: true,
        func: this.enclosureAdministration
      },
      {
        name: '下载',
        roule: true
        // func: () => { openCapitalModal({ type: "add", status: true }) }
      }

      // {
      //   name: '删除',
      //   roule: true
      //   // func: this.updateClientItem
      // }
    ];

    /***表格分页***/
    const pagination = {
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

    let rowSelection = rowSelectionFunc.call(this);
    return (
      <>
        <SearchForm
          labelSize="4em"
          lineOf={3}
          moreTypeModal
          formItem={SearchformItem}
          refs={ref => (this.searchForm = ref)}
          handleSearch={value => {
            this.query();
          }}
          handleBeforeReset={() => true}
        />
        {withRoleBotton(ButtonType)}
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: documentList,
            rowSelection,
            owKey: 'id',
            pagination: pagination
          })}
        />
        <Modal
          width={1000}
          title="附件管理"
          visible={isOpenFormModal.status && isOpenFormModal.sign == 'contract'}
          onCancel={() => {
            openFormModal({ type: 'add', status: false });
          }}
        >
          <ContractModal {...this.props}></ContractModal>
        </Modal>
        {/* <UploadFilesModal uploadList={this.addUploadFiles} /> */}
      </>
    );
  }
  deleteItem(row) {
    ConfirmModal({
      title: ' 删除',
      content: `是否删除${row.contractName}`,
      onOk: () => {
        // alert('111');
      }
    });
  }

  enclosureAdministration = () => {
    const { openFormModal } = this.props;
    openFormModal({ status: true, sign: 'contract' });
  };

  /***查看附件详情 */
  seeEnclosure(row) {
    const { changeEnclosureRow } = this.props;
    changeEnclosureRow({ id: row.id });
  }
  /***上传附件 */
  updataFiles(row) {
    UploadFilesModal.show();
  }
  /***接收附件新增弹窗的附件信息 */
  addUploadFiles(data) {}
  /***模糊查询 */
  query() {
    const { asyncHttpGetDocumentList, queryDocumentElement, productInfo } = this.props;
    let queryElement = {
      ...queryDocumentElement,
      subjectId: productInfo.productId
    };
    asyncHttpGetDocumentList({ params: queryElement });
  }
}

export default Enclosure;
