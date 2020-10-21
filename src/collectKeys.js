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

export const collectKeysBFS = (object, targetLevel, step) => {
  if (!object || targetLevel < step) {
    return [];
  }

  let queue = [object];
  let result = [];

  while (queue.length > 0) {
    // 到达层数
    if (step === targetLevel) {
      result = queue.reduce((prev, curt) => prev.concat(Object.keys(curt)), []);
    }

    const curtNode = queue.shift();

    if (curtNode instanceof Object) {
      const values = Object.values(curtNode);
      queue = queue.concat(values);
    }

    step += 1;
  }

  return result;
};
