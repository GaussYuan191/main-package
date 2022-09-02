export default {
  /** 现券上传, 回显数据表头 */
  bondColumns: [
    {
      title: '成交日期',
      dataIndex: 'execDate',
      key: 'execDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '成交编号',
      dataIndex: 'execCode',
      key: 'execCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '业务品种',
      dataIndex: 'bizCategoryName',
      key: 'bizCategoryName',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易方向',
      dataIndex: 'tradeDirectionName',
      key: 'tradeDirectionName',
      width: 150,
      ellipsis: true
    },
    {
      title: '债券代码',
      dataIndex: 'bondCode',
      key: 'bondCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '债券名称',
      dataIndex: 'bondName',
      key: 'bondName',
      width: 200,
      ellipsis: true
    },
    {
      title: '结算币种',
      dataIndex: 'settleCurrency',
      key: 'settleCurrency',
      width: 150,
      ellipsis: true
    },
    {
      title: '净价(元)',
      dataIndex: 'netPrice',
      key: 'netPrice',
      width: 150,
      ellipsis: true
    },
    {
      title: '全价(元)',
      dataIndex: 'dirtyPrice',
      key: 'dirtyPrice',
      width: 150,
      ellipsis: true
    },
    {
      title: '应计利息(元)',
      dataIndex: 'accruedInterest',
      key: 'accruedInterest',
      width: 150,
      ellipsis: true
    },
    {
      title: '产品代码',
      dataIndex: 'productCode',
      key: 'productCode',
      width: 150,
      ellipsis: true
    },
    {
      title: '券面总额(万元)',
      dataIndex: 'faceValue',
      key: 'faceValue',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易金额(元)',
      dataIndex: 'tradeAmount',
      key: 'tradeAmount',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算金额(元)',
      dataIndex: 'settleAmount',
      key: 'settleAmount',
      width: 150,
      ellipsis: true
    },
    {
      title: '应计利息总额(元)',
      dataIndex: 'totalAccruedInterest',
      key: 'totalAccruedInterest',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易费用(元)',
      dataIndex: 'tradeFee',
      key: 'tradeFee',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算费用(元)',
      dataIndex: 'settleFee',
      key: 'settleFee',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算日',
      dataIndex: 'settleDate',
      key: 'settleDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算方式',
      dataIndex: 'settleTypeName',
      key: 'settleTypeName',
      width: 150,
      ellipsis: true
    },
    {
      title: '买入方交易员名称',
      dataIndex: 'buyerTraderName',
      key: 'buyerTraderName',
      width: 150,
      ellipsis: true
    },
    {
      title: '买入方资金账号',
      dataIndex: 'buyerAssetAccount',
      key: 'buyerAssetAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '买入方资金账户户名',
      dataIndex: 'buyerAssetAccountName',
      key: 'buyerAssetAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '买入方资金账户开户行',
      dataIndex: 'buyerSettleBankName',
      key: 'buyerSettleBankName',
      width: 200,
      ellipsis: true
    },
    {
      title: '买入方托管账号',
      dataIndex: 'buyerCustodianAccount',
      key: 'buyerCustodianAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '买入方托管账户户名',
      dataIndex: 'buyerBondAccountName',
      key: 'buyerBondAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方交易员名称',
      dataIndex: 'sellerTraderName',
      key: 'sellerTraderName',
      width: 150,
      ellipsis: true
    },
    {
      title: '卖出方资金账号',
      dataIndex: 'sellerAssetAccount',
      key: 'sellerAssetAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方资金账户户名',
      dataIndex: 'sellerAssetAccountName',
      key: 'sellerAssetAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方资金账户开户行',
      dataIndex: 'sellerSettleBankName',
      key: 'sellerSettleBankName',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方托管账号',
      dataIndex: 'sellerCustodianAccount',
      key: 'sellerCustodianAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方托管账户户名',
      dataIndex: 'sellerBondAccountName',
      key: 'sellerBondAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方支付系统行号',
      dataIndex: 'sellerSettleAccountNumber',
      key: 'sellerSettleAccountNumber',
      width: 200,
      ellipsis: true
    }
  ],

  /** 质押式回购上传, 回显数据表头 */
  pledgeColumns: [
    {
      title: '成交时间',
      dataIndex: 'execDate',
      key: 'execDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '成交编号',
      dataIndex: 'execCode',
      key: 'execCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '交易方向',
      dataIndex: 'tradeDirectionName',
      key: 'tradeDirectionName',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易品种',
      dataIndex: 'tradingProduct',
      key: 'tradingProduct',
      width: 150,
      ellipsis: true
    },
    {
      title: '债券币种',
      dataIndex: 'settleCurrency',
      key: 'settleCurrency',
      width: 150,
      ellipsis: true
    },
    {
      title: '债券代码',
      dataIndex: 'bondCode',
      key: 'bondCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '债券名称',
      dataIndex: 'bondName',
      key: 'bondName',
      width: 200,
      ellipsis: true
    },
    {
      title: '折算比例(%)',
      dataIndex: 'conversionProportion',
      key: 'conversionProportion',
      width: 150,
      ellipsis: true
    },
    {
      title: '回购利率(%)',
      dataIndex: 'repoRate',
      key: 'repoRate',
      width: 150,
      ellipsis: true
    },
    {
      title: '首期结算日',
      dataIndex: 'firstSettleDate',
      key: 'firstSettleDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '首次结算方式',
      dataIndex: 'firstSettleTypeName',
      key: 'firstSettleTypeName',
      width: 150,
      ellipsis: true
    },
    {
      title: '到期结算日',
      dataIndex: 'secondSettleDate',
      key: 'secondSettleDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '到期结算方式',
      dataIndex: 'secondSettleTypeName',
      key: 'secondSettleTypeName',
      width: 150,
      ellipsis: true
    },
    {
      title: '产品代码',
      dataIndex: 'productCode',
      key: 'productCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '应计利息总额(元)',
      dataIndex: 'totalAccruedInterest',
      key: 'totalAccruedInterest',
      width: 150,
      ellipsis: true
    },
    {
      title: '实际占款天数',
      dataIndex: 'occupancyDays',
      key: 'occupancyDays',
      width: 150,
      ellipsis: true
    },
    {
      title: '券面总额(万元)',
      dataIndex: 'faceValue',
      key: 'faceValue',
      width: 150,
      ellipsis: true
    },
    {
      title: '首期结算金额(元)',
      dataIndex: 'tradeAmount',
      key: 'tradeAmount',
      width: 150,
      ellipsis: true
    },
    {
      title: '到期结算金额(元)',
      dataIndex: 'secondSettleAmount',
      key: 'secondSettleAmount',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易费用(元)',
      dataIndex: 'tradeFee',
      key: 'tradeFee',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算费用(元)',
      dataIndex: 'settleFee',
      key: 'settleFee',
      width: 150,
      ellipsis: true
    },
    {
      title: '正回购方交易员名称',
      dataIndex: 'repoTraderName',
      key: 'repoTraderName',
      width: 150,
      ellipsis: true
    },
    {
      title: '正回购方资金账号',
      dataIndex: 'repoAssetAccount',
      key: 'repoAssetAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '正回购方资金账户户名',
      dataIndex: 'repoAssetAccountName',
      key: 'repoAssetAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '正回购方资金账户开户行',
      dataIndex: 'repoSettleBankName',
      key: 'repoSettleBankName',
      width: 200,
      ellipsis: true
    },
    {
      title: '正回购方托管账号',
      dataIndex: 'repoCustodianAccount',
      key: 'repoCustodianAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '正回购方托管账户户名',
      dataIndex: 'repoCustodianName',
      key: 'repoCustodianName',
      width: 200,
      ellipsis: true
    },
    {
      title: '逆回购方交易员名称',
      dataIndex: 'reverseTraderName',
      key: 'reverseTraderName',
      width: 200,
      ellipsis: true
    },
    {
      title: '逆回购方资金账号',
      dataIndex: 'reverseAssetAccount',
      key: 'reverseAssetAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '逆回购方资金账户户名',
      dataIndex: 'reverseAssetAccountName',
      key: 'reverseAssetAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '逆回购方资金账户开户行',
      dataIndex: 'reverseSettleBankName',
      key: 'reverseSettleBankName',
      width: 200,
      ellipsis: true
    },
    {
      title: '逆回购方托管账户',
      dataIndex: 'reverseCustodianAccount',
      key: 'reverseCustodianAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '逆回购方托管账户户名',
      dataIndex: 'reverseCustodianName',
      key: 'reverseCustodianName',
      width: 200,
      ellipsis: true
    }
  ],

  /** 债券借贷上传, 回显数据表头 */
  lendingColumns: [
    {
      title: '成交时间',
      dataIndex: 'execDate',
      key: 'execDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '成交编号',
      dataIndex: 'execCode',
      key: 'execCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '交易方向',
      dataIndex: 'tradeDirectionName',
      key: 'tradeDirectionName',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易品种',
      dataIndex: 'tradingProduct',
      key: 'tradingProduct',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算币种',
      dataIndex: 'settleCurrency',
      key: 'settleCurrency',
      width: 150,
      ellipsis: true
    },
    {
      title: '首次结算日',
      dataIndex: 'firstSettleDate',
      key: 'firstSettleDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '首次结算方式',
      dataIndex: 'firstSettleTypeName',
      key: 'firstSettleTypeName',
      width: 150,
      ellipsis: true
    },
    {
      title: '到期结算日',
      dataIndex: 'secondSettleDate',
      key: 'secondSettleDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '到期结算方式',
      dataIndex: 'secondSettleTypeName',
      key: 'secondSettleTypeName',
      width: 150,
      ellipsis: true
    },
    {
      title: '标的债券代码',
      dataIndex: 'bondCode',
      key: 'bondCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '标的债券名称',
      dataIndex: 'bondName',
      key: 'bondName',
      width: 200,
      ellipsis: true
    },
    {
      title: '借贷费率(%)',
      dataIndex: 'repoRate',
      key: 'repoRate',
      width: 150,
      ellipsis: true
    },
    {
      title: '借贷期限',
      dataIndex: 'term',
      key: 'term',
      width: 150,
      ellipsis: true
    },
    {
      title: '实际占券天数(天)',
      dataIndex: 'occupancyDays',
      key: 'occupancyDays',
      width: 150,
      ellipsis: true
    },
    {
      title: '产品代码',
      dataIndex: 'productCode',
      key: 'productCode',
      width: 150,
      ellipsis: true
    },
    {
      title: '标的债券券面总额(万元)',
      dataIndex: 'totalFaceValue',
      key: 'totalFaceValue',
      width: 200,
      ellipsis: true
    },
    {
      title: '应计利息总额(元)',
      dataIndex: 'totalAccruedInterest',
      key: 'totalAccruedInterest',
      width: 150,
      ellipsis: true
    },
    {
      title: '借贷费用(元)',
      dataIndex: 'lendingRate',
      key: 'lendingRate',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易费用(元)',
      dataIndex: 'tradeFee',
      key: 'tradeFee',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算费用(元)',
      dataIndex: 'settleFee',
      key: 'settleFee',
      width: 150,
      ellipsis: true
    },
    {
      title: '债券代码',
      dataIndex: 'bondCodeRef',
      key: 'bondCodeRef',
      width: 200,
      ellipsis: true
    },
    {
      title: '债券名称',
      dataIndex: 'bondNameRef',
      key: 'bondNameRef',
      width: 200,
      ellipsis: true
    },
    {
      title: '折算比例(%)',
      dataIndex: 'conversionProportion',
      key: 'conversionProportion',
      width: 150,
      ellipsis: true
    },
    {
      title: '券面总额(万元)',
      dataIndex: 'faceValueRef',
      key: 'faceValueRef',
      width: 150,
      ellipsis: true
    },
    {
      title: '融入方交易员名称',
      dataIndex: 'repoTraderName',
      key: 'repoTraderName',
      width: 150,
      ellipsis: true
    },
    {
      title: '融入方资金账号',
      dataIndex: 'repoAssetAccount',
      key: 'repoAssetAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '融入方资金账户户名',
      dataIndex: 'repoAssetAccountName',
      key: 'repoAssetAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '融入方资金账户开户行',
      dataIndex: 'repoSettleBankName',
      key: 'repoSettleBankName',
      width: 200,
      ellipsis: true
    },
    {
      title: '融入方托管账号',
      dataIndex: 'repoCustodianAccount',
      key: 'repoCustodianAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '融入方托管账户户名',
      dataIndex: 'repoCustodianName',
      key: 'repoCustodianName',
      width: 200,
      ellipsis: true
    },
    {
      title: '融出方交易员名称',
      dataIndex: 'reverseTraderName',
      key: 'reverseTraderName',
      width: 150,
      ellipsis: true
    },
    {
      title: '融出方资金账号',
      dataIndex: 'reverseAssetAccount',
      key: 'reverseAssetAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '融出方资金账户户名',
      dataIndex: 'reverseAssetAccountName',
      key: 'reverseAssetAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '融出方资金账户开户行',
      dataIndex: 'reverseSettleBankName',
      key: 'reverseSettleBankName',
      width: 200,
      ellipsis: true
    },
    {
      title: '融出方托管账号',
      dataIndex: 'reverseCustodianAccount',
      key: 'reverseCustodianAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '融出方托管账户户名',
      dataIndex: 'reverseCustodianName',
      key: 'reverseCustodianName',
      width: 200,
      ellipsis: true
    }
  ],

  /** 买断式回购上传, 回显数据表头 */
  outrightColumns: [
    {
      title: '成交日期',
      dataIndex: 'execDate',
      key: 'execDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '成交编号',
      dataIndex: 'execCode',
      key: 'execCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '交易方向',
      dataIndex: 'tradeDirectionName',
      key: 'tradeDirectionName',
      width: 150,
      ellipsis: true
    },
    {
      title: '实际占款天数(天)',
      dataIndex: 'occupancyDays',
      key: 'occupancyDays',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算币种',
      dataIndex: 'settleCurrency',
      key: 'settleCurrency',
      width: 150,
      ellipsis: true
    },
    {
      title: '回购利率(%)',
      dataIndex: 'repoRate',
      key: 'repoRate',
      width: 150,
      ellipsis: true
    },
    {
      title: '标的债券代码',
      dataIndex: 'bondCode',
      key: 'bondCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '标的债券名称',
      dataIndex: 'bondName',
      key: 'bondName',
      width: 200,
      ellipsis: true
    },
    {
      title: '首次净价(元)',
      dataIndex: 'firstDirtyPrice',
      key: 'firstDirtyPrice',
      width: 150,
      ellipsis: true
    },
    {
      title: '到期净价(元)',
      dataIndex: 'secondDirtyPrice',
      key: 'secondDirtyPrice',
      width: 150,
      ellipsis: true
    },
    {
      title: '首次应计利息(元)',
      dataIndex: 'firstTotalAccruedInterest',
      key: 'firstTotalAccruedInterest',
      width: 150,
      ellipsis: true
    },
    {
      title: '到期应计利息(元)',
      dataIndex: 'secondTotalAccruedInterest',
      key: 'secondTotalAccruedInterest',
      width: 150,
      ellipsis: true
    },
    {
      title: '首次全价(元)',
      dataIndex: 'firstNetPrice',
      key: 'firstNetPrice',
      width: 150,
      ellipsis: true
    },
    {
      title: '到期全价(元)',
      dataIndex: 'secondNetPrice',
      key: 'secondNetPrice',
      width: 150,
      ellipsis: true
    },
    {
      title: '首次结算日',
      dataIndex: 'firstSettleDate',
      key: 'firstSettleDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '首次结算方式',
      dataIndex: 'firstSettleTypeName',
      key: 'firstSettleTypeName',
      width: 150,
      ellipsis: true
    },
    {
      title: '到期结算日',
      dataIndex: 'secondSettleDate',
      key: 'secondSettleDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '到期结算方式',
      dataIndex: 'secondSettleTypeName',
      key: 'secondSettleTypeName',
      width: 150,
      ellipsis: true
    },
    {
      title: '产品代码',
      dataIndex: 'productCode',
      key: 'productCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '标的债券券面总额(万元)',
      dataIndex: 'faceValue',
      key: 'faceValue',
      width: 200,
      ellipsis: true
    },
    {
      title: '首次结算金额(元)',
      dataIndex: 'firstSettleAmount',
      key: 'firstSettleAmount',
      width: 150,
      ellipsis: true
    },
    {
      title: '到期结算金额(元)',
      dataIndex: 'secondSettleAmount',
      key: 'secondSettleAmount',
      width: 150,
      ellipsis: true
    },
    {
      title: '首次应计利息总额(元)',
      dataIndex: 'firstAccuredInterest',
      key: 'firstAccuredInterest',
      width: 200,
      ellipsis: true
    },
    {
      title: '到期应计利息总额(元)',
      dataIndex: 'secondAccuredInterest',
      key: 'secondAccuredInterest',
      width: 200,
      ellipsis: true
    },
    {
      title: '交易费用(元)',
      dataIndex: 'tradeFee',
      key: 'tradeFee',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算费用(元)',
      dataIndex: 'settleFee',
      key: 'settleFee',
      width: 150,
      ellipsis: true
    },
    {
      title: '债券代码',
      dataIndex: 'bondCodePledge',
      key: 'bondCodePledge',
      width: 200,
      ellipsis: true
    },
    {
      title: '债券名称',
      dataIndex: 'bondNamePledge',
      key: 'bondNamePledge',
      width: 200,
      ellipsis: true
    },
    {
      title: '券面总额(万元)',
      dataIndex: 'faceValuePledge',
      key: 'faceValuePledge',
      width: 150,
      ellipsis: true
    },
    {
      title: '正回购方交易员名称',
      dataIndex: 'repoTraderName',
      key: 'repoTraderName',
      width: 150,
      ellipsis: true
    },
    {
      title: '正回购方资金账号',
      dataIndex: 'repoAssetAccount',
      key: 'repoAssetAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '正回购方资金账户户名',
      dataIndex: 'repoAssetAccountName',
      key: 'repoAssetAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '正回购方资金账户开户行',
      dataIndex: 'repoSettleBankName',
      key: 'repoSettleBankName',
      width: 200,
      ellipsis: true
    },
    {
      title: '正回购方托管账号',
      dataIndex: 'repoCustodianAccount',
      key: 'repoCustodianAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '正回购方托管账户户名',
      dataIndex: 'repoCustodianName',
      key: 'repoCustodianName',
      width: 200,
      ellipsis: true
    },
    {
      title: '逆回购方交易员名称',
      dataIndex: 'reverseTraderName',
      key: 'reverseTraderName',
      width: 150,
      ellipsis: true
    },
    {
      title: '逆回购方资金账号',
      dataIndex: 'reverseAssetAccount',
      key: 'reverseAssetAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '逆回购方资金账户户名',
      dataIndex: 'reverseAssetAccountName',
      key: 'reverseAssetAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '逆回购方资金账户开户行',
      dataIndex: 'reverseSettleBankName',
      key: 'reverseSettleBankName',
      width: 200,
      ellipsis: true
    },
    {
      title: '逆回购方托管账号',
      dataIndex: 'reverseCustodianAccount',
      key: 'reverseCustodianAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '逆回购方托管账户户名',
      dataIndex: 'reverseCustodianName',
      key: 'reverseCustodianName',
      width: 200,
      ellipsis: true
    }
  ],

  /** 债券回售上传, 回显数据表头 */
  sellBackColumns: [
    {
      title: '成交日期',
      dataIndex: 'execDate',
      key: 'execDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '业务品种',
      dataIndex: 'bizCategoryName',
      key: 'bizCategoryName',
      width: 150,
      ellipsis: true
    },
    // name
    {
      title: '交易方向',
      dataIndex: 'tradeDirectionName',
      key: 'tradeDirectionName',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易指令编号',
      dataIndex: 'tradeInstrId',
      key: 'tradeInstrId',
      width: 200,
      ellipsis: true
    },
    {
      title: '债券代码',
      dataIndex: 'bondCode',
      key: 'bondCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '债券名称',
      dataIndex: 'bondName',
      key: 'bondName',
      width: 200,
      ellipsis: true
    },
    {
      title: '结算币种',
      dataIndex: 'settleCurrency',
      key: 'settleCurrency',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算方式',
      dataIndex: 'settleTypeName',
      key: 'settleTypeName',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算日期',
      dataIndex: 'settleDate',
      key: 'settleDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '产品代码',
      dataIndex: 'productCode',
      key: 'productCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '应计利息(元)',
      dataIndex: 'accruedInterest',
      key: 'accruedInterest',
      width: 150,
      ellipsis: true
    },
    {
      title: '券面总额(万元)',
      dataIndex: 'faceValue',
      key: 'faceValue',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易金额(元)',
      dataIndex: 'tradeAmount',
      key: 'tradeAmount',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算金额(元)',
      dataIndex: 'settleAmount',
      key: 'settleAmount',
      width: 150,
      ellipsis: true
    },
    {
      title: '应计利息总额(元)',
      dataIndex: 'totalAccruedInterest',
      key: 'totalAccruedInterest',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易费用(元)',
      dataIndex: 'tradeFee',
      key: 'tradeFee',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算费用(元)',
      dataIndex: 'settleFee',
      key: 'settleFee',
      width: 150,
      ellipsis: true
    },
    {
      title: '买入方交易员名称',
      dataIndex: 'buyerTraderName',
      key: 'buyerTraderName',
      width: 150,
      ellipsis: true
    },
    {
      title: '买入方资金账号',
      dataIndex: 'buyerAssetAccount',
      key: 'buyerAssetAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '买入方资金账户户名',
      dataIndex: 'buyerAssetAccountName',
      key: 'buyerAssetAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '买入方资金账户开户行',
      dataIndex: 'buyerSettleBankName',
      key: 'buyerSettleBankName',
      width: 200,
      ellipsis: true
    },
    {
      title: '买入方托管账号',
      dataIndex: 'buyerCustodianAccount',
      key: 'buyerCustodianAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '买入方托管账户户名',
      dataIndex: 'buyerBondAccountName',
      key: 'buyerBondAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方交易员名称',
      dataIndex: 'sellerTraderName',
      key: 'sellerTraderName',
      width: 150,
      ellipsis: true
    },
    {
      title: '卖出方资金账号',
      dataIndex: 'sellerAssetAccount',
      key: 'sellerAssetAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方资金账户户名',
      dataIndex: 'sellerAssetAccountName',
      key: 'sellerAssetAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方资金账户开户行',
      dataIndex: 'sellerSettleBankName',
      key: 'sellerSettleBankName',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方资金账户开户行联行号',
      dataIndex: 'sellerSettleAccountNumber',
      key: 'sellerSettleAccountNumber',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方托管账号',
      dataIndex: 'sellerCustodianAccount',
      key: 'sellerCustodianAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方托管账户户名',
      dataIndex: 'sellerBondAccountName',
      key: 'sellerBondAccountName',
      width: 200,
      ellipsis: true
    }
  ],

  /** 网上分销上传, 回显数据表头 */
  onlineColumns: [
    {
      title: '成交时间',
      dataIndex: 'execDate',
      key: 'execDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '成交编号',
      dataIndex: 'execCode',
      key: 'execCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '业务品种',
      dataIndex: 'bizCategoryName',
      key: 'bizCategoryName',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易方向',
      dataIndex: 'tradeDirectionName',
      key: 'tradeDirectionName',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易指令编号',
      dataIndex: 'tradeInstrId',
      key: 'tradeInstrId',
      width: 200,
      ellipsis: true
    },
    {
      title: '债券代码',
      dataIndex: 'bondCode',
      key: 'bondCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '债券名称',
      dataIndex: 'bondName',
      key: 'bondName',
      width: 200,
      ellipsis: true
    },
    {
      title: '结算币种',
      dataIndex: 'settleCurrency',
      key: 'settleCurrency',
      width: 150,
      ellipsis: true
    },
    {
      title: '产品代码',
      dataIndex: 'productCode',
      key: 'productCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '券面总额(万元)',
      dataIndex: 'faceValue',
      key: 'faceValue',
      width: 150,
      ellipsis: true
    },
    {
      title: '应计利息总额(元)',
      dataIndex: 'totalAccruedInterest',
      key: 'totalAccruedInterest',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易金额(元)',
      dataIndex: 'tradeAmount',
      key: 'tradeAmount',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算金额(元)',
      dataIndex: 'settleAmount',
      key: 'settleAmount',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易费用(元)',
      dataIndex: 'tradeFee',
      key: 'tradeFee',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算费用(元)',
      dataIndex: 'settleFee',
      key: 'settleFee',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算日期',
      dataIndex: 'settleDate',
      key: 'settleDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算方式',
      dataIndex: 'settleTypeName',
      key: 'settleTypeName',
      width: 150,
      ellipsis: true
    },
    {
      title: '买入方交易员名称',
      dataIndex: 'buyerTraderName',
      key: 'buyerTraderName',
      width: 150,
      ellipsis: true
    },
    {
      title: '买入方资金账号',
      dataIndex: 'buyerAssetAccount',
      key: 'buyerAssetAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '买入方资金账户户名',
      dataIndex: 'buyerAssetAccountName',
      key: 'buyerAssetAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '买入方资金账户开户行',
      dataIndex: 'buyerSettleBankName',
      key: 'buyerSettleBankName',
      width: 200,
      ellipsis: true
    },
    {
      title: '买入方托管账号',
      dataIndex: 'buyerCustodianAccount',
      key: 'buyerCustodianAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '买入方托管账户户名',
      dataIndex: 'buyerBondAccountName',
      key: 'buyerBondAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方交易员名称',
      dataIndex: 'sellerTraderName',
      key: 'sellerTraderName',
      width: 150,
      ellipsis: true
    },
    {
      title: '卖出方资金账号',
      dataIndex: 'sellerAssetAccount',
      key: 'sellerAssetAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方资金账户户名',
      dataIndex: 'sellerAssetAccountName',
      key: 'sellerAssetAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方资金账户开户行',
      dataIndex: 'sellerSettleBankName',
      key: 'sellerSettleBankName',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方托管账号',
      dataIndex: 'sellerCustodianAccount',
      key: 'sellerCustodianAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方托管账户户名',
      dataIndex: 'sellerBondAccountName',
      key: 'sellerBondAccountName',
      width: 200,
      ellipsis: true
    }
  ],

  /** 网下分销上传, 回显数据表头 */
  offlineColumns: [
    {
      title: '成交日期',
      dataIndex: 'execDate',
      key: 'execDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '成交编号',
      dataIndex: 'execCode',
      key: 'execCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '业务品种',
      dataIndex: 'bizCategoryName',
      key: 'bizCategoryName',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易方向',
      dataIndex: 'tradeDirectionName',
      key: 'tradeDirectionName',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易指令编号',
      dataIndex: 'tradeInstrId',
      key: 'tradeInstrId',
      width: 200,
      ellipsis: true
    },
    {
      title: '债券代码',
      dataIndex: 'bondCode',
      key: 'bondCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '债券名称',
      dataIndex: 'bondName',
      key: 'bondName',
      width: 200,
      ellipsis: true
    },
    {
      title: '结算币种',
      dataIndex: 'settleCurrency',
      key: 'settleCurrency',
      width: 150,
      ellipsis: true
    },
    {
      title: '产品代码',
      dataIndex: 'productCode',
      key: 'productCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '券面总额(万元)',
      dataIndex: 'faceValue',
      key: 'faceValue',
      width: 150,
      ellipsis: true
    },
    {
      title: '应计利息总额(元)',
      dataIndex: 'totalAccruedInterest',
      key: 'totalAccruedInterest',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易金额(元)',
      dataIndex: 'tradeAmount',
      key: 'tradeAmount',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算金额(元)',
      dataIndex: 'settleAmount',
      key: 'settleAmount',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易费用(元)',
      dataIndex: 'tradeFee',
      key: 'tradeFee',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算费用(元)',
      dataIndex: 'settleFee',
      key: 'settleFee',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算日',
      dataIndex: 'settleDate',
      key: 'settleDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算方式',
      dataIndex: 'settleTypeName',
      key: 'settleTypeName',
      width: 150,
      ellipsis: true
    },
    {
      title: '买入方交易员名称',
      dataIndex: 'buyerTraderName',
      key: 'buyerTraderName',
      width: 150,
      ellipsis: true
    },
    {
      title: '买入方资金账号',
      dataIndex: 'buyerAssetAccount',
      key: 'buyerAssetAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '买入方资金账户户名',
      dataIndex: 'buyerAssetAccountName',
      key: 'buyerAssetAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '买入方资金账户开户行',
      dataIndex: 'buyerSettleBankName',
      key: 'buyerSettleBankName',
      width: 200,
      ellipsis: true
    },
    {
      title: '买入方托管账号',
      dataIndex: 'buyerCustodianAccount',
      key: 'buyerCustodianAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '买入方托管账户户名',
      dataIndex: 'buyerBondAccountName',
      key: 'buyerBondAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方交易员名称',
      dataIndex: 'sellerTraderName',
      key: 'sellerTraderName',
      width: 150,
      ellipsis: true
    },
    {
      title: '卖出方资金账号',
      dataIndex: 'sellerAssetAccount',
      key: 'sellerAssetAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方资金账户户名',
      dataIndex: 'sellerAssetAccountName',
      key: 'sellerAssetAccountName',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方资金账户开户行',
      dataIndex: 'sellerSettleBankName',
      key: 'sellerSettleBankName',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方托管账号',
      dataIndex: 'sellerCustodianAccount',
      key: 'sellerCustodianAccount',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方托管账户户名',
      dataIndex: 'sellerBondAccountName',
      key: 'sellerBondAccountName',
      width: 200,
      ellipsis: true
    }
  ],

  /** 现券内转上传, 回显数据表头 */
  innerTradeColumns: [
    {
      title: '成交日期',
      dataIndex: 'execDate',
      key: 'execDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '成交编号',
      dataIndex: 'execCode',
      key: 'execCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '业务品种',
      dataIndex: 'bizCategoryName',
      key: 'bizCategoryName',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易方向',
      dataIndex: 'tradeDirectionName',
      key: 'tradeDirectionName',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易指令编号',
      dataIndex: 'tradeInstrId',
      key: 'tradeInstrId',
      width: 200,
      ellipsis: true
    },
    {
      title: '债券代码',
      dataIndex: 'bondCode',
      key: 'bondCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '债券名称',
      dataIndex: 'bondName',
      key: 'bondName',
      width: 200,
      ellipsis: true
    },
    {
      title: '结算币种',
      dataIndex: 'settleCurrency',
      key: 'settleCurrency',
      width: 100,
      ellipsis: true
    },
    {
      title: '净价(元)',
      dataIndex: 'netPrice',
      key: 'netPrice',
      width: 150,
      ellipsis: true
    },
    {
      title: '全价(元)',
      dataIndex: 'dirtyPrice',
      key: 'dirtyPrice',
      width: 150,
      ellipsis: true
    },
    {
      title: '应计利息(元)',
      dataIndex: 'accruedInterest',
      key: 'accruedInterest',
      width: 150,
      ellipsis: true
    },
    {
      title: '券面总额(万元)',
      dataIndex: 'faceValue',
      key: 'faceValue',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易金额(元)',
      dataIndex: 'tradeAmount',
      key: 'tradeAmount',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算金额(元)',
      dataIndex: 'settleAmount',
      key: 'settleAmount',
      width: 150,
      ellipsis: true
    },
    {
      title: '应计利息总额(元)',
      dataIndex: 'totalAccruedInterest',
      key: 'totalAccruedInterest',
      width: 150,
      ellipsis: true
    },
    {
      title: '交易费用(元)',
      dataIndex: 'tradeFee',
      key: 'tradeFee',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算费用(元)',
      dataIndex: 'settleFee',
      key: 'settleFee',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算日',
      dataIndex: 'settleDate',
      key: 'settleDate',
      width: 150,
      ellipsis: true
    },
    {
      title: '结算方式',
      dataIndex: 'settleTypeName',
      key: 'settleTypeName',
      width: 150,
      ellipsis: true
    },
    {
      title: '买入方产品代码',
      dataIndex: 'buyerProductCode',
      key: 'buyerProductCode',
      width: 200,
      ellipsis: true
    },
    {
      title: '卖出方产品代码',
      dataIndex: 'sellerProductCode',
      key: 'sellerProductCode',
      width: 200,
      ellipsis: true
    }
  ],

  /** 回显列表数据 */
  previewList: {
    list: [],
    total: 0
  }
};
