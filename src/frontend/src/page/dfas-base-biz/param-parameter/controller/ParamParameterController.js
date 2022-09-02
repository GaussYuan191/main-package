/**
 * 参数表 控制层
 */

import React from 'react';
import ParamParameterService from '../service/ParamParameterService';
import { message } from 'antd';

export default class ParamParameterController extends React.Component {
  constructor(props) {
    super(props);
    this.paramParameterService = new ParamParameterService(this.props);
  }

  state = {
    total: 0,
    pageList: [],
    editData: {},
    paramId: '',
    showLog: false
  };

  // 设置 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.getParamParameterPageList();
    }, 0);
  }

  // 清除 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  /**
   * 查询
   */
  getParamParameterPageList = (page, pageSize) => {
    let formData = this.$searchForm.props.form.getFieldsValue();
    this.paramParameterService
      .getParamParameterPageList({
        ...formData,
        reqPageNum: page || this.$paramParameterTable.state.reqPageNum,
        reqPageSize: pageSize || this.$paramParameterTable.state.reqPageSize
      })
      .then(res => {
        if (res.code !== '200') {
          message.error(res.msg);
          return;
        }

        const pageList = res.data.list.map((item, index) => {
          return {
            ...item,
            key: item.id
          };
        });
        this.setState({
          total: res.data.total,
          pageList: pageList
        });
      });
  };

  // 启用
  handleEnable = id => {
    this.paramParameterService.enable(id).then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }
      message.success('已启用！');
      this.getParamParameterPageList();
    });
  };

  // 停用
  handleUnEnable = id => {
    this.paramParameterService.unEnable(id).then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }
      message.success('已停用！');
      this.getParamParameterPageList();
    });
  };

  // 打开日志
  openLog = () => {
    this.setState({
      showLog: true
    });
  };

  // 关闭日志
  closeLog = () => {
    this.setState({
      showLog: false
    });
  };
}
