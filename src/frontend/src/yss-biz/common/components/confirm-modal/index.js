import { Modal } from 'antd';
const { confirm } = Modal;
export default (options = {}) => {
  return confirm({
    title: '是否删除选中的数据？',
    okText: '确定',
    cancelText: '取消',
    ...options
  });
};
