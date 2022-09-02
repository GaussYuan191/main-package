import React, { PureComponent, Fragment } from 'react';
import {
  withRoleBotton,
  // SearchForm,
  rowSelectionFunc,
  setTableInfo,
  ConfigableTable,
  // filterNullElement,
  Modal
  // setColumns
} from 'yss-biz';
import moment from 'moment';
import JournalModal from './JournalModal';
import { message, DatePicker, Form } from 'antd';
import '../style/style.less';

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
      // asyncStart,
      // asyncStop,
      isStartDeal,
      queryElement,
      toResetSearch,
      tableHight,
      currentTradeDate
    } = this.props;
    /*设置查询*/
    let SearchformItem = [
      {
        name: 'type3',
        label: '结算日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择结算日期',
          disabled: true,
          allowClear: true,
          initialValue: moment(currentTradeDate)
          // onChange(value) {
          //   changeQueryElement({
          //     type: 'queryElement',
          //     value: { settleDate: value ? value.format('YYYY-MM-DD') : '' }
          //   });
          // }
        }
      }
    ];

    const col = [
      {
        title: '编号',
        width: 50,
        dataIndex: 'index',
        align: 'center',
        key: 'index'
      },
      {
        title: '日终业务处理项',
        width: 360,
        dataIndex: 'jobName',
        key: 'jobName'
      },
      {
        title: '状态',
        width: 60,
        dataIndex: 'jobStatusName',
        key: 'jobStatusName',
        align: 'center',
        render: (a, b, index) => {
          return (
            <span
              className={
                b.jobStatus == 0
                  ? 'empty'
                  : b.jobStatus == 1
                  ? 'starting'
                  : b.jobStatus == 2
                  ? 'start'
                  : b.jobStatus == 3
                  ? 'error'
                  : 'stop'
              }
              title={a}
            ></span>
          );
        }
      },
      {
        title: '创建人',
        width: 120,
        dataIndex: 'createUserName',
        key: 'createUserName'
      },
      {
        title: '创建时间',
        width: 180,
        dataIndex: 'createTime',
        key: 'createTime'
      }
      // {
      //   title: '关联逻辑',
      //   width: 280,
      //   dataIndex: 'cronExpression',
      //   key: 'cronExpression',
      // },
    ];

    const ButtonType = [
      {
        name: '开始',
        roule: 'true',
        icon: 'caret-right',
        disabled: isStartDeal,
        func: this.toStartOpt
      },
      {
        name: '手动刷新',
        roule: 'true',
        icon: 'caret-refresh',
        noAuth: true,
        func: this.query
      }
      // TODO 后端开发说，暂不支持该功能
      // {
      //   name: '终止',
      //   roule: 'true',
      //   icon: 'pause',
      //   disabled: !isStartDeal,
      //   func: this.toStopOpt
      // }
      // {
      //   name: '日志',
      //   roule: 'true',
      //   icon: 'form',
      //   func: () => {
      //     openFormModal({ status: true })
      //   },
      // },
    ];
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
      total: this.props.dataTotal,
      current: queryElement.reqPageNum
    };
    /***点击表格索引***/
    let rowSelection = rowSelectionFunc.call(this);
    return (
      <Fragment>
        <div style={{ margin: '8px 8px' }}>
          {/* 此注释隐藏了查询和重置按钮 */}
          {/* <SearchForm
            labelSize="6em"
            lineOf={3}
            formItem={SearchformItem}
            refs={ref => (this.searchForm = ref)}
            handleSearch={value => {
              this.query();
            }}
            moreTypeModal
            handleReset={() => {
              toResetSearch({
                reqPageSize: queryElement.reqPageSize,
                reqPageNum: queryElement.reqPageNum
              });
            }}
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
            onRow={record => {
              return {
                onClick: event => {
                  // this.changeAbout(event, record)
                }
              };
            }}
            {...setTableInfo({
              columns: col,
              dataSource: dataList,
              rowSelection,
              pagination,
              border: true,
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
        </div>
      </Fragment>
    );
  }

  componentDidMount() {}
  // 开始操作
  toStartOpt = () => {
    if (this.state.ids.length < 1) {
      message.error('请选择需要开始的数据');
      return;
    }
    const { asyncToStartDailyKnots } = this.props;
    let arr = [];
    this.state.ids.map(item => {
      arr.push(item.id);
    });
    asyncToStartDailyKnots({
      ids: arr,
      cb: () => {
        // this.setState({ ids: [] })
      }
    }).then(() => {
      this.toEmptySelect();
    });
  };
  // 终止操作
  toStopOpt = () => {
    if (this.state.ids.length < 1) {
      message.error('请选择需要终止的数据');
      return;
    }

    const { asyncToStopDailyKnots } = this.props;
    let arr = [];
    this.state.ids.map(item => {
      arr.push(item.id);
    });
    asyncToStopDailyKnots({
      ids: arr,
      cb: () => {
        // this.setState({ ids: [] })
      }
    }).then(() => {
      this.toEmptySelect();
    });
  };
  /**点击指令切换切换关联 */
  changeAbout = (e, row) => {};
  /**查询* */
  query = () => {
    const { asyncHttpDailyKnotsList, asyncHttpGetCurTradeDate } = this.props;
    asyncHttpGetCurTradeDate().then(res => {
      asyncHttpDailyKnotsList({ reqPageNum: 1 });
    });
    this.toEmptySelect();
  };
  // 分页
  searchAccountByCondition = ({ ele, value }) => {
    const { changeQueryElement, asyncHttpDailyKnotsList } = this.props;
    changeQueryElement({ type: 'queryElement', value: { [ele]: value } });
    asyncHttpDailyKnotsList({});
    this.toEmptySelect();
  };

  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };
}
export default Instruction;
