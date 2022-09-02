/**
 * 数据字典 Controller
 * @author daizq
 */

import React from 'react';
import DataDictionaryService from '../service/DataDictionaryService';
import { message } from 'antd';

export default class DataDictionaryController extends React.Component {
  constructor(props) {
    super(props);

    this.dataDictionaryService = new DataDictionaryService();
  }

  state = {
    dataDictionaryPageList: [],
    dataDictionaryTotal: 0,
    rowData: {},
    dictionaryDetailPageList: [],
    dictionaryDetailTotal: 0
  };

  // 设置 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.getDataDictionaryPageList();
    }, 0);
  }

  // 清除 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onClickRow = (event, record) => {
    this.setState({
      rowData: record
    });

    this.getDictionaryDetail(
      this.$dictionaryDetailTable.state.reqPageNum,
      this.$dictionaryDetailTable.state.reqPageSize,
      record
    );
  };
  // 查询数据字典
  getDataDictionaryPageList = (page, pageSize) => {
    const formData = this.$searchForm.props.form.getFieldsValue();

    this.dataDictionaryService
      .getDataDictionaryPageList({
        ...formData,
        reqPageNum: page || this.$dataDictionaryTable.state.reqPageNum,
        reqPageSize: pageSize || this.$dataDictionaryTable.state.reqPageSize
      })
      .then(res => {
        if (res.code !== '200') {
          message.error(res.msg);
          return;
        }

        const dataDictionaryPageList = res.data.list.map((item, index) => {
          return {
            ...item,
            key: index + 1 + ''
          };
        });
        const activeRowData = dataDictionaryPageList.find(item => {
          return item.key === this.$dataDictionaryTable.state.activeKeys;
        });
        this.setState({
          dataDictionaryTotal: res.data.total,
          dataDictionaryPageList,
          rowData: activeRowData || dataDictionaryPageList[0] || {}
        });

        if (!activeRowData) {
          this.setState({
            dictionaryDetailPageList: [],
            dictionaryDetailTotal: 0
          });
          return;
        }

        this.getDictionaryDetail(
          this.$dictionaryDetailTable.state.reqPageNum,
          this.$dictionaryDetailTable.state.reqPageSize,
          activeRowData || dataDictionaryPageList[0] || {}
        );
      });
  };

  // 查询数据字典子项
  getDictionaryDetail = (page, pageSize, record) => {
    this.dataDictionaryService
      .getDictionaryDetail({
        parentDicCode: record.dicCode,
        reqPageNum: page || this.$dictionaryDetailTable.state.reqPageNum,
        reqPageSize: pageSize || this.$dictionaryDetailTable.state.reqPageSize
      })
      .then(res => {
        if (res.code !== '200') {
          message.error(res.msg);
          return;
        }

        this.setState({
          dictionaryDetailPageList: res.data.list.map((item, index) => {
            return {
              ...item,
              key: index + 1 + ''
            };
          }),
          dictionaryDetailTotal: res.data.total
        });
      });
  };
}
