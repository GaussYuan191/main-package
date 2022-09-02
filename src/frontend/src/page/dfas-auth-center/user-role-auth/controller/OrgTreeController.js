/**
 * 机构树 Controller
 * @author txf
 */

import React from 'react';
export default class OrgTreeController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /**控制展开的机构树节点 */
      treeExpandedKeys: [],
      /**选中节点的key(展示用) */
      selectedKeys: []
    };
  }
  async componentDidMount() {
    // 整个页面的初始接口都在一个地方调用, 防止多个异步mutation同时运行导致state丢失
    await this.props.asyncHttpGetEnableDataAuthStatus();
    this.handleTreeSearch('');
  }
  /**机构查询 */
  handleTreeSearch = async str => {
    const { asyncHttpGetOrgTree, asyncHttpGetUserList } = this.props;

    await asyncHttpGetOrgTree({ orgName: str });
    await asyncHttpGetUserList();
    this.setState({ treeExpandedKeys: this.props.orgTreeAllKeys });
  };

  /**机构树展开事件 */
  onTreeExpand = treeExpandedKeys => {
    this.setState({
      treeExpandedKeys
    });
  };

  /**点击左侧树节点 */
  handleTreeSelect = (selectedKeys, e) => {
    const { orgCode } = e?.node?.props || {};
    const { changeActiveOrgCode, changeQueryParam, asyncHttpGetUserList } = this.props;
    changeActiveOrgCode(orgCode);
    changeQueryParam({
      reqPageNum: 1
    });
    asyncHttpGetUserList();
    this.setState({ selectedKeys });
  };
}
