import React from 'react';
import { message, Button } from 'antd';
import { SearchForm, ConfigableTable, setColumns, setTableInfo } from 'yss-biz';

/**
 * 数据权限管理 新增数据权限对话框内容
 * @props changeModalVisible 用于关闭对话框
 * @props ...  用到的lugiaX中的state或mutation
 */
export default class AddDataAuthModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStr: '', // 搜索关键字
      reqPageNum: 1,
      reqPageSize: 20,
      selectedIdList: []
    };
    this.props.onRef && this.props.onRef(this);
  }
  componentDidMount() {
    this.handleSearch({});
  }

  render() {
    const { productList } = this.props;
    const searchFormItem = [
      {
        name: 'productCode',
        label: '产品名称/代码',
        labelSize: '8em',
        type: 'Input',
        props: {
          placeholder: '请输入产品名称/代码查询'
        }
      }
    ];

    const columns = [
      {
        title: '序号',
        dataIndex: 'serialNumber',
        width: 50
      },
      {
        title: '产品代码',
        dataIndex: 'productCode',
        key: 'productCode',
        width: 150,
        ellipsis: true
      },
      {
        title: '产品名称',
        dataIndex: 'productName',
        key: 'productName',
        width: 200,
        ellipsis: true
      },
      {
        title: '数据编码',
        dataIndex: 'id',
        key: 'id',
        width: 150,
        ellipsis: true
      }
    ];

    const pagination = {
      onChange: (page, pageSize) => {
        this.handleSearchPage({ reqPageNum: page, reqPageSize: pageSize });
      },
      onShowSizeChange: (current, size) => {
        this.handleSearchPage({ reqPageNum: current, reqPageSize: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      total: productList.total,
      pageSize: this.state.reqPageSize,
      current: this.state.reqPageNum
    };

    const rowSelection = {
      selectedRowKeys: this.state.selectedIdList || [],
      onChange: selectedRowKeys => {
        this.setState({ selectedIdList: selectedRowKeys });
      },

      getCheckboxProps: record => {
        return record.disabled ? { disabled: true, checked: true } : { disabled: false };
      }
    };
    return (
      <>
        <div style={{ paddingTop: '10px' }}></div>
        <SearchForm
          labelSize="6em"
          lineOf={3}
          formItem={searchFormItem}
          refs={ref => (this.searchForm = ref)}
          handleSearch={this.handleSearch}
          moreTypeModal
          handleBeforeReset={() => true}
          handleReset={this.handleReset}
        />
        <div>
          <span>已选择 {this.state.selectedIdList.length || 0} 条</span>
          <Button type="link" onClick={this.clearSelected}>
            全部清除
          </Button>
        </div>
        <ConfigableTable
          {...setTableInfo({
            columns: setColumns(columns),
            bordered: true,
            dataSource: productList.list,
            rowSelection,
            rowKey: 'id',
            height: 300,
            pagination
          })}
        />
      </>
    );
  }

  /**关键字查询 */
  handleSearch = values => {
    this.setState({ searchStr: values.productCode, reqPageNum: 1 }, () => {
      this.props.asyncHttpGetProductList({
        productCode: this.state.searchStr,
        reqPageNum: this.state.reqPageNum,
        reqPageSize: this.state.reqPageSize
      });
    });
  };

  /**重置动作 */
  handleReset = () => {
    this.setState({ searchStr: '', reqPageNum: 1 }, () => {
      this.props.asyncHttpGetProductList({
        reqPageNum: this.state.reqPageNum,
        reqPageSize: this.state.reqPageSize
      });
    });
  };

  /**分页查询 */
  handleSearchPage = pages => {
    this.setState(pages, () => {
      this.props.asyncHttpGetProductList({
        productCode: this.state.searchStr,
        reqPageNum: this.state.reqPageNum,
        reqPageSize: this.state.reqPageSize
      });
    });
  };

  /**清除勾选 */
  clearSelected = () => {
    this.setState({ selectedIdList: [] });
  };

  /**提交(被modal绑定) */
  handleSubmit = () => {
    const productIdList = this.state.selectedIdList;
    if (!productIdList.length) {
      message.error('请至少添加一条数据进行授权');
      return;
    }
    this.props.asyncHttpAddDataRoleAuth(productIdList).then(() => {
      this.setState({ productIdList: [] });
      this.props.changeModalVisible(false);
    });
  };
}
