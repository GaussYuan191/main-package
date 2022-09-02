/**
 * 市场交易日类型 View
 */

import React from 'react';
import { Modal, Upload, message, Button } from 'antd';
import { BizTable, service } from 'bmtp-trade-base';
import { getInfocols } from './table-columns';
import TradeDayInfoEdit from './TradeDayInfoEdit';
import TradeDayInfoView from './TradeDayInfoView';
import TradeDayTypeController from '../controller/TradeDayTypeController';
import { urlHashToJson, downloadFileEnum, downloadFile } from 'yss-biz';
import { authModels } from 'yss-biz-auth';
import { withRoleBotton } from './button-auth';
import TradeDayService from '../service/TradeDayService';
const { functionCode, source } = urlHashToJson();

class TradeDayTypeMainView extends TradeDayTypeController {
  constructor(props) {
    super(props);
    this.tradeDayService = new TradeDayService(this.props);
    // this.xxx = new TradeDayTypeController(this.props); //获取父类的值
  }
  state = {
    selectedRowKeys: [],
    selectedRows: [],
    tradeDayTypeList: [],
    btnAuth: {}
  };

  async componentDidMount() {
    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'trade-day', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth }, () => {
          this.getList();
        });
      });
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedRows
    });
  };
  render() {
    const authMsg = authModels.getState().get('authMsg').toJS();
    const ButtonType = [
      {
        name: '导入',
        icon: 'import',
        roule: true
      }
    ];

    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
    };

    return (
      <div>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <div className="info-map">
            <Modal
              title={
                this.state.isEdit
                  ? this.state.tradeDayTypeName + '-编辑'
                  : this.state.tradeDayTypeName + '-查看'
              }
              okText="确定"
              cancelText="取消"
              destroyOnClose={true}
              width={1200}
              bodyStyle={{ height: '80vh', overflow: 'auto' }}
              maskClosable={false}
              visible={this.state.showModal}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              className="info-setting-modal"
              centered
              footer={null}
            >
              {this.state.isEdit ? (
                <TradeDayInfoEdit
                  wrappedComponentRef={ref => (this.$editContent = ref)}
                  handleClose={this.handleCancel}
                  {...this.props}
                  {...this.state}
                />
              ) : (
                <TradeDayInfoView
                  wrappedComponentRef={ref => (this.$editContent = ref)}
                  {...this.props}
                  {...this.state}
                />
              )}
            </Modal>

            <Upload
              className="table-tools"
              action={service.dfasBaseBiz + '/tradeDay/upload'}
              withCredentials={true}
              accept=".xlsx,.xls"
              name="partFile"
              showUploadList={false}
              headers={{
                Authorization: localStorage.getItem('Authorization')
              }}
              onChange={info => {
                if (info.file.status === 'done') {
                  if (info.file.response.winRspType === 'SUCC') {
                    message.success(`${info.file.name} 文件上传成功`);
                  } else {
                    message.error(`${info.file.name} 文件上传失败`);
                  }
                } else if (info.file.status === 'error') {
                  message.error(`${info.file.name} 文件上传失败.`);
                }
              }}
              {...this.props}
            >
              {/* <Button shape="round">
                      <Icon type="upload" /> 导入
                  </Button> */}
              <div style={{ margin: '10px 0 5px 0' }}>
                {withRoleBotton(ButtonType, this.state.btnAuth)}
              </div>
            </Upload>
            {withRoleBotton(
              [
                {
                  name: '修改',
                  roule: true,
                  icon: 'edit',
                  func: () => {
                    if (this.state.selectedRows.length < 1) {
                      message.error('请选择需要修改的数据');
                      return;
                    } else if (this.state.selectedRows.length > 1) {
                      message.error('只能选择一条数据修改');
                      return;
                    }
                    let recoed = { ...this.state.selectedRows[0] };
                    this.handleModify(recoed);
                    this.setState({
                      selectedRowKeys: [],
                      selectedRows: []
                    });
                  }
                }
              ],
              this.state.btnAuth
            )}
            <Button onClick={this.toDownloadFile} style={{ marginLeft: '8px' }}>
              模板下载
            </Button>

            <BizTable
              rowKey={'id'}
              className="stripe-table"
              scroll={{ x: '100%' }}
              scollY={document.body.clientHeight - 137}
              columns={getInfocols(this)}
              activeKeys="1"
              rowSelection={rowSelection}
              dataSource={this.state.tradeDayTypeList}
              pagination={false}
              state={this.state}
            />
          </div>
        )}
      </div>
    );
  }

  // 查询交易日类型数据
  getList = () => {
    this.tradeDayService
      .getTradeDayTypeList({
        category: '1'
      })
      .then(res => {
        if (res.code !== '200') {
          message.error(res.msg);
          return;
        }
        const resultData = res.data.map(item => {
          return {
            ...item,
            //保存记录id
            key: item.id + '',
            categoryName: item.category === '1' ? '债券' : '股票',
            validFlag: item.validFlag ? '是' : '否'
          };
        });
        this.setState({
          tradeDayTypeList: resultData
        });
      });
  };

  // 查看
  handleView = record => {
    this.setState({
      isEdit: false,
      showModal: true,
      tradeDayType: record.tradeDayType,
      tradeDayTypeName: record.tradeDayName
    });
  };

  // 编辑
  handleModify = record => {
    this.setState({
      isEdit: true,
      showModal: true,
      tradeDayType: record.tradeDayType,
      tradeDayTypeName: record.tradeDayName
    });
  };

  // 对话框取消关闭
  handleCancel = () => {
    this.setState({
      showModal: false
    });
  };

  // 模板下载
  toDownloadFile = () => {
    downloadFile([downloadFileEnum['交易日历']], { 交易日历: downloadFileEnum['交易日历'] });
  };
}

export default TradeDayTypeMainView;
