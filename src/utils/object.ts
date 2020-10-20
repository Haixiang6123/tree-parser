export const collectArray = (object: Object) => {
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

export const collectKeys = (object: Object, depth: number, step: number) => {
  if (step === depth) {
    return Object.keys(object);
  }

  return Object.values(object).forEach((prev: any, value: any) => {
    if (value instanceof Object) {
      prev = prev.concat(collectKeys(value, depth, step + 1));
      return prev;
    }
  }, []);
};
