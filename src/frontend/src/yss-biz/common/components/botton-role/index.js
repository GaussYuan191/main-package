import React from 'react';
import { Button, Icon } from 'antd';
import { icons } from 'yss-biz';
const ButtonGroup = Button.Group;

/*********匹配对应的按钮权限********** */
const roleButton = (ButtonType, authData) => {
  let btns = [];

  if (authData.children || authData.allFunc) {
    ButtonType.forEach(item => {
      //无权限控制,则一直显示的按钮，noAuth标识无权限的按钮
      if (item.noAuth && !authData.allFunc) {
        item['display'] = 'inline-block';
        btns.push(item);
        return;
      }
      //所有权限：allFunc=true 超级管理员
      if (authData.allFunc) {
        item['allFunc'] = 'ALL';
        item['display'] = 'inline-block';
        btns.push(item);
        return;
      }
      //children有值时，普通用户；
      (authData.children || []).some(val => {
        if (item.name == val['funcName']) {
          item['funcType'] = val.funcType;
          item['display'] = 'inline-block';
          btns.push(item);
          return true; // 结束遍历防止权限重复时渲染重复按钮
        }
      });
    });
  } else {
    //当页面权限不存在的时，按钮全部不显示
    // ButtonType.map(item => {
    //   item['display'] = 'none';
    //   btns.push(item);
    // });
    btns = [];
  }

  return btns;
};

/****ButtonGroup权限按钮组件****/
export const withRoleBotton = (ButtonType, authData = {}) => {
  let btns = roleButton(ButtonType, authData);
  return (
    <ButtonGroup style={{ marginBottom: '6px' }}>
      {btns.map((item, index) => {
        return item.name != '导出' ? (
          <Button
            // func-type={item['funcType'] || item['allFunc'] || ''}
            onClick={item.func ? item.func : null}
            key={item.name}
            style={{ cursor: 'pointer', display: item.display }}
          >
            {<Icon type={item.icon ? item.icon : icons[item.name]} />}
            {item.name}
            <span
              style={{
                position: 'relative',
                left: '17px',
                // color: index == btns.length - 1 ? 'transparent' : 'transparent'
                color: 'transparent'
              }}
            >
              |
            </span>
            {item.children && item.children.length ? (
              <div className="buttonChildren">
                {item.children.map(child => {
                  return (
                    <div
                      onClick={child.func ? child.func : null}
                      key={child.name}
                      className="buttonChildrenItem"
                    >
                      {child.name}
                    </div>
                  );
                })}
              </div>
            ) : (
              ''
            )}
          </Button>
        ) : (
          <Button
            // className={`exportBtn ${btns.length > 1 ? 'moreBtn' : ''}`}
            //func-type={item['funcType'] || item['allFunc'] || ''}
            onClick={item.func ? item.func : null}
            key={item.name}
            style={{
              cursor: 'pointer',
              'border-radius': btns.length == 1 ? '16px' : '0 16px 16px 0',
              display: item.display
            }}
          >
            {<Icon type={item.icon ? item.icon : icons[item.name]} />}
            <span style={{ display: 'inline-block', marginLeft: '8px' }}>{item.name}</span>
            <span
              style={{
                position: 'relative',
                left: '17px',
                // color: index == btns.length - 1 ? 'transparent' : 'transparent'
                color: 'transparent'
              }}
            >
              |
            </span>
            {item.children && item.children.length ? (
              <div className="buttonChildren">
                {item.children.map(child => {
                  return (
                    <div
                      onClick={child.func ? child.func : null}
                      key={child.name}
                      className="buttonChildrenItem"
                    >
                      {child.name}
                    </div>
                  );
                })}
              </div>
            ) : (
              ''
            )}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

/****ButtonTableGroup权限按钮组件****/
export const withRoleTableBotton = (ButtonType, authData = {}) => {
  let btns = roleButton(ButtonType, authData);

  return row => {
    return btns.map(item => {
      // 产品相关页面表格的按钮显示受此状态影响, 表格数据无此状态则不影响
      let stateName = row.accountStatus || row.productEnableStatus || row.assetUnitStatus;
      let rowState = stateName === '1' ? '2' : '1';
      if (item.name == '启动' || item.name == '停用' || item.name == '注销') {
        if (
          (item.name === '启动' && stateName == '1') ||
          (item.name === '停用' && stateName == '2')
        ) {
          return '';
        }
        return stateName != '3' ? (
          <Button
            //func-type={item['funcType'] || item['allFunc'] || ''}
            style={{ display: item.display }}
            key={item.name}
            disabled={stateName == '3' ? true : false}
            size="small"
            type="link"
            onClick={e => {
              item.func({
                e,
                row,
                status: item.name == '注销' ? '3' : rowState,
                type: item.type
              });
            }}
          >
            <>
              <Icon type={icons[item.name]} />
              <span>{item.name}</span>
            </>
          </Button>
        ) : (
          ''
        );
      } else {
        return stateName != '3' ? (
          <Button
            //func-type={item['funcType'] || item['allFunc'] || ''}
            style={{ display: item.display }}
            size="small"
            type="link"
            disabled={stateName == '3' ? true : false}
            onClick={e => {
              item.func(e, row);
            }}
            key={item.name}
          >
            {<Icon type={item.icon ? item.icon : icons[item.name]} />}
            <span>{item.name}</span>
          </Button>
        ) : (
          ''
        );
      }
    });
  };
};
