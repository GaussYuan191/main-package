import { PureComponent } from 'react';
import { withRoleBotton, hanbleConfirm, functionRolue } from 'yss-biz';
export default class UserContorlBotton extends PureComponent {
  render() {
    const {
      // asyncHanleExport,
      systemParamQueryValues,
      paging,
      rowChecked,
      asyncHandleAudit,
      asyncHandleUnaudit,
      toEmptySelect
    } = this.props;
    return withRoleBotton(
      [
        {
          name: '审核',
          icon: 'solution',
          roule: functionRolue.CHECK,
          func: () =>
            hanbleConfirm({
              rowChecked,
              done: asyncHandleAudit,
              then: () =>
                this.props
                  .asyncGetTablesDatas({ ...systemParamQueryValues, ...paging })
                  .then(() => {
                    toEmptySelect();
                  })
            })
        },
        {
          name: '反审核',
          icon: 'file-sync',
          roule: functionRolue.UNCHECK,
          func: () =>
            hanbleConfirm({
              rowChecked,
              done: asyncHandleUnaudit,
              then: () =>
                this.props
                  .asyncGetTablesDatas({ ...systemParamQueryValues, ...paging })
                  .then(() => {
                    toEmptySelect();
                  })
            })
        }
        // {
        //   name: '导出',
        //   icon: 'export',
        //   roule: functionRolue.EXPORT,
        //   children: [
        //     {
        //       name: '导出全部',
        //       func: asyncHanleExport
        //     },
        //     {
        //       name: '导出当前页',
        //       func: () => {
        //         asyncHanleExport({ ...systemParamQueryValues, ...paging });
        //       }
        //     },
        //     {
        //       name: '导出选择项',
        //       func: () => {}
        //     }
        //   ]
        // }
      ],
      this.props.btnAuth
    );
  }
}
