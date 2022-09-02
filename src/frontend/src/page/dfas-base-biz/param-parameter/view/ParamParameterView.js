/**
 * 参数表 View
 * @author jianshengxiong
 */

import React from 'react';
import ParamParameterController from '../controller/ParamParameterController';
import { Modal } from 'antd';
import { BizTable } from 'bmtp-trade-base';
import { getParamParameterCols } from './ParamParameterCols';
import ParamParameterModal from './ParamParameterModal';
import ParamParameterSearchForm from './ParamParameterSearchForm';
import '../style/ParamParameter.css';
import ParamParameterLogView from '../../param-parameter-log/view/ParamParameterLogView';

class ParamParameterView extends ParamParameterController {
  render() {
    return (
      <div className="main">
        <ParamParameterSearchForm
          wrappedComponentRef={ref => (this.$searchForm = ref)}
          handleSearch={() => this.getParamParameterPageList()}
        />

        <ParamParameterModal
          {...this.state}
          ref={ref => (this.$paramParameterModal = ref)}
          loadData={this.getParamParameterPageList}
        />

        <Modal
          title="参数日志"
          destroyOnClose={true}
          width={1080}
          maskClosable={false}
          visible={this.state.showLog}
          onCancel={this.closeLog}
          footer={null}
          centered
        >
          <ParamParameterLogView
            {...this.state}
            ref={ref => (this.$logViewModal = ref)}
            loadData={this.getParamParameterPageList}
          />
        </Modal>

        <BizTable
          className="stripe-table"
          scollX={true}
          scollY={document.body.clientHeight - 137}
          columns={getParamParameterCols(this)}
          activeKeys="1"
          dataSource={this.state.pageList}
          total={this.state.total}
          loadData={(page, pageSize) => this.getParamParameterPageList(page, pageSize)}
          pagination={{
            defaultPageSize: 20
          }}
          ref={ref => (this.$paramParameterTable = ref)}
        />
      </div>
    );
  }
}

export default ParamParameterView;
