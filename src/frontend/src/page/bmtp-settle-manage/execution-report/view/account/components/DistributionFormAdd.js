import React, { Component } from 'react';
import {
  NormalForm,
  ConfigableTable,
  SelectPage,
  selectPageRequest,
  withRoleTableBotton,
  compute
} from 'yss-biz';
import { Modal, Button, message, Select, Input, Icon, InputNumber, Spin, Popconfirm } from 'antd';
import moment from 'moment';
import debounce from 'lodash/debounce';
const { Option } = Select;

class CashSaleFormSplit extends Component {
  // constructor() {
  //   super();
  //   this.callSearch = debounce(this.callSearch, 500);
  // }
  state = {
    dataSource: [{ id: 1 }],
    faceValueList: [], //券面总额
    faceValueTotal: 0,
    totalAccruedInterestList: [], //应计利息总额
    totalAccruedInterestTotal: 0,
    tradeAmountList: [], //交易金额
    tradeAmountTotal: 0,
    settleAmountList: [], //结算金额
    settleAmountTotal: 0,
    tradeFeeList: [], //交易费用
    tradeFeeTotal: 0,
    settleFeeList: [], //结算费用
    settleFeeTotal: 0,
    productIdList: [null], //拆分的产品id数组
    productNameList: [null],
    fetching: false
  };

