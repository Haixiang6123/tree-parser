/**
 * 搜集整个对象里的数组
 */
export const collectArray = (object: any) => {
  if (!object) {
    return [];
  }

  if (object instanceof Array) {
    return object;
  }

  return Object.values(object).reduce((prev: any, value: any) => {
    if (value instanceof Array) {
      prev = prev.concat(value);
    } else if (value instanceof Object) {
      prev = prev.concat(collectArray(value));
    }

    return prev;
  }, []);
};

/**
 * 获取该层里的所有 key
 */
export const collectKeys = (object: any, targetLevel: number, step: number) => {
  if (!object || targetLevel < step) {
    return [];
  }

  if (step === targetLevel) {
    return Object.keys(object);
  }

  return Object.values(object).reduce((prev: any, value: any) => {
    if (value instanceof Object) {
      prev = prev.concat(collectKeys(value, targetLevel, step + 1));
      return prev;
    }
  }, []);
};
