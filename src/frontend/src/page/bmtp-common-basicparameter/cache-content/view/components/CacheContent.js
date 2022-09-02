import React, { PureComponent } from 'react';
import {
  withRoleBotton,
  SearchForm,
  rowSelectionFunc,
  setTableInfo,
  ConfigableTable
  // filterNullElement,
  // withRoleTableBotton
} from 'yss-biz';
import { message, Modal, Button, Select } from 'antd';
import ModalForm from './detialModal';

const { confirm } = Modal;
const { Option } = Select;

class CacheContent extends PureComponent {
  state = {
    ids: [],
    visible: false,
    rowed: {},
    zoomCode: ''
  };
  render() {
    const { changeElementQuery, toResetSearch, queryElement, dataList, refreshList } = this.props;

    let SearchformItem = [
      {
        name: 'cacheKey',
        label: '缓存key',
        type: 'Input',
        props: {
          placeholder: '请输入缓存key',
          allowClear: true,
          onChange(e) {
            changeElementQuery({
              type: 'cacheKey',
              value: e.target.value,
              sing: 'queryElement'
            });
          }
        }
      }
    ];

    const ButtonType = [
      {
        name: '刷新缓存',
        roule: 'true',
        func: () => {
          this.toRefresh();
        }
      }
    ];

    const columns = [
      {
        title: '序号',
        width: 50,
        dataIndex: 'index',
        render: (text, record, index) => {
          return ++index;
        }
      },
      {
        title: '缓存key',
        width: 500,
        dataIndex: 'key',
        key: 'key',
        ellipsis: true
      },
      {
        title: '存活时间(秒)',
        width: 200,
        dataIndex: 'expireTime',
        key: 'expireTime',
        ellipsis: true
      },
      {
        title: '操作',
        width: 200,
        key: 'actions',
        ellipsis: true,
        align: 'center',
        render: (text, record, index) => {
          return (
            <>
              <Button size="small" type="link" icon="search" onClick={() => this.check(record)}>
                查看
              </Button>
              <Button size="small" type="link" icon="delete" onClick={() => this.del(record)}>
                删除
              </Button>
            </>
          );
        }
      }
    ];

    // 表格分页
    const pagination = {
      onChange: (page, pageSize) => {
        this.searchAccountByCondition({ ele: 'reqPageNum', value: page });
      },
      onShowSizeChange: (current, size) => {
        this.searchAccountByCondition({ ele: 'reqPageSize', value: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: queryElement.reqPageSize,
      total: dataList.total,
      current: queryElement.reqPageNum
    };

    let rowSelection = rowSelectionFunc.call(this);
    return (
      <>
        <div style={{ margin: '8px' }}>
          <SearchForm
            labelSize="6em"
            lineOf={3}
            formItem={SearchformItem}
            refs={ref => (this.searchForm = ref)}
            handleSearch={value => {
              this.query();
            }}
            moreTypeModal
            handleReset={() =>
              toResetSearch({
                reqPageSize: queryElement.reqPageSize,
                reqPageNum: queryElement.reqPageNum
              })
            }
            handleBeforeReset={() => true}
          />
          <div>
            {withRoleBotton(ButtonType, this.props.btnAuth)}
            {/* TODO 即使 刷新缓存 按钮无权限不渲染, 该下拉框也会显示, 需加入权限判断 */}
            <Select
              style={{ width: 150, marginLeft: '10px' }}
              placeholder="请选择刷新范围"
              onChange={this.changeZoom}
            >
              {refreshList.map(item => (
                <Option key={item.zoomCode} value={item.zoomCode} title={item.zoomName}>
                  {item.zoomName}
                </Option>
              ))}
            </Select>
          </div>

          <ConfigableTable
            {...setTableInfo({
              columns: columns,
              dataSource: dataList.list,
              rowSelection,
              pagination,
              rowKey: 'id',
              height: 450
            })}
          />

          {/* 查看详细 cancelModal使子组件能调用对应方法修改父组件的值*/}
          <ModalForm {...this.props} {...this.state} cancelModal={this.cancelModal}></ModalForm>
        </div>
      </>
    );
  }
  // 刷新缓存--按钮
  toRefresh = () => {
    const { asyncHttpRefresh } = this.props;
    let zoomCode = this.state.zoomCode;
    if (zoomCode) {
      asyncHttpRefresh({ cacheType: zoomCode });
    } else {
      message.error('请选择需要刷新的数据范围');
    }
  };

  // 删除
  del = data => {
    const { asyncHttpDel } = this.props;
    confirm({
      title: '是否确认删除?',
      onOk() {
        asyncHttpDel(data.key);
      }
    });
  };

  // 查看
  check = async data => {
    const { asyncHttpShowDetial } = this.props;
    await asyncHttpShowDetial(data.key);
    //将所有详细数据加载到rowed里面，子组件通过this.props.rowed取值
    this.setState({ visible: true, rowed: { ...data, detial: this.props.rowDetial } });
  };

  // 关闭弹出框
  cancelModal = () => {
    this.setState({
      visible: false
    });
  };

  // 查询
  query = () => {
    const { asyncHttpCachePage } = this.props;
    asyncHttpCachePage({ reqPageNum: 1 });
  };

  // 刷新下拉框
  changeZoom = value => {
    this.setState({ zoomCode: value });
  };

  // 分页
  searchAccountByCondition = pages => {
    const { changeElementQuery, asyncHttpCachePage } = this.props;
    changeElementQuery({
      type: pages.ele,
      value: pages.value,
      sing: 'queryElement'
    });
    asyncHttpCachePage({});
  };

  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };
}

export default CacheContent;
