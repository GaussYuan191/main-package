import React from 'react';
import { Row, Col } from 'antd';
import { NormalForm } from 'yss-biz';

/**
 * 数据角色管理 新增/修改对话框表单
 * @props editData 表单数据
 * @props editing 表单状态:新增/编辑
 * @props handleCloseEdit 关闭表单
 * @props ...  用到的lugiaX中的state和mutation
 */
export default class RoleEditForm extends React.Component {
  async componentDidMount() {
    this.props.onRef && this.props.onRef(this);
    if (this.props.editing === 'update') {
      this.clientForm.setValues({ ...this.props.editData });
    }
    await this.props.asyncHttpGetOrgPullDownList();
  }

  render() {
    const { orgPullDownList } = this.props;
    const formItem = [
      {
        name: 'roleCode',
        label: '角色编码',
        type: 'Input',
        props: {
          placeholder: '自动生成',
          disabled: true
        }
      },
      {
        name: 'roleName',
        label: '角色名称',
        type: 'Input',
        props: {
          placeholder: '请输入角色名称'
        },
        rules: [{ required: true, message: '角色名称不能为空' }]
      },
      {
        name: 'orgCode',
        label: '所属机构',
        type: 'TreeSelect',
        props: {
          placeholder: '请选择机构',
          dropdownStyle: { maxHeight: 400, overflow: 'auto' },
          treeData: orgPullDownList,
          treeNodeFilterProp: 'orgCode',
          treeNodeLabelProp: 'orgName'
        },
        rules: [{ required: true, message: '所属机构不能为空' }]
      },
      {
        name: 'remark',
        label: '备注',
        type: 'TextArea',
        itemSize: '100% - 8em',
        props: {
          autoSize: { minRows: 2, maxRows: 6 }
        }
      }
    ];
    return (
      <NormalForm
        labelSize="8em"
        lineOf={2}
        formItem={formItem}
        refs={ref => (this.clientForm = ref)}
      />
    );
  }

  handleSubmit() {
    const { asyncHttpAddDataRole, asyncHttpUpdateDataRole, editing, editData } = this.props;
    const submitFunc = {
      add: asyncHttpAddDataRole,
      update: asyncHttpUpdateDataRole
    };
    const form = this.clientForm.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let params = {
        roleName: values.roleName,
        remark: values.remark
      };
      if (editing === 'add') {
        params.orgRoleAddReqVO = [
          {
            orgCode: values.orgCode
          }
        ];
      } else {
        params.id = editData.id;
        params.roleCode = editData.roleCode;
        params.orgRoleUpdateListReqVO = [
          {
            orgCode: values.orgCode
          }
        ];
      }

      submitFunc[editing](params).then(() => {
        this.props.handleCloseEdit();
      });
    });
  }
}