  render() {
    const { productList, currentTradeDate, openModalType } = this.props;
    const formItems = [
      // {
      //   name: 'execCode',
      //   label: '成交编号',
      //   type: 'Input',
      //   props: {
      //     disabled: false
      //   },
      //   rules: [{ required: true, message: '成交编号不能为空' }]
      // },
      {
        name: 'execDate',
        label: '成交日期',
        type: 'DatePicker',
        props: {
          disabled: false,
          format: 'YYYY-MM-DD',
          initialValue: moment(currentTradeDate)
        },
        rules: [{ required: true, message: '成交日期不能为空' }]
      },
      {
        name: 'bizCategory',
        label: '业务品种',
        type: 'Select',
        props: {
          disabled: false
        },
        rules: [{ required: true, message: '业务类别不能为空' }],
        options: [
          { label: '网上分销', value: 4 },
          { label: '网下分销', value: 5 }
        ]
      },
      {
        name: 'tradeInstrId',
        label: '交易指令编号',
        type: 'Input',
        props: {
          disabled: false
        },
        rules: [{ required: true, message: '交易指令编号不能为空' }]
      },
      {
        name: 'tradeDirection',
        label: '交易方向',
        type: 'Select',
        props: {
          disabled: false
        },
        rules: [{ required: true, message: '交易方向不能为空' }],
        options: [
          { label: '买入', value: 1 },
          { label: '卖出', value: 2 }
        ]
      },
      {
        name: 'bondCode',
        label: '债券代码', //
        type: 'Select',
        props: {
          configDics: selectPageRequest,
          type: 'bond',
          dropdownWidth: 300,
          disabled: false,
          onChange: (e, option) => {
            let name = option ? option.props.children.split(' - ')[1] : option;
            const form = this.clientForm.props.form;
            form.setFieldsValue({ bondName: name });
          },
          optionLabelProp: 'value',
          // notFoundContent: this.state.fetching ? <Spin size="small" /> : null,
          filterOption: false,
          onSearch: val => {
            if (val.length > 4) {
              //最少输入4个字符再查询，否则数据量太大
              this.callSearch(val);
            }
          }
        },
        rules: [{ required: true, message: '债券代码不能为空' }]
        // options: this.props.allBondList.length > 0 ? this.props.allBondList : []
      },
      {
        name: 'settleCurrency',
        label: '结算币种',
        type: 'Select',
        props: {
          disabled: false,
          getDics: 1000009
        },
        rules: [{ required: true, message: '结算币种不能为空' }]
      },
      {
        name: 'settleDate',
        label: '结算日期',
        type: 'DatePicker',
        props: {
          disabled: false,
          format: 'YYYY-MM-DD',
          initialValue: moment(currentTradeDate)
        },
        rules: [{ required: true, message: '结算日期不能为空' }]
      },
      {
        name: 'bondName',
        label: '债券名称',
        type: 'Input',
        props: {
          disabled: true
        },
        rules: [{ required: true, message: '债券名称不能为空' }]
      },
      {
        name: 'netPrice',
        label: '净价(元)',
        type: 'InputNumber',
        props: {
          disabled: false,
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3'),
          min: 0
        },
        rules: [{ required: true, message: '净价不能为空' }]
      },
      {
        name: 'dirtyPrice',
        label: '全价(元)',
        type: 'InputNumber',
        props: {
          disabled: false,
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3'),
          min: 0
        },
        rules: [{ required: true, message: '全价不能为空' }]
      },
      {
        name: 'settleType',
        label: '结算方式',
        type: 'Select',
        props: {
          disabled: false,
          getDics: 1030310
        },
        rules: [{ required: true, message: '结算方式不能为空' }]
      },
      {
        name: 'faceValue',
        label: '券面总额(万元)',
        type: 'InputNumber',
        props: {
          disabled: false,
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3'),
          min: 0
        },
        rules: [{ required: true, message: '券面总额不能为空' }]
      },
      {
        name: 'tradeAmount',
        label: '交易金额(元)',
        type: 'InputNumber',
        props: {
          disabled: false,
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3'),
          min: 0
        },
        rules: [{ required: true, message: '交易金额不能为空' }]
      },
      {
        name: 'settleAmount',
        label: '结算金额(元)',
        type: 'InputNumber',
        props: {
          disabled: false,
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3'),
          min: 0
        },
        rules: [{ required: true, message: '结算金额不能为空' }]
      },
      {
        name: 'accruedInterest',
        label: '应计利息(元)',
        type: 'InputNumber',
        props: {
          disabled: false,
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3'),
          min: 0
        },
        rules: [{ required: true, message: '应计利息不能为空' }]
      },
      {
        name: 'tradeFee',
        label: '交易费用(元)',
        type: 'InputNumber',
        props: {
          disabled: false,
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3'),
          min: 0
        },
        rules: [{ required: true, message: '交易费用不能为空' }]
      },
      {
        name: 'settleFee',
        label: '结算费用(元)',
        type: 'InputNumber',
        props: {
          disabled: false,
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3'),
          min: 0
        },
        rules: [{ required: true, message: '结算费用不能为空' }]
      },
      {
        name: 'totalAccruedInterest',
        label: '应计利息总额(元)',
        type: 'InputNumber',
        props: {
          disabled: false,
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3'),
          min: 0
        },
        rules: [{ required: true, message: '应计利息总额不能为空' }]
      },
      {
        name: 'managerCode',
        label: '管理人代码',
        type: 'Input'
      },
      {
        name: 'managerName',
        label: '管理人名称',
        type: 'Input'
      },
      {
        name: 'buyerAssetAccount',
        label: '买入方资金账号',
        type: 'Input'
      },
      {
        name: 'buyerAssetAccountName',
        label: '买入方资金账户户名',
        type: 'Input'
      },
      {
        name: 'buyerCustodianAccount',
        label: '买入方托管账户',
        type: 'Input'
      },
      {
        name: 'buyerBondAccountName',
        label: '买入方托管账户名称',
        type: 'Input'
      },
      {
        name: 'buyerSettleBankName',
        label: '买入方资金开户行名称',
        type: 'Input'
      },
      {
        name: 'buyerTraderName',
        label: '买入方交易员名称',
        type: 'Input'
      },
      {
        name: 'sellerAssetAccount',
        label: '卖出方资金账户',
        type: 'Input'
      },
      {
        name: 'sellerAssetAccountName',
        label: '卖出方资金账户名称',
        type: 'Input'
      },
      {
        name: 'sellerCustodianAccount',
        label: '卖出方托管账户',
        type: 'Input'
      },
      {
        name: 'sellerBondAccountName',
        label: '卖出方托管账户户名',
        type: 'Input'
      },
      {
        name: 'sellerSettleAccountNumber',
        label: '卖出方资金账户开户行联行号',
        type: 'Input'
      },
      {
        name: 'sellerSettleBankCode',
        label: '卖出方资金开户行',
        type: 'Input'
      },
      {
        name: 'sellerSettleBankName',
        label: '卖出方资金账户开户行名称',
        type: 'Input'
      },
      {
        name: 'sellerTraderName',
        label: '卖出方交易员名称',
        type: 'Input'
      }
    ];

    const columns = [
      // {
      //   title: '',
      //   width: 60,
      //   render: (text, record, index) => {
      //     if (!record.serialNumber) {
      //       return (
      //         <a>
      //           <Icon type="minus-circle" onClick={() => console.log(record)} />
      //         </a>
      //       );
      //     }
      //   }
      // },
      {
        title: '序号',
        width: 60,
        render: (text, record, index) => {
          if (record.serialNumber) {
            return (
              <span className="columnLight" style={{ fontWeight: 'bolder' }}>
                合计
              </span>
            );
          } else {
            return ++index;
          }
        }
      },
      {
        title: '产品名称',
        dataIndex: 'productId',
        key: 'productId',
        width: 180,
        render: (text, record, index) => {
          if (!record.serialNumber) {
            return (
              <SelectPage
                style={{ width: 140 }}
                showSearch
                allowClear
                configDics={selectPageRequest}
                type="product"
                value={this.state.productIdList[index]}
                onChange={(e, option) => {
                  let productNameList = this.state.productNameList;
                  let productIdList = this.state.productIdList;
                  productNameList[index] = option?.props?.origindata?.productName;
                  productIdList[index] = e;
                  this.setState({ productNameList, productIdList });
                }}
              ></SelectPage>
            );
          }
        }
      },
      {
        title: '券面总额(万元)',
        dataIndex: 'faceValue',
        key: 'faceValue',
        width: 130,
        render: (text, record, index) => {
          if (!record.serialNumber) {
            return (
              <InputNumber
                style={{ width: 100 }}
                value={this.state.faceValueList[index]}
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                onChange={e => {
                  let faceValueList = this.state.faceValueList;
                  faceValueList[index] =
                    e != null ? `${e}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3') : null;
                  this.setState({ faceValueList }, () => {
                    this.computedCountMoney(faceValueList, 'faceValueTotal');
                  });
                }}
              />
            );
          } else {
            return this.state.faceValueTotal;
          }
        }
      },
      {
        title: '应计利息总额(元)',
        dataIndex: 'totalAccruedInterest',
        key: 'totalAccruedInterest',
        width: 130,
        render: (text, record, index) => {
          if (!record.serialNumber) {
            return (
              <InputNumber
                style={{ width: 100 }}
                value={this.state.totalAccruedInterestList[index]}
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                onChange={e => {
                  let totalAccruedInterestList = this.state.totalAccruedInterestList;
                  totalAccruedInterestList[index] =
                    e != null ? `${e}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3') : null;
                  this.setState({ totalAccruedInterestList }, () => {
                    this.computedCountMoney(totalAccruedInterestList, 'totalAccruedInterestTotal');
                  });
                }}
              />
            );
          } else {
            return this.state.totalAccruedInterestTotal;
          }
        }
      },
      {
        title: '交易金额(元)',
        dataIndex: 'tradeAmount',
        key: 'tradeAmount',
        width: 130,
        render: (text, record, index) => {
          if (!record.serialNumber) {
            return (
              <InputNumber
                style={{ width: 100 }}
                value={this.state.tradeAmountList[index]}
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                onChange={e => {
                  let tradeAmountList = this.state.tradeAmountList;
                  tradeAmountList[index] =
                    e != null ? `${e}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3') : null;
                  this.setState({ tradeAmountList }, () => {
                    this.computedCountMoney(tradeAmountList, 'tradeAmountTotal');
                  });
                }}
              />
            );
          } else {
            return this.state.tradeAmountTotal;
          }
        }
      },
      {
        title: '结算金额(元)',
        dataIndex: 'settleAmount',
        key: 'settleAmount',
        width: 130,
        render: (text, record, index) => {
          if (!record.serialNumber) {
            return (
              <InputNumber
                style={{ width: 100 }}
                value={this.state.settleAmountList[index]}
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                onChange={e => {
                  let settleAmountList = this.state.settleAmountList;
                  settleAmountList[index] =
                    e != null ? `${e}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3') : null;
                  this.setState({ settleAmountList }, () => {
                    this.computedCountMoney(settleAmountList, 'settleAmountTotal');
                  });
                }}
              />
            );
          } else {
            return this.state.settleAmountTotal;
          }
        }
      },
      {
        title: '交易费用(元)',
        dataIndex: 'tradeFee',
        key: 'tradeFee',
        width: 130,
        render: (text, record, index) => {
          if (!record.serialNumber) {
            return (
              <InputNumber
                style={{ width: 100 }}
                value={this.state.tradeFeeList[index]}
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                onChange={e => {
                  let tradeFeeList = this.state.tradeFeeList;
                  tradeFeeList[index] =
                    e != null ? `${e}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3') : null;
                  this.setState({ tradeFeeList }, () => {
                    this.computedCountMoney(tradeFeeList, 'tradeFeeTotal');
                  });
                }}
              />
            );
          } else {
            return this.state.tradeFeeTotal;
          }
        }
      },
      {
        title: '结算费用(元)',
        dataIndex: 'settleFee',
        key: 'settleFee',
        width: 130,
        render: (text, record, index) => {
          if (!record.serialNumber) {
            return (
              <InputNumber
                style={{ width: 100 }}
                value={this.state.settleFeeList[index]}
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                onChange={e => {
                  let settleFeeList = this.state.settleFeeList;
                  settleFeeList[index] =
                    e != null ? `${e}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3') : null;
                  this.setState({ settleFeeList }, () => {
                    this.computedCountMoney(settleFeeList, 'settleFeeTotal');
                  });
                }}
              />
            );
          } else {
            return this.state.settleFeeTotal;
          }
        }
      },
      {
        title: '操作',
        key: 'operation',
        width: 130,
        align: 'center',
        render: (text, record, index) => {
          if (record.serialNumber != '合计') {
            return withRoleTableBotton(
              [
                {
                  name: '删除',
                  noAuth: true,
                  func: this.deleteClientItem
                }
              ],
              this.props.btnAuth
            )(record);
          } else {
            return null;
          }
        }
      }
    ];

    const totalRow = {
      id: String(Math.random()),
      serialNumber: '合计'
    };
    return (
      <>
        <Modal
          title={'分销--' + (openModalType == 'edit' ? '修改' : '新增')}
          visible={this.props.visibleFormAdd}
          width={1200}
          destroyOnClose={true}
          onOk={this.onSubmit}
          maskClosable={false}
          onCancel={this.props.closeFormAdd}
          bodyStyle={{ maxHeight: this.props.modalHeight, overflow: 'auto' }}
        >
          <NormalForm
            labelSize="10em"
            lineOf={3}
            formItem={formItems}
            refs={ref => (this.clientForm = ref)}
          />
          <div>
            <Button type="default" icon="plus" onClick={this.addSplit}>
              添加拆分项
            </Button>
          </div>

          <ConfigableTable
            columns={columns}
            dataSource={[...this.state.dataSource, totalRow]}
            rowKey="id"
            bordered
            size="default"
            pagination={false}
            style={{ marginTop: '10px' }}
            scroll={{ x: 1020, y: 200 }}
            onRow={record => {
              return { onDoubleClick: false };
            }}
          />
        </Modal>
      </>
    );
  }

