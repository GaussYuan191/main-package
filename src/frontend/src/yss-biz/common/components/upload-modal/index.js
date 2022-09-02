import React, { PureComponent } from 'react';
import { Modal, Row, Col, Button, Upload, Icon, Progress, Message } from 'antd';
import { ConfigableTable } from 'yss-biz';
import { connect } from '@lugia/lugiax';
import uploadFilesPop from './models';
import './index.less';
const { Dragger } = Upload;
let _that = null;
@connect(
  uploadFilesPop,
  state => {
    return {
      visible: state.get('visible'),
      dataSource: state.get('dataSource')
    };
  },
  mutations => {
    return {
      changeVisible: mutations.changeVisible,
      saveDataSource: mutations.saveDataSource
    };
  }
)
class UploadFilesModal extends PureComponent {
  constructor(props) {
    super(props);
    _that = this;
    this.dataList = [];
    this.state = {
      fileList: []
    };
  }
  onOk = () => {
    const { changeVisible } = this.props;
    if (this.props.uploadList && typeof this.props.uploadList === 'function') {
      const { dataSource } = uploadFilesPop.getState().toJS();
      if (dataSource.length > 0) {
        this.props.uploadList(dataSource);
      }
    }
    changeVisible(false);
    this.dataList = [];
  };
  onCancel = () => {
    const { changeVisible } = this.props;
    changeVisible(false);
    this.dataList = [];
  };
  deleteRow = data => {
    const { saveDataSource, isOnly = false } = this.props;
    const { dataSource } = uploadFilesPop.getState().toJS();
    let resultData = dataSource.filter(item => {
      return item.uid !== data.uid;
    });
    saveDataSource(resultData);
    if (isOnly) {
      this.dataList = [];
    }
  };
  updataDataSource = data => {
    const { saveDataSource } = this.props;
    const { dataSource } = uploadFilesPop.getState().toJS();
    let resultData = [];
    dataSource.map(item => {
      if (item.uid === data.uid) {
        return resultData.push(data);
      } else {
        return resultData.push(item);
      }
    });
    saveDataSource(resultData);
  };
  addUploadList = data => {
    const { saveDataSource } = this.props;
    const { dataSource } = uploadFilesPop.getState().toJS();
    dataSource.push(data);
    saveDataSource(dataSource);
  };
  render() {
    const { visible, dataSource, extraButton } = this.props;
    const Authorization = localStorage.getItem('Authorization');
    const gutter = [16, 16];
    const uploadProps = {
      name: this.props.name || 'file',
      data: this.props.data || {},
      multiple: this.props.multiple || false,
      action: this.props.action || '/files/uploadFile',
      headers: {
        Authorization: Authorization || 'dev'
      },
      showUploadList: false,
      accept: this.props.accept || '*', //指定文件的格式
      onChange: info => {
        if (info.file && info.file.status === 'done') {
          let uid = info.file.uid;
          let params = {
            uid: uid,
            process: 100,
            status: info.file.response.winRspType == 'SUCC' ? 'success' : 'exception',
            id: info.file.response && info.file.response.data,
            fileName: info.file.name,
            errMsg: info.file.response.winRspType == 'SUCC' ? '' : info.file.response.msg
          };
          if (info.file.response.winRspType != 'SUCC') {
            Message.error(info.file.response.msg);
          }
          this.updataDataSource(params);
          this.dataList.push(params);
        }
      },
      beforeUpload: (file, fileList) => {
        const { isOnly = false, limitSize = 100 } = this.props;
        const fileSize = file.size / 1024 / 1024;
        if (isOnly && this.dataList.length === 1) {
          Message.error('只能上传单个文件');
          return false;
        }
        if (this.props.hasOwnProperty('limitSize') && fileSize > limitSize) {
          Message.error(`只能上传大小不能超过${limitSize}MB的文件`);
          return false;
        }
        this.setState({
          fileList: [...this.state.fileList, file]
        });
        let params = {
          uid: file.uid,
          fileName: file.name,
          process: 30
        };
        this.addUploadList(params);
      }
    };

    const columns = [
      {
        title: '文件名称',
        dataIndex: 'fileName',
        width: 150
      },
      {
        title: '上传进度',
        dataIndex: 'process',
        width: 150,
        ellipsis: true,
        render: (text, record, index) => {
          if (text === 100) {
            return (
              <div>
                <Progress percent={100} status={record.status} />
                {record.errMsg ? (
                  <p className="errMsg" title={record.errMsg}>
                    {record.errMsg}
                  </p>
                ) : null}
              </div>
            );
          } else {
            return <Progress percent={text || 0} status="active" />;
          }
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: 150,
        render: (text, record, index) => {
          return (
            <>
              <span
                className="buttonBox"
                onClick={() => {
                  this.deleteRow(record);
                }}
                style={{ color: '#ff900d' }}
              >
                <Icon type="delete" />
                删除
              </span>
              {record.status == 'success' // 文件上传成功才显示附加按钮
                ? (extraButton || []).map(item => {
                    return (
                      <span
                        className="buttonBox"
                        onClick={() => {
                          item.func(record);
                        }}
                      >
                        <Icon type={item.icon || ''} />
                        {item.name}
                      </span>
                    );
                  })
                : null}
            </>
          );
        }
      }
    ];
    return (
      <Modal
        width={1000}
        title={'上传附件'}
        visible={visible}
        onOk={this.onOk}
        okText="关闭"
        onCancel={this.onCancel}
        destroyOnClose={true}
        className="modalStyle"
        getContainer={false}
        wrapClassName="uploadFilesModal"
      >
        <Row>
          <Col span={8} className="fileLeft">
            <div className="ant-upload ant-upload-drag fileLeftBox">
              <Upload {...uploadProps}>
                <Button>选择上传附件</Button>
              </Upload>
            </div>
          </Col>
          <Col span={16}>
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">将文件拖拽到此处上传</p>
            </Dragger>
          </Col>
        </Row>
        <Row gutter={gutter} style={{ marginTop: '20px' }}>
          <ConfigableTable
            bordered
            pagination={false}
            columns={columns}
            dataSource={dataSource.toJS ? dataSource.toJS() : dataSource}
          />
        </Row>
      </Modal>
    );
  }
}
UploadFilesModal.show = (params = {}) => {
  _that.props.changeVisible(true);
};
export default UploadFilesModal;
