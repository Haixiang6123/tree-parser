export const getTable = (object, step, tempMeta, pathName, table) => {
  if (!object) {
    return table.push({

      ...tempMeta
    });
  }

  Object.entries(object).forEach(([key, value]) => {
    tempMeta = {
      ...tempMeta,
      [pathName[step]]: key,
    }

    getTable(value, step + 1, pathName, value, table);
  });
}

/**
 * 搜集整个对象里的数组
 */
export const collectArrayDFS = (object) => {
  if (!object) {
    return [];
  }

  if (object instanceof Array) {
    return object;
  }

  return Object.values(object).reduce((prev, value) => {
    if (value instanceof Array) {
      prev = prev.concat(value);
    } else if (value instanceof Object) {
      prev = prev.concat(collectArrayDFS(value));
    }

    return prev;
  }, []);
};

/**
 * 获取该层里的所有 key
 */
export const collectKeysDFS = (object, targetLevel, step) => {
  if (!object || targetLevel < step) {
    return [];
  }

  if (step === targetLevel) {
    return Object.keys(object);
  }

  return Object.values(object).reduce((prev, value) => {
    if (value instanceof Object) {
      prev = prev.concat(collectKeysDFS(value, targetLevel, step + 1));
      return prev;
    }
  }, []);
};
