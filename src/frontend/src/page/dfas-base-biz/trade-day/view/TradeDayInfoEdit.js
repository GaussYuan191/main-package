/**
 * 交易日设置界面
 */

import React from 'react';

import { Row, Col, Calendar, Radio, Button, message } from 'antd';
import { BizSelect, service } from 'bmtp-trade-base';
import TradeDayInfoController from '../controller/TradeDayInfoController';
import TradeDayService from '../service/TradeDayService';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

class TradeDayInfoEdit extends TradeDayInfoController {
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

  //处理日历选择
  onDateSelect = (date, month) => {
    const dateStr = moment(date).format('YYYYMMDD');
    let days = this.monthSelectedDaysTmp.get(month);
    if (days === undefined) {
      days = new Set([dateStr]);
      this.monthSelectedDaysTmp.set(month, days);
    } else {
      if (days.has(dateStr)) {
        days.delete(dateStr);
      } else {
        days.add(dateStr);
      }
    }
  };

  //提交交易日设置
  handleCommit = () => {
    let values = new Array(0);
    this.monthSelectedDaysTmp.forEach(item => {
      item.forEach(value => {
        values.push({
          tradeDayType: this.props.tradeDayType,
          dayType: this.param.dayType,
          year: this.param.year,
          tradeDayDate: value
        });
      });
    });
    this.tradeDayService.configTradeDay(values).then(res => {
      if (res.code !== '200') {
        message.error(res.msg);
        return;
      }

      message.success('提交成功');
      this.props.handleClose();
    });
  };

  //双休日设置处理
  onWeekendChange = e => {
    let firstDay = new Date();
    firstDay.setFullYear(this.param.year);
    firstDay.setMonth(0);
    firstDay.setDate(1);
    let endDay = new Date();
    endDay.setFullYear(firstDay.getFullYear());
    endDay.setMonth(11);
    endDay.setDate(31);

    for (let tmp = moment(firstDay); tmp <= endDay; tmp.add(1, 'day')) {
      if (tmp.day() === 6 || tmp.day() === 0) {
        const dateStr = tmp.format('YYYYMMDD');
        if (e.target.checked) {
          let days = this.monthSelectedDaysTmp.get(tmp.month() + 1);
          if (days === undefined) {
            this.monthSelectedDaysTmp.set(tmp.month() + 1, new Set([dateStr]));
          } else {
            days.add(dateStr);
          }
        } else {
          this.monthSelectedDaysTmp.get(tmp.month() + 1).delete(dateStr);
        }
      }
    }

    this.setState({
      monthSelectedDays: this.monthSelectedDaysTmp,
      weekendChecked: e.target.checked
    });
  };

  //法定节假日设置处理
  onLegalHolidayChange = e => {
    this.tradeDayService
      .getLegalHoliday({
        year: this.param.year
      })
      .then(res => {
        if (res.code !== '200') {
          message.error(res.msg);
          return;
        }

        res.data.forEach(item => {
          const month = parseInt(item.substr(4, 2));
          let days = this.monthSelectedDaysTmp.get(month);
          if (e.target.checked) {
            if (days === undefined) {
              this.monthSelectedDaysTmp.set(month, new Set([item]));
            } else {
              days.add(item);
            }
          } else {
            this.monthSelectedDaysTmp.get(month).delete(item);
          }
        });

        this.setState({
          monthSelectedDays: this.monthSelectedDaysTmp,
          legalHolidayChecked: e.target.checked
        });
      });
  };

  //日期类型切换处理：先设置复选框为未选中
  onEditDayTypeChange = e => {
    this.param.weekendChecked = false;
    this.param.legalHolidayChecked = false;
    this.onDayTypeChange(e);
  };

  radioOptions = [
    // { label: "置交易/交收日", value: "1" },
    // { label: "置非交易/交收日", value: "2" },
    // { label: '置仅交易日', value: '3', disabled: !(this.props.tradeDayTypeName === '沪港通交易日' || this.props.tradeDayTypeName === '深港通交易日') }
    { label: '置仅交易日', value: '3' }
  ];

  render() {
    //3行4列显示12个月的日历
    const cols = [1, 2, 3, 4];
    const rows = [0, 1, 2];

    return (
      <div>
        <div>
          <Row>
            <Col span={20}>
              <Radio.Group
                options={this.radioOptions}
                onChange={this.onEditDayTypeChange}
                defaultValue={this.param.dayType}
              />
              {/* <Checkbox
                                id="weekendCheckBox"
                                onChange={this.onWeekendChange}
                                checked={this.state.weekendChecked || false}
                            >
                                双休日批量设置
                            </Checkbox> */}
              {/* <Checkbox
                                id="legalHolidayCheckBox"
                                onChange={this.onLegalHolidayChange}
                                checked={this.state.legalHolidayChecked || false}
                            >
                                自动生成法定节假日
                            </Checkbox> */}
              年份：
              {/* <Select onChange={this.onYearChange} style={{ width: 200 }} defaultValue={this.param.year}>
                                <Select.Option value={this.param.year}>{this.param.year}</Select.Option>
                                <Select.Option value={new Date().getFullYear() + 1 + ""}>
                                    {new Date().getFullYear() + 1 + ""}
                                </Select.Option>
                            </Select> */}
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
            <Col span={2}>
              <Button type="Primary" onClick={this.props.handleClose}>
                取消
              </Button>
            </Col>
            <Col span={2}>
              <Button type="Primary" onClick={this.handleCommit}>
                提交
              </Button>
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
                          dateFullCellRender={date => this.dateFullCellRender(date, month, true)}
                          value={monthStartDay}
                          onSelect={date => this.onDateSelect(date, month)}
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
    this.timer = setTimeout(() => {
      this.getTradeDayList();
    }, 0);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
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

export default TradeDayInfoEdit;
