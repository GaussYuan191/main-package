import React, { PureComponent } from 'react';
import { Modal, Form, Input } from 'antd';

class detialModal extends PureComponent {
  cancelModal = () => {
    this.props.cancelModal();
  };
  render() {
    return (
      <>
        <Modal
          visible={this.props.visible}
          width={800}
          title="缓存内容详情"
          destroyOnClose={true}
          onCancel={this.cancelModal}
          onOk={this.cancelModal}
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <Form.Item label="缓存key">
              <Input value={this.props.rowed.key} disabled={true} />
            </Form.Item>
            <Form.Item label="存活时间">
              <Input value={this.props.rowed.expireTime} disabled={true} />
            </Form.Item>
            <Form.Item label="缓存值">
              <Input.TextArea rows={4} value={this.props.rowed.detial} disabled={true} />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default detialModal;
