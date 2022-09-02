import React, { PureComponent } from 'react';
import { Fragment } from 'react';

// *****流程节点控制显示******
// 大于7个节点才进行控制、缩略，小于等于7个节点则全部显示。
// 算法：当前进行的节点先向后匹配2个空闲节点，如果没有节点或节点长度小于2，则向前匹配2个节点

class FlowNode extends PureComponent {
  state = {
    firstVisible: false,
    endVisible: false
  };
  changeFlag = type => {
    this.setState({ [type]: true });
  };

  // 获取节点的当前执行节点位置(初始设置为-1,避免没有任何节点在执行)
  getCurNode = data => {
    let n = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].handled) {
        n = i;
      }
    }
    return n;
  };

  //根据节点的handledValue值判断li的类名状态
  setNodeColor = data => {
    let a = null,
      b = '';
    if (data == 1) {
      a = 'active';
      b = '成功';
    } else if (data == 2) {
      a = 'error';
      b = '失败';
    } else if (data == 3) {
      a = 'handle';
      b = '执行中';
    }
    return { className: a, title: b };
  };

  render() {
    const { data } = this.props;
    if (!data) {
      return;
    }
    let allArr = data;
    let len = allArr.length;
    let cur = this.getCurNode(data);
    const _this = this;
    return (
      <>
        <ul className="flows">
          {len > 7
            ? allArr.map((item, index) => {
                let end = cur + 2; //向后匹配
                let start = cur - 1; //向前匹配
                let deep = len - cur;
                if (index == 0) {
                  //向前匹配时，当前节点的前面有至少两个节点时，显示省略，否则不显示
                  if (start > 0) {
                    let hidList = allArr.map((e, i) => {
                      if (i > 0 && i <= start) {
                        //构造出原本是省略的节点(当前节点在最后3个时，返回空)
                        if (deep < 2 && i >= cur - 2) {
                          return null;
                        } else if (deep >= 2 && i >= cur - 1 && len - cur < 4) {
                          return null;
                        } else {
                          return (
                            <li key={e.sort} {..._this.setNodeColor(e.handledValue)}>
                              {e.flowName}
                            </li>
                          );
                        }
                      }
                    });
                    return (
                      <Fragment key={item.sort}>
                        <li key={item.sort} {..._this.setNodeColor(item.handledValue)}>
                          {item.flowName}
                        </li>
                        {_this.state.firstVisible ? (
                          hidList
                        ) : (
                          <li
                            key="b"
                            className="active"
                            onClick={() => _this.changeFlag('firstVisible')}
                          >
                            ●●●●●●
                          </li>
                        )}
                      </Fragment>
                    );
                  } else {
                    return (
                      <li key={item.sort} {..._this.setNodeColor(item.handledValue)}>
                        {item.flowName}
                      </li>
                    );
                  }
                } else if (index == cur || (index > cur && index <= end)) {
                  //匹配当前节点||
                  //匹配当前节点向后延伸2个的节点
                  return (
                    <li key={item.sort} {..._this.setNodeColor(item.handledValue)}>
                      {item.flowName}
                    </li>
                  );
                } else if (deep <= 3 && index < cur) {
                  if ((deep < 2 && index >= cur - 2) || (deep >= 2 && index >= cur - 1)) {
                    //当前节点在最后2个时，展示靠近的前2个已完成的节点||
                    //当前节点在第三个时，只展示靠近的前一个已完成节点
                    return (
                      <li key={item.sort} {..._this.setNodeColor(item.handledValue)}>
                        {item.flowName}
                      </li>
                    );
                  }
                } else if (index == len - 1) {
                  //匹配最后一个节点,只要未进行的节点少于四个，则全部显示，不要省略
                  let hidList = allArr.map((e, i) => {
                    if (i > end && i < index) {
                      //构造出原本是省略的节点
                      return (
                        <li key={e.sort} {..._this.setNodeColor(e.handledValue)}>
                          {e.flowName}
                        </li>
                      );
                    }
                  });
                  return deep > 4 ? (
                    <Fragment key={item.sort}>
                      {_this.state.endVisible ? (
                        hidList
                      ) : (
                        <li key="a" onClick={() => _this.changeFlag('endVisible')}>
                          ●●●●●●
                        </li>
                      )}
                      <li key={item.sort} {..._this.setNodeColor(item.handledValue)}>
                        {item.flowName}
                      </li>
                    </Fragment>
                  ) : (
                    <li key={item.sort} {..._this.setNodeColor(item.handledValue)}>
                      {item.flowName}
                    </li>
                  );
                }
              })
            : allArr.map((item, index) => {
                return (
                  <li key={item.sort} {..._this.setNodeColor(item.handledValue)}>
                    {item.flowName}
                  </li>
                );
              })}
        </ul>
      </>
    );
  }
}

export default FlowNode;
