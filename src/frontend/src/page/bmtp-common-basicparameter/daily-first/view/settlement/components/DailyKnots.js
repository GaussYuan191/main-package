import React, { PureComponent, Fragment } from 'react';
import {
  withRoleBotton,
  // SearchForm,
  rowSelectionFunc,
  setTableInfo,
  ConfigableTable
  // filterNullElement
  // Modal
} from 'yss-biz';
import JournalModal from './JournalModal';
import BondSubsidiaryModal from './BondSubsidiaryModal';
import { message, Modal, DatePicker, Form } from 'antd';
import '../style/style.less';
import moment from 'moment';
// import async from '../../../control/async';

class Instruction extends PureComponent {
  state = {
    ids: []
  };

  render() {
    const {
      dataList,
      // changeQueryElement,
      isOpenFormModal,
      openFormModal,
      openBondFormModal,
      isOpenBondFormModal,
      // asyncStart,
      // asyncStop,
      // toResetSearch,
      queryElement,
      tableHight
      // currentTradeDate
    } = this.props;
    /*设置查询*/
    // let SearchformItem = [
    //   {
    //     name: 'type3',
    //     label: '当前交易日',
    //     type: 'DatePicker',
    //     props: {
    //       placeholder: '请选择执行日期',
    //       allowClear: false,
    //       initialValue: currentTradeDate ? moment(currentTradeDate) : '',
    //       onChange(value) {
    //         changeQueryElement({
    //           type: 'queryElement',
    //           value: { tradeDate: value ? value.format('YYYY-MM-DD') : '' }
    //         });
    //       }
    //     }
    //   }
    // ];

    const col = [
      {
        title: '编号',
        width: 80,
        dataIndex: 'index',
        align: 'center',
        key: 'index'
      },
      {
        title: '日初业务处理项',
        width: 360,
        dataIndex: 'jobName',
        key: 'jobName'
      },
      {
        title: '任务执行状态',
        width: 120,
        dataIndex: 'jobStatus',
        key: 'jobStatus',
        align: 'center',
        render: (a, b, index) => {
          return (
            <span
              className={
                a == 0
                  ? 'empty'
                  : a == 1
                  ? 'starting'
                  : a == 2
                  ? 'start'
                  : a == 3
                  ? 'error'
                  : 'stop'
              }
              title={
                a == 0
                  ? '待执行'
                  : a == 1
                  ? '执行中'
                  : a == 2
                  ? '执行成功'
                  : a == 3
                  ? '执行失败'
                  : '执行警告'
              }
            ></span>
          );
        }
      },
      {
        title: '任务启停状态',
        width: 120,
        dataIndex: 'runStatus',
        key: 'runStatus',
        render: (text, record, index) => {
          return text == 0 ? '停用' : '启用';
        }
      },
      {
        title: '任务执行频率',
        width: 200,
        dataIndex: 'repeatType',
        key: 'repeatType',
        render: (text, record, index) => {
          let H, m, s;
          H = record.hour < 10 ? '0' + record.hour : record.hour;
          m = record.minute < 10 ? '0' + record.minute : record.minute;
          s = record.second < 10 ? '0' + record.second : record.second;
          if (record.repeatType == 1) {
            return `重复一次，每天 ${H}:${m} 执行`;
          } else if (record.repeatType == 2) {
            return `重复多次，每隔 ${
              record.hour ? H + '小时 ' : record.minute ? m + '分钟 ' : s + '秒 '
            }执行`;
          }
        }
      },
      {
        title: '创建人',
        width: 120,
        dataIndex: 'updateUserName',
        key: 'updateUserName'
      },
      {
        title: '创建时间',
        width: 180,
        dataIndex: 'updateTime',
        key: 'updateTime'
      }
      // {
      //   title: '关联逻辑',
      //   width: 280,
      //   dataIndex: 'tradeDate',
      //   key: 'tradeDate'
      // }
    ];

    const ButtonType = [
      {
        name: '开始',
        roule: 'true',
        icon: 'caret-right',
        func: () => {
          this.toStartOpt();
        }
      },
      {
        name: '修改',
        roule: true,
        func: () => {
          if (this.state.ids.length == 1) {
            openBondFormModal({ type: 'edit', title: '编辑任务信息', status: true });
            setTimeout(() => {
              this.setFormData();
            }, 50);
          } else {
            message.error('必须且只能选择一条数据源');
          }
        }
      },
      {
        name: '启动',
        roule: 'true',
        func: () => {
          this.toStartPlan();
        }
      },
      {
        name: '停用',
        roule: 'true',
        func: () => {
          this.toStopPlan();
        }
      },
      {
        name: '手动刷新数据',
        roule: 'true',
        icon: 'caret',
        func: () => {
          this.query();
        }
      }
      // {
      //   name: '终结',
      //   roule: 'true',
      //   icon: 'pause',
      //   func: () => {
      //     asyncStop({ params: this.state.ids });
      //   }
      // },
      // {
      //   name: '日志',
      //   roule: 'true',
      //   icon: 'form',
      //   func: () => {
      //     openFormModal({ status: true });
      //   }
      // }
    ];
    /***表格分页***/
    /***表格分页***/
    const pagination = {
      onChange: (page, pageSize) => {
        this.searchAccountByCondition({ ele: 'reqPageNum', value: page });
      },
      onShowSizeChange: (current, size) => {
        this.searchAccountByCondition({ ele: 'reqPageSize', value: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: queryElement.reqPageSize,
      total: dataList.total
    };
    /***点击表格索引***/
    let rowSelection = rowSelectionFunc.call(this);
    return (
      <Fragment>
        <div style={{ margin: '8px' }}>
          {/* <SearchForm
            labelSize="6em"
            lineOf={3}
            formItem={SearchformItem}
            refs={ref => (this.searchForm = ref)}
            handleSearch={value => {
              this.query();
            }}
            moreTypeModal
            handleReset={toResetSearch}
            handleBeforeReset={() => true}
          /> */}
          <Form layout="inline" style={{ margin: '7px' }}>
            <Form.Item label="当前交易日">
              <DatePicker
                className="dates"
                value={moment(this.props.currentTradeDate, 'YYYY-MM-DD')}
                disabled
              ></DatePicker>
            </Form.Item>
          </Form>
          {withRoleBotton(ButtonType, this.props.btnAuth)}
          <ConfigableTable
            // onRow={record => {
            //   return {
            //     onClick: event => {
            //       this.changeAbout(event, record);
            //     }
            //   };
            // }}
            {...setTableInfo({
              columns: col,
              dataSource: dataList.list,
              rowSelection,
              pagination,
              rowKey: 'id',
              height: tableHight
            })}
          />
          <Modal
            visible={isOpenFormModal.status}
            width={1100}
            title="执行日志"
            onCancel={() => {
              openFormModal({ type: 'add', status: false, sign: '' });
            }}
          >
            <JournalModal {...this.props}></JournalModal>
          </Modal>

          {/* 执行任务修改 弹窗 */}
          <Modal
            visible={isOpenBondFormModal.status}
            width={1100}
            title="执行任务修改"
            maskClosable={false}
            destroyOnClose={true}
            onOk={this.onSubmit}
            onCancel={() => {
              openBondFormModal({ type: 'add', status: false, sign: '' });
            }}
          >
            <BondSubsidiaryModal
              wrappedComponentRef={form => (this.bondForm = form)}
              {...this.props}
              rowed={this.state.ids}
            ></BondSubsidiaryModal>
          </Modal>
        </div>
      </Fragment>
    );
  }

  // /**点击指令切换切换关联 */
  // changeAbout = (e, row) => {
  //   const {
  //     asyncHttpSearcAboutInfo,
  //     asyncHttpSearchAboutZJList,
  //     asyncHttpSearcAboutAccont,
  //     asyncHttpSearcAboutDBList,
  //     asyncHttpSearcAboutContractList,
  //     asyncHttpSearcAboutDealDetailedList,
  //     active,
  //     changTableRow
  //   } = this.props;
  //   changTableRow({ value: row });
  //   let params = {
  //     ...row
  //   };
  //   const action = {
  //     '1': asyncHttpSearcAboutInfo, //结算指令详情
  //     '2': asyncHttpSearchAboutZJList, //债券明细
  //     '3': asyncHttpSearcAboutAccont, //资金明细
  //     '4': asyncHttpSearcAboutDBList, //担保信息
  //     '5': asyncHttpSearcAboutDealDetailedList, //成交流水明细
  //     '6': asyncHttpSearcAboutContractList //合同信息
  //   };
  //   action[active]({ params });
  // };

  // 表单提交
  onSubmit = () => {
    const { asyncHttpEditPlan, openBondFormModal } = this.props;
    let form = this.bondForm.props.form;
    const data = this.state.ids[0];
    form.validateFields((err, values) => {
      let times;
      if (values.repeatType == 1) {
        let t = values.stime.format('HH:mm');
        let arr = t.split(':');
        times = {
          hour: Number(arr[0]),
          minute: Number(arr[1]),
          second: null
        };
      } else if (values.repeatType == 2) {
        times = {
          hour: null,
          minute: null,
          second: null
        };
        times[values.timeType] = values.timeNum; //根据选择的时间类型赋值，其他的时间则全部为0
      }
      const params = {
        ...data,
        repeatType: values.repeatType,
        ...times
      };
      asyncHttpEditPlan(params);
      openBondFormModal({ type: 'edit', title: '编辑任务信息', status: false });
      this.toEmptySelect();
    });
  };

  /**查询* */
  query = () => {
    const { asyncHttpDailyFirstList, queryElement, asyncHttpGetCurTradeDate } = this.props;
    if (!queryElement.tradeDate) {
      message.warning('执行日期不可为空！');
      return;
    }
    asyncHttpGetCurTradeDate().then(res => asyncHttpDailyFirstList({}));
    this.toEmptySelect();
  };

  // 分页
  searchAccountByCondition = ({ ele, value }) => {
    const { changeQueryElement, asyncHttpDailyFirstList } = this.props;
    changeQueryElement({ type: 'queryElement', value: { [ele]: value } });
    asyncHttpDailyFirstList({});
    this.toEmptySelect();
  };

  // 开始操作
  toStartOpt = async () => {
    if (this.state.ids.length < 1) {
      message.error('请选择需要开始的数据');
      return;
    } else if (this.state.ids.length > 1) {
      message.error('仅支持单一数据执行');
      return;
    }
    const {
      asyncToStartDailyFirst,
      // asyncHttpDailyFirstLogNum,
      queryElement
      // changTableRow
    } = this.props;
    // let arr = [];
    // this.state.ids.map(item => {
    //   arr.push(item.id);
    // });

    if (!queryElement.tradeDate) {
      message.error('请先选择开始的执行日期');
      return;
    }

    // changTableRow({ value: this.state.ids[0] });

    await asyncToStartDailyFirst({
      id: this.state.ids[0].id,
      tradeDate: queryElement.tradeDate,
      cb: () => {
        // this.setState({ ids: [] })
      }
    }).then(() => {
      this.toEmptySelect();
    });
  };

  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  //设置弹窗值
  setFormData() {
    let data = this.state.ids[0];
    let form = this.bondForm.props.form;
    if (data.repeatType == 1) {
      //重复次数为一次，设定时间
      let stime = moment(data.hour + ':' + data.minute, 'HH:mm');
      setTimeout(() => {
        form.setFieldsValue({ ...data, stime });
      }, 50);
    } else if (data.repeatType == 2) {
      //重复多次，获取有数据的时间（时分秒）
      let timeNum = null,
        timeType = null;
      if (data.hour) {
        timeNum = data.hour;
        timeType = 'hour';
      } else if (data.minute) {
        timeNum = data.minute;
        timeType = 'minute';
      } else if (data.second) {
        timeNum = data.second;
        timeType = 'second';
      }
      setTimeout(() => {
        form.setFieldsValue({ ...data, timeNum, timeType });
      }, 50);
    }
  }

  // 启用
  toStartPlan = async () => {
    if (this.state.ids.length < 1) {
      message.error('请选择需要开始的数据');
      return;
    } else if (this.state.ids.length > 1) {
      message.error('仅支持单一数据执行');
      return;
    }
    const { asyncHttpStartPlan } = this.props;

    await asyncHttpStartPlan({ id: this.state.ids[0].id }).then(() => {
      this.toEmptySelect();
    });
  };

  // 停用
  toStopPlan = async () => {
    if (this.state.ids.length < 1) {
      message.error('请选择需要开始的数据');
      return;
    } else if (this.state.ids.length > 1) {
      message.error('仅支持单一数据执行');
      return;
    }
    const { asyncHttpStopPlan } = this.props;

    await asyncHttpStopPlan({ id: this.state.ids[0].id }).then(() => {
      this.toEmptySelect();
    });
  };
}
export default Instruction;
