import React, { PureComponent } from 'react';
import {
  SearchForm,
  filterNullElement,
  withRoleBotton,
  exportFile,
  exportFileWithNoName,
  exportSelectFile,
  // PageBody,
  Tabs,
  UploadModal,
  functionRolue,
  downloadFileEnum,
  downloadFile
} from 'yss-biz';
import moment from 'moment';
import { message } from 'antd';
import Trusteeship from './trusteeship';
import Settlement from './settlement';
import Consignor from './consignor';

// const { PageMain, Container } = PageBody
const { TabPane } = Tabs;

class Submitted extends PureComponent {
  state = {
    isMoreShow: false,
    ids: [],
    files: {},
    type: '', //选择上传的文件的类型,
    docs: [],
    queryName: {
      1: 'tsv_queryElement',
      2: 'stv_queryElement',
      3: 'csv_queryElement'
    },
    exportFileName: {
      1: '托管明细数据报表',
      2: '结算明细数据报表',
      3: '委托人明细数据报表'
    },
    dateName: {
      1: 'tradeDate',
      2: 'settleDate',
      3: 'reporteTime'
    },
    FieldList1: [], //不同表格的字段，导出用
    FieldList2: [],
    FieldList3: []
  };
  render() {
    const { active, currentTradeDate } = this.props;
    /***查询Input按钮 */
    let SearchformItem = [
      {
        name: 'submittedDate',
        label: '报送日期',
        type: 'DatePicker',
        props: {
          placeholder: '请选择报送日期',
          initialValue: currentTradeDate ? moment(currentTradeDate) : '',
          onChange: (value, dateString) => {
            const { changeDateElement } = this.props;
            changeDateElement({ value: dateString || '' });
          }
        }
      }
    ];

    // const ButtonType = [
    //   {
    //     name: '生成报表',
    //     roule: true,
    //     func: () => {
    //       const { asyncHttpGenerateCustReptData, active, searchDate } = this.props;
    //       if (active === '2') {
    //         asyncHttpGenerateCustReptData({ settleDate: searchDate });
    //       } else {
    //         message.warning('只有结算明细数据页签，可以使用生成报表功能！');
    //       }
    //     }
    //   },
    //   {
    //     name: '导出报表',
    //     roule: functionRolue.EXPORT,
    //     func: () => {
    //       const { searchDate } = this.props;
    //       if (active === '1' || active === '2') {
    //         exportFileWithNoName(
    //           '/bmtp-settle-manage/report/settRepCustDet/export/cenRep',
    //           { tradeDate: searchDate },
    //           true
    //         );
    //       } else {
    //         message.warning('只有托管明细数据、结算明细数据页签，可以使用导出报表！');
    //       }
    //     }
    //   },
    //   {
    //     name: '导出委托人明细报表',
    //     roule: functionRolue.EXPORT,
    //     noAuth: true,
    //     func: () => {
    //       const { searchDate } = this.props;
    //       if (active === '3') {
    //         exportFileWithNoName(
    //           '/bmtp-settle-manage/report/settRepCustDet/export/clientDetailData',
    //           { reporteTime: searchDate },
    //           true
    //         );
    //       } else {
    //         message.warning('只有委托人明细数据页签，可以导出委托人明细报表！');
    //       }
    //     }
    //   },
    //   {
    //     name: '导入',
    //     roule: functionRolue.IMPORT,
    //     func: this.toUploadFile
    //   },
    //   {
    //     name: "模板下载",
    //     func: this.toDownloadFile
    //   },
    //   {
    //     name: '导出',
    //     roule: functionRolue.EXPORT,
    //     children: [
    //       {
    //         name: '导出全部',
    //         func: this.exportAll
    //       },
    //       {
    //         name: '导出当前页',
    //         func: this.exportCurrent
    //       },
    //       {
    //         name: '导出选择项',
    //         func: this.exportSelected
    //       }
    //     ]
    //   }
    // ];

    let ButtonType=[]
    if(active==='1'){
       ButtonType=[
        {
          name: '导出报表',
          roule: functionRolue.EXPORT,
          func: () => {
            const { searchDate } = this.props;
            if (active === '1' || active === '2') {
              exportFileWithNoName(
                '/bmtp-settle-manage/report/settRepCustDet/export/cenRep',
                { tradeDate: searchDate },
                true
              );
            } else {
              message.warning('只有托管明细数据、结算明细数据页签，可以使用导出报表！');
            }
          }
        },
        {
          name: '导出',
          roule: functionRolue.EXPORT,
          children: [
            {
              name: '导出全部',
              func: this.exportAll
            },
            {
              name: '导出当前页',
              func: this.exportCurrent
            },
            {
              name: '导出选择项',
              func: this.exportSelected
            }
          ]
        },

      ]
    }else if(active==='2'){
      ButtonType=[
            {
              name: '生成报表',
              roule: true,
              func: () => {
                const { asyncHttpGenerateCustReptData, active, searchDate } = this.props;
                if (active === '2') {
                  asyncHttpGenerateCustReptData({ settleDate: searchDate });
                } else {
                  message.warning('只有结算明细数据页签，可以使用生成报表功能！');
                }
              }
            },
            {
              name: '导出报表',
              roule: functionRolue.EXPORT,
              func: () => {
                const { searchDate } = this.props;
                if (active === '1' || active === '2') {
                  exportFileWithNoName(
                    '/bmtp-settle-manage/report/settRepCustDet/export/cenRep',
                    { tradeDate: searchDate },
                    true
                  );
                } else {
                  message.warning('只有托管明细数据、结算明细数据页签，可以使用导出报表！');
                }
              }
            },
            {
                  name: '导出',
                  roule: functionRolue.EXPORT,
                  children: [
                    {
                      name: '导出全部',
                      func: this.exportAll
                    },
                    {
                      name: '导出当前页',
                      func: this.exportCurrent
                    },
                    {
                      name: '导出选择项',
                      func: this.exportSelected
                    }
                  ]
                }
      ]
    }else if(active==='3'){
      ButtonType=[
        {
              name: '导出委托人明细报表',
              roule: functionRolue.EXPORT,
              noAuth: true,
              func: () => {
                const { searchDate } = this.props;
                if (active === '3') {
                  exportFileWithNoName(
                    '/bmtp-settle-manage/report/settRepCustDet/export/clientDetailData',
                    { reporteTime: searchDate },
                    true
                  );
                } else {
                  message.warning('只有委托人明细数据页签，可以导出委托人明细报表！');
                }
              }
            },
            {
              name: '导入',
              roule: functionRolue.IMPORT,
              func: this.toUploadFile
            },
            {
              name: "模板下载",
              func: this.toDownloadFile
            },
            {
              name: '导出',
              roule: functionRolue.EXPORT,
              children: [
                {
                  name: '导出全部',
                  func: this.exportAll
                },
                {
                  name: '导出当前页',
                  func: this.exportCurrent
                },
                {
                  name: '导出选择项',
                  func: this.exportSelected
                }
              ]
            }
      ]
    }

    return (
      <div>
        <SearchForm
          labelSize="4em"
          lineOf={3}
          moreTypeModal
          formItem={SearchformItem}
          refs={ref => (this.searchForm = ref)}
          handleSearch={value => {
            this.query();
          }}
          handleReset={this.onBeforeReset}
          handleBeforeReset={() => true}
        />
        {withRoleBotton(ButtonType, this.props.btnAuth)}
        <Tabs onChange={this.onTabChange}>
          <TabPane tab="托管明细数据" key="1">
            <Trusteeship {...this.props} setCloumsCode={this.setCloumsCode} />
          </TabPane>
          <TabPane tab="结算明细数据" key="2">
            <Settlement {...this.props} setCloumsCode={this.setCloumsCode} />
          </TabPane>
          <TabPane tab="委托人明细数据" key="3">
            <Consignor {...this.props} setCloumsCode={this.setCloumsCode} />
          </TabPane>
        </Tabs>

        {/**上传组件** */}
        <UploadModal
          uploadList={this.addUploadFiles}
          multiple={false}
          isOnly={true}
          action="/bmtp-settle-manage/report/consignorDet/uploadlocalFile"
        />
      </div>
    );
  }
  componentDidMount() { }

