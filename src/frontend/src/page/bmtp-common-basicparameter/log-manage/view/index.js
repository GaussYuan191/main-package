import React, { Component } from 'react';
import './style.less';
import TimeLog from './components/TimeLog.js';
import HistoryLog from './components/HistoryLog.js';
import HistoryTree from './components/HistoryTree';
import TimeTree from './components/TimeTree';
import EnvConfig from './components/Config';
import ConfigTree from './components/ConfigTree';
import { $connect, PageBody, urlHashToJson } from 'yss-biz';
import { Menu } from 'antd';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();

const { PageMain, PageSide } = PageBody;
class PageComponent extends Component {
  state = { menuKey: '1', btnAuth: {} };

  handleClick = e => {
    const { clearLogContent, asyncHttpLogTreeMount, asyncHttpTimeLogTreeData, clearCheckCode } =
      this.props;
    clearLogContent();
    clearCheckCode();
    if (e.key == '1') {
      asyncHttpTimeLogTreeData();
    } else if (e.key == '2') {
      asyncHttpLogTreeMount();
    } else if (e.key == '3') {
      asyncHttpTimeLogTreeData();
    }

    this.setState({ menuKey: e.key });
  };

  render() {
    const { timeLogTree, historyLogTree } = this.props;
    const authMsg = authModels.getState().get('authMsg').toJS();
    const { menuKey } = this.state;
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <>
            <PageSide className="log-menu-side">
              <Menu defaultSelectedKeys={['1']} mode="inline" onClick={this.handleClick}>
                <Menu.Item key="1">
                  <span>实时日志</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <span>历史日志</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <span>环境配置</span>
                </Menu.Item>
              </Menu>
            </PageSide>
            {menuKey == '1' ? (
              <PageSide className="log-side">
                {timeLogTree && timeLogTree.length ? (
                  <TimeTree treeData={timeLogTree} {...this.props}></TimeTree>
                ) : (
                  ''
                )}
              </PageSide>
            ) : null}

            {menuKey == '2' ? (
              <PageSide className="log-side">
                {historyLogTree && historyLogTree.length ? (
                  <HistoryTree treeData={historyLogTree} {...this.props}></HistoryTree>
                ) : (
                  ''
                )}
              </PageSide>
            ) : null}

            {menuKey == '3' ? (
              <PageSide className="log-side">
                {timeLogTree && timeLogTree.length ? (
                  <ConfigTree treeData={timeLogTree} {...this.props}></ConfigTree>
                ) : (
                  ''
                )}
              </PageSide>
            ) : null}

            <PageMain>
              {menuKey == '1' ? (
                <TimeLog {...this.props} />
              ) : menuKey == '2' ? (
                <HistoryLog {...this.props} />
              ) : menuKey == '3' ? (
                <EnvConfig {...this.props} />
              ) : null}
            </PageMain>
          </>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const { asyncHttpTimeLogTreeData } = this.props;
    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'log-manage', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });
    await asyncHttpTimeLogTreeData();
  }
}

export default $connect(PageComponent, 'bmtp-common-basicparameter/log-manage');
