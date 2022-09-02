import React, { PureComponent } from 'react';
import { SearchForm } from 'yss-biz';
import {message} from 'antd'
export default class QueryForm extends PureComponent {
  componentWillMount() {
    // this.props.asyncGetParamClass();
    const { asyncGetParamClassDetail,asyncGetParamClass } = this.props;
    asyncGetParamClass().then(() => {
      asyncGetParamClassDetail('paramDetailClass');
    })
  }


  handleParamClassChange = params => {
    this.props.paramChange(params);
    this.props.asyncGetParamClassDetail(params.value);
  };
  handleQuery = () => {
    const queryValues = this.props.systemParamQueryValues;
    this.props.asyncGetTablesDatas({ ...queryValues, ...this.props.paging, reqPageNum: 1 });
    this.props.toEmptySelect();
  };
  render() {
    const {systemParamQueryValues} = this.props;
    const { paramClass, paramDetailClass} = this.props.systemParamQueryList;
    const formItem = [
      {
        name: 'paramClass',
        type: 'Select',
        label: '参数分类',
        options: paramClass,
        props: {
          placeholder: '请选择参数分类',
          onChange: value => {
            if(!value){
              //当清除参数分类的值时，参数明细分类的值也应被清除
              this.props.paramChange({
                stateNames: ['systemParamQueryValues', 'businessTypeDetail'],
                value
              });
            }
            this.handleParamClassChange({
              stateNames: ['systemParamQueryValues', 'businessType'],
              value
            });
          }
        }
      },
      {
        name: 'paramDetailClass',
        labelSize: '6em',
        label: '参数明细分类',
        type: 'Select',
        options: paramDetailClass,
        props: {
          placeholder: '请选择参数明细分类',
          // value:systemParamQueryValues.businessTypeDetail,
          onChange: value => {
            this.props.paramChange({
              stateNames: ['systemParamQueryValues', 'businessTypeDetail'],
              value
            });
          },
          onDropdownVisibleChange: (open) => {
            if(open){
              if(!systemParamQueryValues.businessType){
                message.error("请先选择参数分类");
              }
            }
          }
        }
      },
      {
        name: 'paramName',
        label: '参数名称',
        type: 'Input',
        props: {
          placeholder: '请选输入参数名称',
          onChange: e => {
            this.props.paramChange({
              stateNames: ['systemParamQueryValues', 'parameterName'],
              value: e.target.value
            });
          }
        }
      },
      {
        name: 'auditState',
        label: '审核状态',
        type: 'Select',
        props: {
          getDics: 1030002,
          placeholder: '请选择审核状态',
          onChange: value => {
            this.props.paramChange({
              stateNames: ['systemParamQueryValues', 'checkStatus'],
              value
            });
          }
        }
      }
    ];
    return (
      <SearchForm
        lineOf={3}
        moreTypeModal
        formItem={formItem}
        handleSearch={this.handleQuery}
        handleReset={this.props.handleReset}
      />
    );
  }
}
