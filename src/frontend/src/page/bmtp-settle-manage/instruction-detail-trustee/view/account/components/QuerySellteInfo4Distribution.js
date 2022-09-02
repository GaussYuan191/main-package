/**
 * 查询结算指令信息对话框表单-分销
 */
import React from 'react';
import { NormalForm } from 'yss-biz';

const querySellteInfo4Distribution = cb => {
  const formItem = [
    {
      name: 'tradeId',
      label: '成交编号',
      type: 'Input',
      props: {
        placeholder: '请输入成交编号',
        onChange(e) {
          cb({ tradeId: e.target.value });
        }
      },
      rules: [{ required: true, message: '成交编号不能为空' }]
    },
    {
      name: 'settleInstitution',
      label: '结算机构',
      type: 'Select',
      props: {
        placeholder: '请选择结算机构',
        getDics: 1030404,
        onChange(value) {
          cb({ settleInstitution: value });
        }
      },
      rules: [{ required: true, message: '结算机构不能为空' }]
    }
  ];
  return (
    <NormalForm formItem={formItem} labelSize="6em" itemSize="280px" lineOf="1" refs={ref => {}} />
  );
};

export default querySellteInfo4Distribution;
