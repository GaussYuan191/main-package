/**
 * 参数操作日志表 控制层
 */

import React from 'react';
import ParamParameterLogService from '../service/ParamParameterLogService';
import { message } from 'antd';

export default class ParamParameterLogController extends React.Component {
  constructor(props) {
    super(props);
    this.paramParameterLogService = new ParamParameterLogService(this.props);
  }

  state = {
    total: 0,
    pageList: [],
    showModal: false
  };

  // 设置 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.getParamParameterLogPageList();
    }, 0);
  }

  // 清除 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  /**
   * 查询
   */
  getParamParameterLogPageList = (page, pageSize) => {
    this.paramParameterLogService
      .getParamParameterLogPageList({
        paramId: this.props.paramId,
        reqPageNum: page || this.$paramParameterLogTable.state.reqPageNum,
        reqPageSize: pageSize || this.$paramParameterLogTable.state.reqPageSize
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
}
