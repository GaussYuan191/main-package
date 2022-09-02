import React, { PureComponent, Fragment } from 'react';
import {
  withRoleBotton,
  SearchForm,
  rowSelectionFunc,
  setTableInfo,
  ConfigableTable,
  setColumns,
  Modal,
  functionRolue
} from 'yss-biz';
import LookData from './lookData';
import { message } from 'antd';

class ReceiveHandling extends PureComponent {
  state = {
    ids: []
  };
  render() {
    const {
      receiveHandlingDataList,
      receiveHandlingColumns,
      toResetSearch,
      queryReceiveElement,
      isOpenFormModal,
      openFormModal,
      changeQueryElement
    } = this.props;
    // 表单
    const columns = [...setColumns(receiveHandlingColumns)];
    /*设置查询*/
    let SearchformItem = [
      {
        name: 'interfaceCode',
        label: '接口名称',
        type: 'Select',
        props: {
          placeholder: '请选择接口名称',
          allowClear: true,
          getDics: 1000403,
          onChange(value) {
            changeQueryElement({ interfaceCode: value, type: 'ReceiveHandling' });
          }
        }
      },
      {
        name: 'protocol',
        label: '协议方式',
        type: 'Select',
        props: {
          placeholder: '请输入协议方式',
          getDics: 1000402,
          onChange(value) {
            changeQueryElement({ protocol: value, type: 'ReceiveHandling' });
          }
        }
      },
      {
        name: 'context',
        label: '数据内容',
        type: 'Input',
        props: {
          placeholder: '请输入数据内容',
          allowClear: true,
          onChange(e) {
            let text = e.target.value
            // 正则匹配 去掉多余的空格
            text = text.replace(/\s/g, "")
            changeQueryElement({
              type: 'ReceiveHandling',
              context: text
            });
          }
        }
      },
      {
        name: 'createTime',
        label: '查询日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择查询日期',
          allowClear: true,
          onChange(value, dataString) {
            changeQueryElement({
              createTime: value ? value.format('YYYY-MM-DD') : '',
              type: 'ReceiveHandling'
            });
          }
        }
      }
    ];
    const ButtonType = [
      {
        name: '查看数据',
        roule: functionRolue.QUERY,
        func: this.toLookData
      }
    ];
    /***表格分页***/
    const pagination = {
      onChange: (page, pageSize) => {
        this.searchPage({ ele: 'reqPageNum', value: page });
      },
      onShowSizeChange: (current, size) => {
        this.searchPage({ ele: 'reqPageSize', value: size });
      },
      showTotal: (total, range) => {
        return <span>{`共${total}条`}</span>;
      },
      pageSize: queryReceiveElement.reqPageSize,
      current: queryReceiveElement.reqPageNum,
      total: receiveHandlingDataList.total
    };
    /***点击表格索引***/
    let rowSelection = rowSelectionFunc.call(this);

    return (
      <Fragment>
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
                reqPageSize: queryReceiveElement.reqPageSize,
                reqPageNum: queryReceiveElement.reqPageNum,
                type: 'ReceiveHandling'
              })
            }
            handleBeforeReset={() => true}
          />
          {withRoleBotton(ButtonType, this.props.btnAuth)}
          <ConfigableTable
            {...setTableInfo({
              rowKey: 'id',
              columns: columns,
              dataSource: receiveHandlingDataList.list,
              rowSelection,
              pagination,
              height: 450
            })}
          />

          <Modal
            width={1000}
            title="查看数据"
            visible={isOpenFormModal.status}
            onCancel={() => {
              openFormModal({ status: false });
              this.toEmptySelect();
            }}
            onOk={this.contextCopy}
            okText={'复制'}
          >
            <LookData {...this.props} type={'ReceiveHandling'}></LookData>
          </Modal>
        </div>
      </Fragment>
    );
  }
  async componentDidMount() { }
  /***模糊查询*/
  query = () => {
    const { asyncHttpGetReceiveHandlingList } = this.props;
    asyncHttpGetReceiveHandlingList({ reqPageNum: 1 });
    this.toEmptySelect();
  };

  /**分页查询*/
  searchPage = ({ ele, value }) => {
    const { asyncHttpGetReceiveHandlingList, changeQueryElement } = this.props;
    changeQueryElement({ [ele]: value, type: 'ReceiveHandling' });
    asyncHttpGetReceiveHandlingList({});
    this.toEmptySelect();
  };
  // 清空row
  toEmptySelect = () => {
    this.setState({
      ids: [],
      keys: []
    });
  };

  // 查看数据
  toLookData = async () => {
    const { openFormModal, asyncHttpReceiveLookData } = this.props;
    if (this.state.ids.length < 1) {
      message.error('请选择需要查看的数据');
      return;
    } else if (this.state.ids.length > 1) {
      message.error('请选择一条数据查看');
      return;
    }
    await asyncHttpReceiveLookData(this.state.ids[0]);
    openFormModal({
      status: true
    });
  };
  // 文字复制到剪切板
  contextCopy = () => {
    let data = this.state.ids || [];
    let text = data[0]?.context;
    var textField = document.createElement('textarea');
    try {
      text = JSON.stringify(JSON.parse(text), null, 4);
    } catch (e) { }
    // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textField 移出可视区域
    textField.readOnly = 'readonly'
    textField.style.position = 'absolute'
    textField.style.left = '-9999px'
    // 赋值给innerText，是识别不了\r\n的换行符，赋值给value属性就可以
    textField.value = text
    // 将 textarea 插入到 body 中
    document.body.appendChild(textField)
    // 选中值并复制
    textField.select()
    textField.setSelectionRange(0, textField.value.length)
    if (document.execCommand('copy')) {
      message.success('复制成功');
    } else {
      message.error('复制失败');
    }
    document.body.removeChild(textField)
  };
}

export default ReceiveHandling;
