/**
 * 系统版本发布信息表 Controller
 * @author jianshengxiong
 */

import React from 'react';
import SysVersionPublishService from '../service/SysVersionPublishService';
import { message } from 'antd';
import moment from 'moment';

export default class SysVersionPublishController extends React.Component {
  constructor(props) {
    super(props);

    this.sysVersionPublishService = new SysVersionPublishService();
  }

  state = {
    versionPageList: [],
    versionTotal: 0,
    rowData: {}
  };

  // 设置 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.getVersionPageList();
    }, 0);
  }

  // 清除 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  // 查询系统版本发布信息
  getVersionPageList = (page, pageSize) => {
    let formData = this.$searchForm.props.form.getFieldsValue();
    const { publishDate = [], ...rest } = formData;
    formData = {
      ...rest,
      startDate: publishDate[0] ? moment(publishDate[0]).format('YYYY-MM-DD') : null,
      endDate: publishDate[1] ? moment(publishDate[1]).format('YYYY-MM-DD') : null
    };

    this.sysVersionPublishService
      .getVersionPageList({
        ...formData,
        reqPageNum: page || this.$versionTable.state.reqPageNum,
        reqPageSize: pageSize || this.$versionTable.state.reqPageSize
      })
      .then(res => {
        if (res.code !== '200') {
          message.error(res.msg);
          return;
        }

        const versionPageList = res.data.list.map((item, index) => {
          return {
            ...item,
            key: index + 1 + ''
          };
        });
        const activeRowData = versionPageList.find(item => {
          return item.key === this.$versionTable.state.activeKeys;
        });
        this.setState({
          versionTotal: res.data.total,
          versionPageList,
          rowData: activeRowData || versionPageList[0] || {}
        });
      });
  };
}
