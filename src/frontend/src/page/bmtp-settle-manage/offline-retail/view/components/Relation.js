import React, { PureComponent } from 'react';
import { Row } from 'antd';
import {
  ConfigableTable,
  // SearchForm,
  withRoleBotton,
  filterNullElement,
  setTableInfo,
  rowSelectionFunc,
  // page,
  setColumns,
  // withRoleTableBotton,
  exportFile,
  exportSelectFile
} from 'yss-biz';
// const { mapOption } = SearchForm;
class Detailed extends PureComponent {
  state = {
    ids: []
  };

  render() {
    const { relationList, relationCol } = this.props;
    /***查询Input按钮 */

    const columns = [...setColumns(relationCol)];

    /***按钮组***/
    const ButtonType = [
      // {
      //   name: '刷新',
      //   roule: 'true',
      //   noAuth: true,
      //   func: this.toRefresh
      // },
      {
        name: '导出',
        roule: 'true',
        noAuth: true,
        children: [
          {
            name: '导出全部',
            func: this.exportAll
          },
          // {
          //   name: '导出当前页',
          // },
          {
            name: '导出选择项',
            func: this.exportSelected
          }
        ]
      }
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
      hideOnSinglePage: true
    };

    /***点击索引获取行的ID** */
    let rowSelection = rowSelectionFunc.call(this);

    return (
      <>
        <Row style={{ marginTop: '8px' }}>
          <Row>{withRoleBotton(ButtonType, this.props.btnAuth)}</Row>
          <ConfigableTable
            {...setTableInfo({
              columns,
              dataSource: relationList,
              rowSelection,
              rowKey: 'id',
              pagination,
              height: 260
            })}
            bordered={true}
            onRow={record => {
              return {
                onDoubleClick: event => {
                  // this.viewBelieve(event, record);
                }
              };
            }}
          />
        </Row>
      </>
    );
  }

  // 刷新
  toRefresh = () => {
    const { rowed } = this.props;
    // let arr = Object.keys(rowed);
    if (rowed.length > 1) {
      // asyncHttpGetAboutList && asyncHttpGetAboutList(rowed);
      this.toEmptySelect();
    }
  };

  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  /*导出当前*/
  // exportCurrent = () => {
  //   const { aboutElement } = this.props
  //   exportFile(
  //     '/bmtp-settle--manage/distribution/offlineDistrInstruct/export/condition',
  //     filterNullElement(aboutElement),
  //     '网下分销指令信息',
  //     false
  //   )
  // }

  /*导出全部*/
  exportAll = () => {
    // const { aboutElement } = this.props
    exportFile(
      '/bmtp-settle-manage/distribution/offlineDistrInstruct/export/condition',
      filterNullElement({}),
      '网下分销指令信息',
      true
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    let arr = [];
    this.state.ids.map(item => arr.push(item.id));
    exportSelectFile(
      '/bmtp-settle-manage/distribution/offlineDistrInstruct/export/selected',
      arr,
      '网下分销指令信息',
      true
    );
    this.toEmptySelect();
  };
}

export default Detailed;
