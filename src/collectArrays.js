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

export const collectArraysBFS = (object) => {
  if (!object) { return [] }

  let queue = [object];
  let result = [];

  while (queue.length > 0) {
    const curtNode = queue.shift();

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
