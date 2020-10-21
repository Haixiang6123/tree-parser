import {collectKeysBFS, collectKeysDFS} from "../src/collectKeys"

describe('测试 collectKeys 函数', () => {
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

    const resultDFS = collectKeysDFS(data, 2, 1);
    const resultBFS = collectKeysBFS(data, 2, 1);

    expect(resultDFS).toEqual(['b1', 'b2', 'b3', 'b4'])
    expect(resultBFS).toEqual(['b1', 'b2', 'b3', 'b4'])
  })

  it('测试空值', () => {
    const data = null;

    const resultDFS = collectKeysDFS(data, 2, 1);
    const resultBFS = collectKeysDFS(data, 2, 1);

    expect(resultDFS).toEqual([]);
    expect(resultBFS).toEqual([]);
  })

  it("测试 step 超过 depth 的情况", () => {
    const data = {
      a: {
        b: {
          c: 1
        }
      }
    }

    const resultDFS = collectKeysDFS(data, 1, 2);
    const resultBFS = collectKeysDFS(data, 1, 2);

    expect(resultDFS).toEqual([]);
    expect(resultBFS).toEqual([]);
  })
})
