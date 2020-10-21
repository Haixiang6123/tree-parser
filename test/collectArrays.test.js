import {collectArraysBFS, collectArraysDFS, collectKeysBFS} from "../src/collectArrays";

describe('测试 collectArrays 函数', () => {
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

    const resultDFS = collectArraysDFS(data);
    const resultBFS = collectArraysBFS(data);

    expect(resultDFS).toEqual(expected);
    expect(resultBFS).toEqual(expected);
  });

  it('测试传入数组的情况', () => {
    const data = [1, 2, 3, 4];

    const resultDFS = collectArraysDFS(data);
    const resultBFS = collectArraysBFS(data);

    expect(resultDFS).toEqual(data);
    expect(resultBFS).toEqual(data);
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

    const resultDFS = collectArraysDFS(data);
    const resultBFS = collectArraysBFS(data);

    expect(resultDFS).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(resultBFS).toEqual([1, 2, 3, 4, 5, 6, 7]);
  })

  it('测试空值情况', () => {
    const data = null;

    const resultDFS = collectArraysDFS(data);
    const resultBFS = collectArraysBFS(data);

    expect(resultDFS).toEqual([]);
    expect(resultBFS).toEqual([]);
  })
})
