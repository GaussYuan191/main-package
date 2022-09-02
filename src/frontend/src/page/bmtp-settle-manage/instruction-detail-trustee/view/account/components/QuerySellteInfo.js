import React from 'react';
// import { Table } from 'antd';
import { NormalForm } from 'yss-biz';

const querySellteInfo = cb => {
  // const me = this;
  const formItem = [
    {
      name: 'execCode',
      label: '源成交编号',
      type: 'Input',
      props: {
        placeholder: '请输入源成交编号',
        onChange(e) {
          cb({ execCode: e.target.value });
        }
      }
    },
    {
      name: 'instituion',
      label: '结算机构',
      type: 'Select',
      props: {
        placeholder: '请选择结算机构',
        getDics: 1030404,
        onChange(value) {
          cb({ instituion: value });
        }
      }
    }
  ];
  return (
    <NormalForm formItem={formItem} labelSize="6em" itemSize="280px" lineOf="1" refs={ref => {}} />
  );
};

export default querySellteInfo;
