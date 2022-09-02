/**
 * @cc
 * 基础切换主题组件
 *  -
 */
import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { setStorage, getStorage, urlHashToJson } from 'yss-biz';
import { each } from 'lodash';
import './index.less';
const { source } = urlHashToJson();
const themeArr = [
  { key: 'sofaTheme', name: '浅色' },
  { key: 'darkStyle', name: '暗深色' }
  // { key: 'orangeTheme', name: '橙色' }
];
const themeTitle = '切换主题';
class ChangeTheme extends Component {
  state = {
    themeRightWidth: 300
  };

  componentDidMount() {
    this.getThemeClass();

    this.changeInitFrameClass();

    this.changeIframeClass();

    //计算user-content中的div宽度
    this.timer = setTimeout(() => {
      this.calcWidth();
    }, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  //计算宽度
  calcWidth = () => {
    const userContentId = document.getElementById('userContent');
    const userContentWidth = userContentId && userContentId.offsetWidth + 15;
    this.setState({ themeRightWidth: userContentWidth });
  };

  /*
   * 用来隐藏页面加载完成时iframe内部的'切换主题'：此问题不是最优的方法
   */
  changeInitFrameClass = () => {
    //解决IE浏览器/谷歌中偶尔在登录页面出现切换主题问题
    const hash = window.location.hash;
    if (hash) {
      const pathArr = hash.split("/");
      if (pathArr && pathArr.length) {
        const themeDropId = document.getElementById("themeDrop");
        if (pathArr[1] == 'login') {
          themeDropId.style.display = 'none';
        } else {
          themeDropId.style.display = 'block';
        }
      }
    }
    if (window.frameElement) {
      const bodyDoc = window.frameElement.contentDocument.body;
      const themeDropIframe = bodyDoc.ownerDocument.getElementById('themeDrop');
      themeDropIframe.style.display = 'none';
    }
  };

  /**
   * 更改iframe中body的类名
   */
  changeIframeClass = () => {
    //接受iframe的消息
    window.addEventListener('message', frame => {
      const { data, srcElement } = frame;
      let { type } = data;
      //获取iframe中的body中的commonThemes与themeId
      let bodyIdIframe = srcElement.frameElement.contentDocument.body;
      let themeIdIframe = bodyIdIframe.ownerDocument.getElementById('themeId');
      //获取换肤下拉框的id，隐藏iframe下的“切换主题”
      let themeDropIframe = bodyIdIframe.ownerDocument.getElementById('themeDrop');
      themeDropIframe.style.display = 'none';
      if (type == 'darkStyle') {
        //暗色系
        const delClassNames = ['commonThemes', 'sofaTheme'];
        this.changeTheme(bodyIdIframe, delClassNames, '#0b1431');
        this.changeTheme(themeIdIframe, delClassNames);
      } else if (type == 'sofaTheme') {
        const delClassNames = ['commonThemes', 'darkStyle', 'blue'];
        this.changeTheme(bodyIdIframe, delClassNames, '#fff');
        this.changeTheme(themeIdIframe, delClassNames);
      }
    });
  };

  //页面加载完成时，判断localStorage中是否存在类名
  getThemeClass = () => {
    const classNames = getStorage('portalTheme');
    if (classNames) {
      const commonThemesId = document.getElementById('commonThemes');
      let themeId = document.getElementById('themeId');

      //过滤classNames
      let type = this.filterType(classNames);
      if (type == 'darkStyle') {
        this.changeTheme(commonThemesId, [], '#0b1431');
      } else if (type == 'sofaTheme') {
        this.changeTheme(commonThemesId, [], '#fff');
      }
      this.changeTheme(themeId);
    } else {
      // setStorage('portalTheme', 'commonThemes sofaTheme');
      if (source == 'sofa') {
        //sofa系统默认为浅色
        setStorage('portalTheme', 'commonThemes sofaTheme');
      } else {
        //多级托管默认为暗色系
        setStorage('portalTheme', 'commonThemes darkStyle blue');
      }
      this.getThemeClass();
    }
  };

  //过滤classNames
  filterType = classNames => {
    const arr = classNames.split(' ');
    const filterArr = arr.filter(item => {
      if (item == 'darkStyle') {
        return item;
      } else if (item == 'sofaTheme') {
        return item;
      }
    });
    return filterArr[0];
  };

  //选择颜色触发
  onChangeTheme = val => {
    let type = val.key;
    let commonThemesId = document.getElementById('commonThemes');
    let themeId = document.getElementById('themeId');
    //iframe发送消息
    each(document.body.getElementsByTagName('iframe'), iframe => {
      iframe.contentWindow.postMessage(
        {
          type
        },
        window.location.origin
      );
    });
    if (type === 'darkStyle') {
      //暗色系
      setStorage('portalTheme', `commonThemes ${type} blue`);
      const delClassNames = ['commonThemes', 'sofaTheme'];
      this.changeTheme(commonThemesId, delClassNames);
      this.changeTheme(themeId, delClassNames);
      this.changeIframeClass();
    } else if (type === 'sofaTheme') {
      //浅色系
      setStorage('portalTheme', `commonThemes ${type}`);
      const delClassNames = ['commonThemes', 'darkStyle', 'blue'];
      this.changeTheme(commonThemesId, delClassNames);
      this.changeTheme(themeId, delClassNames);
      this.changeIframeClass();
    }
  };

  /**
   * @param {*} elementId 元素的id
   * @param {Array} delClassNames 移出的类名
   * @param {string} bgColor body背景色
   */
  changeTheme = (elementId, delClassNames = [], bgColor) => {
    const addClassNames = getStorage('portalTheme').split(' ');
    if (bgColor) {
      elementId.style.background = bgColor;
    }
    if (delClassNames && delClassNames.length) {
      for (let j = 0; j < delClassNames.length; j++) {
        elementId.classList.remove(delClassNames[j]);
      }
    }
    for (let i = 0; i < addClassNames.length; i++) {
      elementId.classList.add(addClassNames[i]);
    }
  };

  render() {
    const menu = (
      <Menu onClick={this.onChangeTheme}>
        {themeArr.map(item => (
          <Menu.Item key={item.key}>{item.name}</Menu.Item>
        ))}
      </Menu>
    );
    const authorization = getStorage('Authorization');
    return (
      <div id="themeId">
        <div
          id="themeDrop"
          className={'themeDropdown'}
          style={{ display: authorization ? 'block' : 'none', right: this.state.themeRightWidth }}
        >
          <Dropdown overlay={menu} trigger={['click']}>
            <div onClick={e => e.preventDefault()}>
              {themeTitle}
              <Icon type="down" />
            </div>
          </Dropdown>
        </div>
        {this.props.children}
      </div>
    );
  }
}
export default ChangeTheme;