  // 添加重置事件，修复点击重置按钮后，查询时日期字段依然存在的问题
  onBeforeReset = () => {
    const {
      asyncHttpGetList,
      active,
      changeQueryElement,
      changeDateElement,
      currentTradeDate
    } = this.props;
    let queryName = {
      1: 'tsv_queryElement',
      2: 'stv_queryElement',
      3: 'csv_queryElement'
    };
    let dateName = {
      1: 'tradeDate',
      2: 'settleDate',
      3: 'reporteTime'
    };
    changeQueryElement({
      elementType: queryName[active],
      element: dateName[active],
      value: currentTradeDate
    });

    changeDateElement({
      value: currentTradeDate
    });

    asyncHttpGetList({ type: queryName[active] });
  };

  onTabChange = key => {
    const { changeTabSign, asyncHttpGetList } = this.props;
    changeTabSign({ key });
    this.query();
  };

  /***模糊查询*/
  query = () => {
    const { asyncHttpGetList, active, changeQueryElement, searchDate } = this.props;
    let queryName = {
      1: 'tsv_queryElement',
      2: 'stv_queryElement',
      3: 'csv_queryElement'
    };
    if (searchDate) {
      let dateName = {
        1: 'tradeDate',
        2: 'settleDate',
        3: 'reporteTime'
      };
      changeQueryElement({
        elementType: queryName[active],
        element: dateName[active],
        value: searchDate
      });
    } else {
      // 修复点击清空日期按钮后，查询时日期字段依然存在的问题
      let dateName = {
        1: 'tradeDate',
        2: 'settleDate',
        3: 'reporteTime'
      };
      changeQueryElement({
        elementType: queryName[active],
        element: dateName[active],
        value: ''
      });
    }

    asyncHttpGetList({ type: queryName[active], reqPageNum: 1 });
  };

