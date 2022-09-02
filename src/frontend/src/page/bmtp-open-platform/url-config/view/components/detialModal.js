import React, { Component } from 'react';
import { Modal, Form } from 'antd';
import { NormalForm, selectPageRequest } from 'yss-biz';

class detialModal extends Component {
  state = { flag: '' };
  cancelModal = () => {
    this.props.cancelModal();
  };
  render() {
    // const { asyncHttpGetCode } = this.props;
    const formItem = [
      {
        name: 'managerCode',
        label: '管理人',
        type: 'Select',
        itemSize: '240px',
        labelSize: '4em',
        // rules: [
        //   {
        //     required: true,
        //     message: '管理人不能为空'
        //   }
        // ],
        props: {
          placeholder: '请选择管理人',
          type: 'consignor',
          configDics: selectPageRequest
        }
      },
      {
        name: 'content',
        label: '节点内容',
        type: 'Input',
        itemSize: '240px',
        labelSize: '4em',
        rules: [
          {
            required: true,
            message: '节点内容不能为空'
          }
        ],
        props: {
          placeholder: '请输入节点内容',
          getValueFromEvent(data) {
            //去除空格
            return data.target.value.trim();
          }
        }
      },
      {
        name: 'interfaceCode',
        label: '接口代码',
        type: 'Select',
        itemSize: '240px',
        labelSize: '4em',
        rules: [
          {
            required: true,
            message: '接口代码不能为空'
          }
        ],
        props: {
          placeholder: '请选择接口代码',
          getDics: '1030203'
        }
      },
      {
        name: 'targetSystem',
        label: '目标系统',
        type: 'Select',
        itemSize: '240px',
        labelSize: '4em',
        props: {
          placeholder: '请输入目标系统',
          getDics: '1050007'
        }
      },
      {
        name: 'primaryNode',
        label: '交互方式',
        type: 'Select',
        itemSize: '240px',
        labelSize: '4em',
        rules: [
          {
            required: true,
            message: '交互方式不能为空'
          }
        ],
        props: {
          placeholder: '请选择交互方式',
          getDics: '1050001'
          // onChange: value => {
          //   this.setState({ flag: value });
          //   this.myForm.props.form.setFieldsValue({ secondaryNode: null });
          // }
        }
      },
      {
        name: 'secondaryNode',
        label: '节点代码',
        type: 'Input',
        itemSize: '240px',
        labelSize: '4em',
        rules: [
          {
            required: true,
            message: '节点代码不能为空'
          }
        ],
        props: {
          placeholder: '请输入节点代码'
          // onChange: value => {
          //   let title;
          //   for (let n of this.props.apiName[this.state.flag]) {
          //     if (n.label == value) {
          //       title = n.title;
          //     }
          //   }
          //   this.myForm.props.form.setFieldsValue({ remark: title });
          // }
        }
        // options: this.props.apiName[this.state.flag]
      },
      {
        name: 'remark',
        label: '描述',
        type: 'TextArea',
        itemSize: '240px',
        labelSize: '4em',
        rules: [
          {
            required: true,
            message: '描述不能为空'
          }
        ],
        props: {
          placeholder: '请输入描述',
          autoSize: { minRows: 2, maxRows: 6 }
        }
      }
    ];

    return (
      <>
        <Modal
          visible={this.props.visible}
          width={600}
          title={(this.props.modalType == 'edit' ? '修改' : '新增') + '-外部接口URL地址'}
          destroyOnClose={true}
          onCancel={this.cancelModal}
          onOk={this.onSubmit}
        >
          <div style={{ marginLeft: '100px' }}>
            <NormalForm formItem={formItem} lineOf={1} refs={ref => (this.myForm = ref)} />
          </div>
        </Modal>
      </>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { ids } = this.props;
    const { visible, modalType } = nextProps;
    if ((visible && modalType == 'edit') || modalType == 'copy') {
      setTimeout(() => {
        this.myForm.props.form.setFieldsValue({
          ...ids[0]
        });
        // this.setState({ flag: ids[0].primaryNode });
      }, 50);
    }
  }

  onSubmit = () => {
    const { asyncHttpAdd, asyncHttpUpdate } = this.props;
    let form = this.myForm.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let params = {};
      if (this.props.modalType == 'edit') {
        //修改
        params = {
          id: this.props.ids[0].id,
          ...values
        };
        asyncHttpUpdate({ params, cb: this.cancelModal });
      } else {
        //新增||复制
        params = {
          ...values
        };
        asyncHttpAdd({ params, cb: this.cancelModal });
      }
    });
  };
}
const ModalForm = Form.create({})(detialModal);
export default ModalForm;
