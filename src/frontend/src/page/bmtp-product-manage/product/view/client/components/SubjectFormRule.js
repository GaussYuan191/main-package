import React, { PureComponent } from 'react';
import { message } from 'antd';
import { setFieldsObject, filterNullElement, NormalForm } from 'yss-biz';
import moment from 'moment';
const { mapOption } = NormalForm;

export const formLayout_second = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 14
  }
};

class SubjectFormRule extends PureComponent {
  render() {
    const { subjectListDown, changeConsignorSubjectListDown, consignorDownRelation } = this.props;
    let formItems = [
      {
        name: 'code',
        label: '机构简称',
        type: 'Select',
        rules: [
          {
            required: true,
            message: '机构简称不能为空'
          }
        ],
        options: mapOption(subjectListDown, 'shortNameCn', 'publisherCode'),
        props: {
          placeholder: '请选择机构简称',
          onChange: (value, option) => {
            changeConsignorSubjectListDown({ value, option });
          }
        }
      },
      {
        label: '主体名称',
        type: 'Input',
        unBind: true,
        props: {
          placeholder: '主体名称自动匹配',
          value: consignorDownRelation.fullNameCn,
          disabled: true
        }
      },
      {
        label: '机构代码',
        type: 'Input',
        unBind: true,
        props: {
          placeholder: '机构代码自动匹配',
          value: consignorDownRelation.publisherCode,
          disabled: true
        }
      }
    ];
    return (
      <NormalForm
        refs={ref => (this.createSubject = ref)}
        labelSize="6em"
        lineOf={3}
        marginRight="40px"
        formItem={formItems}
      />
    );
  }

  async componentDidMount() {
    const { isOpenFormModal, subjected, asyncHttpGetPublisherDownData } = this.props;
    this.props.onRef(this);
    //表单初始化
    this.createSubject.setValues({
      ...setFieldsObject(subjected, isOpenFormModal.type),
      establishDate:
        isOpenFormModal.type == 'add' ? '' : moment(subjected.establishDate, 'YYYY-MM-DD')
    });
    await asyncHttpGetPublisherDownData({});
  }
  // //点击确定进行增加修改操作
  handleSubmit(e) {
    const {
      asyncHttpAddSubject,
      asyncHttpDeleteSubject,
      openFormModal,
      isOpenFormModal,
      consignorDownRelation,
      productInfo
    } = this.props;
    e.preventDefault();
    this.createSubject.props.form.validateFields((err, values) => {
      if (!err) {
        const action = {
          add: asyncHttpAddSubject,
          delete: asyncHttpDeleteSubject
        };
        let params = {
          productId: productInfo.productId,
          subjectCode: consignorDownRelation.publisherCode
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

export default SubjectFormRule;
