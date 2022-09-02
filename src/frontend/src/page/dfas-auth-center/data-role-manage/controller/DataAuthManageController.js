/**
 * 角色授权管理 Controller
 * @author txf
 */

import React from 'react';
import { message, Modal } from 'antd';
export default class DataAuthManageController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      ids: [],
      modalVisible: false // 授权对话框显示状态
    };
  }
  async componentDidMount() {}

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.treeActiveCode !== this.props.treeActiveCode) {
      // 清除勾选
      this.toEmptySelect();
    }
  }

  /**查询角色的数据权限列表 */
  query = values => {
    this.props.changeQueryParam({ reqPageNum: 1 });
    this.props.asyncHttpGetDataAuthList();
  };

  /**分页查询 */
  searchPage = pages => {
    this.props.changeQueryParam(pages);
    this.props.asyncHttpGetDataAuthList();
  };

  /**批量撤销授权 */
  batchRevokeAuth = () => {
    const { ids } = this.state;
    if (!ids.length) {
      message.warn('请至少选择一条数据');
      return;
    }
    const idList = ids.map(item => item.id);
    this.props.asyncHttpBatchRevokeAuth(idList).then(() => {
      this.toEmptySelect();
    });
  };

  /**切换授权窗口展示 */
  changeModalVisible = visible => {
    this.setState({ modalVisible: !!visible });
  };

  /**清空勾选 */
  toEmptySelect = () => {
    this.setState({ ids: [], keys: [] });
  };
}
