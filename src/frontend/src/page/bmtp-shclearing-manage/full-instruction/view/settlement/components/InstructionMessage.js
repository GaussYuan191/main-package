// 指令信息
import React, { Component } from 'react';
import { Row, Col, Form } from 'antd';
import toolStyle from '../style/index.module.less';
import { NormalForm } from 'yss-biz';
class InstructionMessage extends Component {
  render() {
    const { instructionInfo } = this.props;

    let formItem = [
      {
        name: 'tradeType',
        label: '交易日期',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.tradeDate,
          disabled: true
        }
      },
      {
        name: 'tradeId',
        label: '成交编号',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.tradeId,
          disabled: true
        }
      },
      {
        name: 'tradeStatusName',
        label: '交易状态',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.tradeStatusName,
          disabled: true
        }
      },

      {
        name: 'srcTradeId',
        label: '源成交编号',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.srcTradeId,
          disabled: true
        }
      },
      {
        name: 'ourAccount',
        label: '本方债券账号',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.ourAccount,
          disabled: true
        }
      },
      {
        name: 'offsetAccount',
        label: '对手方债券账号',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.offsetAccount,
          disabled: true
        }
      },
      {
        name: 'ourAccountShortName',
        label: '本方账户名称',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.ourAccountShortName,
          disabled: true
        }
      },
      {
        name: 'offsetAccountShortName',
        label: '对手方账户名称',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.offsetAccountShortName,
          disabled: true
        }
      },
      {
        name: 'ourTradeStatusName',
        label: '本方状态',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.ourTradeStatusName,
          disabled: true
        }
      },

      {
        name: 'offsetTradeStatusName',
        label: '对手方状态',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.offsetTradeStatusName,
          disabled: true
        }
      },
      {
        name: 'dealMatchingStatusName',
        label: '成交匹配状态',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.dealMatchingStatusName,
          disabled: true
        }
      }
    ];

    let formItem1 = [
      //现券
      {
        name: 'bizCategoryName',
        label: '业务品种',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.bizCategoryName,
          disabled: true
        }
      },
      {
        name: 'entrustSideName',
        label: '交易方向',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.entrustSideName,
          disabled: true
        }
      },
      {
        name: 'settlementTypeName',
        label: '结算方式',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.settlementTypeName,
          disabled: true
        }
      },
      {
        name: 'bondCode',
        label: '证券代码',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.bondCode,
          disabled: true
        }
      },

      {
        name: 'settlementDate',
        label: '结算日期',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.settlementDate,
          disabled: true
        }
      },
      {
        name: 'bondShortName',
        label: '证券简称',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.bondShortName,
          disabled: true
        }
      },
      {
        name: 'cleanPrice',
        label: '百元净价(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.cleanPrice,
          disabled: true
        }
      },
      {
        name: 'accruedInterest',
        label: '应计利息(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.accruedInterest,
          disabled: true
        }
      },

      {
        name: 'fullPrice',
        label: '百元全价(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.fullPrice,
          disabled: true
        }
      },

      {
        name: 'faceValue',
        label: '劵面总额(万元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.faceValue,
          disabled: true
        }
      },
      {
        name: 'settlementValue',
        label: '结算金额(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.settlementValue,
          disabled: true
        }
      }
    ];

    let formItem2 = [
      //质押式
      {
        name: 'bizCategoryName',
        label: '业务品种',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.bizCategoryName,
          disabled: true
        }
      },
      {
        name: 'entrustSideName',
        label: '交易方向',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.entrustSideName,
          disabled: true
        }
      },
      {
        name: 'firstSettleDate',
        label: '首次结算日期',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.firstSettleDate,
          disabled: true
        }
      },
      {
        name: 'dueSettleDate',
        label: '到期结算日期',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.dueSettleDate,
          disabled: true
        }
      },

      {
        name: 'firstSettleTypeName',
        label: '首次结算方式',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.firstSettleTypeName,
          disabled: true
        }
      },
      {
        name: 'dueSettleTypeName',
        label: '到期结算方式',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.dueSettleTypeName,
          disabled: true
        }
      },
      {
        name: 'firstSettleAmount',
        label: '首期结算金额(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.firstSettleAmount,
          disabled: true
        }
      },
      {
        name: 'dueSettleAmount',
        label: '到期结算金额(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.dueSettleAmount,
          disabled: true
        }
      },

      {
        name: 'repurchaseDays',
        label: '回购天数',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.repurchaseDays,
          disabled: true
        }
      }
    ];

    let formItem3 = [
      //买断式
      {
        name: 'bizCategoryName',
        label: '业务品种',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.bizCategoryName,
          disabled: true
        }
      },
      {
        name: 'entrustSideName',
        label: '交易方向',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.entrustSideName,
          disabled: true
        }
      },
      {
        name: 'repurchaseDays',
        label: '回购天数',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.repurchaseDays,
          disabled: true
        }
      },
      {
        name: 'bondCode',
        label: '债券代码',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.bondCode,
          disabled: true
        }
      },

      {
        name: 'faceValue',
        label: '券面总额合计(万元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.faceValue,
          disabled: true
        }
      },
      {
        name: 'bondShortName',
        label: '债券名称',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.bondShortName,
          disabled: true
        }
      },
      {
        name: 'firstSettleDate',
        label: '首次结算日期',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.firstSettleDate,
          disabled: true
        }
      },
      {
        name: 'dueSettleDate',
        label: '到期结算日期',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.dueSettleDate,
          disabled: true
        }
      },

      {
        name: 'firstSettleTypeName',
        label: '首次结算方式',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.firstSettleTypeName,
          disabled: true
        }
      },
      {
        name: 'dueSettleTypeName',
        label: '到期结算方式',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.dueSettleTypeName,
          disabled: true
        }
      },
      {
        name: 'firstSettleAmount',
        label: '首期结算金额(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.firstSettleAmount,
          disabled: true
        }
      },
      {
        name: 'dueSettleAmount',
        label: '到期结算金额(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.dueSettleAmount,
          disabled: true
        }
      }
    ];

    let formItem4 = [
      //分销
      {
        name: 'bizCategoryName',
        label: '业务品种',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.bizCategoryName,
          disabled: true
        }
      },
      {
        name: 'entrustSideName',
        label: '交易方向',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.entrustSideName,
          disabled: true
        }
      },
      {
        name: 'settlementTypeName',
        label: '结算方式',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.settlementTypeName,
          disabled: true
        }
      },
      {
        name: 'bondCode',
        label: '证券代码',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.bondCode,
          disabled: true
        }
      },

      {
        name: 'settlementDate',
        label: '结算日期',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.settlementDate,
          disabled: true
        }
      },
      {
        name: 'bondShortName',
        label: '证券简称',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.bondShortName,
          disabled: true
        }
      },
      // {
      //   name: 'distributionPrice',
      //   label: '分销价格(元)',
      //   type: 'Input',
      //   props: {
      //     initialValue: instructionInfo.distributionPrice,
      //     disabled: true
      //   }
      // },
      {
        name: 'faceValue',
        label: '分销面额(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.faceValue,
          disabled: true
        }
      },

      {
        name: 'settlementValue',
        label: '分销金额(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.settlementValue,
          disabled: true
        }
      }
    ];

    let formItem8 = [
      //债券借贷
      {
        name: 'bizCategoryName',
        label: '业务品种',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.bizCategoryName,
          disabled: true
        }
      },
      {
        name: 'entrustSideName',
        label: '交易方向',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.entrustSideName,
          disabled: true
        }
      },
      {
        name: 'firstSettleDate',
        label: '首期结算日期',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.firstSettleDate,
          disabled: true
        }
      },
      {
        name: 'dueSettleDate',
        label: '到期结算日期',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.dueSettleDate,
          disabled: true
        }
      },

      {
        name: 'firstSettleTypeName',
        label: '首期结算方式',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.firstSettleTypeName,
          disabled: true
        }
      },
      {
        name: 'dueSettleTypeName',
        label: '到期结算方式',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.dueSettleTypeName,
          disabled: true
        }
      },
      {
        name: 'accruedInterest',
        label: '应计利息(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.accruedInterest,
          disabled: true
        }
      },
      {
        name: 'term',
        label: '借贷期限',
        type: 'Input',
        props: {
          initialValue: instructionInfo &&instructionInfo.term,
          disabled: true
        }
      },
      {
        name: 'loanAmount',
        label: '借贷费用(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.loanAmount,
          disabled: true
        }
      },
      // {
      //   name: 'settlementValue111',
      //   label: '实际占款天数',
      //   type: 'Input',
      //   props: {
      //     initialValue: instructionInfo.settlementValue111,
      //     disabled: true
      //   }
      // },
      {
        name: 'loanRate',
        label: '借贷费率',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.loanRate,
          disabled: true
        }
      },
      {
        name: 'bondCode',
        label: '债券代码',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.bondCode,
          disabled: true
        }
      },
      {
        name: 'bondShortName',
        label: '债券名称',
        type: 'Input',
        props: {
          initialValue: instructionInfo && instructionInfo.bondShortName,
          disabled: true
        }
      }
    ];

    return (
      <Form layout="horizontal" className="">
        <Row>
          <div style={{ width: '88%', margin: '40px auto' }}>
            <Col className={toolStyle.sLine} span={12}>
              <NormalForm
                formItem={formItem}
                labelSize="8em"
                itemSize="200px"
                lineOf="2"
                refs={ref => { }}
              />
            </Col>
            <Col span={12}>
              <Row>
                <NormalForm
                  formItem={
                    instructionInfo && instructionInfo.bizCategory == '1'
                      ? formItem1
                      : instructionInfo && instructionInfo.bizCategory == '2'
                        ? formItem2
                        : instructionInfo && instructionInfo.bizCategory == '3'
                          ? formItem3
                          : instructionInfo && instructionInfo.bizCategory == '8'
                            ? formItem8
                            : formItem4
                  }
                  labelSize="8em"
                  itemSize="200px"
                  lineOf="2"
                  refs={ref => { }}
                />
              </Row>
            </Col>
          </div>
        </Row>
      </Form>
    );
  }
}
InstructionMessage = Form.create({ name: 'simpleSearchForm' })(InstructionMessage);
export default InstructionMessage;
