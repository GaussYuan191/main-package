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
    totalFaceValueList: [], //券面总额
    totalFaceValueTotal: 0,
    firstSettleAmountList: [], //首次结算金额
    firstSettleAmountTotal: 0,
    secondSettleAmountList: [], //到期结算金额
    secondSettleAmountTotal: 0,
    firstTotalAccruedInterestList: [], //首次应计利息总额
    firstTotalAccruedInterestTotal: 0,
    secondTotalAccruedInterestList: [], //到期应计利息总额
    secondTotalAccruedInterestTotal: 0,
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
        name: 'totalFaceValue',
        label: '券面总额(万元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'firstSettleAmount',
        label: '首次结算金额(元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'secondSettleAmount',
        label: '到期结算金额(元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'firstTotalAccruedInterest',
        label: '首次应计利息总额(元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'secondTotalAccruedInterest',
        label: '到期应计利息总额(元)',
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
        dataIndex: 'totalFaceValue',
        key: 'totalFaceValue',
        width: 130,
        render: (text, record, index) => {
          if (!record.serialNumber) {
            return (
              <InputNumber
                style={{ width: 100 }}
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                value={this.state.totalFaceValueList[index]}
                onChange={e => {
                  let totalFaceValueList = this.state.totalFaceValueList;
                  totalFaceValueList[index] =
                    e != null ? `${e}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3') : null;
                  this.setState({ totalFaceValueList }, () => {
                    this.computedCountMoney(totalFaceValueList, 'totalFaceValueTotal');
                  });
                }}
              />
            );
          } else {
            return this.state.totalFaceValueTotal;
          }
        }
      },
      {
        title: '首次结算金额(元)',
        dataIndex: 'firstSettleAmount',
        key: 'firstSettleAmount',
        width: 130,
        render: (text, record, index) => {
          if (!record.serialNumber) {
            return (
              <InputNumber
                style={{ width: 100 }}
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                value={this.state.firstSettleAmountList[index]}
                onChange={e => {
                  let firstSettleAmountList = this.state.firstSettleAmountList;
                  firstSettleAmountList[index] =
                    e != null ? `${e}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3') : null;
                  this.setState({ firstSettleAmountList }, () => {
                    this.computedCountMoney(firstSettleAmountList, 'firstSettleAmountTotal');
                  });
                }}
              />
            );
          } else {
            return this.state.firstSettleAmountTotal;
          }
        }
      },
      {
        title: '到期结算金额(元)',
        dataIndex: 'secondSettleAmount',
        key: 'secondSettleAmount',
        width: 130,
        render: (text, record, index) => {
          if (!record.serialNumber) {
            return (
              <InputNumber
                style={{ width: 100 }}
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                value={this.state.secondSettleAmountList[index]}
                onChange={e => {
                  let secondSettleAmountList = this.state.secondSettleAmountList;
                  secondSettleAmountList[index] =
                    e != null ? `${e}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3') : null;
                  this.setState({ secondSettleAmountList }, () => {
                    this.computedCountMoney(secondSettleAmountList, 'secondSettleAmountTotal');
                  });
                }}
              />
            );
          } else {
            return this.state.secondSettleAmountTotal;
          }
        }
      },
      {
        title: '首次应计利息总额(元)',
        dataIndex: 'firstTotalAccruedInterest',
        key: 'firstTotalAccruedInterest',
        width: 130,
        render: (text, record, index) => {
          if (!record.serialNumber) {
            return (
              <InputNumber
                style={{ width: 100 }}
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                disabled={this.props.ids[0].firstTotalAccruedInterest != null ? false : true}
                value={this.state.firstTotalAccruedInterestList[index]}
                onChange={e => {
                  let firstTotalAccruedInterestList = this.state.firstTotalAccruedInterestList;
                  firstTotalAccruedInterestList[index] =
                    e != null ? `${e}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3') : null;
                  this.setState({ firstTotalAccruedInterestList }, () => {
                    this.computedCountMoney(
                      firstTotalAccruedInterestList,
                      'firstTotalAccruedInterestTotal'
                    );
                  });
                }}
              />
            );
          } else {
            return this.state.firstTotalAccruedInterestTotal;
          }
        }
      },
      {
        title: '到期应计利息总额(元)',
        dataIndex: 'secondTotalAccruedInterest',
        key: 'secondTotalAccruedInterest',
        width: 130,
        render: (text, record, index) => {
          if (!record.serialNumber) {
            return (
              <InputNumber
                style={{ width: 100 }}
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                disabled={this.props.ids[0].secondTotalAccruedInterest != null ? false : true}
                value={this.state.secondTotalAccruedInterestList[index]}
                onChange={e => {
                  let secondTotalAccruedInterestList = this.state.secondTotalAccruedInterestList;
                  secondTotalAccruedInterestList[index] =
                    e != null ? `${e}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3') : null;
                  this.setState({ secondTotalAccruedInterestList }, () => {
                    this.computedCountMoney(
                      secondTotalAccruedInterestList,
                      'secondTotalAccruedInterestTotal'
                    );
                  });
                }}
              />
            );
          } else {
            return this.state.secondTotalAccruedInterestTotal;
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
            scroll={{ x: 1022, y: 200 }}
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
        type: 'eroPageList',
        cb: data => {
          if (data.isAllData === false) {
            Modal.warn({
              title: '权限不完整',
              content: <span style={{ color: '#f5222d' }}>包含未授权产品数据，请检查!</span>,
              okText: '退出',
              onOk: me.props.closeFormSlpit
            });
          }
          let {
            totalFaceValueList, //券面总额
            firstSettleAmountList, //首次结算金额
            secondSettleAmountList, //到期结算金额
            firstTotalAccruedInterestList, //首次应计利息总额
            secondTotalAccruedInterestList, //到期应计利息总额
            tradeFeeList, //交易费用
            settleFeeList, //结算费用
            productIdList //拆分的产品id数组
          } = me.state;
          const detailMsgMDS = data?.outrightExecutionReportDistRepPageInfo?.list || [];
          for (let n = 0; n < detailMsgMDS.length; n++) {
            totalFaceValueList[n] = detailMsgMDS[n].totalFaceValue;
            firstSettleAmountList[n] = detailMsgMDS[n].firstSettleAmount;
            secondSettleAmountList[n] = detailMsgMDS[n].secondSettleAmount;
            firstTotalAccruedInterestList[n] = detailMsgMDS[n].firstTotalAccruedInterest;
            secondTotalAccruedInterestList[n] = detailMsgMDS[n].secondTotalAccruedInterest;
            settleFeeList[n] = detailMsgMDS[n].settleFee;
            tradeFeeList[n] = detailMsgMDS[n].tradeFee;
            productIdList[n] = detailMsgMDS[n].productId;
          }
          me.setState(
            {
              dataSource: detailMsgMDS,
              totalFaceValueList,
              firstSettleAmountList,
              secondSettleAmountList,
              firstTotalAccruedInterestList,
              secondTotalAccruedInterestList,
              tradeFeeList,
              settleFeeList,
              productIdList
            },
            () => {
              me.computedCountMoney(totalFaceValueList, 'totalFaceValueTotal');
              me.computedCountMoney(firstSettleAmountList, 'firstSettleAmountTotal');
              me.computedCountMoney(secondSettleAmountList, 'secondSettleAmountTotal');
              me.computedCountMoney(
                firstTotalAccruedInterestList,
                'firstTotalAccruedInterestTotal'
              );
              me.computedCountMoney(
                secondTotalAccruedInterestList,
                'secondTotalAccruedInterestTotal'
              );
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
      totalFaceValue, //券面总额
      firstSettleAmount, //首次结算金额
      secondSettleAmount, //到期结算金额
      firstTotalAccruedInterest, //首次应计利息总额
      secondTotalAccruedInterest, //到期应计利息总额
      tradeFee, //交易费用
      settleFee //结算费用
    } = this.props.ids[0];
    const {
      totalFaceValueList,
      firstSettleAmountList,
      secondSettleAmountList,
      firstTotalAccruedInterestList,
      secondTotalAccruedInterestList,
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
          totalFaceValueList[n],
          firstSettleAmountList[n],
          secondSettleAmountList[n],
          tradeFeeList[n],
          settleFeeList[n]
          // firstTotalAccruedInterestList[n],//首期到期利息可能为nnull，因此不做数据项判断
          // secondTotalAccruedInterestList[n],
        ];
        if (this.props.ids[0].firstTotalAccruedInterest != null) {
          //存在，则必填，不存在则不校验
          arrs.push(firstTotalAccruedInterestList[n]);
        }
        if (this.props.ids[0].secondTotalAccruedInterest != null) {
          arrs.push(secondTotalAccruedInterestList[n]);
        }
        let opFlag = this.realExist(arrs);
        if (flag != opFlag) {
          message.error('存在数据不完整的拆分项，请重新核对');
          return;
        }
      }

      // 判断拆分数据是否等于主表数据
      if (
        totalFaceValue != this.state.totalFaceValueTotal ||
        firstSettleAmount != this.state.firstSettleAmountTotal ||
        secondSettleAmount != this.state.secondSettleAmountTotal ||
        //首期到期利息为null时不做数据项判断
        (firstTotalAccruedInterest !== null &&
          firstTotalAccruedInterest != this.state.firstTotalAccruedInterestTotal) ||
        (secondTotalAccruedInterest !== null &&
          secondTotalAccruedInterest != this.state.secondTotalAccruedInterestTotal) ||
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
            bondCode: ids[0].bondCode,
            bondName: ids[0].bondName,
            collateralList: [], //待做：业务暂时不需要
            firstSettleAmount: firstSettleAmountList[n],
            firstTotalAccruedInterest: firstTotalAccruedInterestList[n],
            managerCode: ids[0].managerCode,
            managerName: ids[0].managerName,
            productId: productIdList[n],
            secondSettleAmount: secondSettleAmountList[n],
            secondTotalAccruedInterest: secondTotalAccruedInterestList[n],
            settleFee: settleFeeList[n],
            totalFaceValue: totalFaceValueList[n],
            tradeFee: tradeFeeList[n]
          });
        }
      }
      // 按照格式构造提交数据,删除无用字段
      const params = {
        bizCategory: ids[0].bizCategory,
        bondCode: ids[0].bondCode,
        bondName: ids[0].bondName,
        execCode: ids[0].execCode,
        execDate: ids[0].execDate,
        firstAccuredInterest: ids[0].firstAccuredInterest,
        firstDirtyPrice: ids[0].firstDirtyPrice,
        firstNetPrice: ids[0].firstNetPrice,
        firstSettleAmount: ids[0].firstSettleAmount,
        firstSettleDate: ids[0].firstSettleDate,
        firstSettleType: ids[0].firstSettleType,
        firstTotalAccruedInterest: ids[0].firstTotalAccruedInterest,
        managerCode: ids[0].managerCode,
        managerName: ids[0].managerName,
        occupancyDays: ids[0].occupancyDays,
        productList: arr, //
        repoAssetAccount: ids[0].repoAssetAccount,
        repoAssetAccountName: ids[0].repoAssetAccountName,
        repoCustodianAccount: ids[0].repoCustodianAccount,
        repoCustodianName: ids[0].repoCustodianName,
        repoRate: ids[0].repoRate,
        repoSettleBankname: ids[0].repoSettleBankname,
        repoTraderName: ids[0].repoTraderName,
        reverseAssetAccount: ids[0].reverseAssetAccount,
        reverseAssetAccountName: ids[0].reverseAssetAccountName,
        reverseCustodianAccount: ids[0].reverseCustodianAccount,
        reverseCustodianName: ids[0].reverseCustodianName,
        reverseSettleBankname: ids[0].reverseSettleBankname,
        reverseTraderName: ids[0].reverseTraderName,
        secondAccuredInterest: ids[0].secondAccuredInterest,
        secondDirtyPrice: ids[0].secondDirtyPrice,
        secondNetPrice: ids[0].secondNetPrice,
        secondSettleAmount: ids[0].secondSettleAmount,
        secondSettleDate: ids[0].secondSettleDate,
        secondSettleType: ids[0].secondSettleType,
        secondTotalAccruedInterest: ids[0].secondTotalAccruedInterest,
        settleCurrency: ids[0].settleCurrency,
        settleFee: ids[0].settleFee,
        totalFaceValue: ids[0].totalFaceValue,
        tradeDirection: ids[0].tradeDirection,
        tradeFee: ids[0].tradeFee,
        tradingProduct: ids[0].tradingProduct
      };

      // console.log(params);
      await asyncHttppostProductSplit({ type: 'MD', params });
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
    let totalFaceValueList = this.state.totalFaceValueList;
    let firstSettleAmountList = this.state.firstSettleAmountList;
    let secondSettleAmountList = this.state.secondSettleAmountList;
    let firstTotalAccruedInterestList = this.state.firstTotalAccruedInterestList;
    let secondTotalAccruedInterestList = this.state.secondTotalAccruedInterestList;
    let tradeFeeList = this.state.tradeFeeList;
    let settleFeeList = this.state.settleFeeList;
    let productIdList = this.state.productIdList;
    totalFaceValueList.splice(index, 1);
    firstSettleAmountList.splice(index, 1);
    secondSettleAmountList.splice(index, 1);
    firstTotalAccruedInterestList.splice(index, 1);
    secondTotalAccruedInterestList.splice(index, 1);
    tradeFeeList.splice(index, 1);
    settleFeeList.splice(index, 1);
    productIdList.splice(index, 1);
    this.setState(
      {
        totalFaceValueList,
        firstSettleAmountList,
        secondSettleAmountList,
        firstTotalAccruedInterestList,
        secondTotalAccruedInterestList,
        tradeFeeList,
        settleFeeList,
        productIdList
      },
      () => {
        this.computedCountMoney(totalFaceValueList, 'totalFaceValueTotal');
        this.computedCountMoney(firstSettleAmountList, 'firstSettleAmountTotal');
        this.computedCountMoney(secondSettleAmountList, 'secondSettleAmountTotal');
        this.computedCountMoney(firstTotalAccruedInterestList, 'firstTotalAccruedInterestTotal');
        this.computedCountMoney(secondTotalAccruedInterestList, 'secondTotalAccruedInterestTotal');
        this.computedCountMoney(tradeFeeList, 'tradeFeeTotal');
        this.computedCountMoney(settleFeeList, 'settleFeeTotal');
      }
    );
  };
}

export default CashSaleFormSplit;
