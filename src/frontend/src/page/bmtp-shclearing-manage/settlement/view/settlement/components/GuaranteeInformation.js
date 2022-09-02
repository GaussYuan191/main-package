// 担保信息
import React, { Component } from 'react';
import { ConfigableTable, setTableInfo } from 'yss-biz';

class GuaranteeInformation extends Component {
  render() {
    const pagination = {
      onChange: (page, pageSize) => {
        const { asyncHttpSearcAboutDBList, rowed } = this.props;
        // this.searchAccountByCondition(page, pageSize);
        asyncHttpSearcAboutDBList({
          params: { ...rowed, reqPageNum: page, reqPageSize: pageSize }
        });
      },
      onShowSizeChange: (current, size) => {
        const { asyncHttpSearcAboutDBList, rowed } = this.props;
        // this.searchAccountByCondition(current, size);
        asyncHttpSearcAboutDBList({
          params: { ...rowed, reqPageNum: current, reqPageSize: size }
        });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      }
    };
    const { guaranteeInformation } = this.props;

    return (
      <div>
        <div style={{ marginTop: '8px' }}></div>
        <ConfigableTable
          scroll={{ x: 1500 }}
          {...setTableInfo({
            columns: guaranteeInformation.columns,
            dataSource: guaranteeInformation.dataSource,
            pagination,
            height: 260
          })}
        />
      </div>
    );
  }
}
export default GuaranteeInformation;
