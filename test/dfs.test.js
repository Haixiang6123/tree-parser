import {collectArraysDFS, collectKeysDFS, getPaths} from "../src/dfs"

describe('测试 getPaths 函数', () => {
  it('可以正确解析', () => {
    const data = {
      a: {
        b: {
          c: {
            d: 1
          }
        }
      }
    }

    const pathName = ['department', 'type', 'employee', 'name']

    const result = getPaths(data, 0, pathName, {}, []);

    expect(result).toEqual([
      {
        d: 1,
        meta: {department: 'a', type: 'b', employee: 'c', name: 'd'}
      }
    ]);
  })
})

describe('测试 collectArrayDFS 函数', () => {
  it('可以正确解析', () => {
    const data = {
      a: {
        b1: {
          c: {
            d1: [{val: 1}, {val: 2}],
            d2: [{val: 3}, {val: 4}]
          }
        },
        h2: {
          c: {
            d1: [{val: 5}, {val: 6}],
            d2: [{val: 7}, {val: 8}]
          }
        }
      }
    }

    const expected = [
      {val: 1}, {val: 2}, {val: 3}, {val: 4},
      {val: 5}, {val: 6}, {val: 7}, {val: 8}
    ]

    const result = collectArraysDFS(data);

    expect(result).toEqual(expected);
  });

  it('测试传入数组的情况', () => {
    const data = [1, 2, 3, 4];
    const result = collectArraysDFS(data);

    expect(result).toEqual(data);
  })

  it('测试不同层级的情况', () => {
    const data = {
      a: [1, 2, 3, 4],
      b: {
        c: {
          d: [5, 6, 7]
        }
      }
    }

    const result = collectArraysDFS(data);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
  })

  it('测试空值情况', () => {
    const data = null;
    const result = collectArraysDFS(data);
    expect(result).toEqual([]);
  })
})

describe('测试 collectKeysDFS 函数', () => {
  it('正常获取所有的 key', () => {
    const data = {
      a1: {
        b1: {},
        b2: {}
      },
      a2: {
        b3: {},
        b4: {
          c: {}
        }
      }
    }

    const result = collectKeysDFS(data, 2, 1);

    expect(result).toEqual(['b1', 'b2', 'b3', 'b4'])
  })

  it('测试空值', () => {
    const data = null;
    const result = collectKeysDFS(data, 2, 1);
    expect(result).toEqual([]);
  })

  it("测试 step 超过 depth 的情况", () => {
    const data = {
      a: {
        b: {
          c: 1
        }
      }
    }

    const result = collectKeysDFS(data, 1, 2);

    expect(result).toEqual([]);
  })
})
