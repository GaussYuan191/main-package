import React, { PureComponent } from 'react';
import { message } from 'antd';
import {
  SearchForm,
  // functionRolue,
  // withRoleBotton,
  ConfigableTable,
  setTableInfo,
  // setColumns,
  rowSelectionFunc,
  // filterNullElement,
  // exportFile,
  // exportSelectFile,
  selectPageRequest
} from 'yss-biz';
import './style.less';
// import { Fragment } from 'react';
import FlowNode from './FlowNode';

class BusinessFlow extends PureComponent {
  state = {
    ids: []
  };
  render() {
    const { changeElementQuery, dataList, queryElement } = this.props;

    // 搜索字段
    let SearchformItem = [
      {
        name: 'managerCode',
        label: '管理人',
        type: 'Select',
        props: {
          placeholder: '请选择管理人',
          allowClear: true,
          type: 'consignor',
          configDics: selectPageRequest,
          dropdownWidth: 250,
          onChange(value) {
            changeElementQuery({
              sing: 'queryElement',
              value,
              type: 'managerCode'
            });
          }
        }
      },
      {
        name: 'tradeType',
        label: '交易类型',
        type: 'Select',
        props: {
          placeholder: '请选择交易类型',
          allowClear: true,
          getDics: 1030519,
          onChange(value) {
            changeElementQuery({
              sing: 'queryElement',
              value,
              type: 'tradeType'
            });
          }
        }
      },
      {
        name: 'traceId',
        label: '交易指令编号/成交编号',
        type: 'Input',
        labelSize:'11em',
        props: {
          placeholder: '请输入交易指令编号/成交编号',
          allowClear: true,
          onChange(e) {
            let value = e.target.value;
            changeElementQuery({
              sing: 'queryElement',
              value,
              type: 'traceId'
            });
          }
        }
      }
    ];

    // 表格头操作按钮
    // const ButtonType = [
    //   // {
    //   //   name: '刷新',
    //   //   icon: 'stepForwardFilled',
    //   //   roule: true,
    //   //   func: this.refresh
    //   // },
    //   {
    //     name: '导出',
    //     roule: functionRolue.EXPORT,
    //     children: [
    //       {
    //         name: '导出全部',
    //         func: this.exportAll
    //       },
    //       {
    //         name: '导出当前页',
    //         func: this.exportCurrent
    //       },
    //       {
    //         name: '导出选择项',
    //         func: this.exportSelected
    //       }
    //     ]
    //   }
    // ];

    // 表格字段
    const columns = [
      {
        title: '序号',
        width: 80,
        render: (text, record, index) => {
          return ++index;
        }
      },
      {
        title: '管理人',
        dataIndex: 'managerName',
        key: 'managerName',
        width: 200,
        ellipsis: true
      },
      {
        title: '交易类型',
        dataIndex: 'tradeTypeName',
        key: 'tradeTypeName',
        width: 150,
        ellipsis: true
      },
      {
        title: '交易指令编号/成交编号',
        dataIndex: 'traceId',
        key: 'traceId',
        width: 200
      },
      {
        title: '流程节点',
        dataIndex: 'flowConfigEntityList',
        key: 'flowConfigEntityList',
        width: 800,
        // align: 'center',
        // fixed: 'right',
        render: (text, record, index) => {
          // return (
          //   <ul className="flows">
          //     <li className="active">匹配1</li>
          //     <li className="active">匹配2</li>
          //     <li className="active">匹配3</li>
          //     <Tooltip
          //       title={() => {
          //         return (
          //           <>
          //             <p className="active">流程一</p>
          //             <p>流程一</p>
          //             <p>流程大撒大撒一</p>
          //             <p>流程一</p>
          //           </>
          //         );
          //       }}
          //     >
          //       <li className="active">匹配dawr</li>
          //     </Tooltip>
          //     <li>匹配4</li>
          //     <li>●●●●●●</li>
          //   </ul>
          // );
          // return this.nodeControl(text);
          return <FlowNode key={index} {...this.state} data={text} />;
        }
      }
    ];

    /***点击索引获取行的ID** */
    let rowSelection = rowSelectionFunc.call(this);

    /***表格分页***/
    const pagination = {
      onChange: (page, pageSize) => {
        this.searchPage({ reqPageNum: page, reqPageSize: pageSize });
      },
      onShowSizeChange: (current, size) => {
        this.searchPage({ reqPageNum: current, reqPageSize: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      total: dataList.total,
      pageSize: queryElement.reqPageSize,
      current: queryElement.reqPageNum
    };

    return (
      <>
        {/* 搜索框 */}
        <SearchForm
          labelSize="6em"
          lineOf={3}
          formItem={SearchformItem}
          refs={ref => (this.searchForm = ref)}
          handleSearch={value => {
            this.query();
          }}
          moreTypeModal
          handleBeforeReset={() => true}
          handleReset={this.handleReset}
        />

        {/* 头部操作按钮 */}
        {/* <div>{withRoleBotton(ButtonType, this.props.btnAuth)}</div> */}

        {/* 数据表格 */}
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: dataList.list,
            rowSelection,
            rowKey: 'id',
            pagination,
            height: 600
          })}
        />
      </>
    );
  }

  /*重置搜索**/
  handleReset = () => {
    const { resetElement, queryElement } = this.props;
    resetElement({ sing: 'queryElement', queryElement });
  };

  /***模糊查询*/
  query = () => {
    const { asyncHttpGetList, queryElement } = this.props;
    asyncHttpGetList({ ...queryElement, reqPageNum: 1 });
    this.toEmptySelect();
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /**分页查询*/
  searchPage = page => {
    const { asyncHttpGetList, changeElementQuery } = this.props;
    changeElementQuery({
      sing: 'queryElement',
      value: page.reqPageNum,
      type: 'reqPageNum'
    });
    changeElementQuery({
      sing: 'queryElement',
      value: page.reqPageSize,
      type: 'reqPageSize'
    });
    asyncHttpGetList({});
    this.toEmptySelect();
  };

  /*刷新重置*/
  refresh = e => {
    const { asyncHttpGetList, queryElement } = this.props;
    asyncHttpGetList(queryElement);
    this.toEmptySelect();
    message.success('刷新成功');
  };
}

export default BusinessFlow;
