export default {
  /***左侧树形结构数据 */
  treeList: [],

  /***选中的树形一个元素 */
  treeItemed: { type: 'assetAccount', floor: 1, code: null, title: null },

  /***账户面板切换Key*/
  activeAccountKey: 'assetAccount',
  /***账户右侧tree:codes值 */
  rightAccountCodes: [],

  /***账户主体层级选中的元素 */
  accountMained: {},

  /**审核状态下拉框列表*/
  checkStatusList: [],

  moreNodes: [],

  /***弹框status*/
  isOpenFormModal: {
    type: 'add',
    status: false,
    sign: ''
  },

  /***********数据字典数据************* */

  /**账户类型下拉框列表*/
  capitalTypeList: [
    {
      code: 221,
      value: ' 账号类型1',
      id: 1111
    },
    {
      code: 232,
      value: '账号类型2',
      id: 21212
    }
  ],

  /**币种下拉框*/
  moneyTypeList: [
    {
      code: 1,
      value: '人民币'
    },
    {
      code: 2,
      value: '美元'
    },
    {
      code: 3,
      value: '日元'
    }
  ],

  /**model*****/
  /**账号性质下拉框列表*/
  accountNatureList: [
    {
      code: 1,
      value: '境内托管银行账户zhz'
    },
    {
      code: 12,
      value: '境内托管银行账户12'
    }
  ],

  /**机构管理列表*/
  trusteeshipList: [
    {
      code: 4,
      value: '机构管理新的'
    },
    {
      code: 6,
      value: '机构管理新的'
    }
  ],
  /**交易市场列表*/

  tradeMarketNameList: [
    {
      code: 1,
      value: '交易市场1'
    },
    {
      code: 2,
      value: '交易市场2'
    }
  ],

};
