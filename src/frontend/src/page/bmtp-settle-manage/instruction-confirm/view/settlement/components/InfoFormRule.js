import React, { Fragment, PureComponent } from 'react';
import {
  // NormalForm,
  setTableInfo,
  ConfigableTable,
  Modal,
  setColumns,
  withRoleTableBotton
} from 'yss-biz';
import { Input } from 'antd';
import ZJDCashModal from './ZJDCashModal';
import ZJDPledgeModal from './ZJDPledgeModal';
import ZJDOutrightModal from './ZJDOutrightModal';
import ShQSCashModal from './ShQSCashModal';
import ShQsPledgeModal from './ShQsPledgeModal';
import ShQsOutrightModal from './ShQsOutrightModal';

const { TextArea } = Input;
class InfoFormRule extends PureComponent {
  list = [];
  state = {
    remarkValue: '',
    isOpenmModal: false,
    settleInstitution: '', //结算机构
    bizCategory: '', //业务类别,
    rowData: null
  };
  componentDidMount() {
    this.props.onRef(this);
  }
  render() {
    const tableModalCol = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        width: 100
      },
      {
        title: '管理人',
        dataIndex: 'consignorName',
        width: 150
      },
      {
        title: '产品',
        dataIndex: 'productName',
        width: 150
      },
      {
        title: '结算指令/成交编号',
        dataIndex: 'tradeId',
        width: 160
      },
      {
        title: '结算日期/首次结算日期',
        dataIndex: 'firstSettleDate',
        width: 260
      },
      {
        title: '业务品种',
        dataIndex: 'bizCategoryName',
        width: 160
      },
      {
        title: '交易方向',
        dataIndex: 'entrustSideName',
        width: 160
      },
      {
        title: '本方资金状态',
        dataIndex: 'ownFundStatus',
        width: 260
      },
      {
        title: '本方债券状态',
        dataIndex: 'ownBondStatus',
        width: 160
      },
      {
        title: '对手方状态',
        dataIndex: 'offsetTradeStatusName',
        width: 160
      }
    ];

    const columns = [
      ...setColumns(tableModalCol),
      // {
      //   title: '操作',
      //   key: 'operation',
      //   width: 200,
      //   fixed: 'right',
      //   align: 'center',
      //   render: row => withRoleTableBotton(ButtonTableType, { children: [] })(row)
      // }
    ];

    // const ButtonTableType = [
    //   {
    //     name: '查看详情',
    //     icon: '',
    //     noAuth: true,
    //     width: 150,
    //     func: (e, row) => {
    //       this.setState({
    //         rowData: row,
    //         settleInstitutionName: row.settleInstitutionName,
    //         bizCategory: row.bizCategory,
    //         isOpenmModal: true
    //       });
    //     }
    //   }
    // ];

    const { modalData } = this.props.instructionTable || {};
    return (
      <Fragment>
        <ConfigableTable
          {...setTableInfo({
            columns,
            dataSource: modalData,
            pagination: { hideOnSinglePage: false },
            height: 400
          })}
        />
        <div style={{ marginBottom: '10px', borderBottom: '1px solid #6b7286' }}></div>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '20px' }}>批量确认备注</div>
          <div style={{ flex: 1 }}>
            <TextArea rows={4} onChange={this.onChangeRemark} />
          </div>
        </div>

        <Modal
          width={1220}
          title="指令详情"
          destroyOnClose={true}
          visible={this.state.isOpenmModal}
          onCancel={() => {
            this.setState({
              settleInstitution: '',
              bizCategory: '',
              isOpenmModal: false
            });
          }}
          onOk={() => {
            this.setState({
              settleInstitution: '',
              bizCategory: '',
              isOpenmModal: false
            });
          }}
        >
          {/* TODO 分离上清中债*/}
          {this.state.settleInstitutionName == '中债登' ? (
            this.state.bizCategory == 'BT01' ? (
              <ZJDCashModal title={'现券'} rowData={this.state.rowData} {...this.props} />
            ) : this.state.bizCategory == 'BT02' ? (
              <ZJDPledgeModal title={'质押式'} rowData={this.state.rowData} {...this.props} />
            ) : (
              <ZJDOutrightModal title={'买断式'} rowData={this.state.rowData} {...this.props} />
            )
          ) : this.state.bizCategory == '1' ? (
            <ShQSCashModal title={'现券'} rowData={this.state.rowData} {...this.props} />
          ) : this.state.bizCategory == '2' ? (
            <ShQsPledgeModal title={'质押式'} rowData={this.state.rowData} {...this.props} />
          ) : (
            <ShQsOutrightModal title={'买断式'} rowData={this.state.rowData} {...this.props} />
          )}
        </Modal>
      </Fragment>
    );
  }

  onChangeRemark = e => {
    this.setState({
      remarkValue: e.target.value
    });
  };

  // //点击确定进行增加修改操作
  handleSubmit = async e => {
    const {
      asyncHttpSetBatchConfirmInstruction,
      bactchInstructionFail,
      instructionTable,
      isOpenFormModal,
      openFormModal
    } = this.props;
    let { modalData } = instructionTable;
    if (isOpenFormModal.type == 'affirm') {
      modalData = modalData.map(item => {
        item.remark = this.state.remarkValue;
        return item;
      });
      await asyncHttpSetBatchConfirmInstruction({
        type: "SQS",
        params: modalData,
        cb: (status, data) => {
          bactchInstructionFail && bactchInstructionFail(status, data);
        }
      });
    } else {
      openFormModal({ status: false });
    }
  };
}

export default InfoFormRule;
