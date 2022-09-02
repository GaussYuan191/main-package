/**
 * 参数操作日志表 View
 * @author jianshengxiong
 */

import React from 'react';
import ParamParameterLogController from '../controller/ParamParameterLogController';
import { BizTable } from 'bmtp-trade-base';
import { getParamParameterLogCols } from './ParamParameterLogCols';

class ParamParameterLogView extends ParamParameterLogController {
  render() {
    return (
      <div className="main">
        <BizTable
          className="stripe-table"
          scollX={true}
          scollY={document.body.clientHeight - 137}
          columns={getParamParameterLogCols(this)}
          activeKeys="1"
          dataSource={this.state.pageList}
          total={this.state.total}
          loadData={(page, pageSize) => this.getParamParameterLogPageList(page, pageSize)}
          pagination={{
            defaultPageSize: 20
          }}
          ref={ref => (this.$paramParameterLogTable = ref)}
        />
      </div>
    );
  }
}

export default ParamParameterLogView;
