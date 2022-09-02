import React, { PureComponent } from 'react';
import { Tabs } from 'antd';
import { PageBody, $connect, urlHashToJson } from 'yss-biz';
import Clients from './components/Clients';
// import Document from './components/Document';
// import Contract from './components/Contract';
// import EnclosureModal from './components/EnclosureModal';
// import ContractModal from './components/ContractModal';
import { page } from 'yss-biz/utils/util/constant';
import './components/style.less';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();
const { PageMain, Container } = PageBody;
const { TabPane } = Tabs;

class Client extends PureComponent {
  state = { btnAuth: {} };
  render() {
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <PageMain>
            <Container>
              <Clients {...this.props} {...this.state}></Clients>
            </Container>
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const {
      asyncQueryClinetMount,
      asyncHttpGetConsignorDownList,
      asyncHttpGetClientDownData,
      asyncHttpParentCode
    } = this.props;
    let params = {
      ...page
    };

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'consignor', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncQueryClinetMount({ params });
    /*获取机构*/
    await asyncHttpGetClientDownData();
    // /*获取母公司*/
    // await asyncHttpParentCode();
    // await asyncHttpGetConsignorDownList();
  }

  // /****切换tab 加载不同的 */
  // changePan(activeKey) {
  //   const {
  //     subjectId,
  //     asyncHttpGetContract,
  //     asyncHttpDocument,
  //     changeActiveAccountKey,
  //     queryDocumentElement,
  //     queryContracElement
  //   } = this.props;
  //   changeActiveAccountKey({ value: activeKey });
  //   if (activeKey == 'enclosure') {
  //     let params = {
  //       ...queryDocumentElement,
  //       subjectId
  //     };
  //     asyncHttpDocument({ params });
  //   } else {
  //     let params = {
  //       ...queryContracElement,
  //       subjectId
  //     };
  //     asyncHttpGetContract({ params });
  //   }
  // }
}

export default $connect(Client, 'bmtp-product-manage/consignor');
