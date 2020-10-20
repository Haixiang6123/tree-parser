/**
 * 搜集整个对象里的数组
 */
export const collectArraysBFS = (object) => {
  if (!object) { return [] }

  let queue = [object];
  let result = [];

  while (queue.length > 0) {
    const curtNode = queue.pop();

    // 如果是数组，则存起来
    if (curtNode instanceof Array) {
      result = result.concat(curtNode);
    }

    // 如果还是对象，则继续下一层
    if (curtNode instanceof Object) {
      const values = Object.values(curtNode);
      queue = queue.concat(values);
    }
  }

  return result;
};

/**
 * 获取该层里的所有 key
 */
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

    const curtNode = queue.pop();

    if (curtNode instanceof Object) {
      const values = Object.values(curtNode);
      queue = queue.concat(values);
    }

    step += 1;
  }

  return result;
};
