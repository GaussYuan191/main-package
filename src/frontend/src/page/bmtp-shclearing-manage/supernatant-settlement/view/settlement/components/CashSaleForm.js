/**
 * 上清所交易指令管理-新增
 */
import React from 'react';
import moment from 'moment';
import { NormalForm, ConfigableTable, compute } from 'yss-biz';
import { Modal, Button, Form, message, Select, Input, InputNumber } from 'antd';
import debounce from 'lodash/debounce';
import '../style/style.less';
const { Item } = Form;
const { Option } = Select;
const formItemLayout = {
  wrapperCol: { span: 24 }
};

class CashSaleFormSplit extends React.Component {
  constructor(props) {
    super(props);
    this.callSearch = debounce(this.callSearch, 500);
    this.state = {
      // dataSource: [{ key: 1 }],
      dataSource: [],
      selectedRowKeys: [],
      rowRecord: {},
      holderAccount: '', //持有人账号
      holderShortname: '', //持有人简称
      businessType: '', //业务品种
      sourceTradeId: '', //源成交编号 当业务种类为分销时，取交易指令编号为值
      faceValueList: [], //表格债券面值集合
      faceValueTotal: 0, //债券面值所有的和
      bondNameList: [] //表格中的债券名称
    };
  }

  async componentDidMount() {
    await this.props.asyncHttpBondCode();
    await this.props.asyncHttpTableBonds();
  }

