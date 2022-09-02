/**
 * 角色管理 table columns
 */

import React from 'react';
import { Checkbox, Icon } from 'antd';

// 表头复选框
class TitleCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.parView = this.props.parView || {};
  }

  onCheckedAll = checked => {
    const { funcType } = this.props;
    const { menuAuthTreeData } = this.parView.state;

    this.parView.setState(
      () => ({
        menuAuthTreeData: this.selectAll(menuAuthTreeData, funcType, checked)
      }),
      () => {
        // 动态列表头复选框存在状态异步问题，需强制刷新
        this.parView.forceUpdate();
      }
    );
  };

  selectAll = (rows, funcType, checked) => {
    rows.forEach(item => {
      item.menuFuncList &&
        item.menuFuncList.forEach(v => {
          if (funcType === 'all' || funcType === v.funcType) {
            v.grantFlag = checked ? '1' : null;
          }
        });

      if (item.children && item.children.length) {
        item.children = this.selectAll(item.children, funcType, checked);
      }
    });

    return rows;
  };

  hasIndeterminate = () => {
    const { checkAllMap } = this.parView;

    let allSize = 0,
      checkedSize = 0;

    Object.keys(checkAllMap).forEach(key => {
      const childCheckInfo = checkAllMap[key] || { all: new Set(), checked: new Set() };

      allSize = allSize + childCheckInfo.all.size;
      checkedSize = checkedSize + childCheckInfo.checked.size;
    });

    return !!checkedSize && checkedSize < allSize;
  };

  render() {
    const { type, funcType } = this.props;
    const { checkAllMap } = this.parView;
    const childCheckInfo = checkAllMap[type] || { all: new Set(), checked: new Set() };

    // if (!this.parView.state.editing) {
    //     return "";
    // }

    const checked =
      !!childCheckInfo.checked.size && childCheckInfo.all.size === childCheckInfo.checked.size;
    let indeterminate =
      !!childCheckInfo.checked.size && childCheckInfo.checked.size < childCheckInfo.all.size;

    if (funcType === 'all') {
      indeterminate = indeterminate || this.hasIndeterminate();
    }

    return (
      <Checkbox
        onChange={e => this.onCheckedAll(e.target.checked)}
        // disabled={!childCheckInfo.all.size}
        disabled={!this.parView.state.editing}
        checked={checked}
        indeterminate={indeterminate}
      />
    );
  }
}

// 其他列表头复选框
class OtherTitleCheckbox extends React.Component {
  onCheckedAll = checked => {
    const { parView } = this.props;
    const { menuAuthTreeData } = parView.state;

    parView.setState(
      () => ({
        menuAuthTreeData: this.selectOtherAll(menuAuthTreeData, checked)
      }),
      () => {
        // 动态列表头复选框存在状态异步问题，需强制刷新
        parView.forceUpdate();
      }
    );
  };

  selectOtherAll = (rows, checked) => {
    const { parView } = this.props;
    const { basicFuncTypeNameList } = parView.state;

    rows.forEach(item => {
      const otherMenuFuncList =
        item.menuFuncList &&
        item.menuFuncList.filter(item => {
          return !basicFuncTypeNameList.includes(item.funcName);
        });

      otherMenuFuncList.forEach(v => {
        v.grantFlag = checked ? '1' : null;
      });

      if (item.children && item.children.length) {
        item.children = this.selectOtherAll(item.children, checked);
      }
    });

    return rows;
  };

  render() {
    const { parView } = this.props;
    const { checkAllMap } = parView;

    // if (!this.parView.state.editing) {
    //     return "";
    // }

    const otherCheckMapInfo = checkAllMap['type_other'] || {
      all: new Set(),
      checked: new Set(),
      indeterminate: new Set()
    };
    const allSize = otherCheckMapInfo.all.size;
    const checkedSize = otherCheckMapInfo.checked.size;
    const hasIndeterminate = !!otherCheckMapInfo.indeterminate.size;

    const checked = !!checkedSize && checkedSize === allSize;
    const indeterminate = hasIndeterminate || (!!checkedSize && checkedSize < allSize);
    return (
      <Checkbox
        onChange={e => this.onCheckedAll(e.target.checked)}
        disabled={!parView.state.editing}
        checked={checked}
        indeterminate={indeterminate}
      />
    );
  }
}