  // 本地上传
  toUploadFile = () => {
    const { active } = this.props;
    if (active === '3') {
      // this.setState({
      //   type: type
      // });
      UploadModal.show();
    } else {
      message.error('只有委托人明细数据页签，可以使用导入功能');
    }
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

  /*导出全部*/
  exportAll = () => {
    // 托管明细导出 /bmtp-cash-manage/hold/productCarryBalance/export/custDetailcondition
    // 托管明细 选中导出 /bmtp-cash-manage/hold/productCarryBalance/export/custDetselected

    // 结算明细  导出 /bmtp-settle-manage/report/settleDetail/export/condition

    // 委托人明细 导出/bmtp-settle-manage/report/consignorDet/export/condition
    // 委托人明细 选中导出 /bmtp-settle-manage/report/consignorDet/export/selected

    const { active, searchDate, truteeshipList, settlementList, consignorList } = this.props;
    const { exportFileName, dateName } = this.state;

    const exportAllUrl = {
      1: '/bmtp-cash-manage/hold/productCarryBalance/export/custDetailcondition',
      2: '/bmtp-settle-manage/report/settRepCustDet/export/condition',
      3: '/bmtp-settle-manage/report/consignorDet/export/condition'
    };
    const cloumsCode = {
      1: 'FieldList1',
      2: 'FieldList2',
      3: 'FieldList3'
    };

    // const queryParamsKey = queryName[active + ''] || '';
    // const targetQueryParams = this.props[queryParamsKey];
    const queryParamsKey = dateName[active + ''] || '';
    const targetQueryParams = {
      [queryParamsKey]: searchDate,
      includeFieldList: this.state[cloumsCode[active]]
    };
    const targetExportUrl = exportAllUrl[active + ''];
    const targetFileName = exportFileName[active + ''];

    const total =
      active == 1
        ? truteeshipList.total
        : active == 2
          ? settlementList.total
          : active == 3
            ? consignorList.total
            : 0;

    exportFile(targetExportUrl, filterNullElement(targetQueryParams), targetFileName, true, total);
  };

  // 导出当前页
  exportCurrent = () => {
    const { active } = this.props;
    const { queryName, exportFileName } = this.state;
    const exportAllUrl = {
      1: '/bmtp-cash-manage/hold/productCarryBalance/export/custDetailcondition',
      2: '/bmtp-settle-manage/report/settRepCustDet/export/condition',
      3: '/bmtp-settle-manage/report/consignorDet/export/condition'
    };
    const cloumsCode = {
      1: 'FieldList1',
      2: 'FieldList2',
      3: 'FieldList3'
    };
    exportFile(
      exportAllUrl[active],
      filterNullElement({
        ...this.props[queryName[active]],
        includeFieldList: this.state[cloumsCode[active]]
      }),
      exportFileName[active],
      false
    );
  };

  // 导出选中
  exportSelected = () => {
    const { active, resetROW } = this.props;
    const { exportFileName } = this.state;
    const exportAllUrl = {
      1: '/bmtp-cash-manage/hold/productCarryBalance/export/custDetailSelect',
      2: '/bmtp-settle-manage/report/settRepCustDet/export/selected',
      3: '/bmtp-settle-manage/report/consignorDet/export/selected'
    };
    const rowedType = {
      1: 'trusteeshipRow',
      2: 'settlementRow',
      3: 'consignorRow'
    };
    const cloumsCode = {
      1: 'FieldList1',
      2: 'FieldList2',
      3: 'FieldList3'
    };
    exportSelectFile(
      exportAllUrl[active],
      { rows: this.props[rowedType[active]], includeFieldList: this.state[cloumsCode[active]] },
      exportFileName[active]
    );
    resetROW({ type: rowedType[active] });
  };

  // 设置cloumsCode中不同页签下的表格字段
  setCloumsCode = (cloum, data) => {
    this.setState({ [cloum]: data });
  };
  // 模板下载
  toDownloadFile = () => {
    downloadFile([downloadFileEnum['人行报送']], { 人行报送: downloadFileEnum['人行报送'] })
  }
}

export default Submitted;
