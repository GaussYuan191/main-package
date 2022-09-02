import React, { PureComponent } from 'react';
import { Row, Button, Modal, message } from 'antd';
import {
  UploadModal,
  SearchForm,
  withRoleBotton,
  withRoleTableBotton,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  ConfigableTable,
  filterNullElement
} from 'yss-biz';
const UpLoadFile = UploadModal;
const { mapOption } = SearchForm;
class Document extends PureComponent {
  state = {
    isMoreShow: false,
    ids: []
  };
  render() {
    const { documentColumn, documentList, changeQueryElement } = this.props;
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
              this.seeInfo(row);
            }}
          >
            查看
          </Button>
        )
      },
      {
        title: '操作',
        key: 'operation',
        width: 200,
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
      {
        name: '上传',
        roule: true,
        func: this.uploadFiles
      },
      {
        name: '下载',
        roule: true,
        func: () => {}
      }
    ];

    /***按钮***/
    const ButtonType = [
      {
        name: '上传',
        roule: true,
        func: this.enclosureAdministration
      }
      // {
      //   name: '下载',
      //   roule: true
      //   // func: () => { openCapitalModal({ type: "add", status: true }) }
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
        <Row style={{ marginTop: '8px' }}>
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
        </Row>
        {withRoleBotton(ButtonType)}

        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: documentList,
            rowSelection,
            rowKey: 'id',
            pagination: pagination,
            height: 160
          })}
        />

        {/**上传组件** */}
        <UpLoadFile
          uploadList={this.addUploadFiles}
          action="/dfas-common-file/files/uploadBatchFile"
        />
      </>
    );
  }
  deleteItem(row) {
    Modal.confirm({
      title: ' 删除',
      content: `是否删除${row.contractName}`,
      onOk: () => {}
    });
  }

  enclosureAdministration = () => {
    const { openFormModal2 } = this.props;
    openFormModal2({
      status: true,
      sign: 'document',
      type: 'add'
    });
  };
  /***查看附件详情 */
  seeEnclosure = row => {
    const { changeEnclosureRow } = this.props;
    changeEnclosureRow({ id: row.id });
  };

  /***模糊查询 */
  query = () => {
    const { asyncHttpDocument, queryDocumentElement, subjectId } = this.props;
    let queryElement = {
      ...queryDocumentElement,
      subjectId
    };
    asyncHttpDocument({ params: queryElement });
  };

  seeInfo = row => {
    const { openFormModal2, changeDocumented } = this.props;
    changeDocumented({ value: row });
    openFormModal2({ status: true, sign: 'document', type: 'see' });
  };

  /**分页查询*/
  searchPage = (page, pageSize) => {
    const { asyncQueryClinetMount, queryConsignorElement, changeQueryElement } = this.props;
    changeQueryElement({ type: 'queryConsignorElement', element: 'reqPageNum', value: page });
    changeQueryElement({ type: 'queryProductElement', element: 'reqPageSize', value: pageSize });
    asyncQueryClinetMount({ params: filterNullElement(queryConsignorElement) });
  };

  // /**上传弹窗关闭的回调*/
  addUploadFiles = data => {
    //判断是否上传成功

    if (!data[0].id) {
      message.error('上传失败');
      return;
    }
    const { asyncHttpAddEnclosure, documented } = this.props;

    let params = {
      documentId: documented.id,
      file: {
        id: data[0].id[0],
        name: data[0].fileName
      },
      source: '1',
      subjectId: documented.subjectId + '',
      subjectType: '2',
      type: documented.type,
      useStatus: '1'
    };
    asyncHttpAddEnclosure({ params });
  };

  /**打开上传组件*/
  uploadFiles = (e, row) => {
    e.stopPropagation();
    const { changeDocumented } = this.props;
    changeDocumented({ value: row });
    UpLoadFile.show();
  };
}

export default Document;
