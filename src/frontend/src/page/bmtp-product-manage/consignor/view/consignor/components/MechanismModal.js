import React, { Component } from 'react';
import { Modal } from 'antd';

class MechanismModal extends Component {
  render() {
    return (
      <Modal
        {...modalInfo}
        width={1160}
        title="新增机构信息"
        visible={isOpenMechanismModal.status}
      ></Modal>
    );
  }
}

export default connect(mapStateToProps)(MechanismModal);
