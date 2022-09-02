// 指令管理
import React, { Component, Fragment } from 'react';
// import { message } from 'antd';
import { withProcessButton } from './processTableButton';
import {
  // withRoleBotton,
  SearchForm,
  // setColumns,
  setTableInfo,
  // Modal,
  rowSelectionFunc,
  // selectRequest,
  // setRowColor,
  ConfigableTable
  // functionRolue,
  // exportFile,
  // exportSelectFile,
  // filterNullElement
} from 'yss-biz';

class Process extends Component {
  async componentDidMount() {
    const { asyncHttpGetProcessTableData, paging } = this.props;
    await asyncHttpGetProcessTableData({ ...paging });
  }

  query(values) {
    const { setProcessQueryForm, asyncHttpGetProcessTableData, paging, setPages } = this.props;
    setProcessQueryForm({ ...values });
    const pageParams = Object.assign(paging, { reqPageNum: 1 });
    setPages(pageParams);
    asyncHttpGetProcessTableData({ ...paging });
    this.toEmptySelect();
  }
  handleRowSelect = row => {
    this.props.setSelectRow([]);
    row = Array.isArray(row) ? row : [row];
    this.props.setSelectRow(row);
  };
  render() {
    const { processTable, toResetSearch, paging } = this.props;
    const { data } = processTable;

    /*设置查询*/
    let SearchformItem = [
      {
        name: 'managerCode',
        label: '管理人代码',
        type: 'Input',
        props: {
          placeholder: '请输入管理人代码'
        }
      },
      // {
      //   name: 'flowCode',
      //   label: '流程代码',
      //   type: 'Input',
      //   props: {
      //     placeholder: '请输入流程代码'
      //   }
      // },
      {
        name: 'tradeType',
        label: '交易类型',
        type: 'Select',
        props: {
          placeholder: '请选择交易类型',
          getDics: 1030519,
          allowClear: true
          // onChange(value) {
          //   changeElementQuery({
          //     sing: 'queryDistributionElement',
          //     value,
          //     type: 'bizCategory'
          //   });
          // }
        }
      }
    ];

    /***table按钮组***/
    let columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 70
      },
      {
        title: '管理人代码',
        dataIndex: 'managerCode',
        key: 'managerCode',
        ellipsis: true,
        width: 120
      },
      // {
      //   title: '父流程代码',
      //   dataIndex: 'managerCode',
      //   key: 'managerCode',
      //   width: 250
      // },
      // {
      //   title: '流程代码',
      //   dataIndex: 'flowCode',
      //   key: 'flowCode',
      //   ellipsis: true,
      //   width: 150
      // },
      {
        title: '交易类型',
        dataIndex: 'tradeTypeName',
        key: 'tradeTypeName',
        ellipsis: true,
        width: 200
      },
      {
        title: '流程节点',
        key: 'operation',
        // align: 'center',
        render: row => {
          return withProcessButton(row.flowConfigList)(row);
        }
      }
    ];

    const pagination = {
      onChange: (page, pageSize) => {
        this.searchPage({ reqPageNum: page, reqPageSize: pageSize });
      },
      onShowSizeChange: (current, size) => {
        this.searchPage({ reqPageNum: current, reqPageSize: size });
      },
      showTotal: total => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: paging.reqPageSize,
      current: paging.reqPageNum,
      total: this.props.total
    };

    /**表中表**/
    return (
      <Fragment>
        <div style={{ marginTop: '10px' }}></div>
        <SearchForm
          labelSize="6em"
          lineOf={3}
          formItem={SearchformItem}
          refs={ref => (this.searchForm = ref)}
          handleSearch={values => {
            this.query(values);
          }}
          moreTypeModal
          moreFullSearch={true}
          handleBeforeReset={() => true}
          handleReset={() => {
            toResetSearch({ reqPageSize: paging.reqPageSize, reqPageNum: paging.reqPageNum });
          }}
        />
        {/* <div className="marBotton">{withRoleBotton(ButtonType, this.props.btnAuth)}</div> */}
        <ConfigableTable
          {...setTableInfo({
            rowKey: 'id',
            columns,
            dataSource: data,
            height: '450',
            pagination,
            rowSelection: rowSelectionFunc.call(this, (id, row) => this.handleRowSelect(id, row))
          })}
        />
      </Fragment>
    );
  }

  /***分页查询*/
  searchPage = pages => {
    this.props.setPages(pages);
    this.props.asyncHttpGetProcessTableData({ ...pages });
    this.toEmptySelect();
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
    this.props.setSelectRow([]);
  };
}
export default Process;
