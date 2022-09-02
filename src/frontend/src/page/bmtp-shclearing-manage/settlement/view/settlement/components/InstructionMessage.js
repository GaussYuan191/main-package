// 指令信息
import React, { Component } from 'react';
import { Row, Col, Form } from 'antd';
import toolStyle from '../style/index.module.less';
import { NormalForm } from 'yss-biz';
class InstructionMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMaskShow: false,
      ids: []
    };
  }
  render() {
    const { instructionInfo } = this.props;

    let formItem = [
      {
        //这里现券分销（确认时间）和质押买断类型分开（指令日期）
        name: 'createTime',
        label: '确认时间',
        type: 'Input',
        props: {
          initialValue: instructionInfo.createTime,
          getDics: '1030409',
          disabled: true
        }
      },
      {
        name: 'instrId',
        label: '结算指令编号',
        type: 'Input',
        props: {
          initialValue: instructionInfo.instrId,
          disabled: true
        }
      },
      {
        name: 'instructStatusName',
        label: '指令状态',
        type: 'Input',
        props: {
          initialValue: instructionInfo.instructStatusName,
          disabled: true
        }
      },
      {
        name: 'execCode',
        label: '成交编号',
        type: 'Input',
        props: {
          initialValue: instructionInfo.execCode,
          disabled: true
        }
      },
      {
        name: 'ownAccountCode',
        label: '本方债券账号',
        type: 'Input',
        props: {
          initialValue: instructionInfo.ownAccountCode,
          disabled: true
        }
      },
      {
        name: 'counterAccountCode',
        label: '对手方债券账号',
        type: 'Input',
        props: {
          initialValue: instructionInfo.counterAccountCode,
          disabled: true
        }
      },
      {
        name: 'ownAccountName',
        label: '本方账户名称',
        type: 'Input',
        props: {
          initialValue: instructionInfo.ownAccountName,
          disabled: true
        }
      },
      {
        name: 'counterAccountName',
        label: '对手方账户名称',
        type: 'Input',
        props: {
          initialValue: instructionInfo.counterAccountName,
          disabled: true
        }
      },
      {
        name: 'ownStatusName',
        label: '本方状态',
        type: 'Input',
        props: {
          initialValue: instructionInfo.ownStatusName,
          disabled: true
        }
      },
      {
        name: 'counterStatusName',
        label: '对手方状态',
        type: 'Input',
        props: {
          initialValue: instructionInfo.counterStatusName,
          disabled: true
        }
      },
      {
        name: 'execMatchStatusName',
        label: '成交匹配状态',
        type: 'Input',
        props: {
          initialValue: instructionInfo.execMatchStatusName,
          disabled: true
        }
      }
    ];
    // if (instructionInfo.bizCategory == 'BT02' || instructionInfo.bizCategory == 'BT03') {
    //   formItem.push({
    //     name: 'execMatchStatusName',
    //     label: '划款指令匹配状态',
    //     type: 'Input',
    //     props: {
    //       initialValue: instructionInfo.execMatchStatusName,
    //       disabled: true
    //     }
    //   });
    // }

    let formItem1 = [
      //现券
      {
        name: 'bizCategoryName',
        label: '业务品种',
        type: 'Input',
        props: {
          initialValue: instructionInfo.bizCategoryName,
          disabled: true
        }
      },
      {
        name: 'entrustSideName',
        label: '交易方向',
        type: 'Input',
        props: {
          initialValue: instructionInfo.entrustSideName,
          disabled: true
        }
      },
      {
        name: 'settleTypeName',
        label: '结算方式',
        type: 'Input',
        props: {
          initialValue: instructionInfo.settleTypeName,
          disabled: true
        }
      },
      {
        name: 'settleDate',
        label: '结算日期',
        type: 'Input',
        props: {
          initialValue: instructionInfo.settleDate,
          disabled: true
        }
      },
      {
        name: 'netPrice',
        label: '净价金额(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo.netPrice,
          disabled: true
        }
      },
      {
        name: 'fullPrice',
        label: '全价金额(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo.fullPrice,
          disabled: true
        }
      },
      {
        //新增
        name: 'bondAmount',
        label: '券面总额(万元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo.bondAmount,
          disabled: true
        }
      },
      {
        name: 'accruedInterest',
        label: '应计利息额(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo.accruedInterest,
          disabled: true
        }
      },
      {
        name: 'settleAmount',
        label: '结算金额(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo.settleAmount,
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
          initialValue: instructionInfo.bizCategoryName,
          disabled: true
        }
      },
      {
        name: 'entrustSideName',
        label: '交易方向',
        type: 'Input',
        props: {
          initialValue: instructionInfo.entrustSideName,
          disabled: true
        }
      },
      {
        name: 'rate',
        label: '回购利率',
        type: 'Input',
        props: {
          initialValue: instructionInfo.rate,
          disabled: true
        }
      },
      {
        name: 'bondAmount',
        label: '券面总额合计(万元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo.bondAmount,
          disabled: true
        }
      },
      {
        name: 'firstSettleDate',
        label: '首次结算日期',
        type: 'Input',
        props: {
          initialValue: instructionInfo.firstSettleDate,
          disabled: true
        }
      },
      {
        name: 'expireSettleDate',
        label: '到期结算日期',
        type: 'Input',
        props: {
          initialValue: instructionInfo.expireSettleDate,
          disabled: true
        }
      },
      {
        name: 'firstSettleTypeName',
        label: '首次结算方式',
        type: 'Input',
        props: {
          initialValue: instructionInfo.firstSettleTypeName,
          disabled: true
        }
      },
      {
        name: 'expireSettleTypeName',
        label: '到期结算方式',
        type: 'Input',
        props: {
          initialValue: instructionInfo.expireSettleTypeName,
          disabled: true
        }
      },
      {
        name: 'firstSettleAmount',
        label: '首次结算金额(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo.firstSettleAmount,
          disabled: true
        }
      },
      {
        name: 'expireSettleAmount',
        label: '到期结算金额(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo.expireSettleAmount,
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
          initialValue: instructionInfo.bizCategoryName,
          disabled: true
        }
      },
      {
        name: 'entrustSideName',
        label: '交易方向',
        type: 'Input',
        props: {
          initialValue: instructionInfo.entrustSideName,
          disabled: true
        }
      },
      {
        name: 'bondCode',
        label: '债券代码',
        type: 'Input',
        props: {
          initialValue: instructionInfo.bondCode,
          disabled: true
        }
      },
      {
        name: 'bondShortName',
        label: '债券简称',
        type: 'Input',
        props: {
          initialValue: instructionInfo.bondShortName,
          disabled: true
        }
      },
      {
        name: 'firstSettleDate',
        label: '首次结算日期',
        type: 'Input',
        props: {
          initialValue: instructionInfo.firstSettleDate,
          disabled: true
        }
      },

      {
        name: 'expireSettleDate',
        label: '到期结算日期',
        type: 'Input',
        props: {
          initialValue: instructionInfo.expireSettleDate,
          disabled: true
        }
      },
      {
        name: 'firstSettleTypeName',
        label: '首次结算方式',
        type: 'Input',
        props: {
          initialValue: instructionInfo.firstSettleTypeName,
          disabled: true
        }
      },
      {
        name: 'expireSettleTypeName',
        label: '到期结算方式',
        type: 'Input',
        props: {
          initialValue: instructionInfo.expireSettleTypeName,
          disabled: true
        }
      },
      {
        name: 'firstSettleAmount',
        label: '首次结算金额(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo.firstSettleAmount,
          disabled: true
        }
      },
      {
        name: 'expireSettleAmount',
        label: '到期结算金额(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo.expireSettleAmount,
          disabled: true
        }
      },
      {
        name: 'rate',
        label: '回购利率',
        type: 'Input',
        props: {
          initialValue: instructionInfo.rate,
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
          initialValue: instructionInfo.bizCategoryName,
          disabled: true
        }
      },
      {
        name: 'entrustSideName',
        label: '交易方向',
        type: 'Input',
        props: {
          initialValue: instructionInfo.entrustSideName,
          disabled: true
        }
      },
      {
        name: 'settleTypeName',
        label: '结算方式',
        type: 'Input',
        props: {
          initialValue: instructionInfo.settleTypeName,
          disabled: true
        }
      },
      {
        name: 'settleDate',
        label: '结算日期',
        type: 'Input',
        props: {
          initialValue: instructionInfo.settleDate,
          disabled: true
        }
      },
      {
        name: 'bondCode',
        label: '债券代码',
        type: 'Input',
        props: {
          initialValue: instructionInfo.bondCode,
          disabled: true
        }
      },
      {
        name: 'bondShortName',
        label: '债券简称',
        type: 'Input',
        props: {
          initialValue: instructionInfo.bondShortName,
          disabled: true
        }
      },
      {
        name: 'distributionPrice',
        label: '分销价格(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo.distributionPrice,
          disabled: true
        }
      },
      {
        name: 'faceValue',
        label: '分销面额(万元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo.faceValue,
          disabled: true
        }
      },
      {
        name: 'distributionAmount',
        label: '分销金额(元)',
        type: 'Input',
        props: {
          initialValue: instructionInfo.distributionAmount,
          disabled: true
        }
      }
    ];

    return (
      <Form layout="horizontal" className="">
        <Row>
          <div style={{ width: '85%', margin: '40px auto' }}>
            <Col className={toolStyle.sLine} span={12}>
              <NormalForm
                formItem={formItem}
                labelSize="8em"
                itemSize="200px"
                lineOf="2"
                refs={ref => {}}
              />
            </Col>
            <Col span={12}>
              <Row>
                <NormalForm
                  formItem={
                    instructionInfo.bizCategory == 'BT01'
                      ? formItem1
                      : instructionInfo.bizCategory == 'BT02'
                      ? formItem2
                      : instructionInfo.bizCategory == 'BT03'
                      ? formItem3
                      : formItem4
                  }
                  labelSize="8em"
                  itemSize="200px"
                  lineOf="2"
                  refs={ref => {}}
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
