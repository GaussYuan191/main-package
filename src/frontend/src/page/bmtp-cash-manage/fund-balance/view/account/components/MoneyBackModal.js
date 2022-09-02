import React, { Component } from 'react';
import { Modal, Input } from 'antd';
import { modalInfo } from 'yss-biz';
import { ConfigableTable, NormalForm, setColumns, setTableInfo } from 'yss-biz';
import 'yss-biz/common/style/customAntd.less';

class MoneyBackModal extends Component {
  ButtonTableType = [
    {
      name: '删除',
      roule: true,
      func: () => {}
    }
  ];
  state = {
    remark: '' //备注
  };
  render() {
    const { batchRefundCol, batchRefundList, isOpenFormModal, currentTradeDate } = this.props;
    const columns = [
      ...setColumns(batchRefundCol),
      {
        title: '提款金额(元)',
        dataIndex: 'drawingMoney',
        key: 'drawingMoney',
        width: 160,
        ellipsis: true,
        render: (value, recored) => {
          const { id: rowId } = recored;
          return (
            <Input
              type="number"
              value={value}
              onChange={e => {
                const inputValue = e.target.value;
                this.props.changeMoneyByEdit({ value: inputValue, rowId });
              }}
            />
          );
        }
      },
      {
        title: '提款后可用余额(元)',
        dataIndex: 'drawingAfterMoney',
        key: 'drawingAfterMoney',
        width: 160,
        ellipsis: true
      },
      {
        title: '提款后总余额(元)',
        dataIndex: 'drawingAfterTotalMoney',
        key: 'drawingAfterTotalMoney',
        width: 180,
        ellipsis: true
      },
      {
        title: '当前可用余额(元)',
        dataIndex: 'usableAmount',
        key: 'usableAmount',
        width: 120,
        ellipsis: true
      },
      {
        title: '当前锁定余额(元)',
        dataIndex: 'lockedAmount',
        key: 'lockedAmount',
        width: 120,
        ellipsis: true
      },
      {
        title: '当前总余额(元)',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        width: 180,
        ellipsis: true
      }
      // {
      //   title: '操作',
      //   key: 'operation',
      //   width: 170,
      //   fixed: 'right',
      //   align: 'center',
      //   render: row => {
      //     let btns = withRoleTableBotton(this.ButtonTableType)(row);
      //     return btns;
      //   }
      // }
    ];
    const me = this;

    let formItem = [
      {
        name: 'tradeType',
        label: '回款类型',
        type: 'Input',
        props: {
          placeholder: '日间提款',
          disabled: true
        }
      },
      {
        name: 'actualTradeAmount',
        label: '币种',
        type: 'Input',
        props: {
          placeholder: '人民币',
          disabled: true
        }
      },
      {
        name: 'actualTradeAmount1',
        label: '提款金额(元)',
        type: 'InputPart',
        props: {
          placeholder: '请输入提款金额',
          type: 'InputNumber',
          onChange: value => {
            this.props.changeMoney({ value: value + '' });
          }
        }
      },

      {
        name: 'actualTradeAmount2',
        label: '业务日期',
        type: 'Input',
        props: {
          placeholder: currentTradeDate,
          disabled: true
        }
      },

      {
        name: 'actualTradeAmount3',
        label: '备注',
        type: 'Input',
        props: {
          placeholder: '备注请输入备注 ',
          onChange(e) {
            me.setState({
              remark: e.target.value
            });
          }
        }
      }
    ];

    // let rowSelection = rowSelectionFunc.call(this);

    return (
      <Modal
        {...modalInfo}
        width={1260}
        title="批量回款设置"
        visible={isOpenFormModal.sign == 'batch'}
        onOk={this.submission}
        onCancel={() => {
          const { openFormModal } = this.props;
          openFormModal({
            sign: ''
          });
        }}
      >
        <NormalForm
          formItem={formItem}
          labelSize="10em"
          itemSize="200px"
          lineOf="3"
          refs={ref => {}}
        />
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: batchRefundList,
            // rowSelection,
            rowKey: 'id',
            height: 300,
            pagination: { hideOnSinglePage: false }
          })}
        />
      </Modal>
    );
  }

  submission = async () => {
    const { batchRefundList, asyncHttpBatchReturnedMoney, openFormModal, toEmptyRow } = this.props;
    let arr = [];
    let notReturnedMoneyArray = [];

    batchRefundList.map(item => {
      if (item.drawingMoney) {
        arr.push({
          actualTradeAmount: item.drawingMoney,
          assetAccount: item.assetAccount,
          assetAccountName: item.assetAccountName,
          assetAccountSn: item.assetAccountSn,
          assetAccountType: item.accountType,
          id: item.id,
          productName: item.productName,
          productId: item.productId,
          remark: this.state.remark
        });
      } else {
        notReturnedMoneyArray.push(item);
      }
    });

    let notReturnedMoneyProductNameString = '';

    notReturnedMoneyArray.forEach(item => {
      notReturnedMoneyProductNameString += item.productName + '、';
    });

    if (notReturnedMoneyArray.length > 0) {
      Modal.confirm({
        title: '注意',
        content: `当前产品${notReturnedMoneyProductNameString}，没有输入相关的提款金额，您确定要提交么？`,
        onOk: async close => {
          await asyncHttpBatchReturnedMoney(arr).then(() => {
            toEmptyRow();
            openFormModal({
              sign: ''
            });
          });
          close();
        }
      });
    } else {
      await asyncHttpBatchReturnedMoney(arr).then(() => {
        toEmptyRow();
        openFormModal({
          sign: ''
        });
      });
    }
  };
}

export default MoneyBackModal;