  async componentDidMount() {
    const { asyncHttpDetailMsg } = this.props;
    if (this.props.openModalType == 'edit') {
      await asyncHttpDetailMsg(this.props.ids[0].tradeInstrId);
      this.setState({
        dataSource: this.props.detailMsgFX ? this.props.detailMsgFX : [{ id: 1 }]
      });
      // 设置拆分表的值
      let {
        faceValueList, //券面总额
        faceValueTotal,
        totalAccruedInterestList, //应计利息总额
        totalAccruedInterestTotal,
        tradeAmountList, //交易金额
        tradeAmountTotal,
        settleAmountList, //结算金额
        settleAmountTotal,
        tradeFeeList, //交易费用
        tradeFeeTotal,
        settleFeeList, //结算费用
        settleFeeTotal,
        productIdList, //拆分的产品id数组
        productNameList
      } = this.state;
      const { detailMsgFX } = this.props;
      for (let n = 0; n < detailMsgFX.length; n++) {
        faceValueList[n] = detailMsgFX[0].faceValue;
        totalAccruedInterestList[n] = detailMsgFX[0].totalAccruedInterest;
        tradeAmountList[n] = detailMsgFX[0].tradeAmount;
        settleAmountList[n] = detailMsgFX[0].settleAmount;
        tradeFeeList[n] = detailMsgFX[0].tradeFee;
        settleFeeList[n] = detailMsgFX[0].settleFee;
        productNameList[n] = detailMsgFX[0].productName;
        productIdList[n] = detailMsgFX[0].productId;
        faceValueTotal += detailMsgFX[0].faceValue;
        totalAccruedInterestTotal += detailMsgFX[0].totalAccruedInterest;
        tradeAmountTotal += detailMsgFX[0].tradeAmount;
        settleAmountTotal += detailMsgFX[0].settleAmount;
        tradeFeeTotal += detailMsgFX[0].tradeFee;
        settleFeeTotal += detailMsgFX[0].settleFee;
      }
      this.setState({
        faceValueList,
        totalAccruedInterestList,
        tradeAmountList,
        settleAmountList,
        tradeFeeList,
        settleFeeList,
        productNameList,
        productIdList,
        faceValueTotal,
        totalAccruedInterestTotal,
        tradeAmountTotal,
        settleAmountTotal,
        tradeFeeTotal,
        settleFeeTotal
      });
      // 设置表单的值
      setTimeout(() => {
        const form = this.clientForm.props.form;

        form.setFieldsValue({
          ...this.props.ids[0],
          execDate: moment(this.props.ids[0].execDate) ? moment(this.props.ids[0].execDate) : null,
          settleDate: moment(this.props.ids[0].settleDate)
            ? moment(this.props.ids[0].settleDate)
            : null
        });
      }, 10);
    }
  }

