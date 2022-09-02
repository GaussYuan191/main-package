import React, { PureComponent, Fragment } from 'react';
import {
  // withRoleBotton,
  SearchForm,
  setTableInfo,
  ConfigableTable,
  setColumns,
  getTaskTime
} from 'yss-biz';
import ReadFile from './readFile';
import './style.less';
import moment from 'moment';
const { mapOption } = SearchForm;

class ReadData extends PureComponent {
  render() {
    const {
      dataList,
      readDataColumns,
      queryElement,
      toReasetSearch,
      changeQueryElement,
      treeData
    } = this.props;
    // 表单
    const columns = [
      ...setColumns(readDataColumns),
      {
        title: '读取人',
        width: 150,
        dataIndex: 'createUserName',
        key: 'createUserName',
        render: (text, record, index) => {
          return record.updateUserName ? record.updateUserName : record.createUserName;
        }
      },
      {
        title: '读取时间',
        width: 150,
        dataIndex: 'createTime',
        key: 'createTime',
        render: value => {
          let date = getTaskTime(value);
          return moment(date).format('YYYY-MM-DD  HH:mm:ss');
        }
      },
      {
        title: '上次读取时间',
        width: 150,
        dataIndex: 'lstcreateTime',
        key: 'lstcreateTime',
        render: value => {
          return moment(value).format('YYYY-MM-DD  HH:mm:ss');
        }
      }
    ];

    let apiOptions = [];
    treeData.map(item => {
      apiOptions.push(...item.children);
    });

    /*设置查询*/
    let SearchformItem = [
      {
        name: 'apiName',
        label: '接口名称',
        type: 'Select',
        props: {
          placeholder: '请输入接口名称',
          allowClear: true,
          onChange(value) {
            changeQueryElement({
              value: value,
              type: 'inferSeclevCode'
            });
          }
        },
        options: mapOption(apiOptions, 'title', 'key')
      },
      {
        name: 'dataStatus',
        label: '读取状态',
        type: 'Select',
        props: {
          placeholder: '请选择数据状态',
          allowClear: true,
          getDics: 1030205,
          onChange(value) {
            // 数据读取状态，0读取中 1 读取成功 2 读取失败
            changeQueryElement({ value: value, type: 'uploadStatus' });
          }
        }
      }
    ];

    // const ButtonType = [
    //   {
    //     name: '读取数据',
    //     roule: 'true',
    //     // icon: 'form',
    //     func: () => {
    //       // openFormModal({status:true})
    //     }
    //   }
    // ];

    /***表格分页***/
    const pagination = {
      onChange: (page, pageSize) => {
        this.searchPage(page, pageSize);
      },
      onShowSizeChange: (current, size) => {
        this.searchPage(current, size);
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: queryElement.reqPageSize,
      total: dataList.total,
      current: queryElement.reqPageNum
    };

    return (
      <Fragment>
        <div style={{ padding: '8px' }}>
          <ReadFile {...this.props} />
          <div className="taskListTitle">任务列表</div>
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
            handleReset={() =>
              toReasetSearch({
                reqPageSize: queryElement.reqPageSize,
                reqPageNum: queryElement.reqPageNum
              })
            }
          />
          {/* {withRoleBotton(ButtonType,this.props.btnAuth)} */}
          <ConfigableTable
            {...setTableInfo({
              columns: columns,
              dataSource: dataList.list,
              pagination,
              height: 450
            })}
            border
          />
        </div>
      </Fragment>
    );
  }

  /**查询* */
  query = () => {
    const { asyncHttpGetList } = this.props;
    asyncHttpGetList({ reqPageNum: 1 });
  };

  /**分页查询*/
  searchPage = async (page, pageSize) => {
    const { asyncHttpGetList, changeQueryElement } = this.props;
    changeQueryElement({ type: 'reqPageNum', value: page });
    changeQueryElement({ type: 'reqPageSize', value: pageSize });
    await asyncHttpGetList({});
  };
}

export default ReadData;
