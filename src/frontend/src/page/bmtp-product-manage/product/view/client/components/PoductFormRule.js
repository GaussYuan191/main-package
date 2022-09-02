import React, { PureComponent } from 'react';
import { message } from 'antd';
import { setFieldsObject, filterNullElement, NormalForm, selectPageRequest } from 'yss-biz';
import moment from 'moment';
class PoductFormRule extends PureComponent {
  state = {
    refManagerCode: '', //所属管理人代码
    refManagerName: '', //所属管理人名称
    refTrusteeCode: '', //所属托管人代码
    refTrusteeName: '', //所属托管人名称
    // productTypeCode: '', //产品类型代码
    productTypeName: '' //产品类型名称
  };
  render() {
    const { isOpenFormModal } = this.props;
    const disabled = isOpenFormModal.type === 'delete' || isOpenFormModal.type === 'see';
    const formItems = [
      {
        name: 'productCode',
        label: '产品代码',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '产品代码不能为空'
          },
          { pattern: /^.{0,50}$/, message: '允许输入最大长度50' }
        ],
        props: {
          placeholder: '请输入产品代码',
          disabled: isOpenFormModal.type != 'add'
        }
      },
      {
        name: 'productName',
        label: '产品全称',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '产品全称不能为空'
          },
          { pattern: /^.{0,100}$/, message: '允许输入最大长度100' }
        ],
        props: {
          placeholder: '请输入产品全称',
          disabled
        }
      },
      {
        name: 'productShortName',
        label: '产品简称',
        type: 'Input',
        rules: [{ pattern: /^.{0,50}$/, message: '允许输入最大长度50' }],
        props: {
          placeholder: '请输入产品简称',
          disabled
        }
      },
      {
        name: 'productType',
        label: '产品类型',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '产品类型不能为空'
          }
        ],
        props: {
          placeholder: '请选择产品类型',
          disabled,
          getDics: 1030025,
          onChange: (value, option) => {
            this.setState({ productTypeName: !!option ? option.props.children : '' });
          }
        }
      },
      {
        name: 'assetType',
        label: '资产类型',
        type: 'Select',
        props: {
          disabled,
          placeholder: '请选择资产类型',
          getDics: 1030026
        }
      },
      {
        name: 'operatingMode',
        label: '运作方式',
        type: 'Select',
        props: {
          disabled,
          placeholder: '请输入运作方式',
          getDics: 1030017
        }
      },
      {
        name: 'productCurrencyType',
        label: '产品币种',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '币种不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择币种',
          getDics: 1030005
        }
      },
      {
        name: 'productStatus',
        label: '产品状态',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '产品状态不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择产品状态',
          getDics: 1030021
        }
      },
      {
        name: 'refManagerName',
        label: '所属管理人',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '所属管理人不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择所属管理人',
          configDics: selectPageRequest,
          type: 'consignor',
          onChange: (value, option) => {
            this.setState({
              refManagerCode: !!value ? value : '',
              refManagerName: !!option ? option.props.children : ''
            });
          }
        }
      },
      {
        name: 'refTrusteeName',
        label: '所属托管人',
        type: 'Input',
        rules: [
          {
            required: true,
            message: '所属托管人不能为空'
          }
        ],
        props: {
          disabled: true,
          placeholder: '请输入所属托管人',
          // getDics: 1030201,
          // onChange: (value, option) => {
          //   this.setState({
          //     refTrusteeCode: !!value ? value : '',
          //     refTrusteeName: !!option ? option.props.children : ''
          //   });
          // },
          initialValue: this.state.refTrusteeName
        }
      },
      {
        isLine: true
      },
      {
        name: 'establishDate',
        label: '成立日期',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '成立日期不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择成立日期',
          format: 'YYYY-MM-DD'
        }
      },
      {
        name: 'expireDate',
        label: '到期日期',
        type: 'DatePicker',
        rules: [
          {
            required: true,
            message: '到期日期不能为空'
          }
        ],
        props: {
          disabled,
          placeholder: '请选择到期日期',
          format: 'YYYY-MM-DD'
        }
      },
      {
        name: 'clearDate',
        label: '清算日期',
        type: 'DatePicker',
        props: {
          disabled,
          placeholder: '请选择清算日期',
          format: 'YYYY-MM-DD'
        }
      },
      {
        name: 'closeAccountDate',
        label: '关账日期',
        type: 'DatePicker',
        props: {
          disabled,
          placeholder: '请选择关账日期',
          format: 'YYYY-MM-DD'
        }
      }
    ];
    return (
      <NormalForm
        refs={ref => (this.createProduct = ref)}
        labelSize="6em"
        lineOf={3}
        marginRight="40px"
        formItem={formItems}
      />
    );
  }

  componentDidMount() {
    this.props.onRef(this);

    const { asyncHttpGetTrusteeName } = this.props;
    // 获取所属托管人数据
    asyncHttpGetTrusteeName().then(() => {
      const { isOpenFormModal, changeProductRowed, refTrusteeNameObj } = this.props;
      this.setState(
        {
          refTrusteeName: refTrusteeNameObj.name,
          refTrusteeCode: refTrusteeNameObj.value
        },
        () => {
          //表单初始化
          this.createProduct.setValues({
            ...setFieldsObject(changeProductRowed, isOpenFormModal.type),
            establishDate:
              isOpenFormModal.type == 'add'
                ? ''
                : changeProductRowed.establishDate
                ? moment(changeProductRowed.establishDate, 'YYYY-MM-DD')
                : '',
            expireDate:
              isOpenFormModal.type == 'add'
                ? ''
                : changeProductRowed.expireDate
                ? moment(changeProductRowed.expireDate, 'YYYY-MM-DD')
                : '',
            clearDate:
              isOpenFormModal.type == 'add'
                ? ''
                : changeProductRowed.clearDate
                ? moment(changeProductRowed.clearDate, 'YYYY-MM-DD')
                : '',
            closeAccountDate:
              isOpenFormModal.type == 'add'
                ? ''
                : changeProductRowed.closeAccountDate
                ? moment(changeProductRowed.closeAccountDate, 'YYYY-MM-DD')
                : ''
          });
        }
      );
    });
  }

  // //点击确定进行增加修改操作
  handleSubmit(e) {
    const {
      asyncHttpUpDateProduct,
      asyncHttpDeleteProduct,
      asyncHttpAddProduct,
      changeProductRowed,
      openFormModal,
      isOpenFormModal
    } = this.props;
    e.preventDefault();
    if (isOpenFormModal.type === 'delete') {
      asyncHttpDeleteProduct({ params: changeProductRowed }).then(() => {
        openFormModal({ type: 'add', status: false });
      });
    } else {
      this.createProduct.props.form.validateFields((err, values) => {
        if (!err) {
          const action = {
            add: asyncHttpAddProduct,
            update: asyncHttpUpDateProduct
          };

          let params = {
            ...values,
            establishDate: values['establishDate'].format('YYYY-MM-DD'),
            expireDate: values['expireDate'].format('YYYY-MM-DD'),
            clearDate: !!values['clearDate'] ? values['clearDate'].format('YYYY-MM-DD') : '',
            closeAccountDate: !!values['closeAccountDate']
              ? values['closeAccountDate'].format('YYYY-MM-DD')
              : '',
            refManagerCode: this.state.refManagerCode || changeProductRowed.refManagerCode,
            refTrusteeCode: this.state.refTrusteeCode || changeProductRowed.refTrusteeCode,
            refManagerName: this.state.refManagerName || changeProductRowed.refManagerName,
            refTrusteeName: this.state.refTrusteeName || changeProductRowed.refTrusteeName,
            id: isOpenFormModal.type != 'add' ? changeProductRowed.id : '',
            productTypeName: this.state.productTypeName || changeProductRowed.productTypeName
          };

          action[isOpenFormModal.type]({
            params: filterNullElement(params)
          }).then(() => {
            openFormModal({ type: 'add', status: false });
          });
        } else {
          message.error('请按要求填写信息');
        }
      });
    }
  }
}
export default PoductFormRule;
