/**
 * 参数缓存 Controller
 * @author daizq
 */

import React from 'react';
import ParamCacheService from '../service/ParamCacheService';
import { message } from 'antd';

export default class ParamCacheController extends React.Component {
  constructor(props) {
    super(props);

    this.paramCacheService = new ParamCacheService();
  }

  state = {
    paramCachePageList: [],
    paramCacheTotal: 0
  };

  // 设置 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.getParamCachePageList();
    }, 0);
  }

  // 清除 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  // 刷新缓存
  handleRefreshCache = () => {
    const { selectedRowKeys } = this.$paramCacheTable.state;

    this.refreshCache(
      this.state.paramCachePageList
        .filter(v => {
          return selectedRowKeys.includes(v.key);
        })
        .map(v => {
          return v.cacheType;
        })
    );
  };

  // 查询参数缓存
  getParamCachePageList = (page, pageSize) => {
    const formData = this.$searchForm.props.form.getFieldsValue();

    this.paramCacheService
      .getParamCachePageList({
        ...formData,
        reqPageNum: page || this.$paramCacheTable.state.reqPageNum,
        reqPageSize: pageSize || this.$paramCacheTable.state.reqPageSize
      })
      .then(res => {
        if (res.code !== '200') {
          message.error(res.msg);
          return;
        }

        this.setState({
          paramCachePageList: res.data.list.map((item, index) => {
            return {
              ...item,
              key: index + 1 + ''
            };
          }),
          paramCacheTotal: res.data.total
        });
      });
  };

  // 刷新缓存
  refreshCache = cacheTypeList => {
    this.paramCacheService
      .refreshParamCache({
        cacheTypeList
      })
      .then(res => {
        if (res.code !== '200') {
          message.error(res.msg);
          return;
        }

        message.success('刷新缓存成功！');

        this.getParamCachePageList();
      });
  };
}
