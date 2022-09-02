// 质押券信息
import React, { Component } from 'react';
import { setTableInfo, ConfigableTable, setColumns } from 'yss-biz';
class PledgeInformation extends Component {
  render() {
    const { zjTable, rowed } = this.props;

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 60
      },
      // {
      //   title: '回购方向',
      //   dataIndex: 'pledgeType',
      //   key: 'pledgeType',
      //   width: 140
      // },
      // {
      //   title: '质押券类型',
      //   dataIndex: 'pledgeType',
      //   key: 'pledgeType',
      //   width: 140,
      //   render: text => {
      //     if (text == 'ZYQ') {
      //       return '质押券';
      //     } else if (text == 'DBQ_ZHG') {
      //       return '正回购质押券';
      //     } else if (text == 'DBQ_NHG') {
      //       return '逆回购质押券';
      //     }
      //   }
      // },
      {
        title: '质押券代码',
        dataIndex: 'productCode',
        key: 'productCode',
        width: 140
      },
      {
        title: '质押券简称',
        dataIndex: 'productName',
        key: 'productName',
        width: 150
      },
      {
        title: '质押券券面总额（万元）',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 150
      },
      {
        title: '质押比例',
        dataIndex: 'pledgeRate',
        key: 'pledgeRate',
        width: 150
      }
    ];

    /***表格分页***/
    const pagination = {
      // onChange: (page, pageSize) => {
      //   const { asyncHttpAboutZJInfo, rowed } = this.props;
      //   asyncHttpAboutZJInfo({
      //     params: { ...rowed, reqPageNum: page, reqPageSize: pageSize }
      //   });
      // },
      // onShowSizeChange: (current, size) => {
      //   const { asyncHttpAboutZJInfo, rowed } = this.props;
      //   asyncHttpAboutZJInfo({
      //     params: { ...rowed, reqPageNum: current, reqPageSize: size }
      //   });
      // },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      }
    };
    // 债券借贷下, 债券明细接口第1条为债券明细, 2-n条为质押券信息
    const dataSource = rowed.bizCategory == '8' ? zjTable.list.slice(1) : zjTable.list;
    return (
      <div>
        <ConfigableTable
          style={{ marginTop: '10px' }}
          {...setTableInfo({
            columns: setColumns(columns),
            dataSource,
            rowKey: 'productCode',
            pagination,
            height: 240
          })}
        />
      </div>
    );
  }
}
export default PledgeInformation;
