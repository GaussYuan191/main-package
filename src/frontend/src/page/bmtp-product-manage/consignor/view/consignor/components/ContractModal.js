import React, { PureComponent } from 'react';
import { Row, message, Modal } from 'antd';
import {
  UploadModal,
  withRoleBotton,
  withRoleTableBotton,
  NormalForm,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  ConfigableTable
} from 'yss-biz';

import 'yss-biz/common/style/customAntd.less';
const UpLoadFile = UploadModal;
class ContractModal extends PureComponent {
  state = {
    contractInfo: [], //管理人信息
    enclosureList: [], //上传文件成功需展示表格的数据
    files: [] //上传的数据
  };
  render() {
    const {
      enclosureColumn,
      consignored,
      isOpenFormModal2,
      enclosureList,
      asyncHttpUpdate
    } = this.props;
    const columns = [
      ...setColumns(enclosureColumn),
      {
        title: '操作',
        key: 'operation',
        width: 200,
        fixed: 'right',
        align: 'center',
        render: item => withRoleTableBotton(ButtonTableType)(item)
      }
    ];
    const ButtonTableType = [
      {
        name: '删除',
        roule: true,
        func: this.deleteBondItem
      }
    ];
    const ButtonType = [
      {
        name: '上传',
        roule: true,
        func: () => this.uploadFiles()
      }
    ];

    const ButtonTypeSee = [
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

    let formItems = [
      {
        name: 'contractCode',
        label: '合同编码',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '合同编码不能为空'
          }
        ],
        props: {
          placeholder: '请输入合同编码'
        }
      },

      {
        name: 'depositOrganName',
        label: '管理人',
        type: 'Select',
        props: {
          disabled: true,
          placeholder: consignored.fullNameCn
        }
      },
      {
        name: 'type',
        label: '文档类型',
        type: 'Input',
        props: {
          placeholder: '托管合同',
          disabled: true
        }
      },

      {
        label: '签署时间',
        name: 'signDate',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '签署时间不能为空'
          }
        ],
        props: {
          placeholder: '请选人行备案日期',
          format: 'YYYY-MM-DD'
        }
      },

      {
        label: '生效日期',
        name: 'effectiveDate',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '生效日期不能为空'
          }
        ],
        props: {
          placeholder: '请选生效日期',
          format: 'YYYY-MM-DD'
        }
      },

      {
        label: '失效时间',
        name: 'expiryDate',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '失效时间不能为空'
          }
        ],
        props: {
          placeholder: '请选失效时间',
          format: 'YYYY-MM-DD'
        }
      }
    ];
    let rowSelection = rowSelectionFunc.call(this);
    return (
      <>
        {isOpenFormModal2.type == 'add' ? (
          <Row className="hr">
            <NormalForm
              refs={ref => (this.createForm = ref)}
              labelSize="8em"
              lineOf={3}
              formItem={formItems}
            />
          </Row>
        ) : (
            ''
          )}
        {isOpenFormModal2.type == 'add' ? (
          <Row>{withRoleBotton(ButtonType)}</Row>
        ) : (
            <Row>{withRoleBotton(ButtonTypeSee)}</Row>
          )}
        <Row>
          <ConfigableTable
            {...setTableInfo({
              columns,
              dataSource: isOpenFormModal2.type == 'add' ? this.state.enclosureList : enclosureList,
              rowSelection,
              rowKey: 'id',
              pagination: pagination,
              scroll: { x: 800, y: 40 }
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

  deleteBondItem = (e, row) => {
    const { isOpenFormModal2 } = this.props;
    if (isOpenFormModal2.type == 'add') {
      let enclosureList = this.state.enclosureList.filter(item => item.id != row.id);
      let files = this.state.files.filter(item => item.id != row.id);
      this.setState({
        enclosureList: enclosureList,
        files: files
      });
    } else {
      const { asyncHttpDeleteEnclosure } = this.props;
      Modal.info({
        title: '是否删除文档',
        content: `${row.name}?`,
        onOk: () => {
          asyncHttpDeleteEnclosure({ params: row });
        }
      });
    }
  };

  /**打开上传组件*/
  uploadFiles = () => {
    UpLoadFile.show();
  };

  /**上传弹窗关闭的回调*/
  addUploadFiles = data => {
    //判断是否上传成功
    const { consignored } = this.props;
    if (!data[0].id) {
      message.error('上传失败!');
      return;
    }
    message.success('上传成功!');
    let fjList = this.state.enclosureList; //保存页面展示的数据
    let files = this.state.files; //
    //保存上传的文件
    files.push({
      id: (data.length && data[0].id[0]) || '',
      name: (data.length && data[0].fileName) || ''
    });
    fjList.push({
      name: data[0].fileName,
      sourceName: '上传',
      createUserId: consignored.fullNameCn,
      id: data[0].id[0]
    });
    this.setState({
      contractInfo: data,
      enclosureList: fjList,
      files: files
    });
  };

  async handleSubmit(e) {
    const {
      isOpenFormModal2,
      asyncHttpGetContract,
      asyncHttpAddBatchContract,
      queryContracElement,
      consignored,
      subjectId,
      openFormModal2
    } = this.props;
    //判断是否为新增
    if (isOpenFormModal2.type != 'add') {
      openFormModal2({ status: false, sign: '' });
      let params = {
        ...queryContracElement,
        subjectId
      };
      openFormModal2({ status: false, sign: '' });
      asyncHttpGetContract({ params });
      return;
    }

    e.preventDefault();
    this.createForm.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          ...values,
          signDate: values['signDate'].format('YYYY-MM-DD HH:mm:ss'),
          effectiveDate: values['effectiveDate'].format('YYYY-MM-DD HH:mm:ss'),
          expiryDate: values['expiryDate'].format('YYYY-MM-DD HH:mm:ss'),
          type: '7', //委托人管理  8产品管理
          source: '1', //文档来源(包括：生成、上传)
          subjectId: consignored.id, //所属主体ID
          subjectType: '2', //属主体类型（0-全部,1-产品,2-管理人）
          useStatus: 1, //定时任务_是否启用/有效（1-启用；2-停用）
          files: this.state.files.length ? this.state.files : ''
        };

        asyncHttpAddBatchContract({ params }).then(() => {
          openFormModal2({ status: false, sign: '' });
        });
      } else {
        message.error('请按要求填写');
      }
    });
  }
}

export default ContractModal;