  // 表单提交
  onSubmit = () => {
    const { asyncHttpPostAdd, asyncHttpPostEdit } = this.props;

    const {
      faceValueList,
      totalAccruedInterestList,
      tradeAmountList,
      settleAmountList,
      tradeFeeList,
      settleFeeList,
      productNameList,
      productIdList
    } = this.state;

    // 校验表单 避免没有选择拆分规则
    const form = this.clientForm.props.form;
    form.validateFields(async (err, val) => {
      if (err) {
        return;
      }

      // // 判断是否有重复的产品
      let hash = {};
      for (let n in productIdList) {
        if (productIdList[n]) {
          if (hash[productIdList[n]]) {
            message.error('存在重复的产品，请重新核对');
            return;
          }
          hash[productIdList[n]] = true;
        }
      }

      // // 判断是否数据完整（填了金额就必须要填产品）
      const len = this.state.dataSource.length;
      for (let n = 0; n < len; n++) {
        let flag = productIdList[n] ? true : false;
        let opFlag = this.realExist([
          faceValueList[n],
          // totalAccruedInterestList[n],//应计利息总额非必填
          tradeAmountList[n],
          settleAmountList[n],
          tradeFeeList[n],
          settleFeeList[n]
        ]);
        if (val.totalAccruedInterest || val.totalAccruedInterest == 0) {
          opFlag = true;
        }
        if (flag != opFlag) {
          message.error('存在数据不完整的拆分项，请重新核对');
          return;
        }
      }

      // // 判断拆分数据是否等于主表数据
      // if (
      //   val.faceValue != this.state.faceValueTotal ||
      //   val.totalAccruedInterest != this.state.totalAccruedInterestTotal ||
      //   val.tradeAmount != this.state.tradeAmountTotal ||
      //   val.settleAmount != this.state.settleAmountTotal ||
      //   val.tradeFee != this.state.tradeFeeTotal ||
      //   val.settleFee != this.state.settleFeeTotal
      // ) {
      //   message.error('拆分金额有误，请重新核对');
      //   return;
      // }
      // 傻瓜式判断--
      if (val.faceValue != this.state.faceValueTotal) {
        message.error('券面总额拆分金额有误，请重新核对');
        return;
      }
      if (val.totalAccruedInterest != this.state.totalAccruedInterestTotal) {
        message.error('应计利息总额拆分金额有误，请重新核对');
        return;
      }
      if (val.tradeAmount != this.state.tradeAmountTotal) {
        message.error('交易金额拆分金额有误，请重新核对');
        return;
      }
      if (val.settleAmount != this.state.settleAmountTotal) {
        message.error('结算金额拆分金额有误，请重新核对');
        return;
      }
      if (val.tradeFee != this.state.tradeFeeTotal) {
        message.error('交易费用拆分金额有误，请重新核对');
        return;
      }
      if (val.settleFee != this.state.settleFeeTotal) {
        message.error('结算费用拆分金额有误，请重新核对');
        return;
      }

      // 所有判断完成后才能开始构造数据，构造拆分项数据
      const arr = [];
      for (let n = 0; n < len; n++) {
        let flag = productIdList[n] ? true : false;
        if (flag) {
          arr.push({
            assetUnitCode: null,
            assetUnitName: null,
            bizCategory: val.bizCategory,
            checkStatus: null,
            checkUserId: null,
            distributionPrice: null,
            execCode: val.execCode,
            faceValue: faceValueList[n],
            managerCode: val.managerCode,
            managerName: val.managerName,
            productName: productNameList[n],
            productId: productIdList[n],
            settleAmount: settleAmountList[n],
            settleFee: settleFeeList[n],
            totalAccruedInterest: totalAccruedInterestList[n] ? totalAccruedInterestList[n] : 0,
            tradeAmount: tradeAmountList[n],
            tradeDirection: val.tradeDirection,
            tradeFee: tradeFeeList[n],
            tradeInstrId: val.tradeInstrId
          });
        }
      }
      // 按照格式构造提交数据,
      const params = {
        ...val,
        execDate: moment(val.execDate).format('YYYY-MM-DD'),
        settleDate: moment(val.settleDate).format('YYYY-MM-DD'),
        productCode: null,
        clearingStatus: '2',
        productList: arr,
        productName: null,
        totalAccruedInterest: val.totalAccruedInterest ? val.totalAccruedInterest : 0
      };
      if (this.props.openModalType == 'edit') {
        params['id'] = this.props.ids[0].id;
      }
      const realParam = {
        offlineExecutionReportReqVO: val.bizCategory == '5' ? params : null,
        onlineExecutionReportReqVO: val.bizCategory == '4' ? params : null
      };

      if (this.props.openModalType == 'add') {
        await asyncHttpPostAdd({ type: 'FX', params: realParam });
      } else {
        await asyncHttpPostEdit({ type: 'FX', params: realParam });
      }

      this.props.closeFormAdd();
      this.props.query();
    });
  };

