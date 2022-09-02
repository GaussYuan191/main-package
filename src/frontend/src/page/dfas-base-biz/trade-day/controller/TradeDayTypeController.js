/**
 * 交易日类型 Controller
 */

import React from 'react';
import TradeDayService from '../service/TradeDayService';
import { message } from 'antd';

export default class TradeDayTypeController extends React.Component {
  constructor(props) {
    super(props);
    this.tradeDayService = new TradeDayService(this.props);
  }

  state = {
    tradeDayTypeList: []
  };

  // componentDidMount() {
  //     this.timer = setTimeout(() => {
  //         this.getList();
  //     }, 0);
  // }

  // 清除 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  // componentWillUnmount() {
  //     clearTimeout(this.timer);
  // }

  // 查询交易日类型数据
  getList = () => {
    console.log('父类', this);
    // if (this.props.category === undefined) {
    //     return;
    // }
    this.tradeDayService
      .getTradeDayTypeList({
        category: '1' //this.props.category,
      })
      .then(res => {
        if (res.code !== '200') {
          message.error(res.msg);
          return;
        }
        const resultData = res.data.map(item => {
          return {
            ...item,
            //保存记录id
            key: item.id + '',
            categoryName: item.category === '1' ? '债券' : '股票',
            validFlag: item.validFlag ? '是' : '否'
          };
        });
        this.setState({
          tradeDayTypeList: resultData
        });
      });
  };

  // 查看
  handleView = record => {
    this.setState({
      isEdit: false,
      showModal: true,
      tradeDayType: record.tradeDayType,
      tradeDayTypeName: record.tradeDayName
    });
  };

  // 编辑
  handleModify = record => {
    this.setState({
      isEdit: true,
      showModal: true,
      tradeDayType: record.tradeDayType,
      tradeDayTypeName: record.tradeDayName
    });
  };

  // 对话框取消关闭
  handleCancel = () => {
    this.setState({
      showModal: false
    });
  };
}
