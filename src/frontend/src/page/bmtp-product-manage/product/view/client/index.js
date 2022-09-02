import React, { PureComponent } from 'react';
import ProductManagement from './components/Poduct';
import Account from './components/Account';
// import Subject from './components/Subject';
// import Document from './components/Document';
import { PageBody, $connect, TransfromDown, Tabs, urlHashToJson } from 'yss-biz';
import { page } from 'yss-biz';
import { authModels } from 'yss-biz-auth';
const { functionCode, source } = urlHashToJson();

const { TabPane } = Tabs;
const { PageMain, Container } = PageBody;

class Product extends PureComponent {
  state = { btnAuth: {} };
  render() {
    const authMsg = authModels.getState().get('authMsg').toJS();
    return (
      <PageBody>
        {authMsg.flag ? (
          <div className="no-auth">{authMsg.msg}</div>
        ) : (
          <PageMain>
            <TransfromDown>
              <Container>
                <ProductManagement {...this.props} {...this.state} />
              </Container>
              <Tabs
                defaultActiveKey="1"
                onChange={activeKey => {
                  this.changePan(activeKey);
                }}
              >
                <TabPane tab="关联账户" key="1">
                  <Account {...this.props} {...this.state}></Account>
                </TabPane>
                {/* <TabPane tab="关联主体" key="2">
                <Subject {...this.props}></Subject>
              </TabPane> */}
                {/* <TabPane tab="产品附件管理" key="3">
                <Document {...this.props}></Document>
              </TabPane> */}
              </Tabs>
            </TransfromDown>
          </PageMain>
        )}
      </PageBody>
    );
  }

  async componentDidMount() {
    const {
      asyncQueryMoust
      // asyncHttpGetSubjectDownList,
      // asyncHttpProductDownList,
    } = this.props;
    let consignorParams = {
      ...page
    };

    await authModels.mutations
      .asyncHttpPermitVerity({ type: 'product', functionCode, source })
      .then(() => {
        const btnAuth = authModels.getState().get('btnAuth').toJS();
        this.setState({ btnAuth });
      });

    await asyncQueryMoust({ params: consignorParams });
    // await asyncHttpProductDownList();
    // await asyncHttpGetSubjectDownList();
  }

  /****切换tab 加载不同的 */
  changePan(activeKey) {
    const {
      asyncHttpGetSubjectList,
      asyncHttpGetAccount,
      asyncHttpGetDocumentList,
      changeActiveAccountKey,
      productInfo
    } = this.props;
    changeActiveAccountKey({ value: activeKey });
    if (activeKey == '1') {
      //获取关联账户
      asyncHttpGetAccount({ productId: productInfo.productId });
    } else if (activeKey == '2') {
      //获取关联主体
      let params = {
        ...page,
        productId: productInfo.productId
      };
      asyncHttpGetSubjectList({ params });
    } else {
      //获取关联文档
      let params = {
        ...page,
        subjectId: productInfo.productId,
        subjectType: 1,
        type: 0
      };
      asyncHttpGetDocumentList({ params });
    }
  }
}

export default $connect(Product, 'bmtp-product-manage/product');