  //提交
  onSubmit = () => {
    //获取表单的values
    const { asyncHttpSave } = this.props;
    const { businessType } = this.state;
    const form = this.clientForm.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      //提交字段格式化
      let formatParams = this.formatField({ ...values });
      let mapResult = this.mapSaveParams(this.props.form && this.props.form.getFieldsValue());

      //若是质押式，必须要有数据
      if (values.businessType === '2') {
        if (mapResult && mapResult.length === 0) {
          message.error('质押劵至少要有一条数据');
          return;
        } else {
          const filterArr = mapResult.filter(item => {
            if (
              item.holderAccount === undefined &&
              item.holderShortname === undefined &&
              item.productCode === undefined &&
              item.productName === undefined &&
              item.faceValue === undefined &&
              item.pledgeRate === undefined
            ) {
              return item;
            }
          });
          if (filterArr && filterArr.length) {
            message.error('质押劵至少要有一条数据');
            return;
          }
        }
      }

      //判断提交的mapResult中的每条记录数据不能为空，否则提示
      if (mapResult && mapResult.length) {
        const filterArr = mapResult.filter(item => {
          if (
            (item.holderAccount &&
              item.holderShortname &&
              item.productCode &&
              item.productName &&
              item.faceValue &&
              item.pledgeRate) ||
            (item.holderAccount === undefined &&
              item.holderShortname === undefined &&
              item.productCode === undefined &&
              item.productName === undefined &&
              item.faceValue === undefined &&
              item.pledgeRate === undefined)
          ) {
            return item;
          }
        });
        if (filterArr.length !== mapResult.length) {
          message.error('质押劵/担保劵中存在未填写的数据');
          return;
        }
      }
      //判断数组中持有人账号和持有人简称是否全部相等
      if (
        !this.isAllEqual(mapResult, 'holderAccount') ||
        !this.isAllEqual(mapResult, 'holderShortname')
      ) {
        message.error('质押劵/担保劵中持有人账号或持有人简称必须相同');
        return;
      }

      //判断数组中持有人账号和持有人简称是否全部相等
      if (this.isAllUnEqual(mapResult, 'productCode')) {
        message.error('质押劵/担保劵中债券代码必须互不相同');
        return;
      }
      let params;
      if (values.businessType === '2' || values.businessType === '8') {
        //质押式回购\债券借贷
        params = { ...formatParams, pledgeList: mapResult };
      } else if (values.businessType === '3') {
        //买断式回购
        //revrepoPledgeList买断式逆回购，repoPledgeList:买断式正回购
        params = { ...formatParams, outrightList: mapResult };
      } else {
        params = { ...formatParams, pledgeList: mapResult };
      }

      asyncHttpSave &&
        asyncHttpSave({
          params,
          callback: flag => {
            if (flag) {
              this.onCancel();
            }
          }
        });
    });
  };

  //格式化字段
  formatField = values => {
    const { businessType } = this.state;
    if (values.tradeDate) {
      values.tradeDate = this.joinDate(moment(values['tradeDate']).format('YYYY-MM-DD'));
    }
    if (values.firstSettleDate) {
      values.firstSettleDate = this.joinDate(values['firstSettleDate'].format('YYYY-MM-DD'));
    }
    if (values.settlementDate) {
      values.settlementDate = this.joinDate(values['settlementDate'].format('YYYY-MM-DD'));
    }
    if (values.dueSettleDate) {
      values.dueSettleDate = this.joinDate(moment(values['dueSettleDate']).format('YYYY-MM-DD'));
    }

    const temp = {
      businessType: values.businessType,
      sourceTradeId: values.sourceTradeId,
      tradeOrderNo: values.sourceTradeId,
      sourceFrom: values.tradeSource, //交易来源
      settlementOrderId: values.settlementOrderId, //全额结算指令编号
      fullOrderType: values.tradeAmount,
      // fundSettStatus: values.settleAmount,
      // productStatus: values.tradeFee,
      // financeGracePeriod: values.financeGracePeriod, //资金宽限期
      // productGracePeriod: values.productGracePeriod, //产品宽限期
      clearType: values.clearType, //清算方式有，  结算方式字段保存时没有1111
      tradeStatus: values.tradeStatus,
      product: values.bondCode, //债券代码
      productName: values.bondShortName, //债券简称
      buyerHolder: values.buyerHolder, //买/融入/逆回购方账号
      sellerHolder: values.sellerHolder, //卖/融出/正回购方账号
      buyerStatus: values.buyerStatus, //买方状态/借入方状态
      sellerStatus: values.sellerStatus, //卖方状态/借出方状态
      buyerRemark: values.buyerRemark, //买/融入/逆回购方备注
      sellerRemark: values.sellerRemark, //卖/融出/正回购备注
      buyerHolderShortName: values.buyerHolderShortName, //买/逆回购方持有人简称
      sellerHolderShortName: values.sellerHolderShortName, //卖/正回购方持有人简称
      buyerSettleConfirmStatus: values.buyerSettleConfirmStatus, //买方结算确认状态
      sellerSettleConfirmStatus: values.sellerSettleConfirmStatus, //卖方结算确认状态
      payConfirmStatus: values.payConfirmStatus, //付款确认状态
      recvConfirmStatus: values.recvConfirmStatus, //收款确认状态
      tradeDate: values.tradeDate,
      faceValue: values.faceValue,
      settlementAmount:
        businessType == '1' || businessType == '4'
          ? values.settlementValue
          : values.firstSettleAmount, //现券买卖/网上分销时，采用settlementValue字段，其他的使用firstSettleAmount
      settlementDate:
        businessType == '1' || businessType == '4' ? values.settlementDate : values.firstSettleDate, //现券买卖/网上分销时，采用settlementDate字段，其他的使用firstSettleDate
      settlementType:
        businessType == '1' || businessType == '4' ? values.settlementType : values.firstSettleType, //现券买卖/网上分销时，结算方式给结算方式；其他首期结算方式给结算方式
      maturityAmount: values.dueSettleAmount,
      maturityDate: values.dueSettleDate,
      maturityType: values.dueSettleType,
      repoDays: values.repurchaseDays,
      cleanPrice: values.cleanPrice,
      fullPrice: values.fullPrice,
      accruedInterest: values.accruedInterest,
      productCategory: values.paymentDay,
      holderAccount: values.ourAccount,
      loanAmount: values.loanAmount,
      loanRate: values.loanRate,
      term: values.term
    };
    businessType === '4' ? delete temp.sourceTradeId : delete temp.tradeOrderNo;
    return temp;
  };

  //日期拼接不带"-"
  joinDate = value => {
    let date = '';
    if (value) {
      const arr = value.split('-');
      date = arr[0] + arr[1] + arr[2];
    }
    return date;
  };

  //判断数组中持有人账号和持有人简称是否全部相等
  isAllEqual = (array, dataIndex) => {
    if (array && array.length > 1) {
      return !array.some((item, index) => {
        if (dataIndex === 'holderAccount') {
          return item[dataIndex] !== array[0][dataIndex];
        } else if (dataIndex === 'holderShortname') {
          return item[dataIndex] !== array[0][dataIndex];
        } else {
          return true;
        }
      });
    } else {
      return true;
    }
  };

  //判断数组中债券代码都不同
  isAllUnEqual = (array, dataIndex) => {
    if (array && array.length > 1) {
      for (let i = 0; i < array.length; i++) {
        let array2 = array.slice(i + 1, array.length);
        for (let j = 0; j < array2.length; j++) {
          if (
            array[i][dataIndex] === array2[j][dataIndex] &&
            array[i][dataIndex] !== undefined &&
            array2[j][dataIndex] !== undefined
          ) {
            return true;
          }
        }
      }
    }
  };

  //回显数据
  renderData = () => {
    const { businessType, sourceTradeId } = this.state;
    if (!businessType || !sourceTradeId) {
      message.error('业务品种和源成交编号不能为空');
      return;
    }
    if (businessType && sourceTradeId) {
      const { asyncHttpQueryDetils } = this.props;
      // const params = {
      //   bizCategory: businessType,
      //   execCode: sourceTradeId
      // };
      const params =
        businessType === '4'
          ? {
              bizCategory: businessType,
              tradeInstrId: sourceTradeId
            }
          : {
              bizCategory: businessType,
              execCode: sourceTradeId
            };
      asyncHttpQueryDetils &&
        asyncHttpQueryDetils(params).then(() => {
          const { queryDetails } = this.props;
          const data = queryDetails;
          if (data) {
            if (data.tradeDate) {
              data.tradeDate = moment(new Date(data.tradeDate), 'YYYY-MM-DD');
            }
            if (data.firstSettleDate) {
              data.firstSettleDate = moment(new Date(data.firstSettleDate), 'YYYY-MM-DD');
            }
            if (data.settlementDate) {
              data.settlementDate = moment(new Date(data.settlementDate), 'YYYY-MM-DD');
            }
            if (data.dueSettleDate) {
              data.dueSettleDate = moment(new Date(data.dueSettleDate), 'YYYY-MM-DD');
            }
            this.clientForm.setValues(data);
            //若pledgeCollBondList存在，则添加key
            if (data.pledgeCollBondList && data.pledgeCollBondList.length) {
              const arr = data.pledgeCollBondList;
              arr.map((item, index) => (item.key = index + 1));
              const faceValueList = arr.map((item, index) => item.faceValue); //产品面值
              const bondNameList = arr.map((item, index) => item.productName); //债券简称
              const bondCodesList = arr.map(item => item.productCode); //债券代码
              this.setState({ dataSource: arr, faceValueList, bondNameList }, () => {
                const data = [...this.state.dataSource];
                //若是远程的数据，则直接拼接，回显数据，此时加载的数据仍是系统数据
                data.map(item => (item.productCode = item.productCode + '-' + item.productName));
                this.renderTable(data); //回显表格中的数据
                // bondCodesList.map(item => {
                //   this.callSearch(item);
                // });
              });
            }
          } else {
            const form = this.clientForm.props.form;
            form.resetFields();
            form.setFieldsValue({ businessType, sourceTradeId });
            this.setState({ dataSource: [] });
          }
        });
    }
  };

  //表格数据回显
  renderTable = formData => {
    const form = this.props.form;
    for (let i = 0; i < formData.length; i++) {
      const obj = {};
      for (let [key, value] of Object.entries(formData[i])) {
        if (key !== 'id') {
          const indexKey = key + '_' + i;
          obj[indexKey] = value;
        }
      }
      setTimeout(() => {
        form.setFieldsValue(obj);
      }, 10);
    }
  };

  //得到参数
  mapSaveParams = data => {
    const result = [];
    const maxIndex = Math.max.apply(
      null,
      Object.keys(data)
        .filter(item => item.includes('_'))
        .map(item => item.split('_')[1])
    );
    for (let i = 0; i <= maxIndex; i++) {
      result[i] = {};
    }
    for (let [key, value] of Object.entries(data)) {
      if (key.includes('_')) {
        const keyArr = key.split('_');
        if (value instanceof moment) {
          result[keyArr[1]][keyArr[0]] = moment(value).format('YYYY-MM-DD') || '';
        } else {
          //回显债券代码后，在提交时截取债券代码code
          if (keyArr[0] == 'productCode') {
            const productCodeArr = value && value.split('-');
            if (productCodeArr && productCodeArr.length) {
              result[keyArr[1]][keyArr[0]] = productCodeArr[0];
            }
          } else {
            result[keyArr[1]][keyArr[0]] = value;
          }
        }
      }
    }
    return result;
  };

  //新增表格
  handleAddRow = () => {
    const { dataSource, holderAccount, holderShortname } = this.state;
    let obj;
    let haveHolderAccount =
      holderAccount || (dataSource && dataSource[0] && dataSource[0].holderAccount);
    let haveHolderShortName =
      holderShortname || (dataSource && dataSource[0] && dataSource[0].holderShortname);
    if (haveHolderAccount) {
      obj = {
        key: dataSource.length + 1,
        holderAccount: haveHolderAccount,
        holderShortname: haveHolderShortName
      };
    } else {
      obj = { key: dataSource.length + 1 };
    }
    dataSource.push(obj);
    this.setState({ dataSource });
  };

  //Input和InputNumber
  getInput = (text, record, dataIndex, index) => {
    const { getFieldDecorator } = this.props.form;
    const { businessType } = this.state;
    return (
      <Form.Item {...formItemLayout}>
        {getFieldDecorator(`${dataIndex}` + '_' + index, {
          // rules: [{ required: true }],
          // initialValue: this.initialValue(text,record, dataIndex, index)
        })(
          dataIndex === 'faceValue' || dataIndex === 'pledgeRate' ? (
            <InputNumber
              min={0}
              onChange={value => {
                //只有是质押式时，产品面值随着质押券的变动而变动
                if (dataIndex === 'faceValue' && businessType === '2') {
                  let faceValueList = this.state.faceValueList;
                  faceValueList[index] = value;
                  this.setState({ faceValueList }, () => {
                    this.computedCountMoney(faceValueList, 'faceValueTotal');
                  });
                }
              }}
            />
          ) : (
            <Input
              type="text"
              className="ellipsis"
              title={text}
              allowClear
              disabled={dataIndex === 'productName' ? true : false}
              onChange={e => {
                if (dataIndex === 'holderAccount') {
                  this.setState({ holderAccount: e.target.value });
                }
                if (dataIndex === 'holderShortname') {
                  this.setState({ holderShortname: e.target.value });
                }
              }}
            />
          )
        )}
      </Form.Item>
    );
  };

  //下拉框
  getSelect = (text, record, dataIndex, index) => {
    const { getFieldDecorator } = this.props.form;
    const { bondCodesList, asyncHttpTableBonds } = this.props;
    return (
      <Form.Item {...formItemLayout}>
        {getFieldDecorator(`${dataIndex}` + '_' + index, {
          // rules: [{ required: true }],
          // initialValue: text
        })(
          <Select
            type="text"
            style={{ width: 136 }}
            className="ellipsis"
            title={text}
            allowClear
            showSearch
            onChange={(value, option) => {
              let children = option ? option.props.children : option;
              if (dataIndex === 'productCode') {
                if (children) {
                  const splitArr = children.split('-');
                  const bondName = splitArr && splitArr[1].trim();
                  let bondNameList = this.state.bondNameList;
                  bondNameList[index] = bondName;
                  this.setState({ bondNameList }, () => {
                    const array = this.state.bondNameList.map((value, index) => {
                      let obj = {};
                      obj.productName = value;
                      return obj;
                    });
                    this.renderTable(array); //回显表格中的债券简称
                  });
                } else {
                  //点击清除时，children是undefined
                  //this.renderTable(this.state.bondNameList); //回显表格中的债券简称
                }
                //若value没有值时，显示系统数据
                if (!value) {
                  asyncHttpTableBonds();
                }
              }
            }}
            onSearch={val => {
              if (val.length >= 4) {
                //表格内的证券代码
                asyncHttpTableBonds({ bondCode: val });
              }
              if (!val) {
                asyncHttpTableBonds();
              }
            }}
            onDropdownVisibleChange={open => {
              // if (open) {
              //   asyncHttpTableBonds();
              // }
              asyncHttpTableBonds();
            }}
          >
            {bondCodesList &&
              bondCodesList.length &&
              bondCodesList.map(item => {
                const label = item['bondCode'] + '-' + item['securityName'];
                return (
                  <Option key={item['id']} value={item['bondCode']} title={label}>
                    {label}
                  </Option>
                );
              })}
          </Select>
        )}
      </Form.Item>
    );
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
    this.setState({ [countType]: sum }, () => {
      //计算产品面值总和
      this.clientForm.setValues({ faceValue: this.state.faceValueTotal });
    });
  };

  //删除
  handleDeleteRow = () => {
    const { selectedRowKeys, rowRecord, faceValueList, businessType } = this.state;
    if (selectedRowKeys.length) {
      const dataSource = [...this.state.dataSource];
      let data;
      if (dataSource && dataSource.length > 0) {
        const array = dataSource.filter(item => item.key !== rowRecord.key);
        data = array.map((item, index) => {
          item.key = index + 1;
          return item;
        });
      }
      //质押式时：点击删除,从faceValueList中去除对应的数值
      if (businessType === '2') {
        if (faceValueList && faceValueList.length) {
          const newFaceValueList = faceValueList.filter(
            (item, index) => index + 1 !== rowRecord.key
          );
          this.setState({ faceValueList: newFaceValueList }, () => {
            this.computedCountMoney(this.state.faceValueList, 'faceValueTotal');
          });
        } else {
          this.setState({ faceValueList: [] }, () => {
            this.clientForm.setValues({ faceValue: 0 });
          });
        }
      }

      this.setState({ dataSource: data });
    } else {
      message.info('请选择一条记录!');
    }
  };

  //清空businessType, tradeId, sourceTradeId 的值
  clearValue = () => {
    this.setState({
      businessType: '',
      sourceTradeId: '',
      faceValueTotal: 0,
      faceValueList: []
    });
  };

  //取消
  onCancel = () => {
    this.props.close();
    this.clearValue();
  };

  //初始化表格列
  initColumns = () => {
    this.columns = [
      {
        title: '序号',
        dataIndex: 'key',
        align: 'center',
        width: 50
      },
      {
        title: '持有人账号',
        dataIndex: 'holderAccount',
        width: 100,
        render: (text, record, index) => {
          return this.getInput(text, record, 'holderAccount', index);
        }
      },
      {
        title: '持有人简称',
        dataIndex: 'holderShortname',
        width: 100,
        render: (text, record, index) => {
          return this.getInput(text, record, 'holderShortname', index);
        }
      },
      {
        title: '债券代码',
        dataIndex: 'productCode',
        width: 120,
        render: (text, record, index) => {
          return this.getSelect(text, record, 'productCode', index);
        }
      },
      {
        title: '债券简称',
        dataIndex: 'productName',
        width: 180,
        render: (text, record, index) => {
          return this.getInput(text, record, 'productName', index);
        }
      },
      {
        title: '债券面值(万元)',
        dataIndex: 'faceValue',
        width: 100,
        render: (text, record, index) => {
          return this.getInput(text, record, 'faceValue', index);
        }
      },
      {
        title: '质押比例',
        dataIndex: 'pledgeRate',
        width: 80,
        render: (text, record, index) => {
          return this.getInput(text, record, 'pledgeRate', index);
        }
      }
    ];
  };

  //判断是否必填项
  isRequired = dataIndex => {
    const { businessType } = this.state;
    //1：现券  2：质押式  3：买断式  4:网上分销   8：债券借贷
    let required;
    if (businessType === '1') {
      //现券买卖
      if (
        dataIndex === 'tradeAmount' ||
        dataIndex === 'dueSettleAmount' ||
        dataIndex === 'dueSettleDate' ||
        dataIndex === 'dueSettleType' ||
        dataIndex === 'loanAmount' ||
        dataIndex === 'firstSettleType'
      ) {
        //全额结算指令类型不是必填
        required = false;
      } else {
        required = true;
      }
    } else if (businessType === '4') {
      if (
        dataIndex === 'tradeAmount' ||
        dataIndex === 'dueSettleAmount' ||
        dataIndex === 'dueSettleDate' ||
        dataIndex === 'dueSettleType' ||
        dataIndex === 'loanAmount' ||
        dataIndex === 'firstSettleType' ||
        dataIndex === 'cleanPrice' ||
        dataIndex === 'fullPrice' ||
        dataIndex === 'accruedInterest'
      ) {
        //全额结算指令类型不是必填
        required = false;
      } else {
        required = true;
      }
    } else if (businessType === '2') {
      //质押式
      if (
        dataIndex === 'bondCode' ||
        dataIndex === 'bondShortName' ||
        dataIndex === 'cleanPrice' ||
        dataIndex === 'fullPrice' ||
        dataIndex === 'accruedInterest' ||
        dataIndex === 'loanAmount' ||
        dataIndex === 'settlementType'
      ) {
        //债券代码、债券简称、百元净价、百元全价、应计利息总和、借贷费用不是必填
        required = false;
      } else {
        required = true;
      }
    } else if (businessType === '3') {
      //买断式
      if (
        dataIndex === 'cleanPrice' ||
        dataIndex === 'fullPrice' ||
        dataIndex === 'accruedInterest' ||
        dataIndex === 'loanAmount' ||
        dataIndex === 'settlementType'
      ) {
        //百元净价、百元全价、应计利息总和、借贷费用不是必填
        required = false;
      } else {
        required = true;
      }
    } else if (businessType === '8') {
      //债券借贷
      if (
        dataIndex === 'cleanPrice' ||
        dataIndex === 'fullPrice' ||
        dataIndex === 'accruedInterest' ||
        dataIndex === 'dueSettleAmount' ||
        dataIndex === 'settlementType'
      ) {
        //百元净价、百元全价、应计利息总和、到期结算金额不是必填
        required = false;
      } else {
        required = true;
      }
    }
    return required;
  };

  // 搜索债券信息
  callSearch = value => {
    const that = this;
    const { asyncHttpBondCode } = this.props;
    asyncHttpBondCode({ bondCode: value });
  };

  render() {
    this.initColumns();
    const { businessType, selectedRowKeys } = this.state;
    const { businessTypes, bondCodes } = this.props;
    const formItems = [
      {
        name: 'businessType',
        label: '业务品种',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '业务品种不能为空'
          }
        ],
        props: {
          placeholder: '请选择业务品种',
          allowClear: true,
          onChange: value => {
            this.setState(
              {
                businessType: value,
                dataSource: [],
                faceValueList: [],
                faceValueTotal: 0
              },
              () => {
                this.clientForm.setValues({ faceValue: this.state.faceValueTotal });
              }
            );
          }
        },
        options: businessTypes
      },
      {
        name: 'sourceTradeId',
        label: businessType === '4' ? '交易指令编号' : '源成交编号',
        type: 'Input',
        rules: [
          {
            required: true,
            message: businessType === '4' ? '交易指令编号不能为空' : '源成交编号不能为空'
          }
        ],
        props: {
          placeholder: businessType === '4' ? '请输入交易指令编号' : '请输入源成交编号',
          allowClear: true,
          onChange: e => {
            this.setState({ sourceTradeId: e.target.value });
          }
        }
      },
      {
        isLine: true
      },
      {
        name: 'tradeSource',
        label: '交易来源',
        type: 'Select',
        props: {
          getDics: 1030307,
          placeholder: '请输入交易来源',
          initialValue: 'HD',
          allowClear: true
        }
      },
      {
        name: 'settlementOrderId',
        label: '全额结算指令编号',
        type: 'Input',
        props: {
          placeholder: '请输入全额结算指令编号',
          allowClear: true
        }
      },
      {
        name: 'tradeAmount',
        label: '全额结算指令类型',
        type: 'Select',
        rules: [
          {
            required: this.isRequired('tradeAmount'),
            message: '全额结算指令类型不能为空'
          }
        ],
        props: {
          placeholder: '请选择全额结算指令类型',
          getDics: 1030314,
          allowClear: true,
          initialValue: '0'
        }
      },
      {
        name: 'grossOrdeStatus',
        label: '全额结算指令状态',
        type: 'Select',
        props: {
          placeholder: '请选择全额结算指令状态',
          getDics: 1030311,
          allowClear: true,
          initialValue: '0'
        }
      },
      // {
      //   name: 'settleAmount',
      //   label: '资金结算状态',
      //   type: 'Select',
      //   props: {
      //     placeholder: '请选择资金结算状态',
      //     getDics: 1030313,
      //     allowClear: true,
      //     initialValue: '4'
      //   }
      // },
      {
        name: 'tradeFee',
        label: '产品结算状态',
        type: 'Select',
        props: {
          placeholder: '请选择产品结算状态',
          getDics: 1030312,
          allowClear: true,
          initialValue: '4'
        }
      },
      // {
      //   name: 'financeGracePeriod',
      //   label: '资金宽限期',
      //   type: 'Input',
      //   props: {
      //     placeholder: '请输入资金宽限期',
      //     allowClear: true
      //   }
      // },
      // {
      //   name: 'productGracePeriod',
      //   label: '产品宽限期',
      //   type: 'Input',
      //   props: {
      //     placeholder: '请输入产品宽限期',
      //     allowClear: true
      //   }
      // },
      // {
      //   name: 'bizCategoryName',
      //   label: '业务品种',
      //   type: 'Select',
      //   props: {
      //     placeholder: '请选择产品结算状态',
      //     getDics: 1030308,
      //     allowClear: true
      //   }
      // },
      {
        name: 'clearType',
        label: '清算方式',
        type: 'Select',
        props: {
          placeholder: '请选清算方式',
          getDics: 1030306,
          allowClear: true,
          initialValue: '2'
        }
      },
      {
        name: 'settlementType',
        label: '结算方式',
        type: 'Select',
        rules: [
          {
            required: this.isRequired('settlementType'),
            message: '结算方式不能为空'
          }
        ],
        props: {
          placeholder: '请选结算方式',
          getDics: 1030310,
          allowClear: true
        }
      },
      {
        name: 'tradeStatus',
        label: '交易状态',
        type: 'Select',
        props: {
          placeholder: '请选择交易状态',
          getDics: 1030302,
          allowClear: true,
          initialValue: '0'
        }
      },
      {
        name: 'bondCode',
        label: '债券代码',
        type: 'Select',
        rules: [
          {
            required: this.isRequired('bondCode'),
            message: '债券代码不能为空'
          }
        ],
        props: {
          placeholder: '请输入债券代码',
          allowClear: true,
          type: 'bond',
          // config: selectRequest,
          onChange: (e, option) => {
            let children = option ? option.props.children : option;
            if (children) {
              const splitArr = children.split('-');
              const bondCode = splitArr && splitArr[0].trim();
              const bondName = splitArr && splitArr[1].trim();
              const form = this.clientForm.props.form;
              form.setFieldsValue({ bondShortName: bondName });
            }
          },
          filterOption: false,
          onSearch: val => {
            if (val.length >= 4) {
              this.callSearch(val);
            }
            if (!val) {
              const { asyncHttpBondCode } = this.props;
              asyncHttpBondCode();
            }
          }
        },
        options: bondCodes
      },
      {
        name: 'bondShortName',
        label: '债券简称',
        type: 'Input',
        rules: [
          {
            required: this.isRequired('bondShortName'),
            message: '债券简称不能为空'
          }
        ],
        props: {
          placeholder: '请输入债券简称',
          allowClear: true,
          disabled: true
        }
      },
      // {
      //   name: 'bondShortName',
      //   label: '委托方向',
      //   type: 'Select',
      //   props: {
      //     placeholder: '请输入债券简称',
      //     // getDics: 1030303,
      //     allowClear: true
      //   }
      // },
      {
        name: 'buyerHolder',
        label: '买/融入/逆回购方账号',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '账号不能为空'
          }
        ],
        props: {
          placeholder: '请输入',
          allowClear: true
        }
      },
      {
        name: 'sellerHolder',
        label: '卖/融出/正回购方账号',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '账号不能为空'
          }
        ],
        props: {
          placeholder: '请输入',
          allowClear: true
        }
      },
      {
        name: 'buyerStatus',
        label: '买方状态/借入方状态',
        type: 'Select',
        props: {
          placeholder: '请输入',
          getDics: 1030303,
          allowClear: true,
          initialValue: 'C'
        }
      },
      {
        name: 'sellerStatus',
        label: '卖方状态/借出方状态',
        type: 'Select',
        props: {
          placeholder: '请输入',
          getDics: 1030303,
          allowClear: true,
          initialValue: 'C'
        }
      },
      {
        name: 'buyerRemark',
        label: '买/融入/逆回购方备注',
        type: 'Input',
        props: {
          placeholder: '请输入',
          allowClear: true
        }
      },
      {
        name: 'sellerRemark',
        label: '卖/融出/正回购备注',
        type: 'Input',
        props: {
          placeholder: '请输入',
          allowClear: true
        }
      },
      {
        name: 'buyerHolderUser',
        label: '买/逆回购方持有人',
        type: 'Input',
        props: {
          placeholder: '请输入',
          allowClear: true
        }
      },
      {
        name: 'buyerHolderShortName',
        label: '买/逆回购方持有人简称',
        type: 'Input',
        props: {
          placeholder: '请输入简称',
          allowClear: true
        }
      },
      {
        name: 'sellerHolderShortName',
        label: '卖/正回购方持有人简称',
        type: 'Input',
        props: {
          placeholder: '请输入',
          allowClear: true
        }
      },
      {
        name: 'buyerSettleConfirmStatus',
        label: '买方结算确认状态',
        type: 'Select',
        props: {
          getDics: 1030304,
          placeholder: '请选择',
          initialValue: 'C'
        }
      },
      {
        name: 'sellerSettleConfirmStatus',
        label: '卖方结算确认状态',
        type: 'Select',
        props: {
          getDics: 1030304,
          placeholder: '请选择',
          initialValue: 'C'
        }
      },
      {
        name: 'payConfirmStatus',
        label: '付款确认状态',
        type: 'Select',
        props: {
          getDics: 1030305,
          placeholder: '请选择付款确认状态',
          initialValue: '0'
        }
      },
      {
        name: 'recvConfirmStatus',
        label: '收款确认状态',
        type: 'Select',
        props: {
          getDics: 1030305,
          placeholder: '请选择收款确认状态',
          initialValue: '0'
        }
      },
      {
        name: 'tradeDate',
        label: '交易日期',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '交易日期不能为空'
          }
        ],
        props: {
          placeholder: '请选择日期',
          allowClear: true
        }
      },
      {
        name: 'faceValue',
        label: '产品面值(万元)',
        type: 'InputNumber',
        rules: [
          {
            required: true,
            message: '产品面值不能为空'
          }
        ],
        props: {
          placeholder: '请输入产品面值',
          allowClear: true,
          disabled: businessType === '2' ? true : false,
          min: 0,
          initialValue: this.state.faceValueTotal || 0
        }
      },
      {
        name: businessType == '1' || businessType == '4' ? 'settlementValue' : 'firstSettleAmount',
        label: businessType == '1' || businessType == '4' ? '结算金额(元)' : '首期结算金额(元)',
        type: 'InputNumber',
        rules: [
          {
            required: businessType === '8' ? false : true,
            message: '结算金额不能为空'
          }
        ],
        props: {
          placeholder: '请输入金额',
          allowClear: true,
          min: 0
        }
      },
      {
        name: businessType == '1' || businessType == '4' ? 'settlementDate' : 'firstSettleDate',
        label: businessType == '1' || businessType == '4' ? '结算日期' : '首期结算日期',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '日期不能为空'
          }
        ],
        props: {
          placeholder: '请选择日期',
          allowClear: true
        }
      },
      {
        name: 'firstSettleType',
        label: '首期结算方式',
        type: 'Select',
        rules: [
          {
            required: this.isRequired('firstSettleType'),
            message: '首期结算方式不能为空'
          }
        ],
        props: {
          placeholder: '请选择首期结算方式',
          getDics: 1030310,
          allowClear: true
        }
      },
      {
        name: 'dueSettleAmount',
        label: '到期结算金额(元)',
        type: 'InputNumber',
        rules: [
          {
            required: this.isRequired('dueSettleAmount'),
            message: '到期结算金额不能为空'
          }
        ],
        props: {
          placeholder: '请输入到期结算金额',
          allowClear: true,
          min: 0
        }
      },
      {
        name: 'dueSettleDate',
        label: '到期结算日期',
        type: 'DatePicker',
        rules: [
          {
            required: this.isRequired('dueSettleDate'),
            message: '到期结算日期不能为空'
          }
        ],
        props: {
          placeholder: '请选择日期',
          allowClear: true
        }
      },
      {
        name: 'dueSettleType',
        label: '到期结算方式',
        type: 'Select',
        rules: [
          {
            required: this.isRequired('dueSettleType'),
            message: '到期结算方式不能为空'
          }
        ],
        props: {
          placeholder: '请选择到期结算方式',
          getDics: 1030310,
          allowClear: true
        }
      },
      {
        name: 'repurchaseDays',
        label: '回购天数',
        type: 'Input',
        props: {
          placeholder: '请输入回购天数',
          allowClear: true
        }
      },
      {
        name: 'cleanPrice',
        label: '百元净价(元)',
        type: 'InputNumber',
        rules: [
          {
            required: this.isRequired('cleanPrice'),
            message: '百元净价不能为空'
          }
        ],
        props: {
          placeholder: '请输入百元净价',
          allowClear: true,
          min: 0
        }
      },
      {
        name: 'fullPrice',
        label: '百元全价(元)',
        type: 'InputNumber',
        rules: [
          {
            required: this.isRequired('fullPrice'),
            message: '百元全价不能为空'
          }
        ],
        props: {
          placeholder: '请输入百元全价',
          allowClear: true,
          min: 0
        }
      },
      {
        name: 'accruedInterest',
        label: '应计利息总额(元)',
        type: 'InputNumber',
        rules: [
          {
            required: this.isRequired('accruedInterest'),
            message: '应计利息总额不能为空'
          }
        ],
        props: {
          placeholder: '请输入应计利息总额',
          allowClear: true,
          min: 0
        }
      },
      {
        name: 'paymentDay',
        label: '产品大类',
        type: 'Select',
        props: {
          placeholder: '请选择产品大类',
          getDics: 1030124,
          allowClear: true
        }
      },
      {
        name: 'ourAccount',
        label: '持有人账号',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '持有人账号不能为空'
          }
        ],
        props: {
          placeholder: '请输入持有人账号',
          allowClear: true
        }
      },
      {
        name: 'loanAmount',
        label: '借贷费用(元)',
        type: 'InputNumber',
        rules: [
          {
            required: this.isRequired('loanAmount'),
            message: '借贷费用不能为空'
          }
        ],
        props: {
          placeholder: '请输入借贷费用',
          allowClear: true
        }
      },
      {
        name: 'loanRate',
        label: '借贷费率',
        type: 'InputNumber',
        props: {
          placeholder: '请输入借贷费率',
          allowClear: true
        }
      },
      {
        name: 'term',
        label: '借贷期限',
        type: 'Input',
        props: {
          placeholder: '请输入借贷期限',
          allowClear: true
        }
      }
    ];

    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows, e) => {
        this.setState({ selectedRowKeys, rowRecord: selectedRows[0] });
      },
      columnWidth: 30,
      type: 'radio'
    };

    return (
      <div>
        <Modal
          title="新增-结算指令"
          visible={this.props.addVisible}
          width={1100}
          destroyOnClose={true}
          maskClosable={false}
          footer={null}
          onCancel={this.onCancel}
        >
          <div className="cashSaleForm">
            <div className="query-button">
              <Button type="default" onClick={this.renderData}>
                查询
              </Button>
            </div>

            <NormalForm
              labelSize="7em"
              lineOf={3}
              formItem={formItems}
              refs={ref => (this.clientForm = ref)}
            />
            {businessType === '2' || businessType === '3' || businessType === '8' ? (
              <>
                <div>
                  <Button
                    type="default"
                    icon="plus"
                    className="add-button"
                    onClick={this.handleAddRow}
                  >
                    添加
                  </Button>
                  <Button
                    type="default"
                    icon="delete"
                    className="delete-button"
                    onClick={this.handleDeleteRow}
                  >
                    删除
                  </Button>
                </div>
                <ConfigableTable
                  columns={this.columns}
                  dataSource={this.state.dataSource}
                  rowKey="id"
                  bordered
                  size="default"
                  pagination={false}
                  showColumnDetail={false}
                  style={{ marginTop: '10px' }}
                  scroll={{ x: 1020, y: 200 }}
                  rowSelection={rowSelection}
                />
              </>
            ) : null}
          </div>

          <div className="cashSaleForm-footer">
            <Button onClick={this.onCancel}>取消</Button>
            <Button type="primary" onClick={this.onSubmit}>
              确定
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

const WrappedCashSaleFormSplit = Form.create({ name: 'coordinated' })(CashSaleFormSplit);
export default WrappedCashSaleFormSplit;
