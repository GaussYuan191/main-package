import React, { PureComponent } from 'react';
import {
  withRoleBotton,
  // UploadModal,
  exportFile,
  filterNullElement,
  exportSelectFile,
  functionRolue
} from 'yss-biz';
import { message, modal } from 'antd';

// const UpLoadFile = UploadModal;
export default class ButtonGrounp extends PureComponent {
  render() {
    const {
      openFormModal,
      asyncHttpDataSplit,
      asyncHttpSplitAffirm,
      // asyncHttpCacelAffirm,
      asyncHttpSendBill,
      toChangeAffirmSplitStatus,
      isAffirmSplit,
      toEmptyIds,
      ids
    } = this.props;
    /***按钮组** */
    const rowed = ids[0];
    const ButtonType = [
      {
        name: '新增',
        roule: functionRolue.ADD,
        func: () => {
          openFormModal({ type: 'add', status: true, sign: 'bd' });
        }
      },
      {
        name: '拆分',
        roule: true,
        disabled: isAffirmSplit,
        func: async () => {
          if (ids.length == 0) {
            message.error('请选择需要拆分的数据');
            return;
          } else if (ids.length > 1) {
            message.error('不支持多数据拆分');
            return;
          }

          if (!(rowed.intreReachStatus == 1 || rowed.intreReachStatus == 2)) {
            message.error('请选择未拆分或者已拆分的数据！');
            return;
          }

          await asyncHttpDataSplit(rowed).then(() => {
            toEmptyIds();
          });
        }
      },
      {
        name: '拆分确认',
        roule: true,
        func: async () => {
          if (ids.length == 0) {
            message.error('请选择需要拆分确认的数据');
            return;
          } else if (ids.length > 1) {
            message.error('不支持多数据拆分确认');
            return;
          }

          if (ids[0].intreReachStatus != 2) {
            message.error('只有已拆分的的数据才可以拆分确认！');
            return;
          }
          toChangeAffirmSplitStatus(true);
          await asyncHttpSplitAffirm(rowed).then(() => {
            toChangeAffirmSplitStatus(false);
            toEmptyIds();
          });
        }
      },
      {
        name: '审核',
        roue: true,
        func: () => {
          if (ids.length < 1) {
            message.error('请选择需要审核的数据');
            return;
          }
          const { asyncHttpToCheckData } = this.props;
          // const me = this;
          // 2未审核 1是已审核 checkStatus
          let data = [],
            othData = [];
          // 只有未审核的数据才可以审核
          ids.map(item => {
            if (item.checkStatus == '2') {
              data.push(item.id);
            } else {
              othData.push(item.id);
            }
          });

          if (data.length > 0) {
            if (othData.length < 1) {
              asyncHttpToCheckData(data).then(() => {
                toEmptyIds();
              });
            } else {
              modal.confirm({
                title: '是否审核数据',
                content: `选取数据中存在 ${othData.length} 条已审核数据，是否过滤后继续？`,
                onOk() {
                  asyncHttpToCheckData(data).then(() => {
                    toEmptyIds();
                  });
                }
              });
            }
          } else {
            message.error('只有未审核的数据才可以审核');
          }
        }
      },
      {
        name: '反审核',
        roue: true,
        func: () => {
          if (ids.length < 1) {
            message.error('请选择需要反审核的数据');
            return;
          }
          const { asyncHttpToUnCheckData } = this.props;
          // 2未审核 1是已审核 checkStatus
          let data = [],
            othData = [];
          // 只有已审核的数据才可以审核
          ids.map(item => {
            if (item.checkStatus == '1') {
              data.push(item.id);
            } else {
              othData.push(item.id);
            }
          });

          if (data.length > 0) {
            if (othData.length < 1) {
              asyncHttpToUnCheckData(data).then(() => {
                toEmptyIds();
              });
            } else {
              modal.confirm({
                title: '是否反审核数据',
                content: `选取数据中存在 ${othData.length} 条未审核数据，是否过滤后继续？`,
                onOk() {
                  asyncHttpToUnCheckData(data).then(() => {
                    toEmptyIds();
                  });
                }
              });
            }
          } else {
            message.error('只有已审核的数据才可以反审核');
          }
        }
      },
      // {
      //   name: '取消确认',
      //   roule: true,
      //   func: () => {
      //     if (ids.length == 0) {
      //       message.error('请选择需要取消拆分的数据');
      //       return;
      //     } else if (ids.length > 1) {
      //       message.error('不支持多数据取消拆分');
      //       return;
      //     }
      //     if (ids[0].intreReachStatus != 3) {
      //       message.error('只有确认的的数据才可以取消确认！');
      //       return;
      //     }
      //     asyncHttpCacelAffirm(rowed).then(() => {
      //       toEmptyIds();
      //     });
      //   }
      // },
      {
        name: '发送账单',
        roule: true,
        func: () => {
          if (ids.length == 0) {
            message.error('请选择需要发送账单的数据');
            return;
          } else if (ids.length > 1) {
            message.error('不支持多数据发送账单');
            return;
          }

          if (!(rowed.intreReachStatus == 3 && rowed.transComStatus == 2)) {
            //只有“利息兑付状态”是“已确认”且“划款指令状态”为“执行成功”
            message.error(
              `只有利息兑付状态是'已确认'且划款指令状态为'执行成功'的数据才能够发送账单`
            );
            return;
          }

          asyncHttpSendBill(rowed).then(() => {
            toEmptyIds();
          });
        }
      },
      // {
      //   name: '导入',
      //   roule: true,
      //   func: () => {
      //     UpLoadFile.show();
      //   }
      // },
      {
        name: '导出',
        roule: functionRolue.EXPORT,
        children: [
          {
            name: '导出全部',
            func: () => {
              this.exportCurrentPage(true);
            }
          },
          {
            name: '导出当前页',
            func: () => {
              this.exportCurrentPage(false);
            }
          },
          {
            name: '导出选择项',
            func: this.exportSelected
          }
        ]
      }

      // {
      //   name: '打印',
      //   roule: true,
      //   func: () => {
      //     asyncHttpBatchexamine({ params: this.state.ids });
      //   }
      // }
    ];

    return <>{withRoleBotton(ButtonType)}</>;
  }

  /*导出当前*/
  exportCurrentPage = status => {
    const { queryElement } = this.props;
    exportFile(
      '/bmtp-settle-manage/payment/bondPayment/export/condition',
      filterNullElement(queryElement),
      '债券付息兑付',
      status
    );
  };

  /*导出选择项*/
  exportSelected = () => {
    const { ids } = this.props;
    exportSelectFile(
      '/bmtp-settle-manage/payment/bondPayment/export/selected',
      ids,
      '债券付息兑付'
    );
  };
}
