/**
 * 树数据通用操作方法
 * @author daizq
 */

// 树数据公共方法默认配置
const treeDataConfig = {
  keyField: '',
  titleField: '',
  showValue: false,
  // 指定需要过滤数据的key，用于 formatTreeData 方法
  filterKeys: [],
  // 指定过滤文本条件，用于 filterTreeData 方法
  filterValue: '',
  treeNodeRender: node => ({}),
  parKey: '',
  // 指定 keyList 中每一个元素的 key（多个）
  keyList: [],
  parKeyList: []
};

/**
 * @des flattenTreeData 树数据扁平化
 * @param rows
 * @param config {keyField, treeNodeRender, parKey, keyList}
 * @returns Array[]
 */
export const flattenTreeData = function (rows, config) {
  let newRows = [];
  config = { ...treeDataConfig, ...config };
  const { keyField, treeNodeRender, parKey, keyList, parKeyList } = config;

  rows.forEach(item => {
    // 自定义节点配置
    const treeNodeConfig = treeNodeRender(item);

    // key取值优先级：已存在key > 自定义事件处理的key > 使用keyField字段
    item.key = item.key || treeNodeConfig.key || item[keyField] || '';

    const nodeKey = parKey ? `${parKey}#${item.key}` : item.key;

    if (keyList.length) {
      const keyInfo = {};
      keyList.forEach(key => {
        keyInfo[key] = item[key];
      });

      item.fullKeyList = [...parKeyList, keyInfo];
    }

    newRows.push({
      ...item,
      fullKey: nodeKey
    });

    if (item.children) {
      newRows = [
        ...newRows,
        ...flattenTreeData(item.children, {
          ...config,
          parKey: nodeKey,
          parKeyList: item.fullKeyList || []
        })
      ];
    }
  });

  return newRows;
};

/**
 * @des formatTreeData 格式化数组为 treeData
 * @param rows
 * @param config {keyField, titleField, showValue, treeNodeRender, filterKeys}
 * @returns {rows, keys}
 */
export const formatTreeData = function (rows, config) {
  const newRows = [];
  let keys = [];
  config = { ...treeDataConfig, ...config };
  const { keyField, titleField, showValue, treeNodeRender, filterKeys } = config;

  rows.forEach(item => {
    // 自定义节点配置
    const treeNodeConfig = treeNodeRender(item);

    const nodeKey = treeNodeConfig.key || item[keyField];
    const nodeTitle = treeNodeConfig.title || item[titleField] || nodeKey;

    if (filterKeys && filterKeys.length && !filterKeys.includes(nodeKey)) {
      return true;
    }

    keys.push(nodeKey);

    const newItem = !Object.keys(treeNodeConfig).length
      ? {
          ...item,
          key: nodeKey,
          value: nodeKey,
          title: showValue ? nodeKey + '-' + nodeTitle : nodeTitle,
          children: null
        }
      : // 自定义节点模式
        {
          ...item,
          ...treeNodeConfig,
          // 存在titleDom（dom结构的title），则取titleDom
          title: treeNodeConfig.titleDom || treeNodeConfig.title,
          children: null
        };

    const children = formatTreeData(item.children || [], config);

    // 是否为叶子节点
    newItem.isLeaf = !children.rows.length;

    if (children.rows.length) {
      newItem.children = children.rows;
      keys = [...keys, ...children.keys];
    }

    newRows.push(newItem);
  });

  return {
    rows: newRows,
    keys
  };
};

/**
 * @des filterTreeData 格式化数组为 treeData，并支持筛选
 * @param rows
 * @param config {keyField, titleField, showValue, filterValue, treeNodeRender}
 * @returns {rows, keys}
 */
export const filterTreeData = function (rows, config) {
  config = { ...treeDataConfig, ...config };
  const { keyField, titleField, filterValue, treeNodeRender } = config;

  let filterKeys = filterValue
    ? flattenTreeData(rows, config)
        .filter(item => {
          // 自定义节点配置
          const treeNodeConfig = treeNodeRender(item);

          const nodeKey = treeNodeConfig.key || item[keyField] || '';
          const nodeTitle = treeNodeConfig.title || item[titleField] || '';

          return nodeKey.includes(filterValue) || nodeTitle.includes(filterValue);
        })
        .map(item => {
          return item.fullKey;
        })
        .join('#')
        .split('#')
    : [];

  return formatTreeData(rows, {
    ...config,
    filterKeys: Array.from(new Set(filterKeys))
  });
};

/**
 * @des formatTreeTableData 格式化数组为“树形表格数据”
 * @param rows
 * @param config {parKey, filterKeys}
 * @param parKey 父级的key
 * @returns Array[]
 */
export const formatTreeTableData = (rows, config) => {
  config = { ...treeDataConfig, ...config };
  const { keyField, parKey, filterKeys } = config;
  const newRows = [];
  let keys = [];

  rows.forEach((item, index) => {
    let nodeKey = item[keyField];

    if (!nodeKey) {
      nodeKey = parKey ? `${parKey}-${index + 1}` : index + 1 + '';
    }

    const newItem = {
      ...item,
      key: nodeKey,
      children: null
    };

    if (filterKeys && filterKeys.length && !filterKeys.includes(newItem.key)) {
      return true;
    }

    keys.push(newItem.key);

    if (!parKey) {
      newItem.rowIndex = index + 1;
    }

    if (item.children && item.children.length) {
      const children = formatTreeTableData(item.children, {
        ...config,
        parKey: newItem.key
      });

      newItem.children = children.rows;
      keys = [...keys, ...children.keys];
    }

    newRows.push(newItem);
  });

  return {
    rows: newRows,
    keys
  };
};

export default {
  flattenTreeData,
  filterTreeData,
  formatTreeData,
  formatTreeTableData
};
