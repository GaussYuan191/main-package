import React, { Component } from 'react';
import { NormalForm } from 'yss-biz';
import { message, Modal, Row, Col, Checkbox } from 'antd';
import FlowConfigTable from './FlowConfigTable';

/**邮箱校验正则 */
const emailRegx =
  /^(([-_.]|[a-zA-Z0-9])+\@([-_.]|[a-zA-Z0-9])+\.[a-z]{2,}\,\s?)*(([-_.]|[a-zA-Z0-9])+\@([-_.]|[a-zA-Z0-9])+\.[a-z]{2,}\,?)$/;
class FlowRemindFormAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableValue: {}, // 表格数据, 格式 { [id]:string[] }
      sequence: '' // 序列号(任务编号)
    };
    this.props.onRef && this.props.onRef(this);
  }

  async componentDidMount() {
    const {
      isOpenModal,
      rowData,
      // asyncHttpGetDetailById,
      asyncHttpGetFlowConfigData,
      asyncHttpGetTaskFlowNodeList,
      asyncHttpGetSequence
    } = this.props;
    await asyncHttpGetFlowConfigData();
    if (isOpenModal.type === 'add') {
      await asyncHttpGetSequence(); // 新增时, 生成任务编号
      this.setState({ sequence: this.props.sequence });
      this.clientForm.setValues({ code: this.state.sequence });
    } else {
      // await asyncHttpGetDetailById(rowData.id);
      this.clientForm.setValues({
        ...rowData,
        triggerTime:
          isOpenModal.type === 'view' ? rowData.triggerTime : (rowData.triggerTime || '').split(';')
      });
      this.setState({ sequence: rowData.code });
      await asyncHttpGetTaskFlowNodeList(rowData.code);
      this.dealFlowNodeData();
    }
  }

  render() {
    const { isOpenModal } = this.props;
    const isDisable = isOpenModal.type == 'add' || isOpenModal.type == 'edit' ? false : true;
    const formItems = [
      {
        name: 'code',
        label: '任务编号',
        type: 'Input',
        props: {
          placeholder: '系统自动生成',
          disabled: true
        }
      },
      {
        name: 'name',
        label: '任务名称',
        type: 'Input',
        props: {
          placeholder: '请输入任务名称',
          disabled: isDisable
        },
        rules: [
          {
            required: true,
            message: '任务名称不能为空'
          },
          {
            max: 30,
            message: '最大字数不超过30个'
          }
        ]
      },
      {
        name: 'email',
        label: '接收邮箱',
        type: 'TextArea',
        props: {
          placeholder: '请输入接收邮箱地址\n(多个邮箱请使用","隔开)',
          disabled: isDisable,
          allowClear: true,
          autoSize: { minRows: 3, maxRows: 5 }
        },
        rules: [
          {
            required: true,
            message: '接收邮箱不能为空'
          },
          {
            pattern: emailRegx,
            message: '请重新检查邮箱输入格式'
          }
        ]
      },
      {
        name: 'triggerTime',
        label: '执行时点',
        type: 'Select',
        props: {
          getDics: '1050008',
          placeholder: '请选择执行时点',
          mode: isDisable ? null : 'multiple',
          maxTagCount: 1,
          disabled: isDisable
        },
        rules: [
          {
            required: true,
            message: '执行时点不能为空'
          }
        ]
      },
      {
        name: 'remark',
        label: '备注',
        type: 'TextArea',
        props: {
          placeholder: '请输入备注',
          disabled: isDisable,
          autoSize: { minRows: 4, maxRows: 6 }
        },
        rules: [
          {
            max: 300,
            message: '最大字数不超过300个'
          }
        ]
      }
    ];

    // 流程节点勾选表格配置
    const tableConfig = {
      parentKeyField: 'tradeType', // 表格根据tradeType分组, 流程节点所属交易类型
      parentField: 'tradeTypeName',
      parentTitle: '交易类型',
      childrenField: 'flowConfigList',
      childrenTitle: '流程节点'
    };
    const childrenConfig = {
      labelField: 'flowName', // 流程节点名
      valueField: 'flowCode' // 流程节点代码
    };
    return (
      <Row align="top">
        <Col span={7}>
          <NormalForm
            lineOf={1}
            labelSize="7em"
            formItem={formItems}
            refs={ref => (this.clientForm = ref)}
          />
        </Col>
        <Col span={17}>
          <div>
            <span className={'ant-form-item-required'} style={{ marginRight: '20px' }}>
              监控节点
            </span>
            <Checkbox disabled={isDisable} onChange={this.onSelectAll}>
              全选
            </Checkbox>
          </div>
          <FlowConfigTable
            dataSource={this.props.flowConfigAllData}
            tableConfig={tableConfig}
            childrenConfig={childrenConfig}
            refs={ref => (this.tableRef = ref)}
            value={this.state.tableValue}
            disabled={isDisable}
            onChange={value => {
              this.setState({ tableValue: value });
            }}
          />
        </Col>
      </Row>
    );
  }

  // 表单提交
  handleSubmit = () => {
    const { isOpenModal, rowData, asyncHttpCreateTask, asyncHttpUpdateTask } = this.props;
    const submitMethod = {
      add: asyncHttpCreateTask,
      edit: asyncHttpUpdateTask
    };
    if (isOpenModal.type !== 'add' && isOpenModal.type !== 'edit') {
      return;
    }
    this.clientForm.props.form.validateFields(async (errors, values) => {
      if (!errors) {
        values.jobNodeList = this.getTableData();
        if (values.jobNodeList.length < 1) {
          message.error('需至少选择一个监控流程节点!');
          return;
        }
        if (isOpenModal.type === 'edit') {
          values.id = rowData.id;
          values.status = rowData.status;
        } else {
          values.status = '1'; // 新增默认启用
        }
        values.triggerTime = values.triggerTime.join(';');
        await submitMethod[isOpenModal.type]({ values, callback: this.props.closeModal });
      }
    });
  };

  // 处理表格数据(对象->一维数组)
  getTableData = () => {
    const { tableValue, sequence } = this.state;
    let nodeList = [];
    Object.entries(tableValue).forEach(([key, value]) => {
      (value || []).forEach(flowCode => {
        nodeList.push({ code: sequence, flowCode, tradeType: key });
      });
    });
    return nodeList;
  };

  // 流程节点数据转表格数据(一维数组->对象)
  dealFlowNodeData = () => {
    const { flowNodeDetail } = this.props;
    let tableValue = {};
    (flowNodeDetail || []).forEach(item => {
      if (!tableValue[item.tradeType]) {
        tableValue[item.tradeType] = [];
      }
      tableValue[item.tradeType].push(item.flowCode);
    });
    this.setState({ tableValue });
  };

  // 表格全选操作
  onSelectAll = e => {
    this.tableRef.switchAllCheck(e.target.checked);
  };
}

export default FlowRemindFormAdd;
