import React, { PureComponent } from 'react';
import { Row } from 'antd';
import {
  // withRoleTableBotton,
  setColumns,
  setTableInfo,
  rowSelectionFunc,
  ConfigableTable
} from 'yss-biz';

import 'yss-biz/common/style/customAntd.less';

class ContractModal extends PureComponent {
  state = {};
  render() {
    const { aboutInfoColumn, aboutInfoList } = this.props;
    const columns = setColumns(aboutInfoColumn);

    /***表格分页***/
    const pagination = {
      onChange: (page, pageSize) => {
        this.searchPage(page, pageSize);
      },
      onShowSizeChange: (current, size) => {
        this.searchPage(current, size);
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: this.props.queryInfoPage.reqPageSize,
      total: this.props.aboutInfoTotal
    };
    // /***按钮组** */
    // const ButtonType = [
    // {
    //   name: '导出',
    //   roule: 'true',
    //   children: [
    //     {
    //       name: "导出全部",
    //       func: this.exportAll
    //     },
    //     {
    //       name: "导出当前页",
    //       func: this.exportCurrent
    //     },
    //     {
    //       name: "导出选择项",
    //       func: this.exportSelected
    //     }
    //   ]
    // },
    // ];

    let rowSelection = rowSelectionFunc.call(this);
    return (
      <>
        <Row>
          {/* {withRoleTableBotton(ButtonType)} */}
          <ConfigableTable
            {...setTableInfo({
              columns,
              dataSource: aboutInfoList,
              rowSelection,
              rowKey: 'id',
              pagination: pagination,
              height: 300
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
    openFormModal({ type: 'update', status: false, sign: 'read' });
  }
  /**分页查询*/
  searchPage = async (page, pageSize) => {
    const { asyncHttpGetChargeDetail, changeQueryInfoPage, parentId, refProductCode } = this.props;
    changeQueryInfoPage({ type: 'queryInfoPage', element: 'reqPageNum', value: page });
    changeQueryInfoPage({ type: 'queryInfoPage', element: 'reqPageSize', value: pageSize });
    await asyncHttpGetChargeDetail({
      params: {
        row: {
          parentId,
          refProductCode
        }
      }
    });
  };
}

export default ContractModal;
