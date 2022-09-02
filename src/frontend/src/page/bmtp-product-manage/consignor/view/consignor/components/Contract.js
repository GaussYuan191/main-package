import React, { PureComponent } from 'react';
import { Row } from 'antd';
import {
  SearchForm,
  page,
  withRoleBotton,
  withRoleTableBotton,
  UploadModal,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  filterNullElement,
  ConfigableTable
} from 'yss-biz';

const UploadFilesModal = UploadModal;
class Contract extends PureComponent {
  state = {
    ids: []
  };
  render() {
    const {
      contractColumn,
      contractList,
      asyncHttpGetEnclosure,
      openFormModal2,
      changeQueryElement
    } = this.props;
    const columns = [
      ...setColumns(contractColumn),
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
        name: 'contractCode',
        label: '合同编号',
        type: 'Input',
        props: {
          placeholder: '请输入合同编号',
          onChange(e) {
            changeQueryElement({
              type: 'queryContracElement',
              element: 'contractStatus',
              value: e.target.value
            });
          }
        }
      },
      {
        name: 'useStatus',
        label: '合同状态',
        type: 'Select',
        props: {
          placeholder: '请选择合同状态',
          getDics: 1030109,
          onChange(value) {
            changeQueryElement({ type: 'queryContracElement', element: 'contractStatus', value });
          }
        }
      }
    ];
    const ButtonType = [
      {
        name: '新增',
        roule: true,
        func: this.enclosureAdministration
      }
      // {
      //   name: '下载',
      //   roule: true
      // },
    ];
    const ButtonTableType = [
      {
        name: '查看',
        roule: true,
        icon: 'appstore',
        func: (e, row) => {
          let params = {
            ...page,
            documentId: row.id
          };
          openFormModal2({ status: true, sign: 'contract', type: 'see' });
          asyncHttpGetEnclosure({
            params
          });
        }
      },
      {
        name: '上传',
        roule: true,
        func: this.updataFiles
      },
      {
        name: '下载',
        roule: true
      }
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
      <div className="custom">
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
        <Row>{withRoleBotton(ButtonType)}</Row>
        <Row>
          <ConfigableTable
            {...setTableInfo({
              columns,
              dataSource: contractList,
              rowSelection,
              rowKey: 'id',
              pagination,
              height: 160
            })}
          />
        </Row>
        <UploadFilesModal
          uploadList={this.addUploadFiles}
          action="/dfas-common-file/files/uploadBatchFile"
        />
      </div>
    );
  }

  /***上传附件 */
  updataFiles = (e, row) => {
    const { changeDocumented } = this.props;
    changeDocumented({ value: row });
    UploadFilesModal.show();
  };
  /***接收附件新增弹窗的附件信息 */
  addUploadFiles = data => {
    //判断是否上传成功
    const { asyncHttpAddEnclosure, documented } = this.props;

    if (!data[0].id) {
      return;
    }

    let params = {
      documentId: documented.id,
      file: {
        id: data[0].id[0],
        name: data[0].fileName
      },
      source: '1',
      subjectId: documented.subjectId + '',
      subjectType: '2',
      type: 7,
      useStatus: '1'
    };
    asyncHttpAddEnclosure({ params });
  };
  query() {
    const { asyncHttpGetContract, queryContracElement, subjectId } = this.props;
    let queryElement = {
      ...queryContracElement,
      subjectId
    };
    asyncHttpGetContract({ params: filterNullElement(queryElement) });
  }

  enclosureAdministration = () => {
    const { openFormModal2 } = this.props;
    openFormModal2({ status: true, sign: 'contract', type: 'add' });
  };

  upDate = (e, row) => {
    e.stopPropagation();
    const { openFormModal2, changeDocumented } = this.props;
    changeDocumented({ value: row });
    openFormModal2({ status: true, sign: 'contract', type: 'update' });
  };
}

export default Contract;
