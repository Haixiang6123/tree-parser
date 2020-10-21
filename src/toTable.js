// Helper 函数
const dfsHelper = (object, names, step, tempRow, result) => {
  // 异常值的情况
  if (!object) return;

  // 如果超过 names 长度，则开始搜集结果
  if (step === names.length) {
    return result.push({ ...tempRow });
  }

  // 获取对应的 key 的名字
  const keyName = names[step];

  // 如果值为数组，则直接 push 数组里的每个元素
  if (object instanceof Array) {
    return object.map(item => {
      result.push({
        ...tempRow,
        [keyName]: item,
      });
    })
  }

  const [key] = Object.keys(object);
  const values = Object.values(object);

  // 复制一份临时的对象
  tempRow = { ...tempRow, [keyName]: key };

  // 继续下一层的递归
  values.forEach((value => {
    dfsHelper(value, names, step + 1, tempRow, result);
  }))
}

const toTable = (object, names) => {
  if (!object) return [];

  let result = [];

  dfsHelper(object, names, 0, {}, result);

  return result;
}

export default toTable;
