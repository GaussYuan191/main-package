/**
 * 参数缓存 View
 * @author daizq
 */

import React from 'react';
import ParamCacheController from '../controller/ParamCacheController';
import SearchForm from './SearchForm';
import { BizTable } from 'bmtp-trade-base';
import { getParamCachecols } from './table-columns';
import '../styles/param-cache.css';

class ParamCacheView extends ParamCacheController {
  render() {
    return (
      <div className="param-cache">
        <SearchForm
          wrappedComponentRef={ref => (this.$searchForm = ref)}
          handleSearch={() => this.getParamCachePageList()}
          handleRefreshCache={this.handleRefreshCache}
          {...this.props}
        />

        <BizTable
          className="stripe-table"
          columns={getParamCachecols(this)}
          activeKeys="1"
          scollX={1300}
          scollY={document.body.clientHeight - 137}
          dataSource={this.state.paramCachePageList}
          total={this.state.paramCacheTotal}
          loadData={(page, pageSize) => this.getParamCachePageList(page, pageSize)}
          rowSelection
          pagination={{
            defaultPageSize: 20
          }}
          ref={ref => (this.$paramCacheTable = ref)}
        />
      </div>
    );
  }
}

export default ParamCacheView;
