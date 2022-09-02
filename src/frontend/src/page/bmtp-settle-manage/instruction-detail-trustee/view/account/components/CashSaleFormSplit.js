import React, { Component } from 'react';
import {
  NormalForm,
  ConfigableTable,
  SelectPage,
  selectPageRequest,
  withRoleTableBotton,
  compute
} from 'yss-biz';
import { Modal, Button, message, Select, Input, Icon, InputNumber } from 'antd';

class CashSaleFormSplit extends Component {
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
    productIdList: [null] //拆分的产品id数组
  };

  render() {
    const formItems = [
      {
        name: 'execCode',
        label: '成交编号',
        type: 'Input',
        props: {
          disabled: true
        },
        rules: [{ required: true, message: '成交编号不能为空' }]
      },
      {
        name: 'splitRule',
        label: '拆分规则',
        type: 'Select',
        props: {
          disabled: false,
          initialValue: '0'
        },
        rules: [{ required: true, message: '拆分规则不能为空' }],
        options: [{ label: '手工拆分', value: '0' }]
      },
      {
        name: 'bizCategoryName',
        label: '业务品种',
        type: 'Input',
        props: {
          disabled: true
        },
        rules: [{ required: true, message: '业务类别不能为空' }]
      },
      {
        isLine: true
      },
      {
        name: 'faceValue',
        label: '券面总额(万元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'totalAccruedInterest',
        label: '应计利息总额(元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'tradeAmount',
        label: '交易金额(元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'settleAmount',
        label: '结算金额(元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'tradeFee',
        label: '交易费用(元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'settleFee',
        label: '结算费用(元)',
        type: 'Input',
        props: {
          disabled: true
        }
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
                onChange={e => {
                  let productIdList = this.state.productIdList;
                  productIdList[index] = e;
                  this.setState({ productIdList });
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
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                value={this.state.faceValueList[index]}
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
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                value={this.state.totalAccruedInterestList[index]}
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
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                value={this.state.tradeAmountList[index]}
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
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                value={this.state.settleAmountList[index]}
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
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                disabled={this.props.ids[0].tradeFee != null ? false : true}
                value={this.state.tradeFeeList[index]}
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
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                disabled={this.props.ids[0].settleFee != null ? false : true}
                value={this.state.settleFeeList[index]}
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
          title="成交回报拆分"
          visible={this.props.visibleFormSplit}
          width={1100}
          destroyOnClose={true}
          onOk={this.onSubmit}
          maskClosable={false}
          onCancel={this.props.closeFormSlpit}
          bodyStyle={{ maxHeight: this.props.modalHeight, overflow: 'auto' }}
        >
          <NormalForm
            labelSize="7em"
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

  componentDidMount() {
    const { asyncHttpSearchQfList, ids } = this.props;
    const me = this;
    setTimeout(() => {
      const form = this.clientForm.props.form;
      form.setFieldsValue({
        ...this.props.ids[0]
      });
      asyncHttpSearchQfList({
        params: ids[0],
        type: 'erbPageList',
        cb: data => {
          if (data.isAllData === false) {
            Modal.warn({
              title: '权限不完整',
              content: <span style={{ color: '#f5222d' }}>包含未授权产品数据，请检查!</span>,
              okText: "退出",
              onOk: me.props.closeFormSlpit
            });
          }
          // 设置拆分表的值
          let {
            faceValueList, //券面总额
            totalAccruedInterestList, //应计利息总额
            tradeAmountList, //交易金额
            settleAmountList, //结算金额
            tradeFeeList, //交易费用
            settleFeeList, //结算费用
            productIdList //拆分的产品id数组
          } = me.state;
          const detailMsgXQ = data?.cashBondExecutionReportDistributionRepPageInfo?.list || [];
          for (let n = 0; n < detailMsgXQ.length; n++) {
            faceValueList[n] = detailMsgXQ[n].faceValue;
            totalAccruedInterestList[n] = detailMsgXQ[n].totalAccruedInterest;
            tradeAmountList[n] = detailMsgXQ[n].tradeAmount;
            settleAmountList[n] = detailMsgXQ[n].settleAmount;
            tradeFeeList[n] = detailMsgXQ[n].tradeFee;
            settleFeeList[n] = detailMsgXQ[n].settleFee;
            productIdList[n] = detailMsgXQ[n].productId;
          }
          me.setState(
            {
              faceValueList,
              totalAccruedInterestList,
              tradeAmountList,
              settleAmountList,
              tradeFeeList,
              settleFeeList,
              productIdList,
              dataSource: detailMsgXQ
            },
            () => {
              me.computedCountMoney(faceValueList, 'faceValueTotal');
              me.computedCountMoney(totalAccruedInterestList, 'totalAccruedInterestTotal');
              me.computedCountMoney(tradeAmountList, 'tradeAmountTotal');
              me.computedCountMoney(settleAmountList, 'settleAmountTotal');
              me.computedCountMoney(tradeFeeList, 'tradeFeeTotal');
              me.computedCountMoney(settleFeeList, 'settleFeeTotal');
            }
          );
        }
      });
    }, 10);
  }

  // 表单提交
  onSubmit = () => {
    const { ids, asyncHttppostProductSplit } = this.props;
    const {
      faceValue, //券面总额
      totalAccruedInterest, //应计利息总额
      tradeAmount, //交易金额
      settleAmount, //结算金额
      tradeFee, //交易费用
      settleFee //结算费用
    } = this.props.ids[0];
    const {
      faceValueList,
      totalAccruedInterestList,
      tradeAmountList,
      settleAmountList,
      tradeFeeList,
      settleFeeList,
      productIdList
    } = this.state;

    // 校验表单 避免没有选择拆分规则
    const form = this.clientForm.props.form;
    form.validateFields(async (err, val) => {
      if (err) {
        return;
      }

      // 判断是否有重复的产品
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

      // 判断是否数据完整（填了金额就必须要填产品）
      const len = this.state.dataSource.length;
      for (let n = 0; n < len; n++) {
        let flag = productIdList[n] ? true : false;
        let arrs = [
          faceValueList[n],
          totalAccruedInterestList[n],
          tradeAmountList[n],
          settleAmountList[n],
          tradeFeeList[n],
          settleFeeList[n]
        ];
        let opFlag = this.realExist(arrs);
        if (flag != opFlag) {
          message.error('存在数据不完整的拆分项，请重新核对');
          return;
        }
      }

      // 判断拆分数据是否等于主表数据
      if (
        faceValue != this.state.faceValueTotal ||
        totalAccruedInterest != this.state.totalAccruedInterestTotal ||
        tradeAmount != this.state.tradeAmountTotal ||
        settleAmount != this.state.settleAmountTotal ||
        tradeFee != this.state.tradeFeeTotal ||
        settleFee != this.state.settleFeeTotal
      ) {
        message.error('拆分金额有误，请重新核对');
        return;
      }
      // 所有判断完成后才能开始构造数据，构造拆分项数据
      const arr = [];
      for (let n = 0; n < len; n++) {
        let flag = productIdList[n] ? true : false;
        if (flag) {
          arr.push({
            assetUnitCode: ids[0].assetUnitCode,
            faceValue: faceValueList[n],
            managerCode: ids[0].managerCode,
            managerName: ids[0].managerName,
            productId: productIdList[n],
            settleAmount: settleAmountList[n],
            settleFee: settleFeeList[n],
            totalAccruedInterest: totalAccruedInterestList[n],
            tradeAmount: tradeAmountList[n],
            tradeFee: tradeFeeList[n]
          });
        }
      }
      // 按照格式构造提交数据,删除无用字段
      const params = {
        ...ids[0],
        productList: arr
      };
      delete params.assetUnitCode;
      delete params.bizCategoryName;
      delete params.buyerCustodianName;
      delete params.checkStatus;
      delete params.checkStatusName;
      delete params.checkTime;
      delete params.checkUserId;
      delete params.clearingStatus;
      delete params.clearingStatusName;
      delete params.createTime;
      delete params.createUserId;
      delete params.dataSource;
      delete params.dataSourceName;
      delete params.deleteFlag;
      delete params.id;
      delete params.productCode;
      delete params.sellerCustodianName;
      delete params.tradeDirectionName;
      delete params.updateTime;
      delete params.updateUserId;

      await asyncHttppostProductSplit({ type: 'XQ', params });
      this.props.closeFormSlpit();
      this.props.query(true);
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
