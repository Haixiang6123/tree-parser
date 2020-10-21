const dfsHelper = (object, names, step, tempRow, result) => {
  if (!object) return;

  if (step === names.length) {
    return result.push({ ...tempRow });
  }

  const keyName = names[step];

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

  tempRow = { ...tempRow, [keyName]: key };

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
