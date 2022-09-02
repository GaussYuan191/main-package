// 担保信息
import React, { Component } from 'react';
import { setTableInfo, ConfigableTable } from 'yss-biz';
class GuaranteeInformation extends Component {
  render() {
    const { dbTable } = this.props;

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
      {
        title: '正/逆回购保证券',
        dataIndex: 'pledgeType',
        key: 'pledgeType',
        width: 140,
        render: text => {
          if (text == 'ZYQ') {
            return '质押券';
          } else if (text == 'DBQ_ZHG') {
            return '正回购保证券';
          } else if (text == 'DBQ_NHG') {
            return '逆回购保证券';
          }
        }
      },
      {
        title: '保证券代码',
        dataIndex: 'productCode',
        key: 'productCode',
        width: 140
      },
      {
        title: '保证券简称',
        dataIndex: 'productName',
        key: 'productName',
        width: 150
      },
      {
        title: '保证券券面总额（万元）',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 150
      }
    ];

    /***表格分页***/
    const pagination = {
      // onChange: (page, pageSize) => {
      //   const { asyncHttpAboutBZfo, rowed } = this.props;
      //   // this.searchAccountByCondition(page, pageSize);
      //   asyncHttpAboutBZfo({
      //     params: { ...rowed, reqPageNum: page, reqPageSize: pageSize }
      //   });
      // },
      // onShowSizeChange: (current, size) => {
      //   const { asyncHttpAboutBZfo, rowed } = this.props;
      //   // this.searchAccountByCondition(current, size);
      //   asyncHttpAboutBZfo({
      //     params: { ...rowed, reqPageNum: current, reqPageSize: size }
      //   });
      // },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      }
    };
    return (
      <div>
        <ConfigableTable
          style={{ marginTop: '10px' }}
          {...setTableInfo({
            columns: columns,
            dataSource: dbTable && dbTable.list,
            pagination,
            height: 240
          })}
        />
      </div>
    );
  }
}
export default GuaranteeInformation;