  // 添加拆分项
  addSplit = () => {
    let data = this.state.dataSource;
    if (data.length >= 10) {
      message.error('目前仅支持拆分到10个产品');
      return;
    }
    data.push({ id: Math.random() });
    this.setState({ dataSource: data });
  };

  /****计算调整后的总额 */
  computedCountMoney = (arr, countType) => {
    let sum = 0;
    if (!arr) {
      return;
    }
    arr.forEach(item => {
      sum = compute(sum, Number(item), 'plus');
    });
    this.setState({
      [countType]: sum
    });
  };

  realExist = arr => {
    let flag = true;
    for (let n of arr) {
      if (n == null || n == undefined || n === '') {
        flag = flag && false;
      } else {
        flag = flag && true;
      }
    }
    return flag;
  };
  // 设置加载状态
  setLoading = value => {
    this.setState({ fetching: value });
  };
  // 搜索债券信息
  // callSearch = value => {
  //   const that = this;
  //   const { asyncHttpAllBondList } = this.props;
  //   asyncHttpAllBondList({
  //     param: { bondCode: value },
  //     callback: () => {
  //       that.setLoading(value);
  //     }
  //   });
  // };
  /***删除 */
  deleteClientItem = (e, item) => {
    const { dataSource } = this.state;
    let index = -1;
    let newDataSource = dataSource.filter((node, idx) => {
      if (node.id == item.id) {
        index = idx;
      }
      return node.id != item.id;
    });
    this.reSetTableRow(index);
    this.setState({ dataSource: newDataSource });
  };
  /***重置一行拆分项的数据 */
  reSetTableRow = index => {
    let faceValueList = this.state.faceValueList;
    let totalAccruedInterestList = this.state.totalAccruedInterestList;
    let tradeAmountList = this.state.tradeAmountList;
    let tradeFeeList = this.state.tradeFeeList;
    let settleFeeList = this.state.settleFeeList;
    let settleAmountList = this.state.settleAmountList;
    let productIdList = this.state.productIdList;
    faceValueList.splice(index, 1);
    totalAccruedInterestList.splice(index, 1);
    tradeAmountList.splice(index, 1);
    tradeFeeList.splice(index, 1);
    settleFeeList.splice(index, 1);
    settleAmountList.splice(index, 1);
    productIdList.splice(index, 1);
    this.setState(
      {
        faceValueList,
        totalAccruedInterestList,
        tradeAmountList,
        tradeFeeList,
        settleFeeList,
        settleAmountList,
        productIdList
      },
      () => {
        this.computedCountMoney(faceValueList, 'faceValueTotal');
        this.computedCountMoney(totalAccruedInterestList, 'totalAccruedInterestTotal');
        this.computedCountMoney(tradeAmountList, 'tradeAmountTotal');
        this.computedCountMoney(tradeFeeList, 'tradeFeeTotal');
        this.computedCountMoney(settleFeeList, 'settleFeeTotal');
        this.computedCountMoney(settleAmountList, 'settleAmountTotal');
      }
    );
  };
}

export default CashSaleFormSplit;
