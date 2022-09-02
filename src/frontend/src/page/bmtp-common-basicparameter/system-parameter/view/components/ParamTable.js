import React, { PureComponent } from 'react';
import {
  setTableInfo,
  setColumns,
  // withRoleTableBotton,
  ConfigableTable,
  rowSelectionFunc
  // SearchForm
} from 'yss-biz';
import { message, Input, Button } from 'antd';
import moment from 'moment';
import QueryForm from './QueryForm';
import ParamButton from './ParamButton';

// const { Option } = Select;
export default class ParamTable extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.chanUpdate = true;
    this.updateIndex = 0;
    const tabColumns = [
      ...setColumns(this.props.paramTable.columns),
      {
        title: '参数值',
        dataIndex: 'parameterValue',
        key: 'parameterValue',
        ellipsis: true,
        width: 200,
        render: (value, row) => {
          const { id } = row;
          const { editing, editRowId } = this.state;
          const isEditRow = editRowId === id;
          return isEditRow && editing ? (
            <Input
              allowClear
              defaultValue={value}
              onChange={e => {
                const targetValue = e.target.value;
                this.setState({ editedValue: targetValue });
              }}
            />
          ) : (
            value
          );
        }
      },
      {
        title: '参数说明',
        dataIndex: 'remark',
        width: 300,
        key: 'remark',
        ellipsis: true
      },
      {
        title: '审核人',
        dataIndex: 'checkUserName',
        width: 100,
        key: 'checkUserName',
        ellipsis: true
      },
      {
        title: '审核时间',
        dataIndex: 'checkTime',
        width: 200,
        key: 'checkTime',
        ellipsis: true,
        render: value => {
          return value ? moment(value).format('YYYY-MM-DD  HH:mm:ss') : '';
        }
      },
      {
        title: '操作',
        key: 'operation',
        width: 200,
        fixed: 'right',
        align: 'center',
        render: row => {
          const { id, parameterValue, checkStatus } = row;
          const { editing, editRowId } = this.state;
          const isEditRow = editRowId === id;
          return isEditRow && editing ? (
            <Button
              size="small"
              type="link"
              icon="save"
              onClick={() => {
                this.save();
              }}
            >
              保存
            </Button>
          ) : checkStatus != '1' ? (
            <Button
              size="small"
              type="link"
              icon="edit"
              onClick={() => {
                this.edit(parameterValue, id, checkStatus);
              }}
            >
              修改
            </Button>
          ) : null;
        }
      }
    ];
    this.state = {
      editing: false,
      editRowId: '',
      editedValue: '',
      visible: false,
      row: '',
      columns: tabColumns,
      dataSource: this.props.paramTable.dataSource
    };
  }
  componentWillMount() {
    // this.props.asyncGetTablesDatas({ ...this.props.paging });
  }
  componentWillReceiveProps(nextProps) {
    // this.setState({ dataSource: nextProps.paramTable.dataSource, columns: this.handleColumns() });
    // 过滤空子树
    let { dataSource } = nextProps.paramTable;
    dataSource =
      dataSource &&
      dataSource.length &&
      dataSource.map(row => {
        row.childBusinessParameter =
          row.childBusinessParameter && row.childBusinessParameter.length
            ? row.childBusinessParameter
            : null;
        return row;
      });
    this.setState({ dataSource: dataSource });

    // this.setState({ dataSource: nextProps.paramTable.dataSource });
  }

  edit = (value, id, checkStatus) => {
    // todo 此处 checkStatus 为"1"时 为已审核； checkStatus为 "2"时，为未审核
    const canEdit = checkStatus === '2';
    if (canEdit) {
      this.setState({ editedValue: value });
      this.setState({ editing: true });
      this.setState({ editRowId: id });
    } else {
      message.warning(`当前数据已被审核，无法进行修改；`);
    }
  };

  save = async value => {
    const {
      asyncHanleTaleValueChange,
      asyncGetTablesDatas,
      systemParamQueryValues,
      paging
    } = this.props;

    const { editRowId, editedValue } = this.state;
    console.info(editRowId, editedValue, '保存');
    await asyncHanleTaleValueChange({ id: editRowId, parameterValue: editedValue });
    await asyncGetTablesDatas({ ...systemParamQueryValues, ...paging });

    let datas = this.props.callbackForTableChange;
    if (datas.winRspType === 'SUCC') {
      message.success(datas.msg);
    } else {
      message.error(datas.msg);
    }

    await this.setState({ editing: false });
    await this.setState({ editRowId: '' });
  };

  // handleColumns() {
  //   const list = this.state.columns;
  //   this.setState({ columns: [] });
  //   return setColumns({
  //     list,
  //     datas: {
  //       render: (text, record, index) => {
  //         let value = record.parameterValueBound;
  //         if (record.parameterValueType === '4') {
  //           value = '1:启用;0:不启用';
  //         }
  //         if (!!value) {
  //           let listData;
  //           if (typeof value === 'string') {
  //             listData = value.split(';');
  //             listData = listData.map(item => {
  //               return {
  //                 label: item.split(':')[1],
  //                 value: item.split(':')[0]
  //               };
  //             });
  //           } else {
  //             listData = value;
  //           }
  //           return (
  //             <Select
  //               defaultValue={record.parameterValue}
  //               style={{ width: '100%' }}
  //               onChange={value => {
  //                 record.parameterValue = value;
  //               }}
  //             >
  //               {listData.map((item, index) => {
  //                 return (
  //                   <Option key={item.label + '' + index} value={item.value}>
  //                     {item.label}
  //                   </Option>
  //                 );
  //               })}
  //             </Select>
  //           );
  //         } else {
  //           return (
  //             <Input
  //               defaultValue={record.parameterValue}
  //               placeholder="请输入参数值"
  //               onChange={e => {
  //                 record.parameterValue = e.target.value;
  //               }}
  //             />
  //           );
  //         }
  //       }
  //     },
  //     index: 4
  //   });
  // }
  render() {
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
      total: this.props.paramTable.total,
      pageSize: this.props.paging.reqPageSize,
      current: this.props.paging.reqPageNum
    };

    return (
      <>
        <QueryForm
          {...this.props}
          toEmptySelect={this.toEmptySelect}
          handleReset={this.props.toResetSearch}
        />
        <ParamButton {...this.props} toEmptySelect={this.toEmptySelect} />
        <ConfigableTable
          childrenColumnName="childBusinessParameter"
          {...setTableInfo.call(this, {
            //拖拽相关
            colDraggable: true,
            // rowDraggable: true,
            //复选和分页
            rowKey: 'id',
            rowSelection: rowSelectionFunc.call(this, this.handleRowSelect),
            pagination,
            // 表格数据
            columns: this.state.columns,
            dataSource: this.state.dataSource,
            height: 450
          })}
        />
      </>
    );
  }
  handleRowSelect = row => {
    let ids = Array.isArray(row) ? row.map(item => item.id) : [row.id];
    this.props.setRowChecked(ids);
  };
  routerPush = params => {
    let { history } = this.props;
    const { pathname, state } = params;
    history.push({ pathname, state });
  };

  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
    this.props.setRowChecked([]);
  };
  // ButtonTableType = [
  //   {
  //     name: '修改',
  //     roule: true,
  //     func: async (e, row) => {
  // await this.props.asyncHanleTaleValueChange(row);
  // let datas = this.props.callbackForTableChange;
  // switch (datas.winRspType) {
  //   case 'SUCC':
  //     await this.props.asyncGetTablesDatas({
  //       ...this.props.systemParamQueryValues,
  //       ...this.props.paging
  //     });
  //     return message.success(datas.msg);
  //   default:
  //     return message.error(datas.msg);
  // }
  //     }
  //   }
  // ];

  /***分页查询*/
  searchPage = pages => {
    const queryValues = this.props.systemParamQueryValues;
    // this.props.setPages(pages);
    setTimeout(() => {
      this.props.asyncGetTablesDatas({ ...this.props.paging, ...queryValues, ...pages });
    }, 0);
    this.toEmptySelect();
  };
}
