import React, { PureComponent, Fragment } from 'react';
import {
  withRoleBotton,
  SearchForm,
  rowSelectionFunc,
  setTableInfo,
  ConfigableTable,
  setColumns,
  Modal,
  functionRolue
} from 'yss-biz';
import moment from 'moment';
import LookData from './lookData';
import { message } from 'antd';

class ExceptionHanding extends PureComponent {
  state = {
    ids: [],
    defStatus: '发送失败'
  };

  componentDidMount() {
    // console.log(moment().format('YYYY-MM-DD'))
  }

  render() {
    const {
      dataList,
      ecphdColumns,
      toResetSearch,
      queryElement,
      isOpenFormModal,
      openFormModal,
      changeQueryElement
    } = this.props;
    // 表单
    const columns = [...setColumns(ecphdColumns)];
    /*设置查询*/
    let SearchformItem = [
      {
        name: 'interfaceCodes',
        label: '接口名称',
        type: 'Select',
        props: {
          placeholder: '请选择接口名称',
          mode: 'multiple',
          maxTagCount: 1,
          maxTagTextLength: 3,
          allowClear: true,
          getDics: 1030203,
          onChange(value) {
            changeQueryElement({ interfaceCodes: value, type: 'ExceptionHandling' });
          }
        }
      },
      {
        name: 'status',
        label: '数据状态',
        type: 'Select',
        props: {
          placeholder: '请选择数据状态',
          allowClear: true,
          getDics: 1030204,
          initialValue: this.state.defStatus,
          onChange(value) {
            changeQueryElement({ status: value, type: 'ExceptionHandling' });
          }
        }
      },
      {
        name: 'content',
        label: '数据内容',
        type: 'Input',
        props: {
          placeholder: '请输入数据内容',
          allowClear: true,
          onChange(e) {
            let text = e.target.value;
            // 正则匹配 去掉多余的空格
            text = text.replace(/\s/g, '');
            changeQueryElement({
              type: 'ExceptionHandling',
              content: text
            });
          }
        }
      },
      {
        name: 'bussinessDate',
        label: '查询日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择查询日期',
          allowClear: true,
          // initialValue: moment(),
          onChange(value, dataString) {
            changeQueryElement({
              bussinessDate: value ? value.format('YYYY-MM-DD') : '',
              type: 'ExceptionHandling'
            });
          }
        }
      }
    ];

    const ButtonType = [
      {
        name: '发送',
        roule: functionRolue.OTHER_OPERATION,
        // icon: 'caret-right',
        func: this.sendData
      },
      {
        name: '查看数据',
        roule: functionRolue.QUERY,
        // icon: 'form',
        func: this.toLookData
      }
    ];
    /***表格分页***/
    const pagination = {
      onChange: (page, pageSize) => {
        this.searchPage({ ele: 'reqPageNum', value: page });
      },
      onShowSizeChange: (current, size) => {
        this.searchPage({ ele: 'reqPageSize', value: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: queryElement.reqPageSize,
      current: queryElement.reqPageNum,
      total: dataList.total
    };
    /***点击表格索引***/
    let rowSelection = rowSelectionFunc.call(this);

    return (
      <Fragment>
        <div style={{ margin: '8px' }}>
          <SearchForm
            labelSize="6em"
            lineOf={3}
            formItem={SearchformItem}
            refs={ref => (this.searchForm = ref)}
            handleSearch={value => {
              this.query();
            }}
            moreTypeModal
            handleReset={() =>
              toResetSearch({
                reqPageSize: queryElement.reqPageSize,
                reqPageNum: queryElement.reqPageNum,
                type: 'ExceptionHandling'
              })
            }
            handleBeforeReset={() => true}
          />
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
              rowKey: 'id',
              columns: columns,
              dataSource: dataList.list,
              rowSelection,
              pagination,
              height: 450
            })}
          />

          <Modal
            width={1000}
            title="查看数据"
            visible={isOpenFormModal.status}
            onCancel={() => {
              openFormModal({ status: false });
              this.toEmptySelect();
            }}
            onOk={this.handleSubmit}
          >
            <LookData {...this.props} type={'ExceptionHandling'}></LookData>
          </Modal>
        </div>
      </Fragment>
    );
  }

  /***模糊查询*/
  query = () => {
    const { asyncHttpGetList } = this.props;
    asyncHttpGetList({ reqPageNum: 1 });
    this.toEmptySelect();
  };

  /**分页查询*/
  searchPage = ({ ele, value }) => {
    const { asyncHttpGetList, changeQueryElement } = this.props;
    changeQueryElement({ [ele]: value, type: 'ExceptionHandling' });
    asyncHttpGetList({});
    this.toEmptySelect();
  };

  // 发送数据
  sendData = () => {
    let list = this.state.ids;
    const err1 = ['EXCE012', 'EXCE013'],
      err2 = ['EXCE014', 'EXCE016', 'EXCE017', 'EXCE018', 'EXCE019', 'EXCE015'],
      err3 = ['EXCE026', 'EXCE027', 'EXCE028'];
    if (this.state.ids.length < 1) {
      message.error('请选择需要发送的数据');
      return;
    }
    for (let n of list) {
      if (n.status == 3) {
        message.error('发送成功的数据不能再次发送');
        return;
      }
      if (n.status == 2 || n.status == 4) {
        if (err1.indexOf(n.interfaceCode) != -1) {
          message.error('划款指令相关操作，请在划款指令页面按重新发起！');
          return;
        } else if (err2.indexOf(n.interfaceCode) != -1) {
          message.error('查询接口异常交易管理不做处理，请在对应页面重新发起！');
          return;
        } else if (err3.indexOf(n.interfaceCode) != -1) {
          message.error('该接口为实时查询接口，不能在该页面重新发起！');
          return;
        }
      }
    }
    const { asyncHttpSendData, asyncHttpGetList } = this.props;
    let arr = [];
    this.state.ids.map(item => {
      arr.push(item.id);
    });
    asyncHttpSendData({
      ids: arr
    }).then(() => {
      asyncHttpGetList({});
      this.toEmptySelect();
    });
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  // 查看数据
  toLookData = async () => {
    const { openFormModal, asyncHttpLookData } = this.props;
    if (this.state.ids.length < 1) {
      message.error('请选择需要查看的数据');
      return;
    } else if (this.state.ids.length > 1) {
      message.error('请选择一条数据查看');
      return;
    }
    await asyncHttpLookData(this.state.ids[0]);
    openFormModal({
      status: true
    });
  };

  handleSubmit = e => {
    const { openFormModal } = this.props;
    openFormModal({ status: false });
    this.toEmptySelect();
  };
}

export default ExceptionHanding;
