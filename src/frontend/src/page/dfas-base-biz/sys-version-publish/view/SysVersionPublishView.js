/**
 * 系统版本发布信息表 View
 * @author jianshengxiong
 */

import React from 'react';
import SysVersionPublishController from '../controller/SysVersionPublishController';

import { BizTable } from 'bmtp-trade-base';
import SearchForm from './SearchForm';
import { sysVersionPublishCols } from './table-columns';
import '../style/sys-version-publish.css';

class SysVersionPublishView extends SysVersionPublishController {
  render() {
    const expandable = {
      defaultExpandAllRows: true,
      expandedRowRender: record => {
        return (
          <div>
            <span>版本说明</span>
            <br />
            <span className="comment" style={{ margin: 0 }}>
              {record.publishInfo}
            </span>
          </div>
        );
      }
    };
    return (
      <div className="version-publish">
        <SearchForm
          wrappedComponentRef={ref => (this.$searchForm = ref)}
          handleSearch={() => this.getVersionPageList()}
          {...this.props}
        />

        <BizTable
          key={new Date().getTime()}
          className="stripe-table inner-tale"
          scollX={true}
          scollY={document.body.clientHeight - 137}
          columns={sysVersionPublishCols}
          defaultExpandAllRows
          {...expandable}
          activeKeys="1"
          dataSource={this.state.versionPageList}
          total={this.state.versionTotal}
          loadData={(page, pageSize) => this.getVersionPageList(page, pageSize)}
          pagination={{
            defaultPageSize: 20
          }}
          ref={ref => (this.$versionTable = ref)}
        />
      </div>
    );
  }
}

export default SysVersionPublishView;
