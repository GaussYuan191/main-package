/**
 * 交易日查看界面
 */

import React from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';

import { Row, Col, Calendar, Radio, message } from 'antd';
import { BizSelect, service } from 'bmtp-trade-base';
import TradeDayInfoController from '../controller/TradeDayInfoController';
import TradeDayService from '../service/TradeDayService';

moment.locale('zh-cn');

class TradeDayInfoView extends TradeDayInfoController {
  constructor(props) {
    super(props);
    this.tradeDayService = new TradeDayService(this.props);
  }

  radioOptions = [
    // { label: "交易/交收日", value: "1" },
    // { label: "非交易/交收日", value: "2" },
    { label: '仅交易日', value: '3' }
  ];
  state = {
    //每月的交易/非交易日历：key为月份，value为日期集合
    monthSelectedDays: new Map()
  };

  //不同种类的交易日，不同颜色区分：CornflowerBlue、红色、深黄色
  dayTypeStyle = new Map([
    ['1', '#6495ED'],
    ['2', '#FF0000'],
    ['3', 'calendarActive']
  ]);

  param = {
    dayType: '3',
    year: new Date().getFullYear() + '',
    weekendChecked: false,
    legalHolidayChecked: false
  };

  //保存当前设置的日历
  monthSelectedDaysTmp = new Map();

  render() {
    //3行4列显示12个月的日历
    const cols = [1, 2, 3, 4];
    const rows = [0, 1, 2];

    return (
      <div>
        <div>
          <Row>
            <Col span={18}>
              <Radio.Group
                options={this.radioOptions}
                onChange={this.onDayTypeChange}
                defaultValue={this.param.dayType}
                // defaultValue={"3"}
              />
            </Col>
            <Col span={6}>
              年份：
              <BizSelect
                style={{ width: 200 }}
                baseURL={service.dfasBaseBiz}
                dataSource="/tradeDay/year"
                valueKey="year"
                desKey="year"
                reqParams={this.props}
                onChange={this.onYearChange}
                showSearch={false}
                allowClear={false}
                defaultValue={this.param.year}
              />
            </Col>
          </Row>
        </div>
        <div className="tips">
          {rows.map((row, index) => {
            return (
              <Row key={index}>
                {cols.map((col, i) => {
                  const month = 4 * row + col;
                  const monthStartDay = moment(
                    this.param.year + (month >= 10 ? month : '0' + month) + '01',
                    'YYYYMMDD'
                  );

                  return (
                    <Col span={6} key={i}>
                      <div>
                        <Calendar
                          fullscreen={false}
                          headerRender={() => {
                            return this.param.year + '年' + month + '月';
                          }}
                          dateFullCellRender={date => this.dateFullCellRender(date, month, false)}
                          value={monthStartDay}
                          disabledDate={currentDate => {
                            return true;
                          }}
                        />
                      </div>
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getTradeDayList();
  }

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

export default TradeDayInfoView;
