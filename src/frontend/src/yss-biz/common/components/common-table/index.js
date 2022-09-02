import React from 'react';
import { Checkbox, Button, Modal, message } from 'antd';
import HTML5Backend from 'react-dnd-html5-backend';
import CommonTable from './TableColumn';
import { DndProvider } from 'react-dnd';
import { service } from 'bmtp-trade-base';
import './index.less';
class ConfigableTable extends React.Component {
  state = {
    indexColumns: [], //右侧索引列表，永远不变
    tableColumns: [], //表格列表
    tableColumnsCline: {
      clientX: 0,
      clientY: 0
    }, //记录索引弹框的距离
    isIndexColunmShow: false //是否显示在线列
  };

  handleSetRowProps = (record, index) => {
    const { onRow, onRowMove, rowDraggable } = this.props;
    const props = onRow && onRow(record, index);
    const rowProps = { ...props, moveRow: onRowMove, index, rowDraggable };
    return rowProps;
  };

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        {/**索引列*** */}
        <div style={{ position: 'relative', height: this.props.height }}>
          {this.state.isIndexColunmShow ? (
            <div
              className="columnSelection"
              style={{ left: this.state.clientX, top: this.state.clientY }}
            >
              <ul>
                <span
                  className="close"
                  onClick={() => {
                    this.setState({
                      isIndexColunmShow: false,
                      clientX: 0,
                      clientY: 0
                    });
                  }}
                >
                  ✖
                </span>
                {this.state.indexColumns.map(item => {
                  return (
                    <li key={item.title}>
                      <Checkbox
                        checked={item.checked}
                        disabled={item.title == '序号' || item.title == '操作' ? true : false}
                        onChange={checkedValue => {
                          this.checkBoxCol(checkedValue, item);
                        }}
                      ></Checkbox>
                      <span className="checkboxName">{item.title}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="butGroup">
                {/* <Button
                  size="small"
                  style={{ 'min-width': '50px' }}
                  type="primary"
                  onClick={this.submit}
                >
                  确定
                </Button> */}{' '}
                <Button style={{ 'min-width': '50px' }} size="small" onClick={this.resetColumn}>
                  重置
                </Button>
              </div>
            </div>
          ) : (
            <span
              className="columnBotton"
              ref={colunmSpan => (this.colunmSpan = colunmSpan)}
              onClick={e => {
                this.setIndexColumnShow(e);
              }}
            >
              {this.props.isSelectColumn ? (
                <span
                  type="primary"
                  style={{
                    fontSize: '12px',
                    padding: '0 8px',
                    cursor: 'pointer',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                >
                  ☰
                </span>
              ) : (
                ''
              )}
            </span>
          )}

          {/**索引列*** */}
          <div className="yss-configable-table tableInfo">
            <CommonTable {...this.props} columns={this.state.tableColumns} />
          </div>
        </div>
      </DndProvider>
    );
  }

  componentDidMount() {
    const { columns } = this.props;
    let formatColumns = columns.map(item => {
      return {
        ...item,
        checked: true
      };
    });
    this.setCurrentColums(formatColumns);
    this.setState(
      () => {
        return {
          tableColumns: formatColumns,
          indexColumns: formatColumns
        };
      },
      () => {
        /**发送请求获取新的表格 */
        if (this.props.tableCode) {
          this.moustSetColumn();
        }
      }
    );
  }

  /****勾选复选框 */
  checkBoxCol = (checkedValue, col) => {
    const { indexColumns, tableColumns } = this.state;
    let tableColumnsState;
    let indexColumnsState = indexColumns.map(item => {
      if (col.dataIndex == item.dataIndex) {
        return {
          ...item,
          checked: !item.checked
        };
      } else {
        return {
          ...item
        };
      }
    });
    this.setState(
      () => {
        return {
          indexColumns: indexColumnsState
        };
      },
      () => {
        if (col.checked) {
          /***去钩 */
          tableColumnsState = tableColumns.filter(item => item.dataIndex != col.dataIndex);
        } else {
          /***打上钩 */
          tableColumnsState = indexColumnsState.filter(item => item.checked);
        }
        this.setCurrentColums(tableColumnsState);
        this.setState(() => {
          return {
            tableColumns: tableColumnsState
          };
        });
      }
    );
  };

  /***提交保存列 */
  submit = () => {
    Modal.confirm({
      title: '是否对表列进行保存?',
      // content: '修改的内容',
      onOk: () => {
        let params = this.setColumn();
        this.setTableCol(params);
      }
    });
  };

  /***设置发送后台请求的列的参数 */
  setColumn = () => {
    const { tableColumns, indexColumns } = this.state;
    let columnList = [];
    /**获取表格显示的列**/
    tableColumns.forEach((item, index) => {
      if (item.title != '序号' && item.title != '操作') {
        columnList.push({
          columnCode: item.dataIndex,
          display: 1,
          sort: index
        });
      }
    });

    /**获取索引列显示不打上勾的选项**/
    indexColumns.forEach((item, index) => {
      if (!item.checked) {
        columnList.push({
          columnCode: item.dataIndex,
          display: 0,
          sort: 0
        });
      }
    });
    let params = {
      tableCode: this.props.tableCode,
      columnList
    };
    return params;
  };

  /**重置列* */
  resetColumn = () => {
    const { indexColumns } = this.state;
    let newIndexColumns = indexColumns.map(item => {
      return {
        ...item,
        checked: true
      };
    });
    this.setState(() => {
      return {
        indexColumns: newIndexColumns,
        tableColumns: newIndexColumns
      };
    });
    this.setCurrentColums(newIndexColumns);
  };

  // 将当前在表格中展示的"列字段"返回给组件方法getCurrentColums,供导出使用
  // 参数data：当前展示的表格cloum
  setCurrentColums = data => {
    const { cloumsCode } = this.props;
    if (cloumsCode) {
      const { getCurrentColums, currentColums } = cloumsCode;
      if (getCurrentColums && currentColums) {
        let arr = this.getCloumCode(data);
        getCurrentColums({ type: currentColums, data: arr });
      }
    }
  };

  // 获取多层次下的表格字段值
  getCloumCode = data => {
    let arr = [];
    if (data && data.length > 0) {
      for (let n of data) {
        if (n.title != '序号' && n.title != '操作') {
          if (n.children) {
            let arr1 = this.getCloumCode(n.children);
            arr.push(...arr1);
          } else {
            arr.push(n.dataIndex);
          }
        }
      }
    }
    return arr;
  };

  /**设置列表索引展示* */
  setIndexColumnShow = e => {
    let clientIndexColunmX = e.clientX - 120;
    let clientIndexColunmY = e.clientY - 50;
    this.setState(() => {
      return {
        isIndexColunmShow: true,
        clientX: clientIndexColunmX,
        clientY: clientIndexColunmY
      };
    });
  };

  /***设置列发送给后台进行操作 */
  async setTableCol(params) {
    // let result= await $ajax(`/dfas-base-biz/usertable/config/save`, params, 'post');
    service
      .httpService({
        baseURL: '/dfas-base-biz',
        url: '/usertable/config/save',
        method: 'post',
        data: params
      })
      .then(res => {
        const { winRspType, msg } = res;
        if (winRspType == 'SUCC') {
          message.success('保存成功');
        } else {
          message.error(msg);
        }
      });
  }

  /***加载表格的时候获取当前表格的列 */
  async moustSetColumn(params) {
    const { indexColumns } = this.state;
    service
      .httpService({
        baseURL: service.dfasBaseBiz,
        url: `/usertable/config/get/${this.props.tableCode}`,
        method: 'get'
      })
      .then(res => {
        const { winRspType, data } = res;
        if (winRspType != 'SUCC') {
          return;
        }
        if (data == null) {
          return;
        }
        /*获取与后台对比的值**/
        let newIndexColumn = indexColumns;
        for (let i = 0; i < indexColumns.length; i++) {
          let isTrue = false;
          for (let j = 0; j < data.columnList.length; j++) {
            //indexColumns[i]["dataIndex"]==data.columnList[j]["columnCode"]
            //判断是后台返回的数据是否为true,是true 进行隐藏
            if (
              indexColumns[i]['dataIndex'] == data.columnList[j]['columnCode'] &&
              data.columnList[j].display == '1'
            ) {
              newIndexColumn[i]['checked'] = true;
              isTrue = true;
            }
          }
          if (!isTrue) {
            newIndexColumn[i]['checked'] = false;
          }
          if (indexColumns[i]['title'] == '序号' || indexColumns[i]['title'] == '操作') {
            newIndexColumn[i]['checked'] = true;
          }
        }
        this.setState(() => {
          return {
            indexColumns: newIndexColumn,
            tableColumns: newIndexColumn.filter(item => item.checked)
          };
        });
      });
  }
}
/***设置props默认值 */
ConfigableTable.defaultProps = {
  isSelectColumn: true
};
export default ConfigableTable;
