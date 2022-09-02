import React, { PureComponent } from 'react';
import { UploadModal, Modal, downloadFile, downloadFileEnum } from 'yss-biz';
import { DatePicker, Button, Message, Modal as modal, Row, Col, Checkbox } from 'antd';
import moment from 'moment';
import FilePreviewModal from './FilePreviewModal';
import './style.less';

class ReadFile extends PureComponent {
  state = {
    files: {},
    type: '', //选择上传的文件的类型,
    docs: [],
    uploaddata: {}, //上传参数
    fileAcceptType: '', //限制文件上传的类型
    buttonType: [], // 文件操作按钮配置
    bizCode: '', // 上传接口编码(仅做单接口上传)
    isOpenModal: false, // 反显窗口状态
    batchNo: '',// 反显文件的批次号
    downloadVisible: false, //文件下载modal
    checkedList: []         //选中的下载模板选项
  };
  render() {
    const { uploadParams, checkList } = this.props;
    const nowDate = uploadParams && uploadParams.tradeDate;
    const downloadFileList = downloadFileEnum['数据读取'];
    return (
      <div className="readFileContent">
        <div className="realFileLeft">
          <div className="itemReadTop">
            <div className="topSmallTitle mustCondition">读取日期：</div>
            <DatePicker
              placeholder={'请输入读取日期'}
              defaultValue={nowDate ? moment(nowDate) : null}
              onChange={this.onDateChange}
            />
          </div>
          {/* <div className="itemReadTop">
            <div className="topSmallTitle">本地路径：</div>
            <Input style={{ width: '500px' }} disabled value={'1233432432'} />
          </div> */}
        </div>
        <div className="realFileRight">
          {/* <Button style={{ marginRight: '20px' }} onClick={this.toReadData}>
            读取数据
          </Button> */}
          <Button onClick={this.toUploadFile}>本地上传</Button>
          <Button onClick={this.openDownloadFileModal} style={{ marginLeft: 18 }}>模板下载</Button>
        </div>

        {/**上传组件** */}
        <UploadModal
          uploadList={this.addUploadFiles}
          multiple={false}
          data={{ bizCode: this.state.bizCode, tradeDate: nowDate }}
          isOnly={true}
          accept={this.state.fileAcceptType} //application/pdf  .xls,.xlsx
          action="/bmtp-common-basicparameter/biz/dataUpload/uploadlocalFile"
          limitSize={1}
          extraButton={this.state.buttonType}
        />
        {/**下载模板组件 */}
        <Modal
          width={1000}
          title={'模板下载'}
          visible={this.state.downloadVisible}
          onOk={() => { downloadFile(this.state.checkedList, downloadFileList) }}
          okText="开始下载"
          onCancel={this.closeDownloadModal}
          destroyOnClose={true}
          className="modalStyle"
          getContainer={false}
          wrapClassName="downloadFilesModal"
        >
          <Checkbox.Group onChange={this.onDownloadChange} style={{ width: "100%" }}>
            <Row type="flex" justify="space-around" gutter={[16, 16]}>
              {Object.keys(downloadFileList).map((item, index) => {
                return (
                  <Col span={5} offset={3}>
                    <Checkbox value={downloadFileList[item]}>{item}</Checkbox>
                  </Col>
                );
              })}
            </Row>
          </Checkbox.Group>
        </Modal>

        {/** 回显表格 */}
        <Modal
          width={1200}
          title={'数据回显查看'}
          destroyOnClose={true}
          visible={this.state.isOpenModal}
          footer={<Button onClick={this.closePreviewModal}>关闭</Button>}
          onCancel={this.closePreviewModal}
        >
          <FilePreviewModal
            bizCode={this.state.bizCode}
            batchNo={this.state.batchNo}
            {...this.props}
          />
        </Modal>
      </div>
    );
  }

  // 日期选择
  onDateChange = (date, dateString) => {
    const { changeUploadParams } = this.props;
    changeUploadParams({ type: 'tradeDate', value: dateString });
  };

  // 读取数据
  // toReadData = async () => {
  //   //读取需要选择接口和读取日期
  //   const {
  //     asyncHttpGetList,
  //     asyncHttpUploadFile,
  //     // changeUploadParams,
  //     checkList,
  //     // queryElement,
  //     uploadParams: { tradeDate }
  //   } = this.props;
  //   // 当下可以数据读取的接口：财汇资讯数据(CHZXSJ)、债券品种信息(ZQPZXX) 、估值业务数据(GZYWSJ)、证券流通数据(ZQLTXX)
  //   let isOk = true,
  //     upLoadArr = ['CHZXSJ', 'ZQPZXX', 'GZYWSJ', 'ZQLTXX'];

  //   if (!tradeDate) {
  //     Message.error('请先选择读取日期！');
  //     return;
  //   }
  //   if (checkList.length < 1) {
  //     Message.error('请先选择接口！');
  //     return;
  //   }
  //   if (checkList && checkList.length > 1) {
  //     let arr = checkList.filter(item => item != 'CHZXSJ' && item != 'GZYWSJ');
  //     if (arr.length > 1) {
  //       Message.error('仅支持单接口读取');
  //       return;
  //     }
  //   } else {
  //     checkList.map(item => {
  //       if (upLoadArr.indexOf(item) === -1) {
  //         isOk = false;
  //       }
  //     });
  //   }

  //   if (isOk) {
  //     const bizCode = checkList && checkList.length > 1 ? checkList.join(',') : checkList[0];
  //     await asyncHttpUploadFile({ bizCode: bizCode || '', tradeDate });
  //     await asyncHttpGetList({});
  //   } else {
  //     Message.error('付息兑付或费用结算的接口无法读取数据！');
  //     return;
  //   }