// 内容全选复选框
class AllCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.parView = this.props.parView || {};
  }

  onChecked = checked => {
    const { type, typeKey, record } = this.props;

    const childCheckInfo = this.parView.checkAllMap[type] || { all: new Set(), checked: new Set() };

    record.menuFuncList.forEach(item => {
      if (checked) {
        item.grantFlag = '1';
        childCheckInfo.checked.add(typeKey);
      } else {
        item.grantFlag = null;
        childCheckInfo.checked.delete(typeKey);
      }
    });

    this.parView.setState(
      () => ({
        menuAuthTreeData: this.parView.state.menuAuthTreeData
      }),
      () => {
        // 动态列表头复选框存在状态异步问题，需强制刷新
        this.parView.forceUpdate();
      }
    );
  };

  render() {
    const { type, typeKey, record } = this.props;

    record.menuFuncList = record.menuFuncList || [];

    if (!record.menuFuncList.length) {
      return '';
    }

    const childCheckInfo = this.parView.checkAllMap[type] || { all: new Set(), checked: new Set() };
    const hasAuthList = record.menuFuncList.filter(v => {
      return v.grantFlag === '1';
    });

    const checked = hasAuthList.length === record.menuFuncList.length;
    const indeterminate = !!hasAuthList.length && hasAuthList.length < record.menuFuncList.length;

    // 更新 checkAllMap
    childCheckInfo.all.add(typeKey);
    childCheckInfo.checked[checked ? 'add' : 'delete'](typeKey);

    return (
      <Checkbox
        disabled={!this.parView.state.editing}
        indeterminate={indeterminate}
        checked={checked}
        onChange={e => this.onChecked(e.target.checked)}
      />
    );
  }
}

// 内容复选框
class ChildCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.parView = this.props.parView || {};
  }

  onChecked = checked => {
    const { type, typeKey, record, funcType } = this.props;

    const menuFuncInfo = record.menuFuncList.find(v => {
      return v.funcType === funcType;
    });
    const childCheckInfo = this.parView.checkAllMap[type] || { all: new Set(), checked: new Set() };

    if (checked) {
      menuFuncInfo.grantFlag = '1';
      childCheckInfo.checked.add(typeKey);
    } else {
      menuFuncInfo.grantFlag = null;
      childCheckInfo.checked.delete(typeKey);
    }

    this.parView.setState({
      menuAuthTreeData: this.parView.state.menuAuthTreeData
    });
  };

  render() {
    const { type, typeKey, record, funcType } = this.props;

    record.menuFuncList = record.menuFuncList || [];

    const menuFuncInfo = record.menuFuncList.find(v => {
      return v.funcType === funcType;
    });

    if (!menuFuncInfo) {
      return '';
    }

    const checked = menuFuncInfo.grantFlag === '1';

    // 更新 checkAllMap
    const childCheckInfo = this.parView.checkAllMap[type] || { all: new Set(), checked: new Set() };
    childCheckInfo.all.add(typeKey);
    childCheckInfo.checked[checked ? 'add' : 'delete'](typeKey);

    return (
      <Checkbox
        disabled={!this.parView.state.editing}
        checked={checked}
        onChange={e => this.onChecked(e.target.checked)}
      />
    );
  }
}

