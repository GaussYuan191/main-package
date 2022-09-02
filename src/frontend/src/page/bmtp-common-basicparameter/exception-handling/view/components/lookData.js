import React, { PureComponent } from 'react';
import { message } from 'antd';
import './style.less';

class LookData extends PureComponent {
  componentDidMount() { }

  render() {
    const { lookData, type } = this.props;
    // 接收消息管理、推送消息管理页面，内容字段不一样
    let text = lookData.context ? lookData.context : lookData.content;
    let returnText = lookData.returnValue;
    // 格式化内容，以json对象的方式渲染
    try {
      text = JSON.stringify(JSON.parse(text), null, 4);
      returnText = returnText && JSON.stringify(JSON.parse(returnText), null, 4);
    } catch (e) { }
    return type == 'ExceptionHandling' ? (
      <div className="ModalBox">
        <div className="itemContent" style={{ height: '50px' }}>
          <div className="itemTitle">数据id：</div>
          <div className="itemContent">{lookData.dataId}</div>
        </div>
        <div className="itemContent" style={{ height: '250px' }}>
          <div className="itemTitle">发送数据内容：</div>
          <div className="itemContentBox">{text}</div>
        </div>
        <div className="itemContent" style={{ height: '150px' }}>
          <div className="itemTitle">返回数据内容：</div>
          <div className="itemContentBox">{returnText}</div>
        </div>
      </div>
    ) : (
      <div className="ModalBox">
        <div className="itemContent" style={{ height: '50px' }}>
          <div className="itemTitle">数据类型：</div>
          <div className="itemContent">{lookData.dataTypeName}</div>
        </div>
        <div className="itemContent" style={{ height: '400px' }}>
          <div className="itemTitle">数据内容：</div>
          <div className="itemContentBox">{text}</div>
        </div>
      </div>
    );
  }
}

export default LookData;
