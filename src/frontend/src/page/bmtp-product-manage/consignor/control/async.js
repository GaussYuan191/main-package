import { isCheckTrue } from 'yss-biz/utils/util/tools';
import { page, filterNullElement } from 'yss-biz';
import { message } from 'antd';
import {
  getClientData,
  addClient,
  updateClient,
  deleteClient,
  batchCheckId,
  batchCheckClient,
  batchUnCheckId,
  batchUnCheckClient,
  getDocument,
  getEnclosure,
  getPublisherDownData,
  uploadDocumentAdd,
  addEnclosure,
  addContract,
  addBatchContract,
  deleteEnclosure,
  updateEnclosure,
  getClientDownData
} from '../serices/index';
export default {
  /**加载管理人与关联信息 包括管理人的表格数据*******/
  async queryClinetMount(state, { params }) {
    try {
      let result = await getClientData(params);
      const { data, msg, winRspType } = result;
      if (winRspType != 'SUCC') {
        message.error(`异常：${msg}`);
        return;
      }
      // let activePan = state.get('activePan');
      const { list } = data;
      list.total = data.total; //挂摘元素请求的总和条目
      // let query = {
      //   ...page,
      //   subjectId: list[0]['id'], //关联主体Id
      //   subjectType: 2, //所属主体类型（1-产品,2-委托人）
      //   type: activePan == 'enclosure' ? 0 : 7 //文档类型(包括：0-全部类型（无合同）、1-营业执照、2-金融业务许可证、3-法人证件、4-人行备案证明、5-尽调报告、6-风险揭示书、7-委托人托管合同、8-产品托管合同、9-其他；)
      // };
      // let result2 = await getDocument(query);
      // const documentList = result2.data.list;

      if (winRspType == 'SUCC') {
        // if (activePan == 'enclosure') {
        return (
          state
            .set('consignorList', list)
            // .set('documentList', documentList)
            // .set('subjectId', list[0]['id'])
            .set('consignored', list[0])
        );
        // return state.merge({
        //   'consignorList': list,
        //   documentList,
        //   subjectId: list[0]["id"],
        //   consignored: list[0]
        // });
        // } else {
        //   return state.merge({
        //     consignorList: list,
        //     contractList: documentList,
        //     subjectId: list[0]['id'],
        //     consignored: list[0]
        //   });
        // }
      }
    } catch (e) {
      // //异常情况下只加载管理人
      // let result = await getClientData(params);
      // const { data } = result;
      // const { list } = data;
      // return state.merge({
      //   consignorList: [],
      //   contractList: [],
      //   documentList: []
      // });
      message.error(e);
    }
  },

  /**管理人查询*******/
  async httpGetClientList(state, { params }, { getState }) {
    try {
      let result = await getClientData(params);
      const { data, winRspType } = result;
      if (winRspType != 'SUCC') {
        return;
      }

      const { list } = data;
      let subjectId = list[0]['id'];
      state = getState();

      return state.merge({
        consignorList: list,
        subjectId
      });
    } catch (e) {
      message.error(e);
    }
  },
  // 获取管理人下拉菜单的值
  async httpGetConsignorDownList(state) {
    try {
      let result = await getClientDownData();
      const { winRspType, data, msg } = result;
      if (winRspType == 'SUCC') {
        return state.set('consignorDownList', data);
      } else {
        message.error(`异常：${msg}`);
      }
    } catch (e) {
      message.error(`异常：${e}`);
    }
  },

  /***增加管理人*******/
  async httpAddClientRow(state, { params }, { mutations, getState }) {
    let result = await addClient(params);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      let query = getState().get('queryConsignorElement').toJS();
      let newParams = {
        ...query
      };
      await mutations.asyncHttpGetClientList({ params: filterNullElement(newParams) });
    } else {
      message.error(msg || '数据错误');
    }
  },

  /***修改管理人*******/
  async httpUpDateClientRow(state, { params }, { mutations, getState }) {
    let result = await updateClient(params);
    const { msg, winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      let query = getState().get('queryConsignorElement').toJS();
      let newParams = {
        ...query
      };
      await mutations.asyncHttpGetClientList({ params: filterNullElement(newParams) });
    } else {
      message.error(msg || '数据错误');
    }
  },

  /***删除管理人*******/
  async httpDeleteClientRow(state, { params }, { mutations, getState }) {
    let id = params.id;
    let result = await deleteClient(id);
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      let query = getState().get('queryConsignorElement').toJS();
      let newParams = {
        ...query
      };
      await mutations.asyncHttpGetClientList({ params: filterNullElement(newParams) });
    } else {
      message.error(msg || '数据错误');
    }
  },
  /***批量审核********/
  async httpBatchexamine(state, { params, callback }, { mutations, getState }) {
    //判断审核是否有勾选 1：审核,2：是未审核;
    if (!params.length) {
      message.error('请选择要进行【审核】的数据！');
      return;
    }
    let stringTtpe = isCheckTrue(params, '1');
    if (typeof stringTtpe == 'boolean') {
      message.error('选择项存在审核人');
      return;
    }
    let result = {};
    if (params.length === 1) {
      result = await batchCheckId(stringTtpe[0]);
    } else {
      result = await batchCheckClient(stringTtpe);
    }

    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      message.success(msg);
      let query = getState().get('queryConsignorElement').toJS();
      let newParams = {
        ...query
      };
      await mutations.asyncHttpGetClientList({ params: filterNullElement(newParams) });
      //前端局部刷新页面
      // let newState = batchexamine(stringTtpe, state, "consignorList", "1")

      // return state.merge({
      //   "consignorList": newState
      // })
      callback && callback();
    } else {
      message.error(msg || '数据错误');
    }
  },
  // /***存储之前开发的逻辑 批量审核********/
  // async httpBatchexamine(state, { params }, { mutations, getState }) {
  //   //判断审核是否有勾选 1：审核,2：是未审核;
  //   if (!params.length) {
  //     message.error('是否要将选中的记录执行【审核】操作？');
  //     return;
  //   }
  //   let stringTtpe = isCheckTrue(params, '1');
  //   if (typeof stringTtpe == 'boolean') {
  //     message.error('选择项存在审核人');
  //     return;
  //   }

  //   let result = await batchCheckClient(stringTtpe);

  //   const { winRspType, msg } = result;
  //   if (winRspType == 'SUCC') {
  //     message.success(msg);
  //     let query = getState().get('queryConsignorElement').toJS();
  //     let newParams = {
  //       ...query
  //     };
  //     mutations.asyncHttpGetClientList({ params: filterNullElement(newParams) });
  //     //前端局部刷新页面
  //     // let newState = batchexamine(stringTtpe, state, "consignorList", "1")

  //     // return state.merge({
  //     //   "consignorList": newState
  //     // })
  //   }
  // },

  /***批量反审核********/
  async httpUncheckAccount(state, { params, callback }, { mutations, getState }) {
    //判断审核是否有勾选  1：审核,2：是未审核;
    if (!params.length) {
      message.error('请选择要进行【反审核】的数据！');
      return;
    }
    let stringTtpe = isCheckTrue(params, '2');
    if (typeof stringTtpe == 'boolean') {
      message.error('选择项存在反审核人');
      return;
    }
    let result = {};
    if (params.length === 1) {
      result = await batchUnCheckId(stringTtpe[0]);
    } else {
      result = await batchUnCheckClient(stringTtpe);
    }
    const { winRspType, msg } = result;
    if (winRspType == 'SUCC') {
      // //前端局部刷新页面
      // let newState = batchexamine(stringTtpe, state, "consignorList", "2")
      // message.success(msg);
      // return state.merge({
      //   "consignorList": newState
      // })
      message.success(msg);
      let query = getState().get('queryConsignorElement').toJS();
      let newParams = {
        ...query
      };
      await mutations.asyncHttpGetClientList({ params: filterNullElement(newParams) });
      callback && callback();
    } else {
      message.error(msg || '数据错误');
    }
  },

  // /***存贮之前开发写的逻辑批量反审核********/
  // async httpUncheckAccount(state, { params }, { mutations, getState }) {
  //   //判断审核是否有勾选  1：审核,2：是未审核;
  //   if (!params.length) {
  //     message.error('是否要将选中的记录执行【反审核】操作？');
  //     return;
  //   }
  //   let stringTtpe = isCheckTrue(params, '2');
  //   if (typeof stringTtpe == 'boolean') {
  //     message.error('选择项存在反审核人');
  //     return;
  //   }
  //   let result = await batchUnCheckClient(stringTtpe);
  //   const { winRspType, msg } = result;
  //   if (winRspType == 'SUCC') {
  //     // //前端局部刷新页面
  //     // let newState = batchexamine(stringTtpe, state, "consignorList", "2")
  //     // message.success(msg);
  //     // return state.merge({
  //     //   "consignorList": newState
  //     // })
  //     message.success(msg);
  //     let query = getState().get('queryConsignorElement').toJS();
  //     let newParams = {
  //       ...query
  //     };
  //     mutations.asyncHttpGetClientList({ params: filterNullElement(newParams) });
  //   }
  // },

  /**文档查询*******/
  async httpDocument(state, { params }) {
    try {
      let result = await getDocument(params);
      const { data, winRspType } = result;
      if (winRspType != 'SUCC') {
        return;
      }
      const { list } = data;
      return state.set('documentList', list);
    } catch (e) {
      message.error('请求错误');
    }
  },

  /**合同查询*******/
  async httpGetContract(state, { params }, { getState }) {
    try {
      let query = {
        ...params,
        type: 7, //7代表合同类型
        subjectType: 2 // 委托人
      };
      let result = await getDocument(query);
      const { winRspType } = result;

      if (winRspType != 'SUCC') {
        return;
      }
      state = getState();
      return state
        .set('contractList', result.data.list)
        .setIn(['isOpenFormModal2', 'status'], false);
    } catch (e) {
      message.error('请求错误');
    }
  },

  /***管理人机构下拉列表查询07:是投资顾问。04:是资产管理人********/
  async httpGetClientDownData(state) {
    try {
      let result = await getPublisherDownData({
        qualifications: ['04']
      });
      const { winRspType, data } = result;
      if (winRspType == 'SUCC') {
        return state.set('organizationNamelList', data || []);
      }
    } catch (e) {}
  },

  /***母公司下拉列表查询********/
  async httpParentCode(state) {
    try {
      let result = await getPublisherDownData({});
      const { winRspType, data } = result;
      if (winRspType == 'SUCC') {
        return state.set('parentNameDownList', data || []);
      }
    } catch (e) {}
  },

  /**附件查询*******/
  async httpGetEnclosure(state, { params }, { getState }) {
    try {
      let result = await getEnclosure(params);
      const { data, winRspType } = result;
      if (winRspType != 'SUCC') {
        return;
      }
      const { list } = data;
      state = getState();
      return state.set('enclosureList', list);
    } catch (e) {
      message.error('请求错误');
    }
  },

  /***添加已有文档的附件*******/
  async httpAddEnclosure(state, { params }) {
    let result = await addEnclosure(params);
    const { winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success('文件添加成功');
    } else {
      message.error('文件添加失败');
    }
  },

  /***创建文档并且附件添加*******/
  async httpUploadDocumentAdd(state, { params }, { mutations }) {
    let result = await uploadDocumentAdd(params);
    const { winRspType } = result;
    if (winRspType == 'SUCC') {
      let query = {
        subjectId: params.subjectId,
        subjectType: params.subjectType,
        type: params.type,
        ...page
      };
      await mutations.asyncHttpGetEnclosure({ params: query });
    }
  },

  /***删除已有文档的附件*******/
  async httpDeleteEnclosure(state, { params }, { mutations }) {
    let id = params.id;
    let result = await deleteEnclosure(id, {});
    const { winRspType } = result;
    if (winRspType == 'SUCC') {
      //查询文档
      message.success('删除成功');
      let query = {
        subjectId: params.subjectId,
        subjectType: params.subjectType,
        type: params.type,
        ...page
      };
      //刷新附件列表
      await mutations.asyncHttpGetEnclosure({ params: query });
    }
  },

  /***应用文件*******/
  async httpUpdate(state, { params }, { mutations }) {
    let result = await updateEnclosure(params[0].id);
    const { winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success('应用成功');
    } else {
      message.error('应用失败');
    }
  },

  /*添加合同**/
  async httpAddContract(state, { params }, { getState, mutations }) {
    let result = await addContract(params);
    const { winRspType } = result;
    if (winRspType == 'SUCC') {
      let query = {
        subjectId: getState().get('subjectId'),
        type: 7, //7代表合同类型
        subjectType: 2, // 委托人
        ...page
      };
      mutations.asyncHttpGetContract({ params: query });
    }
  },

  /*添加合同批量**/
  async httpAddBatchContract(state, { params }) {
    let result = await addBatchContract(params);
    const { winRspType } = result;
    if (winRspType == 'SUCC') {
      message.success('添加成功');
    } else {
      message.error('添加失败');
    }
  }
};
