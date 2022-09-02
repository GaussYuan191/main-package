// 资金明细
import React, { Component } from 'react';
import { Row, Form } from 'antd';
import { NormalForm } from 'yss-biz';
import '../style/style.less';
class CapitalSubsidiary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMaskShow: false,
      ids: []
    };
  }
  render() {
    const { zjInfo, rowed } = this.props;
    let infoArr = {};
    if (rowed.productId) {
      infoArr = zjInfo;
    }
    let formItem = [
      {
        name: 'assetAccountSn',
        label: 'DVP资金账户',
        type: 'Input',
        props: {
          initialValue: infoArr.assetAccountSn,
          disabled: true
        }
      },
      {
        name: 'assetAccountSnName',
        label: 'DVP资金账户名称',
        type: 'Input',
        props: {
          initialValue: infoArr.assetAccountSnName,
          disabled: true
        }
      },
      {
        isLine: true
      },
      {
        name: 'totalAmount',
        label: 'DVP资金账户总余额(元)',
        type: 'InputPart',
        props: {
          initialValue: infoArr.totalAmount,
          disabled: true,
          type: 'InputNumber'
        }
      },

      {
        name: 'usableAmount',
        label: 'DVP资金账户可用余额(元)',
        type: 'InputPart',
        props: {
          initialValue: infoArr.usableAmount,
          disabled: true,
          type: 'InputNumber'
        }
      },
      {
        name: 'lockedAmount',
        label: 'DVP资金账户锁定余额(元)',
        type: 'InputPart',
        props: {
          initialValue: infoArr.lockedAmount,
          disabled: true
        }
      }
    ];
    return (
      <Form layout="horizontal" className="">
        <Row>
          <div className="formContanierBody">
            <div className="title">资金明细</div>
            <NormalForm
              formItem={formItem}
              labelSize="10em"
              itemSize="200px"
              lineOf="3"
              refs={ref => {}}
            />
          </div>
        </Row>
      </Form>
    );
  }
}
CapitalSubsidiary = Form.create({ name: 'simpleSearchForm' })(CapitalSubsidiary);
export default CapitalSubsidiary;
