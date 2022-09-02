/**
 * 参数表 Controller
 * @author jianshengxiong
 */

import React from 'react';
import ParamParameterService from '../service/ParamParameterService';
import { message } from 'antd';
import { bizUtils } from 'bmtp-trade-base';

export default class ParamParameterModalController extends React.Component {
  constructor(props) {
    super(props);
    this.paramParameterService = new ParamParameterService(this.props);
  }

  state = {
    isAdd: false,
    showModal: false,
    editData: {}
  };

  // 新增
  handleAdd = () => {
    this.setState({
      isAdd: true,
      showModal: true,
      editData: {}
    });
  };

  // 修改
  handleModify = record => {
    this.setState({
      isAdd: false,
      showModal: true,
      editData: record
    });
  };

  // 修改
  handleModifyById = id => {
    this.paramParameterService.getParamParameterInfo(id).then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }
      this.handleModify(res.data);
    });
  };

  // 对话框取消关闭
  handleCancel = () => {
    this.setState({
      showModal: false
    });
  };

  // 对话框确定提交
  handleOk = () => {
    this.$paramParameterEditForm.props.form.validateFields((err, values) => {
      if (err) {
        return false;
      }

      values = bizUtils.formatFormData(values);
      if (this.state.isAdd) {
        this.addBond(values);
      } else {
        values = {
          ...this.state.editData,
          ...values
        };
        this.updateBond(values);
      }
    });
  };

  getParamParameterPageList = () => {
    this.props.loadData();
  };

  addParamParameter = values => {
    this.paramParameterService.addParamParameter({ ...values }).then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }

      this.setState({
        showModal: false
      });

      this.getParamParameterPageList();
    });
  };

  updateBond = values => {
    this.paramParameterService.updateParamParameter({ ...values }).then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }

      this.setState({
        showModal: false
      });

      this.getParamParameterPageList();
    });
  };
}
