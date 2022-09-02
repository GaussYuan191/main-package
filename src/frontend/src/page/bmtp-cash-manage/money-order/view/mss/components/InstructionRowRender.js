import React from 'react';
import { ConfigableTable, setTableInfo, fontColor } from 'yss-biz';

const expandedRowRender = (props, row) => {
  // const { asyncHttpQueryZLQf } = props;
  let { detailList } = row;
  detailList.map((item, idx) => (item.index = Number(idx + 1)));
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 50
    },
    { title: '产品', dataIndex: 'productName', key: 'productName', width: 150, ellipsis: true },
    {
      title: '收付款方向',
      dataIndex: 'transferDirectionName',
      key: 'transferDirectionName',
      width: 100
    },
    {
      title: '划款金额',
      dataIndex: 'transferAmount',
      key: 'transferAmount',
      width: 200,
      ellipsis: true
    },
    {
      title: '付款账号',
      dataIndex: 'paymentAccount',
      key: 'paymentAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '付款账号名称',
      dataIndex: 'paymentAccountName',
      key: 'paymentAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '付款账号开户行名称',
      dataIndex: 'paymentBankName',
      key: 'paymentBankName',
      width: 180,
      ellipsis: true
    },
    { title: '收款账号', dataIndex: 'beneficiaryAccount', key: 'beneficiaryAccount', width: 200 },
    {
      title: '收款账号户名',
      dataIndex: 'beneficiaryAccountName',
      key: 'beneficiaryAccountName',
      width: 180,
      ellipsis: true
    },
    {
      title: '收款账号开户行名称',
      dataIndex: 'beneficiaryBankName',
      key: 'beneficiaryBankName',
      width: 180,
      ellipsis: true
    },
    {
      title: '收款账号开户行联行号',
      dataIndex: 'beneficiaryBankCode',
      key: 'beneficiaryBankCode',
      width: 200
    },
    { title: '母账户账号', dataIndex: 'momAccount', key: 'momAccount', width: 200, ellipsis: true },
    {
      title: '母账户户名',
      dataIndex: 'momAccountName',
      key: 'momAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '母账户开户行名称',
      dataIndex: 'momBankName',
      key: 'momBankName',
      width: 200,
      ellipsis: true
    },
    {
      title: '母账户账号开户行联行号',
      dataIndex: 'momBankCode',
      key: 'momBankCode',
      width: 200,
      ellipsis: true
    }
  ];

  // let params = {
  //   ...page,
  //   depositOrganVal: '2', //托管机构2上清 1.中债3.托管行
  //   bizCategory: row.bizCategory, //业务类型
  //   execCode: row.tradeId, //成交编号
  //   tradeDirection: row.entrustSide //交易方向
  // };
  // asyncHttpQueryZLQf({ params })
  return (
    <ConfigableTable
      {...setTableInfo({ columns: columns, dataSource: detailList, scroll: { x: 100 } })}
      pagination={false}
      scroll={{ x: 0 }}
      locale={{
        emptyText: <span></span>
      }}
      footer={row.allData ? null : () => fontColor('包含未授权产品数据，请检查权限！', '#f5222d')}
    />
  );
};

export default expandedRowRender;
