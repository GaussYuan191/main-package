// 买卖方信息
import React, { Component } from 'react';
import { Row, Col, Form } from 'antd';
import '../style/index.module.less';
import { NormalForm } from 'yss-biz';
class InstructionMessage extends Component {
  render() {
    const { mmfInfo } = this.props;
    let formItem = [
      {
        name: 'buyerProductName',
        label: '买入方产品名称',
        type: 'Input',
        props: {
          initialValue: mmfInfo.buyerProductName,
          disabled: true
        }
      },
      {
        name: 'buyerAssetAccountName',
        label: '买入方资金账户名称',
        type: 'Input',
        props: {
          initialValue: mmfInfo.buyerAssetAccountName,
          disabled: true
        }
      },
      {
        name: 'sellerProductName',
        label: '卖出方产品名称',
        type: 'Input',
        props: {
          initialValue: mmfInfo.sellerProductName,
          disabled: true
        }
      },

      {
        name: 'sellerAssetAccountName',
        label: '卖出方资金账户名称',
        type: 'Input',
        props: {
          initialValue: mmfInfo.sellerAssetAccountName,
          disabled: true
        }
      },
      {
        name: 'buyerCustodianName',
        label: '买入方托管账户名称',
        type: 'Input',
        props: {
          initialValue: mmfInfo.buyerCustodianName,
          disabled: true
        }
      },
      {
        name: 'buyerAssetAccount',
        label: '买入方资金账号',
        type: 'Input',
        props: {
          initialValue: mmfInfo.buyerAssetAccount,
          disabled: true
        }
      },
      {
        name: 'sellerCustodianName',
        label: '卖出方托管账户名称',
        type: 'Input',
        props: {
          initialValue: mmfInfo.sellerCustodianName,
          disabled: true
        }
      },
      {
        name: 'sellerAssetAccount',
        label: '卖出方资金账号',
        type: 'Input',
        props: {
          initialValue: mmfInfo.sellerAssetAccount,
          disabled: true
        }
      },
      {
        name: 'buyerCustodianAccount',
        label: '买入方托管账号',
        type: 'Input',
        props: {
          initialValue: mmfInfo.buyerCustodianAccount,
          disabled: true
        }
      },

      {
        name: 'buyerAssetAccountOpenBank',
        label: '买入方资金账户开户行',
        type: 'Input',
        props: {
          initialValue: mmfInfo.buyerAssetAccountOpenBank,
          disabled: true
        }
      },
      {
        name: 'sellerCustodianAccount',
        label: '卖出方托管账号',
        type: 'Input',
        props: {
          initialValue: mmfInfo.sellerCustodianAccount,
          disabled: true
        }
      },
      {
        name: 'sellerAssetAccountOpenBank',
        label: '卖出方资金账户开户行',
        type: 'Input',
        props: {
          initialValue: mmfInfo.sellerAssetAccountOpenBank,
          disabled: true
        }
      }
    ];
    return (
      <Form layout="horizontal" className="">
        <Row>
          <div style={{ width: '95%', margin: '40px auto' }}>
            <Col>
              <NormalForm
                formItem={formItem}
                labelSize="10em"
                itemSize="200px"
                lineOf="3"
                refs={ref => {}}
              />
            </Col>
          </div>
        </Row>
      </Form>
    );
  }

  componentDidMount() {}
}
InstructionMessage = Form.create({ name: 'simpleSearchForm' })(InstructionMessage);
export default InstructionMessage;
