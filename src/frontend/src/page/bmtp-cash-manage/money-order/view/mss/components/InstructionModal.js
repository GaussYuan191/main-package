import React, { PureComponent } from 'react';
import { Row } from 'antd';
import {
  UploadModal,
  NormalForm,
  setTableInfo,
  ConfigableTable
} from 'yss-biz';
import 'yss-biz/common/style/customAntd.less';
const UpLoadFile = UploadModal;
class ContractModal extends PureComponent {
  state = {};
  render() {
    const { instructionInfoColumn, rowed } = this.props;

    /***表格分页***/
    // const pagination = {
    //   onChange: (page, pageSize) => {
    //     this.searchPage(page, pageSize);
    //   },
    //   onShowSizeChange: (current, size) => {
    //     this.searchPage(current, size);
    //   },
    //   showTotal: (total, range) => {
    //     return <span>{`共${total}条`}</span>;
    //   }
    // };

    let formItems = [
      {
        name: 'execCode',
        label: '成交编号',
        type: 'Input',
        props: {
          placeholder: rowed.execCode,
          disabled: true
        }
      },

      {
        name: 'transferType',
        label: '划款类型',
        type: 'Input',
        props: {
          disabled: true,
          placeholder: rowed.transferTypeName
        }
      },
      {
        name: 'transferDate',
        label: '划款日期',
        type: 'Input',
        props: {
          placeholder: rowed.transferDate,
          disabled: true
        }
      },
      {
        name: 'transferDirection',
        label: '收付款方向',
        type: 'Input',
        props: {
          placeholder: rowed.transferDirectionName,
          disabled: true
        }
      }
      // {
      //   isLine: true
      // },
      // {
      //   name: 'type',
      //   label: '产品名称',
      //   type: 'Input',
      //   props: {
      //     placeholder: '收付款方向',
      //     disabled: true
      //   }
      // },
    ];
    return (
      <>
        <NormalForm
          refs={ref => (this.createForm = ref)}
          labelSize="8em"
          lineOf={3}
          formItem={formItems}
        />
        <Row>
          <ConfigableTable
            {...setTableInfo({
              columns: instructionInfoColumn,
              dataSource: rowed.detailList,
              rowKey: 'id',
              // pagination: pagination,
              scroll: { x: 800, y: 40 }
            })}
          />
        </Row>
      </>
    );
  }
  async componentDidMount() {
    this.props.onRef(this);
  }

  async handleSubmit(e) {
    const { openFormModal } = this.props;
    openFormModal({ status: false });
  }
}

export default ContractModal;
