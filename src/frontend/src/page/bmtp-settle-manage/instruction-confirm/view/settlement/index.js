import React, { Component } from 'react';
import Instruction from './components/Instruction'; //上清所指令管理
// import InstructionZJD from './components/InstructionZJD'; //中债登指令管理
import { $connect, PageBody, urlHashToJson, Tabs } from 'yss-biz';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
const { PageMain, Container } = PageBody;
const { TabPane } = Tabs;
// TODO 上清中债拆分待处理, 当前中债的变动需求还未出, lugiax 状态、mutation.sync、instruction.js和infoFormRule.js和表中表 需克隆中债处理
class PageComponent extends Component {
  state = { btnAuth: {} };
  render() {
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <PageMain>
            {/* <Tabs onChange={this.tabChange}>
              <TabPane tab="上清所" key="1"> */}
            <Container>
              <Instruction {...this.props} {...this.state} />
            </Container>
            {/* </TabPane>
              <TabPane tab="中债登" key="2">
                <Container>
                  <InstructionZJD {...this.state} />
                </Container>
              </TabPane>
            </Tabs> */}
          </PageMain>
        )}
      </PageBody>
    );
  }

  tabChange = async key => {};

  async componentDidMount() {
    // const { asyncHttpCurrentTradingDay } = this.props;
    // await asyncHttpCurrentTradingDay({});

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'instruction-confirm', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });
  }
}

export default $connect(PageComponent, 'bmtp-settle-manage/instruction-confirm');
