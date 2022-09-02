// 执行日志
import React, { Component } from 'react';
import { Tabs } from 'antd';
import { SearchForm, Modal } from 'yss-biz';
import LogModalTable from './BondSubsidiaryC';
import ExecuteDetail from './ExecuteDetailModal';
const { TabPane } = Tabs;
export default class BondSubsidiary extends Component {
  render() {
    const { isOpenDetailModal, changeDetailModal } = this.props;

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
        <Tabs
          defaultActiveKey="1"
          className={` darkStyle`}
          onChange={active => {
            this.changeAboutActive(active);
          }}
        >
          <TabPane tab={`日志(${1})`} key="1">
            <LogModalTable {...this.props} />
          </TabPane>
          <TabPane tab={`成功(${3})`} key="2">
            <LogModalTable {...this.props} />
          </TabPane>
          <TabPane tab={`失败(${5})`} key="3">
            <LogModalTable {...this.props} />
          </TabPane>
          <TabPane tab={`警告(${2})`} key="4">
            <LogModalTable {...this.props} />
          </TabPane>
        </Tabs>

        <Modal
          visible={isOpenDetailModal}
          width={1100}
          title="执行详情"
          onCancel={() => {
            changeDetailModal(false);
          }}
          onOk={() => {
            changeDetailModal(false);
          }}
        >
          <ExecuteDetail {...this.props}></ExecuteDetail>
        </Modal>
      </>
    );
  }

  componentDidMount() {
    // const { asyncHttpDailyKnotsLogList } = this.props;
    // await asyncHttpDailyKnotsLogList({ type: 'activeC' })
  }

  /***切换关联 */
  changeAboutActive = async active => {
    const { changeAboutActive } = this.props;
    await changeAboutActive({ type: 'activeC', value: active });
    // await asyncHttpDailyKnotsLogList({ type: 'activeC' })
  };
}
