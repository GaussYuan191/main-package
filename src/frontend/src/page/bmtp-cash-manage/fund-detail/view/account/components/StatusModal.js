import React, { Component } from 'react';
import { modalInfo, Modal, NormalForm } from 'yss-biz';
import 'yss-biz/common/style/customAntd.less';
import './style.less';

class CapitalAdjustment extends Component {
  render() {
    const { rowed, modalVal } = this.props;
    let formItem = [
      {
        name: 'tradeType',
        label: '产品名称',
        type: 'Input',
        itemSize: '240px',

        props: {
          placeholder: rowed.productName,
          disabled: true
        }
      },
      {
        name: 'tradeTypeName',
        label: '交易类型',
        type: 'Input',
        itemSize: '240px',

        props: {
          placeholder: rowed.tradeTypeName,
          disabled: true
        }
      },
      {
        name: 'productName',
        label: '交易日期',
        type: 'Input',
        itemSize: '240px',

        props: {
          placeholder: rowed.tradeTime,
          disabled: true
        }
      },
      {
        name: 'paymentAccount',
        label: '付款方账号',
        type: 'Input',
        itemSize: '240px',
        props: {
          placeholder: rowed.paymentAccount,
          getDics: '1030404',
          disabled: true
        }
      },
      {
        name: 'beneficiaryAccount',
        label: '收款方账号',
        type: 'Input',
        itemSize: '240px',

        props: {
          disabled: true,
          placeholder: rowed.beneficiaryAccount
        }
      },
      {
        name: 'actualTradeAmount',
        label: '划款金额(元)',
        type: 'Input',
        itemSize: '240px',
        props: {
          placeholder: rowed.actualTradeAmount,
          disabled: true
        }
      },
      {
        name: 'paymentAccountName',
        label: '付款方名称',
        type: 'Input',
        itemSize: '240px',
        props: {
          disabled: true,
          placeholder: rowed.paymentAccountName
        }
      },
      {
        name: 'beneficiaryAccountName',
        label: '收款方名称',
        type: 'Input',
        itemSize: '240px',
        props: {
          placeholder: rowed.beneficiaryAccountName,
          disabled: true
        }
      },
      {
        name: 'assetAccountSn',
        label: '批次号',
        type: 'Input',
        itemSize: '240px',
        props: {
          // placeholder: rowed.recordCode,
          placeholder: modalVal.batchNo,
          disabled: true
        }
      },
      {
        name: 'transferInstructCode',
        label: '划款指令编号',
        type: 'Input',
        itemSize: '240px',
        props: {
          placeholder: rowed.transferInstructCode,
          disabled: true
        }
      },
      {
        name: 'transferCommandStateName',
        label: '划款指令状态',
        type: 'Input',
        itemSize: '240px',

        props: {
          placeholder: rowed.transferCommandStateName,
          disabled: true
        }
      },
      {
        name: 'transferStateName',
        label: '划款状态',
        type: 'Input',
        itemSize: '240px',
        props: {
          placeholder: rowed.transferStateName,
          disabled: true
        }
      }
    ];
    const { isOpenFormModal } = this.props;
    return (
      <Modal
        {...modalInfo}
        width="1260px"
        title="划款状态明细"
        visible={isOpenFormModal.status && isOpenFormModal.type == 'see'}
        onOk={() => {
          const { openFormModal } = this.props;
          openFormModal({ type: '', status: false });
        }}
        cancelButtonProps={{
          style: {
            display: 'none'
          }
        }}
      >
        <div className="content_capitalAdjustment">
          <div>
            <NormalForm lineOf="3" formItem={formItem} labelSize="9em" refs={ref => {}} />
          </div>
        </div>
      </Modal>
    );
  }
  componentDidMount() {}
}

export default CapitalAdjustment;
