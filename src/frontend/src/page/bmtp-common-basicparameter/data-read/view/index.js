import React, { PureComponent } from 'react';
import { PageBody, $connect, SearchTree, urlHashToJson } from 'yss-biz';
import DataRead from './components/DataRead.js';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
const { PageMain } = PageBody;

// const data = [
//   { children: [{ title: '债券品种信息', key: 'ZQPZXX' }], title: '财汇资讯数据', key: 'CHZXSJ' },
//   { children: [{ title: '付息兑付', key: 'ZZDFXDF' }], title: '中债登数据', key: 'ZZDSJ' },
//   {
//     children: [{ title: '中债付息兑付', key: 'ZZDFXDF' }],
//     title: '中债登数据',
//     key: 'ZZDSJ'
//   },
//   {
//     children: [
//       { title: '上清付息兑付', key: 'SQSFXDF' },
//       { title: '费用结算', key: 'SQSFYJS' },
//       { title: '持仓核对', key: 'SQSCCHD' }
//     ],
//     title: '上清所数据',
//     key: 'SQSSJ'
//   },
//   {
//     children: [
//       { title: '现券', key: 'BOND' },
//       { title: '质押式回购', key: 'PLEDGE' },
//       { title: '债券借贷', key: 'LENDING' },
//       { title: '买断式回购', key: 'OUTRIGHT' }
//     ],
//     title: '管理人交易数据',
//     key: 'GLRJYSJ'
//   }
// ];

class PageComponent extends PureComponent {
  state = { btnAuth: {} };
  render() {
    const { treeData } = this.props;
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <>
            <SearchTree
              treeData={treeData}
              // onAllSelect={this.toSelectAll}
              onReset={this.toReset}
              onSelect={this.onSelect}
              onSelectTree={this.onSelectTree}
              // expandedKeys={['CHZXSJ', 'GZYWSJ', 'ZZDSJ', 'SQSSJ']}
              autoExpandParent={true}
              displayValue={'key'}
              displayTitle={'title'}
              isAllSelect={false}
              onlySelectLeaf={true}
            />
            <PageMain>
              <DataRead {...this.props} {...this.state} />
            </PageMain>
          </>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const { asyncHttpInterfData } = this.props;

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'data-read', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncHttpInterfData({});
  }

  // toSelectAll = arr => {
  //   console.log(arr);
  // };

  toReset = () => {
    const { toSaveCheck } = this.props;
    toSaveCheck && toSaveCheck([]);
  };

  onSelect = value => {
    // console.log(value);
    const { toSaveCheck } = this.props;
    toSaveCheck && toSaveCheck([value]);
  };

  onSelectTree = arr => {
    // TODO SearchTree 组件的搜索勾选有bug, 搜索后勾选一节点会将所有同级节点选中, 但数值仅为该节点
    const { toSaveCheck } = this.props;
    toSaveCheck && toSaveCheck(arr);
  };
}

export default $connect(PageComponent, 'bmtp-common-basicparameter/data-read');
