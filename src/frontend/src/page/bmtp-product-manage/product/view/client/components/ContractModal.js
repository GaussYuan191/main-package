import React, { PureComponent } from 'react';
import { Form, Row, Col, Select, Input, message } from 'antd';
import {
  ConfigableTable,
  UploadModal,
  withRoleBotton,
  withRoleTableBotton,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
} from 'yss-biz';
import 'yss-biz/common/style/customAntd.less';
const UpLoadFile = UploadModal;
const { Option } = Select;
class ContractModal extends PureComponent {
  state = {
    contractInfo: []
  };
  render() {
    const { enclosureColumn, enclosureList, productInfo } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formLayout_fir = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      }
    };
    const columns = [
      ...setColumns(enclosureColumn),
      {
        title: '操作',
        key: 'operation',
        width: 300,
        fixed: 'right',
        align: 'center',
        render: item => withRoleTableBotton(ButtonTableType)(item)
      }
    ];

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
        name: '上传',
        roule: true,
        func: () => this.uploadFiles()
      }
      // {
      //   icon: "redo",
      //   name: '应用',
      //   roule: true
      //   // func: () => { openCapitalModal({ type: "add", status: true }) }
      // },
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
        <Row className="hr">
          <Form {...formLayout_fir}>
            <Row>
              <Col span={8}>
                <Form.Item label="附件编码">
                  {getFieldDecorator('contractCode', {
                    rules: [
                      {
                        required: true,
                        message: '合同编码不能为空'
                      }
                    ]
                  })(<Input placeholder="请输入合同编码" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="所属产品">
                  <Input placeholder={productInfo.productName} disabled />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="文档类型">
                  <Input placeholder="托管合同" disabled />
                  {/* {getFieldDecorator('type', {
                    rules: [{
                      required: true,
                      message: '文档类型不能为空'
                    }]
                  })(
                    <SelectMapDics allowClear code='1030010' placeholder="请输入文档类型" />

                  )} */}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Row>
        <Row>{withRoleBotton(ButtonType)}</Row>
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
  }
  query = value => {};
  /**打开上传组件*/
  uploadFiles = () => {
    UpLoadFile.show();
  };

  /**上传弹窗关闭的回调*/
  addUploadFiles = data => {
    if (!data[0].id) {
      message.error('上传失败!');
      return;
    }
    message.success('上传成功!');
    this.setState({
      contractInfo: data
    });
  };

  async handleSubmit(e) {
    const { asyncHttpAddContract, productInfo } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          ...values,
          type: '8',
          fileId:
            this.state.contractInfo.length && this.state.contractInfo[0].id
              ? this.state.contractInfo[0].id[0]
              : '', //文档ID
          name: this.state.contractInfo.length ? this.state.contractInfo[0].fileName : '', //文档名称
          source: '1', //文档来源(包括：生成、上传)
          subjectId: productInfo.id, //所属主体ID
          subjectType: '1', //属主体类型（0-全部,1-产品,2-管理人）
          useStatus: 1 //定时任务_是否启用/有效（1-启用；2-停用）
        };
        asyncHttpAddContract({ params });
      } else {
        message.error('请按要求填写');
      }
    });
  }
}
const WrappedFormRule = Form.create()(ContractModal);
export default WrappedFormRule;
