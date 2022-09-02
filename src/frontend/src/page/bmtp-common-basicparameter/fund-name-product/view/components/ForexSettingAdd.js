import React, { Component } from 'react';
import { NormalForm, selectPageRequest } from 'yss-biz';
import { Modal } from 'antd';

class ForexSettingAdd extends Component {
  state = {
    fetching: false
  };

  render() {
    const { openModalType } = this.props;
    const formItems = [
      {
        name: 'productId',
        label: '产品名称',
        type: 'Select',
        props: {
          configDics: selectPageRequest,
          type: 'product',
          dropdownWidth: 300,
          placeholder: '请选择所属产品名称'
        },
        rules: [{ required: true, message: '产品名称不能为空' }]
      },
      {
        name: 'fundShortName',
        label: '基金简称',
        type: 'Input',
        props: {
          disabled: openModalType == 'relation' ? true : false
        },
        rules: [{ required: true, message: '基金简称不能为空', whitespace: true }]
      }
    ];
    // 设置标题
    let title = (openModalType == 'edit' ? '修改' : '新增') + '外汇系统基金设置';
    title = openModalType == 'relation' ? '关联产品映射关系' : title;
    return (
      <>
        <Modal
          title={title}
          visible={this.props.visibleFormAdd}
          width={1200}
          destroyOnClose={true}
          onOk={this.onSubmit}
          maskClosable={false}
          onCancel={this.props.closeFormAdd}
          bodyStyle={{ maxHeight: this.props.modalHeight, overflow: 'auto' }}
        >
          <NormalForm
            labelSize="10em"
            lineOf={3}
            formItem={formItems}
            refs={ref => (this.clientForm = ref)}
          />
        </Modal>
      </>
    );
  }

  async componentDidMount() {
    const { openModalType, dataList, ids } = this.props;
    // 编辑时回显数据
    if (openModalType == 'edit') {
      // 设置表单的值
      setTimeout(() => {
        const form = this.clientForm.props.form;
        form.setFieldsValue({
          ...ids[0]
        });
      }, 10);
    }
    // 关联信息时回显
    if (openModalType == 'relation') {
      // 设置表单的值
      setTimeout(() => {
        const form = this.clientForm.props.form;
        form.setFieldsValue({
          ...dataList[0]
        });
      }, 10);
    }
  }

  // 表单提交
  onSubmit = () => {
    const { asyncHttpPostAdd, asyncHttpPostEdit, dataList, ids, openModalType } = this.props;
    // 校验表单 避免没有选择拆分规则
    const form = this.clientForm.props.form;
    form.validateFields(async (err, val) => {
      if (err) {
        return;
      }
      // 获取产品id dataList为点击关联信息的一行数据 ids为选中的一行数据
      const originData = dataList.length > 0 ? dataList[0] : ids[0];
      // 修改类型 1-修改产品，2-修改基金简称，3-产品和基金同时修改
      let updateType = 0;
      // 按照格式构造提交数据
      const params = {
        fundShortName: val.fundShortName,
        productId: val.productId ? val.productId : originData.productId,
        checkStatus: 2
      };
      if (openModalType == 'edit' || openModalType == 'relation') {
        params['id'] = originData.id;
      }
      if (openModalType == 'add') {
        await asyncHttpPostAdd(params);
      } else {
        if (
          val.productId == originData.productId &&
          val.fundShortName == originData.fundShortName
        ) {
          this.props.closeFormAdd();
          return;
        } else if (
          val.productId != originData.productId &&
          val.fundShortName != originData.fundShortName
        ) {
          updateType = 3;
        } else if (val.productId != originData.productId) {
          updateType = 1;
        } else if (val.fundShortName != originData.fundShortName) {
          updateType = 2;
        }
        params.updateType = updateType;
        await asyncHttpPostEdit(params);
      }
      this.props.closeFormAdd();
      this.props.query();
    });
  };
  // 设置加载状态
  setLoading = value => {
    this.setState({ fetching: value });
  };
}

export default ForexSettingAdd;
