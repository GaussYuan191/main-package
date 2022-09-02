import React, { Component } from 'react';
import {
  NormalForm,
  ConfigableTable,
  SelectPage,
  selectPageRequest,
  withRoleTableBotton,
  compute
} from 'yss-biz';
import { Modal, Button, message, Select, Input, Divider, Tabs, Icon, InputNumber } from 'antd';
const { Option } = Select;
const { TabPane } = Tabs;

class CollateralisedRepoFormSplit extends Component {
  state = {
    dataSource: [{ id: 1 }],
    dataSource1: [{ id: 1 }],
    totalFaceValueList: [], //券面总额
    totalFaceValueTotal: 0,
    lendingRateList: [], //借贷费用
    lendingRateTotal: 0,
    totalAccruedInterestList: [], //应计利息总额
    totalAccruedInterestTotal: 0,
    tradeFeeList: [], //交易费用
    tradeFeeTotal: 0,
    settleFeeList: [], //结算费用
    settleFeeTotal: 0,
    productIdList: [null], //拆分的产品id数组
    productIdList1: [null],
    faceValueList: [], //券面总额 (质押券拆分)
    faceValueTotal: 0,
    conversionProportionList: [], //折算比例
    bondList: [], //债券代码
    bondNameList: [], //债券名称
    splitFlag: false
  };