// 其他内容复选框组
class OtherChildCheckbox extends React.Component {
  onChange = checkedValue => {
    const { record, parView } = this.props;
    const { basicFuncTypeNameList } = parView.state;
    const { menuFuncList = [] } = record;

    const otherMenuFuncList = menuFuncList.filter(item => {
      return !basicFuncTypeNameList.includes(item.funcName);
    });

    otherMenuFuncList.forEach(item => {
      item.grantFlag = checkedValue.includes(item.funcCode) ? '1' : null;
    });
    parView.setState(
      {
        menuAuthTreeData: parView.state.menuAuthTreeData
      },
      () => {
        // 动态列表头复选框存在状态异步问题，需强制刷新
        parView.forceUpdate();
      }
    );
  };
  render() {
    const { record, parView } = this.props;
    const { basicFuncTypeNameList } = parView.state;
    const { menuFuncList = [], menuCode } = record;

    const otherMenuFuncList = menuFuncList.filter(item => {
      return !basicFuncTypeNameList.includes(item.funcName);
    });
    if (!otherMenuFuncList.length) {
      // 更新 checkAllMap
      const childCheckInfo = parView.checkAllMap['type_other'] || {
        all: new Set(),
        checked: new Set()
      };
      childCheckInfo.all.delete(menuCode);
      childCheckInfo.checked['delete'](menuCode);
      childCheckInfo.indeterminate['delete'](menuCode);
      return null;
    }

    const options = otherMenuFuncList.map(item => {
      return { label: item.funcName, value: item.funcCode };
    });
    const value = otherMenuFuncList.reduce((checkedList, item) => {
      if (item.grantFlag === '1') {
        checkedList.push(item.funcCode);
      }
      return checkedList;
    }, []);

    // 更新 checkAllMap
    const childCheckInfo = parView.checkAllMap['type_other'] || {
      all: new Set(),
      checked: new Set()
    };
    childCheckInfo.all.add(menuCode);
    childCheckInfo.checked[value.length === options.length ? 'add' : 'delete'](menuCode);
    childCheckInfo.indeterminate[value.length && value.length < options.length ? 'add' : 'delete'](
      menuCode
    );

    return (
      <Checkbox.Group
        disabled={!parView.state.editing}
        options={options}
        value={value}
        onChange={this.onChange}
      />
    );
  }
}

export const getMenuTablecols = function (view) {
  // 全选类型
  const selectAllType = 'type_all';
  const cols = [
    {
      title: (
        <div className="table-column-title-tools">
          功能名称
          <Icon
            type={view.state.expandedRowKeys.length ? 'minus-square' : 'plus-square'}
            title={view.state.expandedRowKeys.length ? '全部收起' : '全部展开'}
            onClick={() => view.handleToggleTable()}
          />
        </div>
      ),
      dataIndex: 'menuName',
      key: 'menuName',
      width: 300,
      // fixed: 'left',
      ellipsis: true
    },
    {
      title: (
        <div className="table-column-title-tools">
          <TitleCheckbox type={selectAllType} funcType="all" parView={view} />
          全选/反选
        </div>
      ),
      dataIndex: selectAllType,
      key: selectAllType,
      width: 120,
      // fixed: 'left',
      render: (text, record) => {
        const typeKey = selectAllType + '-' + record.key;

        return (
          <AllCheckbox
            key={typeKey}
            typeKey={typeKey}
            type={selectAllType}
            record={record}
            parView={view}
          />
        );
      }
    }
  ];

  view.state.funcTypeList.forEach(item => {
    const itemType = 'type_' + item.funcType;

    cols.push({
      title: (
        <div className="table-column-title-tools" title={item.funcTypeName}>
          <TitleCheckbox
            {...view.state}
            key={itemType}
            type={itemType}
            funcType={item.funcType}
            parView={view}
          />

          {item.funcTypeName}
        </div>
      ),
      dataIndex: itemType,
      key: itemType,
      width: 100,
      render: (text, record) => {
        const typeKey = itemType + '-' + record.key;

        return (
          <ChildCheckbox
            key={typeKey}
            typeKey={typeKey}
            type={itemType}
            record={record}
            parView={view}
            funcType={item.funcType}
          />
        );
      }
    });
  });

  cols.push({
    title: (
      <div className="table-column-title-tools" title={'其他'}>
        <OtherTitleCheckbox
          {...view.state}
          key={'OTHER'}
          type={'OTHER'}
          funcType={'OTHER'}
          parView={view}
        />
        其他
      </div>
    ),
    dataIndex: 'OTHER',
    key: 'OTHER',
    width: 400,
    render: (text, record, index) => {
      return <OtherChildCheckbox key={record.menuCode} record={record} parView={view} />;
    }
  });

  cols.push({
    title: '',
    dataIndex: 'placeholder',
    key: 'placeholder'
  });
  return cols;
};
