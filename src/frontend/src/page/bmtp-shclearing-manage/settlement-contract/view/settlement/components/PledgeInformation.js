// 担保信息
import React, { Component } from 'react';
import { setTableInfo, ConfigableTable } from 'yss-biz';
class PledgeInformation extends Component {
  render() {
    const { dbTable } = this.props;

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 60
      },
      {
        title: '回购方向',
        dataIndex: 'entrustSideName',
        key: 'entrustSideName',
        width: 120
      },
      {
        title: '质押方式',
        dataIndex: 'guaranteeModeName',
        key: 'guaranteeModeName',
        width: 140
      },
      {
        title: '质押券代码',
        dataIndex: 'bondCode',
        key: 'bondCode',
        width: 140
      },
      {
        title: '质押券简称',
        dataIndex: 'bondShortName',
        key: 'bondShortName',
        width: 150
      },
      {
        title: '质押券券面总额（万元）',
        dataIndex: 'bondAmount',
        key: 'bondAmount',
        width: 150
      },
      {
        title: '质押金金额(元)',
        dataIndex: 'depositAmount',
        key: 'depositAmount',
        width: 150
      },
      {
        title: '质押金保管地',
        dataIndex: 'depositPlaceName',
        key: 'depositPlaceName',
        width: 150
      }
    ];

    /***表格分页***/
    const pagination = {
      onChange: (page, pageSize) => {
        const { asyncHttpAboutBZfo, rowed } = this.props;
        asyncHttpAboutBZfo({
          params: { ...rowed, reqPageNum: page, reqPageSize: pageSize }
        });
      },
      onShowSizeChange: (current, size) => {
        const { asyncHttpAboutBZfo, rowed } = this.props;
        asyncHttpAboutBZfo({
          params: { ...rowed, reqPageNum: current, reqPageSize: size }
        });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      }
    };
    return (
      <div>
        <ConfigableTable
          {...setTableInfo({
            columns: columns,
            dataSource: dbTable && dbTable.list,
            pagination,
            height: 260
          })}
          scroll={{ x: 1500 }}
        />
      </div>
    );
  }
}
export default PledgeInformation;
