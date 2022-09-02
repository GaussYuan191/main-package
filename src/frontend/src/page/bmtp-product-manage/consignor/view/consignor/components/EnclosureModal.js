import React, { PureComponent } from 'react';
import { Row, Modal, Input, Icon, message } from 'antd';
import {
  UploadModal,
  SelectMapDics,
  withRoleBotton,
  withRoleTableBotton,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  page,
  ConfigableTable
} from 'yss-biz';
import 'yss-biz/common/style/customAntd.less';
const UpLoadFile = UploadModal;
class EnclosureModal extends PureComponent {
  state = {
    type: '',
    ids: []
  };

  render() {
    const {
      enclosureColumn,
      enclosureList,
      consignored,
      isOpenFormModal2,
      asyncHttpUpdate
    } = this.props;
    const columns = [
      ...setColumns(enclosureColumn),
      {
        title: '操作',
        key: 'operation',
        width: 240,
        fixed: 'right',
        align: 'center',
        render: item => withRoleTableBotton(ButtonTableType)(item)
      }
    ];
    let isAdd = isOpenFormModal2.type == 'add';
    const ButtonTableType = [
      {
        name: '下载',
        roule: true
        // func: this.updateBondItem
      },

      {
        name: '删除',
        roule: true,
        func: this.deleteItem
      }
    ];
    const ButtonType = [
      {
        icon: 'redo',
        name: '应用',
        roule: true,
        func: () => {
          asyncHttpUpdate({ params: this.state.ids });
        }
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
      <>
        {isAdd ? (
          <Row>
            <Row className="hr">
              <Row className="marginBotton">
                <label className="label">管理人</label>
                <Input disabled value={consignored.fullNameCn} style={{ width: '206px' }} />
              </Row>
            </Row>
            <Row className="marginBotton">
              <h3 className="title">附件信息</h3>
              <label className="label">文档类型</label>
              <SelectMapDics
                allowClear
                code="1030010"
                style={{ width: '200px' }}
                allowClear
                onChange={value => {
                  this.query(value);
                }}
              />
              {this.state.type ? (
                <span className="upload" onClick={() => this.uploadFiles()} type="link">
                  上传<Icon type="arrow-up"></Icon>
                </span>
              ) : (
                ''
              )}
            </Row>
          </Row>
        ) : (
          ''
        )}
        {!isAdd ? withRoleBotton(ButtonType) : ''}
        <Row>
          <ConfigableTable
            {...setTableInfo({
              columns,
              dataSource: enclosureList,
              rowSelection,
              rowKey: 'id',
              pagination: pagination
            })}
          />
        </Row>
        {/**查看状态下的上传按钮**/}

        {/**上传组件** */}
        <UpLoadFile
          uploadList={this.addUploadFiles}
          action="/dfas-common-file/files/uploadBatchFile"
        />
      </>
    );
  }
  async componentDidMount() {
    this.props.onRef(this);
    const { isOpenFormModal2, asyncHttpGetEnclosure, documented } = this.props;
    //判断是否查看详情
    if (isOpenFormModal2.type != 'add') {
      //根据文档id查询附件
      let params = {
        documentId: documented.id,
        ...page
      };
      asyncHttpGetEnclosure({ params });
    }
  }
  /***删除附件 */
  deleteItem = (e, row) => {
    const { asyncHttpDeleteEnclosure } = this.props;
    Modal.confirm({
      title: '是否删除文档',
      content: `${row.name}?`,
      onOk: () => {
        asyncHttpDeleteEnclosure({ params: row });
      }
    });
  };

  /***根据文档类型查询附件 */
  query = value => {
    const { asyncHttpGetEnclosure, consignored } = this.props;
    /***根据文件类型差附件 */
    let params = {
      subjectId: consignored.id,
      ...page,
      type: value
    };
    this.setState({
      type: value
    });
    asyncHttpGetEnclosure({ params });
  };

  /**打开上传组件*/
  uploadFiles = () => {
    UpLoadFile.show();
  };

  /**上传弹窗关闭的回调*/
  addUploadFiles = data => {
    //判断是否上传成功
    if (!data[0].id) {
      message.error('上传失败!');
      return;
    }
    const { asyncHttpUploadDocumentAdd, consignored } = this.props;
    message.success('上传成功!');
    let params = {
      file: {
        id: data[0].id[0],
        name: data[0].fileName
      },
      source: '1',
      subjectId: consignored.id,
      subjectType: '2',
      type: this.state.type,
      useStatus: 1
    };
    asyncHttpUploadDocumentAdd({ params });
  };

  handleSubmit = e => {
    const {
      openFormModal2,
      resetEnclosure,
      asyncHttpDocument,
      queryDocumentElement,
      subjectId
    } = this.props;
    let params = {
      ...queryDocumentElement,
      subjectId
    };
    resetEnclosure();
    openFormModal2({ status: false, sign: '' });
    asyncHttpDocument({ params });
  };
}

export default EnclosureModal;