  //   // else {
  //   //   checkList.map(item => {
  //   //     if (upLoadArr.indexOf(item) !== -1) {
  //   //       isOk = false;
  //   //     }
  //   //   });
  //   // }

  //   // if (isOk) {
  //   //   // changeQueryElement({ checkArr: checkList.join(',') });
  //   // } else {
  //   //   Message.error('付息兑付或费用结算的接口无法读取数据！');
  //   //   return;
  //   // }

  //   // if(!queryElement.readDate) {
  //   // Message.error('请选择读取日期')
  //   // return
  //   // }
  // };

  // 本地上传

  toUploadFile = () => {
    const {
      checkList,
      // queryElement,
      uploadParams: { tradeDate }
    } = this.props;
    if (!tradeDate) {
      Message.error('请先选择读取日期！');
      return;
    }
    let parentNodeArr = ['ZZDSJ', 'SQSSJ', 'GLRJYSJ']; // 父节点
    // let nodeArr = [
    //   'ZZDFXDF',
    //   'SQSFXDF',
    //   'SQSFYJS',
    //   'SQSCCHD',
    //   'BOND',
    //   'PLEDGE',
    //   'LENDING',
    //   'OUTRIGHT'
    // ]; // 可上传节点
    let upLoadArr = checkList.filter(item => !parentNodeArr.includes(item));

    if (upLoadArr.length < 1) {
      Message.error('请先选择接口！');
      return;
    }
    if (upLoadArr.length > 1) {
      Message.error('仅支持单接口上传');
      return;
    }
    // if (!nodeArr.includes(upLoadArr[0])) {
    //   Message.error(
    //     '只有付息兑付、费用结算、持仓核对、现券、质押式回购、债券借贷、买断式回购的接口才可以上传！'
    //   );
    //   return;
    // }

    if (upLoadArr[0] == 'SQSFXDF' || upLoadArr[0] == 'SQSFYJS') {
      this.setState({
        fileAcceptType: 'application/pdf'
      });
    } else {
      this.setState({
        fileAcceptType: '.xls,.xlsx'
      });
    }
    // if(!queryElement.readDate) {
    // Message.error('请选择读取日期')
    // return
    // }

    // this.setState({
    //   uploaddata: {
    //     uploadCode: checkList[0],
    //     uploadDate: queryElement.readDate
    //   }
    // })
    this.setState({ bizCode: upLoadArr[0] }, () => {
      this.tableBtnRender(upLoadArr[0]);
      UploadModal.show();
    });
  };
  /** 显示文件下载modal */
  openDownloadFileModal = () => {
    this.setState({ downloadVisible: true })
  }
  /** 关闭文件下载modal */
  closeDownloadModal = () => {
    this.setState({ downloadVisible: false })
  }
  /** 选中下载模板选项 */
  onDownloadChange = (value) => {
    this.setState({ checkedList: value })
  }

  /** 处理回显和导入按钮 */
  tableBtnRender = bizCode => {
    const { asyncHttpTempTableImport } = this.props;
    let newButtonType = [];
    // 无导入回显功能的接口: 中债登数据(ZZDSJ):付息兑付(ZZDFXDF) 上清所数据(SQSSJ):付息兑付(SQSFXDF)、费用结算(SQSFYJS)、持仓核对(SQSCCHD)
    const importNodeArr = [
      'BOND',
      'PLEDGE',
      'LENDING',
      'OUTRIGHT',
      'SELLBACK',
      'ONLINE',
      'OFFLINE',
      'INNER'
    ];
    if (importNodeArr.includes(bizCode)) {
      newButtonType = [
        {
          name: '反显',
          icon: 'desktop',
          func: record => {
            this.setState({ isOpenModal: true, batchNo: record.id });
          }
        },
        {
          name: '导入',
          icon: 'container',
          func: async record => {
            await asyncHttpTempTableImport({ bizCode, id: record.id, callback: this.showTipModal });
          }
        }
      ];
    }
    this.setState({ buttonType: newButtonType });
  };

  // 导入结果提示
  showTipModal = (status, msg) => {
    modal.confirm({
      title: status ? '导入成功' : '导入失败',
      content: <div style={{ maxHeight: '150px', overflowY: 'auto' }}>{status ? null : msg}</div>,
      icon: status ? 'check-circle' : 'exclamation-circle',
      cancelText: '关闭',
      okButtonProps: { style: { display: 'none' } },
      onCancel: () => {
        if (status) {
          UploadModal.close(); // 该工程单独对upload-modal组件添加该close静态方法
        }
      }
    });
  };

  // 关闭回显窗口
  closePreviewModal = () => {
    this.setState({ isOpenModal: false, batchNo: '' });
    this.props.cleanPreviewList();
  };

  //将上传的文件保存到state
  addUploadFiles = data => {
    if (!data[0].id) {
      return;
    }
    // console.log(data);
    // this.setState(
    //   () => {
    //     this.state.files[this.state.type] = data.length && data[0].fileName;
    //     this.state.docs.push({
    //       files: [
    //         {
    //           id: (data.length && data[0].id[0]) || '',
    //           name: (data.length && data[0].fileName) || ''
    //         }
    //       ],
    //       type: this.state.type
    //     });
    //     return {
    //       files: this.state.files,
    //       docs: this.state.docs
    //     };
    //   },
    //   () => {
    //     this.forceUpdate(); //强制渲染页面
    //   }
    // );
  };
}

export default ReadFile;
