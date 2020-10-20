import {collectArray} from "../utils/object"

describe('测试 collectArray 函数', () => {
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

    const result = collectArray(data);

    expect(result).toEqual(expected);
  });

  it('测试传入数组的情况', () => {
    const data = [1, 2, 3, 4];
    const result = collectArray(data);

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

    const result = collectArray(data);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
  })
})
