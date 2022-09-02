import React, { PureComponent } from 'react';
import { PageBody, $connect, TransfromDown, Tabs, Modal, urlHashToJson } from 'yss-biz';
import Detailed from './components/Detailed';
import ManagerTotal from './components/ManagerTotal';
import ProductTotal from './components/ProductTotal';
import ManagerPositionTotal from './components/ManagerPositionTotal';
import ProductCarryDetail from '../../product-carry-detail/view';
import { authModels } from 'yss-biz-auth';
import styled from 'styled-components';
const { functionCode, source } = urlHashToJson();
const { PageMain, Container } = PageBody;
const { TabPane } = Tabs;
const ModalContainer = styled.div`
  .modalStyle .ant-modal-body {
    overflow-y: hidden;
  }
`;
class PositionBalanceQuery extends PureComponent {
  state = {
    btnAuth: {},
    flag: undefined
  };

  //清空
  onClear = flag => {
    this.setState({ flag });
  };

  //回调函数
  onClearSelectRow = (callback, flag) => {
    this.setState({ flag }, () => {
      callback && callback();
    });
  };

  render() {
    const { asyncHttpGetAboutMessage, setMassageType, isOpenFormModal, setFormModal, clickRow } =
      this.props;
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <PageMain>
            <Container>
              <TransfromDown>
                <div>
                  <Detailed
                    {...this.props}
                    {...this.state}
                    onClear={this.onClearSelectRow}
                    onButtonClear={this.onClear}
                  />
                </div>
                <Tabs
                  onChange={value => {
                    setMassageType(value);
                    asyncHttpGetAboutMessage();
                  }}
                >
                  {/* <TabPane tab="信息详情" key="money">
                  <MessageDetail {...this.props} />
                </TabPane> */}
                  <TabPane tab="管理人债券合计" key="bond">
                    <ManagerTotal {...this.props} />
                  </TabPane>
                  <TabPane tab="产品持仓合计" key="product">
                    <ProductTotal {...this.props} />
                  </TabPane>
                  <TabPane tab="管理人持仓合计" key="consignor">
                    <ManagerPositionTotal {...this.props} />
                  </TabPane>
                </Tabs>
              </TransfromDown>
              <ModalContainer>
                <Modal
                  visible={isOpenFormModal.status}
                  title="产品持仓变动明细查询"
                  width="95vw"
                  destroyOnClose
                  onCancel={() => setFormModal(false)}
                  onOk={() => setFormModal(false)}
                >
                  <div style={{ height: '600px' }}>
                    {isOpenFormModal.status ? (
                      <ProductCarryDetail balanceRow={clickRow} position="absolute" noBtns />
                    ) : null}
                  </div>
                </Modal>
              </ModalContainer>
            </Container>
          </PageMain>
        )}
      </PageBody>
    );
  }
  async componentDidMount() {
    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'product-carry-balance', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });
  }
}
export default $connect(PositionBalanceQuery, 'bmtp-cash-manage/product-carry-balance');
