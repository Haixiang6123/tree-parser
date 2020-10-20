/**
 * 搜集整个对象里的数组
 */
export const collectArraysDFS = (object) => {
  if (!object) { return [] }

  // 如果本身就是数组，直接返回
  if (object instanceof Array) { return object }

  return Object.values(object).reduce((prev, value) => {
    // 继续递归
    if (value instanceof Object) {
      prev = prev.concat(collectArraysDFS(value));
    }

    return prev;
  }, []);
};

/**
 * 获取该层里的所有 key
 */
export const collectKeysDFS = (object, targetLevel, step) => {
  if (!object || targetLevel < step) { return [] }

  // 到达层数，返回所有 keys
  if (step === targetLevel) {
    return Object.keys(object);
  }

  // 继续递归
  return Object.values(object).reduce((prev, value) => {
    if (value instanceof Object) {
      return prev.concat(collectKeysDFS(value, targetLevel, step + 1));
    }
  }, []);
};