  render() {
    const { DYAbout, abouteroPledgeRef } = this.props;
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
        name: 'bizCategoryName1',
        label: '业务品种',
        type: 'Input',
        props: {
          disabled: true,
          initialValue: '债券借贷'
          // value: '债券借贷'
        }
        // rules: [{ required: true, message: '业务类别不能为空' }]
      },
      {
        isLine: true
      },
      {
        name: 'totalFaceValue', //首次结算金额\交易金额
        label: '券面总额(万元)',
        type: 'Input',
        props: {
          disabled: true
        }
      },
      {
        name: 'lendingRate',
        label: '借贷费用(元)',
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
    // 成交回报表格项
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
        title: '借贷费用(元)',
        dataIndex: 'lendingRate',
        key: 'lendingRate',
        width: 130,
        render: (text, record, index) => {
          if (!record.serialNumber) {
            return (
              <InputNumber
                style={{ width: 100 }}
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')}
                min={0}
                value={this.state.lendingRateList[index]}
                onChange={e => {
                  let lendingRateList = this.state.lendingRateList;
                  lendingRateList[index] =
                    e != null ? `${e}`.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3') : null;
                  this.setState({ lendingRateList }, () => {
                    this.computedCountMoney(lendingRateList, 'lendingRateTotal');
                  });
                }}
              />
            );
          } else {
            return this.state.lendingRateTotal;
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
    // 质押券
    const columns1 = [
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
                value={this.state.productIdList1[index]}
                onChange={e => {
                  let productIdList1 = this.state.productIdList1;
                  productIdList1[index] = e;
                  this.setState({ productIdList1 });
                }}
              ></SelectPage>
            );
          }
        }
      },
      {
        title: '债券名称',
        dataIndex: 'bondCode',
        key: 'bondCode',
        width: 240,
        render: (text, record, index) => {
          if (!record.serialNumber) {
            return (
              <Select
                style={{ width: 220 }}
                showSearch
                allowClear
                onChange={(e, option) => {
                  let bondList = this.state.bondList;
                  let bondNameList = this.state.bondNameList;
                  bondList[index] = e;
                  bondNameList[index] = option ? option.props.roleData : option;
                  this.setState({ bondList, bondNameList });
                }}
              >
                {this.props.DYAbout.map(item => {
                  return (
                    <Option
                      title={`${item.bondCode}--${item.bondName}`}
                      key={item.id}
                      roleData={item.bondName}
                      value={item.bondCode}
                    >
                      {`${item.bondCode}--${item.bondName}`}
                    </Option>
                  );
                })}
              </Select>
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
        title: '折算比例',
        dataIndex: 'conversionProportion',
        key: 'conversionProportion',
        width: 130,
        render: (text, record, index) => {
          if (!record.serialNumber) {
            return (
              <InputNumber
                style={{ width: 100 }}
                formatter={value => `${value}`.replace(/^(\-)*(\d+)\.(\d{4}).*$/, '$1$2.$3')}
                min={0}
                onChange={e => {
                  let conversionProportionList = this.state.conversionProportionList;
                  conversionProportionList[index] =
                    e != null ? `${e}`.replace(/^(\-)*(\d+)\.(\d{4}).*$/, '$1$2.$3') : null;
                  this.setState({ conversionProportionList });
                }}
              />
            );
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
                  func: this.deleteClientItem1
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
            <span style={{ marginRight: '20px' }}>成交回报:</span>
            <Button type="default" icon="plus" onClick={() => this.addSplit('dataSource')}>
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
          <Divider />
          <Tabs size="small">
            <TabPane tab="抵押券信息" key="1">
              <ConfigableTable
                columns={abouteroPledgeRef.eroPledgeRefCol}
                dataSource={DYAbout}
                rowKey="id"
                size="small"
                pagination={{
                  hideOnSinglePage: true,
                  size: 'small'
                }}
                scroll={{ y: 100 }}
                bordered
              />
            </TabPane>
          </Tabs>
          {/* 质押券拆分 */}
          {this.state.splitFlag ? (
            <>
              <div style={{ marginTop: '10px' }}>
                <span style={{ marginRight: '20px' }}>抵押券:</span>
                <Button type="default" icon="plus" onClick={() => this.addSplit('dataSource1')}>
                  添加拆分项
                </Button>
              </div>

              <ConfigableTable
                columns={columns1}
                dataSource={[...this.state.dataSource1, totalRow]}
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
            </>
          ) : null}
        </Modal>
      </>
    );
  }

  async componentDidMount() {
    const { asyncHttpGetDYAbout, asyncHttpSearchQfList, ids } = this.props;
    const me = this;
    // 获取质押券信息
    await asyncHttpGetDYAbout({ type: 'parent', params: { code: ids[0].execCode } });
    if (this.props.DYAbout.length > 0) {
      this.setState({ splitFlag: true });
    } else {
      this.setState({ splitFlag: false });
    }
    setTimeout(() => {
      const form = this.clientForm.props.form;
      form.setFieldsValue({
        ...this.props.ids[0]
      });
      asyncHttpSearchQfList({
        params: ids[0],
        type: 'executionReportLending',
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
            lendingRateList, //借贷费用
            totalAccruedInterestList, //应计利息总额
            tradeFeeList, //交易费用
            settleFeeList, //结算费用
            productIdList //拆分的产品id数组
          } = me.state;
          const detailMsgZQJD = data?.lendingExecutionReportDistRepPageInfo?.list || [];
          for (let n = 0; n < detailMsgZQJD.length; n++) {
            totalFaceValueList[n] = detailMsgZQJD[n].faceValue;
            totalAccruedInterestList[n] = detailMsgZQJD[n].totalAccruedInterest;
            lendingRateList[n] = detailMsgZQJD[n].lendingRate;
            tradeFeeList[n] = detailMsgZQJD[n].tradeFee;
            settleFeeList[n] = detailMsgZQJD[n].settleFee;
            productIdList[n] = detailMsgZQJD[n].productId;
          }
          me.setState(
            {
              totalFaceValueList,
              lendingRateList,
              totalAccruedInterestList,
              tradeFeeList,
              settleFeeList,
              dataSource: detailMsgZQJD,
              productIdList
            },
            () => {
              me.computedCountMoney(totalFaceValueList, 'totalFaceValueTotal');
              me.computedCountMoney(totalAccruedInterestList, 'totalAccruedInterestTotal');
              me.computedCountMoney(lendingRateList, 'lendingRateTotal');
              me.computedCountMoney(tradeFeeList, 'tradeFeeTotal');
              me.computedCountMoney(settleFeeList, 'settleFeeTotal');
            }
          );
        }
      });
    }, 50);
  }

  // 表单提交
  onSubmit = () => {
    const { ids, DYAbout, asyncHttppostProductSplit } = this.props;
    const {
      totalFaceValue, //券面总额
      lendingRate, //借贷费用
      totalAccruedInterest, //应计利息总额
      tradeFee, //交易费用
      settleFee //结算费用
    } = this.props.ids[0];
    const {
      totalFaceValueList,
      lendingRateList,
      totalAccruedInterestList,
      tradeFeeList,
      settleFeeList,
      faceValueList,
      conversionProportionList,
      productIdList,
      productIdList1,
      bondList,
      bondNameList,
      splitFlag
    } = this.state;

    // 校验表单 避免没有选择拆分规则
    const form = this.clientForm.props.form;
    form.validateFields(async (err, val) => {
      if (err) {
        return;
      }
      /**成交查询判断 *******/
      //判断是否有重复的产品
      let hash = {};
      for (let n in productIdList) {
        if (productIdList[n]) {
          if (hash[productIdList[n]]) {
            message.error('成交回报存在重复的产品，请重新核对');
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
          lendingRateList[n],
          totalAccruedInterestList[n],
          tradeFeeList[n],
          settleFeeList[n]
        ];
        let opFlag = this.realExist(arrs);
        if (flag != opFlag) {
          message.error('成交回报存在数据不完整的拆分项，请重新核对');
          return;
        }
      }

      // 判断拆分数据是否等于主表数据
      if (
        totalFaceValue != this.state.totalFaceValueTotal ||
        lendingRate != this.state.lendingRateTotal ||
        totalAccruedInterest != this.state.totalAccruedInterestTotal ||
        tradeFee != this.state.tradeFeeTotal ||
        settleFee != this.state.settleFeeTotal
      ) {
        message.error('成交回报拆分金额有误，请重新核对');
        return;
      }

      /**质押券判断 *******/
      if (splitFlag) {
        //存在抵押券时才走这个逻辑
        // 判断是否数据完整  质押券
        const len1 = this.state.dataSource1.length;
        for (let n = 0; n < len1; n++) {
          let flag = productIdList1[n] ? true : false;
          let opFlag = this.realExist([bondList[n], faceValueList[n], conversionProportionList[n]]);
          if (flag != opFlag) {
            message.error('抵押券存在数据不完整的拆分项，请重新核对');
            return;
          }
        }

        // 判断质押券的产品是否超出成交回报的拆分项
        const arr1 = new Set(productIdList1);
        for (let n of arr1) {
          if (!productIdList.includes(n) && n) {
            message.error('抵押券拆分产品不在成交回报拆分项里，请重新核对');
            return;
          }
        }
        // 判断质押券是否全部都被拆分到产品上
        const arr2 = new Set(bondList);
        let bondArr = [];
        for (let n of arr2) {
          //避免Set去重时，undefined也会成为数组项
          if (n) {
            bondArr.push(n);
          }
        }
        if (bondArr.length != DYAbout.length) {
          message.error('存在未被拆分的抵押券,请重新核对');
          return;
        }

        // 判断是否有重复的产品和质押券
        let hash1 = {};
        for (let n = 0; n < productIdList1.length; n++) {
          if (productIdList1[n]) {
            if (hash1[productIdList1[n]] && hash1[productIdList1[n]] == bondList[n]) {
              message.error('同一抵押券存在重复的产品，请重新核对');
              return;
            }
            hash1[productIdList1[n]] = bondList[n];
          }
        }
        // 判断每一项的券面总额是否等于该债券拆分项的总额
        for (let n of DYAbout) {
          let bondCode = n.bondCode;
          let money = 0;
          for (let i = 0; i < productIdList1.length; i++) {
            if (bondList[i] == bondCode) {
              money = compute(money, faceValueList[i], 'plus');
            }
          }
          if (n.faceValue != money) {
            message.error('券面总额拆分有误，请重新核对');
            return;
          }
        }
      }

      // 所有判断完成后才能开始构造数据，构造拆分项数据
      const arr = [];
      for (let n = 0; n < len; n++) {
        let flag = productIdList[n] ? true : false; //只计算有数据项的
        let len1 = this.state.dataSource1.length;
        let pledgeList = [];
        if (flag) {
          if (this.state.splitFlag) {
            for (let i = 0; i < len1; i++) {
              let flag1 = productIdList1[i] ? true : false;
              if (flag1) {
                if (productIdList[n] == productIdList1[i]) {
                  pledgeList.push({
                    bondCode: bondList[i],
                    bondName: bondNameList[i],
                    conversionProportion: conversionProportionList[i],
                    faceValue: faceValueList[i]
                  });
                }
              }
            }
          }
          arr.push({
            assetUnitCode: ids[0].assetUnitCode,
            faceValue: totalFaceValueList[n],
            lendingRate: lendingRateList[n],
            managerCode: ids[0].managerCode,
            managerName: ids[0].managerName,
            pledgeList,
            productId: productIdList[n],
            settleFee: settleFeeList[n],
            tradeFee: tradeFeeList[n],
            totalAccruedInterest: totalAccruedInterestList[n]
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
        firstSettleDate: ids[0].firstSettleDate,
        firstSettleType: ids[0].firstSettleType,
        lendingRate: ids[0].lendingRate,
        managerCode: ids[0].managerCode,
        managerName: ids[0].managerName,
        occupancyDays: ids[0].occupancyDays,
        productList: arr, //,
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
        secondSettleDate: ids[0].secondSettleDate,
        secondSettleType: ids[0].secondSettleType,
        settleCurrency: ids[0].settleCurrency,
        settleFee: ids[0].settleFee,
        term: ids[0].term,
        totalAccruedInterest: ids[0].totalAccruedInterest,
        totalFaceValue: ids[0].totalFaceValue,
        tradeDirection: ids[0].tradeDirection,
        tradeFee: ids[0].tradeFee,
        tradingProduct: ids[0].tradingProduct
      };

      // console.log(params);
      await asyncHttppostProductSplit({ type: 'ZQJD', params });
      this.props.closeFormSlpit();
      this.props.query(true);
    });
  };

  // 添加拆分项
  addSplit = dataSource => {
    let data = this.state[dataSource];
    if (data.length >= 10) {
      message.error('目前仅支持拆分到10个产品');
      return;
    }
    data.push({ id: Math.random() });
    this.setState({ [dataSource]: data });
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
    let lendingRateList = this.state.lendingRateList;
    let totalAccruedInterestList = this.state.totalAccruedInterestList;
    let tradeFeeList = this.state.tradeFeeList;
    let settleFeeList = this.state.settleFeeList;
    let productIdList = this.state.productIdList;
    totalFaceValueList.splice(index, 1);
    lendingRateList.splice(index, 1);
    totalAccruedInterestList.splice(index, 1);
    tradeFeeList.splice(index, 1);
    settleFeeList.splice(index, 1);
    productIdList.splice(index, 1);
    this.setState(
      {
        totalFaceValueList,
        lendingRateList,
        totalAccruedInterestList,
        tradeFeeList,
        settleFeeList,
        productIdList
      },
      () => {
        this.computedCountMoney(totalFaceValueList, 'totalFaceValueTotal');
        this.computedCountMoney(lendingRateList, 'lendingRateTotal');
        this.computedCountMoney(totalAccruedInterestList, 'totalAccruedInterestTotal');
        this.computedCountMoney(tradeFeeList, 'tradeFeeTotal');
        this.computedCountMoney(settleFeeList, 'settleFeeTotal');
      }
    );
  };
  /***删除-质押券 */
  deleteClientItem1 = (e, item) => {
    const { dataSource1 } = this.state;
    let index = -1;
    let newDataSource1 = dataSource1.filter((node, idx) => {
      if (node.id == item.id) {
        index = idx;
      }
      return node.id != item.id;
    });
    this.reSetTableRow1(index);
    this.setState({ dataSource1: newDataSource1 });
  };
  /***重置一行拆分项的数据-质押券 */
  reSetTableRow1 = index => {
    let faceValueList = this.state.faceValueList;
    let conversionProportionList = this.state.conversionProportionList;
    let productIdList1 = this.state.productIdList1;
    faceValueList.splice(index, 1);
    conversionProportionList.splice(index, 1);
    productIdList1.splice(index, 1);
    this.setState(
      {
        faceValueList,
        conversionProportionList,
        productIdList1
      },
      () => {
        this.computedCountMoney(faceValueList, 'faceValueTotal');
      }
    );
  };
}

export default CollateralisedRepoFormSplit;
