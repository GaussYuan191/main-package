/**
 * 交易日 Controller
 */

import { message } from 'antd';
import moment from 'moment';
import React from 'react';
import TradeDayService from '../service/TradeDayService';
import '../styles/trade-day.css';

export default class TradeDayInfoController extends React.Component {
  constructor(props) {
    super(props);
    this.tradeDayService = new TradeDayService(this.props);
  }

  //不同种类的交易日，不同颜色区分：CornflowerBlue、红色、深黄色
  dayTypeStyle = new Map([
    ['1', '#6495ED'],
    ['2', '#FF0000'],
    ['3', 'calendarActive']
  ]);

  state = {
    //每月的交易/非交易日历：key为月份，value为日期集合
    monthSelectedDays: new Map()
  };

  param = {
    dayType: '3',
    year: new Date().getFullYear() + '',
    weekendChecked: false,
    legalHolidayChecked: false
  };

  //保存当前设置的日历
  monthSelectedDaysTmp = new Map();

  //日期类型切换处理
  onDayTypeChange = e => {
    this.param.dayType = e.target.value;
    this.getTradeDayList();
  };

  //年份切换处理
  onYearChange = value => {
    this.param.year = value;
    this.getTradeDayList(value);
  };

  // componentDidMount() {
  //     this.timer = setTimeout(() => {
  //         this.getTradeDayList();
  //     }, 0);
  // }

  // 清除 timer：防止组件已经卸载，异步操作中或设置状态方法还在执行
  // componentWillUnmount() {
  //     clearTimeout(this.timer);
  // }

  //交易日数据列表
  getTradeDayList = (year, dayType) => {
    this.tradeDayService
      .getTradeDayList({
        tradeDayType: this.props.tradeDayType,
        year: year || this.param.year,
        dayType: dayType || this.param.dayType
      })
      .then(res => {
        if (res.code !== '200') {
          message.error(res.msg);
          return;
        }

        this.convertTradeDayList(res.data);
      });
  };

  //将交易日列表数据进行归类整理
  convertTradeDayList = tradeDayList => {
    const monthSelectedDays = new Map();

    tradeDayList.forEach(item => {
      const dayMonth = parseInt(item.tradeDayDate.substr(4, 2));
      let days = monthSelectedDays.get(dayMonth);

      if (days === undefined) {
        monthSelectedDays.set(dayMonth, new Set([item.tradeDayDate]));
      } else {
        days.add(item.tradeDayDate);
      }
    });

    this.setState({
      ...this.param,
      monthSelectedDays
    });
    this.monthSelectedDaysTmp = monthSelectedDays;
  };

  //自定义渲染日历单元格
  dateFullCellRender = (date, month, isEdit) => {
    const dateStr = moment(date).format('YYYYMMDD');
    if (parseInt(dateStr.substr(4, 2)) !== month) {
      return <div></div>;
    }

    const days = this.state.monthSelectedDays.get(month);
    if (days !== undefined && days.has(dateStr)) {
      if (isEdit) {
        return (
          <div
            class={`calendar-date ${this.dayTypeStyle.get(this.param.dayType)}`}
            onClick={e => this.dateCellClick(e)}
          >
            {date.date()}
          </div>
        );
      } else {
        return (
          <div class={`calendar-date ${this.dayTypeStyle.get(this.param.dayType)}`}>
            {date.date()}
          </div>
        );
      }
    } else {
      if (isEdit) {
        return (
          <div class="calendar-date" onClick={e => this.dateCellClick(e)}>
            {date.date()}
          </div>
        );
      } else {
        return <div class="calendar-date">{date.date()}</div>;
      }
    }
  };

  //日历单元格单击处理
  dateCellClick = e => {
    console.log('aaaaa');
    if (e.target.style.backgroundColor === '') {
      e.target.style.backgroundColor = this.dayTypeStyle.get(this.param.dayType);
    } else {
      e.target.style.backgroundColor = '';
    }
  };
}
