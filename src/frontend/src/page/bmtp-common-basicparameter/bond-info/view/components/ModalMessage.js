import React, { Component } from 'react';
import { Modal, message } from 'antd';
import { modalInfo } from 'yss-biz/utils/util/constant';
import { NormalForm } from 'yss-biz';
import moment from 'moment';

class ModalMessage extends Component {
  state = {};
  componentDidMount() {
    this.getModalValues();
  }
  getModalValues = () => {
    const { asyncGetBaseInfo, isOpenFormModal, rowChecked } = this.props;
    if (isOpenFormModal.sign == 'edit') {
      asyncGetBaseInfo({ id: rowChecked && rowChecked[0].id, sign: 'edit' }).then(() => {
        const { modalMessage } = this.props;
        modalMessage.bondIssueDate = moment(new Date(modalMessage.bondIssueDate), 'YYYY-MM-DD');
        modalMessage.bondDueDate = moment(new Date(modalMessage.bondDueDate), 'YYYY-MM-DD');
        modalMessage.listDate = moment(new Date(modalMessage.listDate), 'YYYY-MM-DD');
        modalMessage.delistDate = moment(new Date(modalMessage.delistDate), 'YYYY-MM-DD');
        modalMessage.valueDate = moment(new Date(modalMessage.valueDate), 'YYYY-MM-DD');
        modalMessage.expiryInterestDate = moment(
          new Date(modalMessage.expiryInterestDate),
          'YYYY-MM-DD'
        );
        modalMessage.exerciseDate = moment(new Date(modalMessage.exerciseDate), 'YYYY-MM-DD');
        modalMessage.redeemDate = moment(new Date(modalMessage.redeemDate), 'YYYY-MM-DD');
        this.calcInput.setValues(modalMessage);
      });
    }
    // if (isOpenFormModal.sign === 'edit') {
    //   asyncSetAboutMessage({ id, type: 'edit' }).then(res => {
    //     const { modalMessage } = this.props;
    //     !!modalMessage.tradeDate &&
    //       (modalMessage.tradeDate = moment(new Date(modalMessage.tradeDate), 'YYYY-MM-DD'));
    //     this.handleSetValues(modalMessage);
    //     this.setState(
    //       {
    //         totalBalance: modalMessage.totalBalance,
    //         beforeChangeSubject: modalMessage.usableSubject,
    //         periodTotal: modalMessage.periodTotal,
    //         afterTotalBalance: modalMessage.periodTotal,
    //         borrowingSide: modalMessage.borrowingSide,
    //         afterChangeSubject: modalMessage.afterChangeSubject,
    //         productName: modalMessage.productName
    //       },
    //       () => {}
    //     );
    //   });
    // }
  };
  handleSetValues = aboutMessage => {
    this.calcInput.setValues(aboutMessage);
  };

