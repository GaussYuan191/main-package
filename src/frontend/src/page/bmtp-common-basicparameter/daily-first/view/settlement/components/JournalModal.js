// 执行日志
import React, { Component } from 'react';
import { Tabs } from 'antd';
import { setColumns, ConfigableTable, SearchForm } from 'yss-biz';
const { TabPane } = Tabs;
export default class BondSubsidiary extends Component {
  render() {
    const { aboutTable } = this.props;
    /***table按钮组***/
    // const ButtonTableType = [
    //   {
    //     name: '执行详情',
    //     roule: true,
    //     icon: 'diff'
    //     // func: this.updateBondItem
    //   }
    // ];

    /*设置查询*/
    let SearchformItem = [
      {
        name: 'type3',
        label: '结算日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择结算日期',
          allowClear: true
          // onChange (value) {
          //   changeQueryElement({ value:value? value.format('YYYY-MM-DD'):"",type:"settleDate" });
          // }
        }
      }
    ];
    const col = [
      ...setColumns(aboutTable.col)
      // {
      //   title: '操作',
      //   key: 'operation',
      //   width: 80,
      //   fixed: 'right',
      //   align: 'center',
      //   render: item => withRoleTableBotton(ButtonTableType)(item)
      // }
    ];
    return (
      <>
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
        />
        <Tabs defaultActiveKey="1" className={` darkStyle`}>
          <TabPane tab="日志(1)" key="1">
            <ConfigableTable
              style={{ marginTop: '10px' }}
              dataSource={aboutTable.list}
              columns={col}
            />
          </TabPane>
          <TabPane tab="成功(5)" key="2">
            <ConfigableTable
              style={{ marginTop: '10px' }}
              dataSource={aboutTable.list}
              columns={col}
            />
          </TabPane>
          <TabPane tab="失败(1)" key="3">
            <ConfigableTable
              style={{ marginTop: '10px' }}
              dataSource={aboutTable.list}
              columns={col}
            />
          </TabPane>
          <TabPane tab="警告(1)" key="4">
            <ConfigableTable
              style={{ marginTop: '10px' }}
              dataSource={aboutTable.list}
              columns={col}
            />
          </TabPane>
        </Tabs>
      </>
    );
  }
}
