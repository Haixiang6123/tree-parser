const dfsHelper = (object, names, step, tempRow, result) => {
  if (!object) return;

  if (step === names.length) {
    return result.push({ ...tempRow });
  }

  const keyName = names[step];

  if (object instanceof Array) {
    object.map(item => {
      const row = {
        ...tempRow,
        [keyName]: item,
      }

      result.push(row);
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
