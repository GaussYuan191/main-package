import React, { Component } from 'react';
import { NormalForm } from 'yss-biz';
import moment from 'moment';
import { message } from 'antd';

/**按时间条件账单合成 */
class ExpenseEntryMerge extends Component {
  state = {
    timeType: 'day',
    startDate: '',
    endDate: '',
    startQuarter: null,
    isStartOpen: false
  };
  render() {
    const { timeType } = this.state;
    let formItems = [
      {
        name: 'mergeType',
        label: '合成方式',
        type: 'Select',
        props: {
          placeholder: '请选择合成方式',
          initialValue: 'day',
          onChange: vaule => {
            if (!vaule) {
              this.setState({ timeType: 'day' });
            } else {
              this.setState({ timeType: vaule });
            }
          }
        },
        options: [
          { label: '按日期合成', value: 'day' },
          { label: '按月份合成', value: 'month' },
          { label: '按季度合成', value: 'quarter' }
        ],
        rules: [{ required: true, message: '合成方式不能为空' }]
      },
      timeType == 'day'
        ? {
            name: 'startDay',
            label: '开始日期',
            type: 'DatePicker',
            props: {
              placeholder: '请选择开始日期',
              allowClear: true,
              onChange: (vaule, dateString) => {
                this.setState({ startDate: dateString });
              }
            },
            rules: [{ required: true, message: '开始日期不能为空' }]
          }
        : undefined,
      timeType == 'day'
        ? {
            name: 'endDay',
            label: '结束日期',
            type: 'DatePicker',
            props: {
              placeholder: '请选择结束日期',
              allowClear: true,
              onChange: (vaule, dateString) => {
                this.setState({ endDate: dateString });
              }
            },
            rules: [{ required: true, message: '结束日期不能为空' }]
          }
        : undefined,
      timeType == 'month'
        ? {
            name: 'startMonth',
            label: '开始月份',
            type: 'MonthPicker',
            props: {
              placeholder: '请选择开始月份',
              allowClear: true,
              onChange: (vaule, dateString) => {
                let monthStartDay = moment(dateString).startOf('month').format('YYYY-MM-DD');
                this.setState({ startDate: monthStartDay });
              }
            },
            rules: [{ required: true, message: '开始月份不能为空' }]
          }
        : undefined,
      timeType == 'month'
        ? {
            name: 'endMonth',
            label: '结束月份',
            type: 'MonthPicker',
            show: timeType === 'month',
            props: {
              placeholder: '请选择结束月份',
              allowClear: true,
              onChange: (vaule, dateString) => {
                let monthEndDay = moment(dateString).endOf('month').format('YYYY-MM-DD');
                this.setState({ endDate: monthEndDay });
              }
            },
            rules: [{ required: true, message: '结束月份不能为空' }]
          }
        : undefined,
      timeType == 'quarter'
        ? {
            name: 'startDate',
            label: '季度',
            type: 'QuarterPicker',
            props: {
              placeholder: '请选择季度',
              allowClear: true,
              onChange: dateString => {
                // 获取选择的季度
                let quarter = dateString.replace('Q', '').split('-')[1];
                // 计算选择季度的第一天
                let quarterStartDay = moment(dateString.split('-')[0])
                  .add(quarter - 1, 'quarter')
                  .startOf('quarter')
                  .format('YYYY-MM-DD');
                // 计算选择季度的最后一天
                let quarterEndDay = moment(dateString.split('-')[0])
                  .add(quarter - 1, 'quarter')
                  .endOf('quarter')
                  .format('YYYY-MM-DD');
                this.setState({ startDate: quarterStartDay, endDate: quarterEndDay });
              }
            },
            rules: [{ required: true, message: '季度不能为空' }]
          }
        : undefined
    ].filter(Boolean); // 过滤出不显示的表单项

    return (
      <>
        <NormalForm
          labelSize="10em"
          lineOf={3}
          formItem={formItems}
          refs={ref => (this.clientForm = ref)}
        />
      </>
    );
  }
  componentDidMount() {
    // 绑定实例
    this.props.onRef(this);
  }
  /**表单提交 */
  handleSubmit = async () => {
    const { asyncHttpMergeList, query, openFormModal } = this.props;
    const { startDate, endDate } = this.state;
    // 校验表单
    const form = this.clientForm.props.form;
    form.validateFields(async (err, val) => {
      if (err) {
        return;
      }
      // 判断时间是否 符合要求 开始时间不能大于结束时间
      if (moment(startDate) > moment(endDate)) {
        message.error('开始时间不能大于结束时间！');
        // 重置选择项
        this.setState({ timeType: 'day' });
        this.clientForm.onReset();
        return;
      }

      let params = { startDate, endDate };
      await asyncHttpMergeList(params).then(() => {
        // 关闭modal
        openFormModal({ status: false });
        // 合并成功重新获取页面数据
        query();
      });
    });
  };
}

export default ExpenseEntryMerge;