  render() {
    const { isOpenFormModal, ZQlist } = this.props;
    // const me = this;

    let formItem = [
      {
        name: 'securityCode',
        label: '证券内码',
        type: 'Input',
        rules: [{ required: true, message: '不能为空' }],
        props: {
          placeholder: '请输入证券内码',
          maxLength: 40
        }
      },
      {
        name: 'bondCode',
        label: '债券代码',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '不能为空'
          }
        ],
        props: {
          placeholder: '请输入债券代码',
          maxLength: 40
        }
      },
      {
        name: 'isinCode',
        label: 'ISIN代码',
        type: 'Input',
        props: {
          placeholder: '请输入ISIN代码'
        }
      },
      {
        name: 'securityName',
        label: '债券简称',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '不能为空'
          }
        ],
        props: { placeholder: '请输入债券简称', maxLength: 120 }
      },
      {
        name: 'securityNameCn',
        label: '债券全称',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '不能为空'
          }
        ],
        props: { placeholder: '请输入债券全称', maxLength: 120 }
      },
      {
        name: 'securitySubtype',
        label: '债券类型',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '不能为空'
          }
        ],
        props: {
          placeholder: '请选择债券类型',
          dropdownMatchSelectWidth: false
          // getDics: 1030315
          // config: selectRequest,
          // type: 'bond'
          // onChange: value => {
          //   me.setState({ periodTotal: value }, () => {});
          // }
        },
        options: ZQlist
      },
      {
        name: 'securityType',
        label: '证券类型',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '不能为空'
          }
        ],
        props: {
          disabled: true,
          placeholder: '请选择证券类型',
          dropdownMatchSelectWidth: false,
          initialValue: 'ZQ'
          // onChange: value => {
          //   me.setState({ periodTotal: value }, () => {});
          // }
        }
      },
      {
        name: 'marketCode',
        label: '交易市场',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '不能为空'
          }
        ],
        props: {
          placeholder: '请选择交易市场',
          getDics: 1030008
        }
      },
      {
        name: 'transCurrency',
        label: '债券币种',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '债券币种不能为空'
          }
        ],
        props: {
          placeholder: '请选择债券币种',
          getDics: 1000009
        }
      },
      {
        name: 'issuer',
        label: '发行人',
        type: 'Select',
        props: {
          placeholder: '请选择发行人',
          getDics: 1030023
        }
      },
      {
        name: 'boardDecimal',
        label: '每手数量',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '每手数量不能为空'
          }
        ],
        props: {
          placeholder: '请输入每手数量',
          maxLength: 9
          //initialValue: bond.boardDecimal || 10,
        }
      },
      {
        name: 'offerFactor',
        label: '报价因子',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '报价因子不能为空'
          }
        ],
        props: {
          placeholder: '请输入报价因子',
          //initialValue: bond.offerFactor ? bond.offerFactor : 1
          maxLength: 13
        }
      },
      {
        name: 'bondIssueDate',
        label: '发行日',
        type: 'DatePicker',
        props: {
          placeholder: '请选择日期'
        }
      },
      {
        name: 'bondDueDate',
        label: '到期日',
        type: 'DatePicker',
        props: {
          placeholder: '请选择日期'
        }
      },
      {
        name: 'financialTools',
        label: '金融工具',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '金融工具不能为空'
          }
        ],
        props: {
          placeholder: '请选择金融工具',
          getDics: 1040033
        }
      },
      {
        name: 'listDate',
        label: '上市日期',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '上市日期不能为空'
          }
        ],
        props: {
          placeholder: '请选择日期'
        }
      },
      {
        name: 'delistDate',
        label: '摘牌日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择日期'
        }
      },
      {
        name: 'securityTerm',
        label: '债券期限(年)',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '债券期限不能为空'
          }
        ],
        props: { placeholder: '请输入债券期限' }
      },
      {
        name: 'hundredAccruedInterest',
        label: '每百元应计利息(元)',
        type: 'Input',
        props: { placeholder: '请输入每百元应计利息' }
      },
      {
        name: 'realIssueSize',
        label: '发行量(亿)',
        type: 'Input',
        props: { placeholder: '请输入发行量' }
      },
      {
        name: 'circulationSize',
        label: '流通量(亿)',
        type: 'Input',
        props: { placeholder: '请输入流通量' }
      },
      {
        name: 'cityFlag',
        label: '是否城投',
        type: 'Select',
        props: {
          placeholder: '请选择',
          getDics: 1000016
        }
      },
      {
        name: 'internalRating',
        label: '内部评级',
        type: 'Select',
        props: {
          placeholder: '请选择内部评级',
          getDics: 1040036
        }
      },
      {
        name: 'externalRating',
        label: '外部评级',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '外部评级不能为空'
          }
        ],
        props: {
          placeholder: '请选择外部评级',
          getDics: 1040035
        }
      },
      {
        name: 'hundredCost',
        label: '每百元本金(元)',
        type: 'Input',
        props: { placeholder: '请输入每百元本金' }
      },
      {
        name: 'pendPriod',
        label: '待偿期',
        type: 'Input',
        props: { placeholder: '请输入代偿期' }
      },
      {
        name: 'standardPendPriod',
        label: '标准待偿期',
        type: 'Input',
        props: { placeholder: '请输入标准待偿期' }
      },
      {
        isLine: true
      },
      {
        name: 'faceValue',
        label: '债券面值(元)',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '债券面值不能为空'
          }
        ],
        props: { placeholder: '请输入债券面值' }
      },
      {
        name: 'issuePrice',
        label: '发行价格(元)',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '发行价格不能为空'
          }
        ],
        props: { placeholder: '请输入发行价格' }
      },
      {
        name: 'couponRate',
        label: '票面利率(%)',
        type: 'InputNumber',
        rules: [
          {
            required: true,
            message: '票面利率不能为空'
          }
        ],
        props: {
          placeholder: '请输入票面利率',
          formatter: value => `${value}`.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
        }
      },
      {
        name: 'taxRate',
        label: '税率(%)',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '税率不能为空'
          }
        ],
        props: { placeholder: '请输入税率' }
      },
      {
        name: 'couponRateType',
        label: '息票类型',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '息票类型不能为空'
          }
        ],
        props: { placeholder: '请选择息票类型', getDics: 1040037 }
      },
      {
        name: 'couponPaymentFrequency',
        label: '付息频率',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '付息频率不能为空'
          }
        ],
        props: { placeholder: '请选择付息频率', getDics: 1040038 }
      },
      {
        name: 'dayCount',
        label: '计息基准',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '计息基准不能为空'
          }
        ],
        props: { placeholder: '请选择计息基准', getDics: 1040039 }
      },
      {
        name: 'valueDate',
        label: '债券起息日',
        type: 'DatePicker',
        props: {
          placeholder: '请选择日期'
        }
      },
      {
        name: 'expiryInterestDate',
        label: '债券截息日',
        type: 'DatePicker',
        props: {
          placeholder: '请选择日期'
        }
      },
      {
        name: 'firstPaymentDate',
        label: '首次付息日',
        type: 'DatePicker',
        props: {
          placeholder: '请选择日期'
        }
      },
      {
        name: 'clearHouse',
        label: '托管机构',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '托管机构不能为空'
          }
        ],
        props: { placeholder: '请选择托管机构', getDics: 1000010 }
      },
      {
        name: 'weightMark',
        label: '含权标志',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '含权标志不能为空'
          }
        ],
        props: {
          placeholder: '请选择含权标志',
          getDics: 1040040
        }
      },
      {
        name: 'exerciseDate',
        label: '行权日',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '行权日不能为空'
          }
        ],
        props: {
          placeholder: '请选择日期'
        }
      },
      {
        name: 'sustainFlag',
        label: '是否永续',
        type: 'Select',
        props: {
          placeholder: '请选择',
          getDics: 1000016
        }
      },
      {
        name: 'expiryInterestRule',
        label: '截息日规则',
        type: 'Select',
        props: {
          placeholder: '请选择',
          getDics: 1040041
        }
      },
      {
        name: 'guaranteeMode',
        label: '担保方式',
        type: 'Select',
        props: {
          placeholder: '请选择担保方式',
          getDics: 1040002
        }
      },
      {
        name: 'guarantee',
        label: '担保人',
        type: 'Input',
        props: { placeholder: '请输入担保人' }
      },
      {
        name: 'principalPaymentMode',
        label: '本金偿还类型',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '本金偿还类型不能为空'
          }
        ],
        props: {
          placeholder: '请选择本金偿还类型',
          getDics: 1040042
        }
      },
      {
        name: 'baseType',
        label: '基准类型',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '基准类型不能为空'
          }
        ],
        props: {
          placeholder: '请选择基准类型',
          getDics: 1040043
        }
      },
      {
        name: 'minRate',
        label: '保底利率(%)',
        type: 'Input',
        props: { placeholder: '请输入保底利率' }
      },
      {
        isLine: true
      },
      {
        name: 'redeemPrice',
        label: '赎回价格(元)',
        type: 'Input',
        props: { placeholder: '请输入赎回价格' }
      },
      {
        name: 'redeemDate',
        label: '赎回日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择日期'
        }
      }
    ];
    return (
      <div className="bond-modal">
        <Modal
          {...modalInfo}
          width="1160px"
          title={isOpenFormModal.title}
          visible={!!isOpenFormModal.sign}
          onOk={this.onSubmit}
          onCancel={this.onCancel}
        >
          <div className="f-clearfix">
            <div className="f-block-hide">
              <NormalForm
                labelSize="9em"
                lineOf={3}
                formItem={formItem}
                refs={ref => (this.calcInput = ref)}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
  onCancel = () => {
    const { openFormModal, toEmptySelect } = this.props;
    toEmptySelect && toEmptySelect();
    openFormModal({ sign: '', title: '' });
  };
  onSubmit = () => {
    const { form } = this.calcInput.props;
    const {
      openFormModal,
      isOpenFormModal,
      rowChecked,
      asyncSave,
      toEmptySelect,
      asyncGetBondTableDatas,
      paging
    } = this.props;
    //变动科目映射 0-可用，1-待付，2-全额待购回，3-冻结，4-质押
    form.validateFields((err, values) => {
      if (!err) {
        const id = isOpenFormModal.sign === 'add' ? null : rowChecked && rowChecked[0].id;
        let params = {
          ...values,
          bondIssueDate: moment(values['bondIssueDate']).format('YYYY-MM-DD'),
          bondDueDate: moment(values['bondDueDate']).format('YYYY-MM-DD'),
          listDate: moment(values['listDate']).format('YYYY-MM-DD'),
          delistDate: moment(values['delistDate']).format('YYYY-MM-DD'),
          valueDate: moment(values['valueDate']).format('YYYY-MM-DD'),
          expiryInterestDate: moment(values['expiryInterestDate']).format('YYYY-MM-DD'),
          exerciseDate: moment(values['exerciseDate']).format('YYYY-MM-DD'),
          redeemDate: moment(values['redeemDate']).format('YYYY-MM-DD'),
          id
        };

        asyncSave({ sign: isOpenFormModal.sign, params }).then(() => {
          openFormModal({ sign: '', title: '' });
          toEmptySelect && toEmptySelect();
          asyncGetBondTableDatas({ ...paging });
        });
      } else {
        message.error('请按要求填写信息');
      }
    });
  };
}
export default ModalMessage;
