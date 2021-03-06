import toTable from "../src/toTable";
import data from "./data";

describe('测试 toTable 函数', () => {
  it ('测试简单数据', () => {
    const data = {
      a: {
        b: {
          c: [{ name: 'Jack' }]
        }
      }
    }
    const names = ['date', 'status', 'type', 'data'];
    const expected = [
      {date: 'a', status: 'b', type: 'c', data: { name: 'Jack' }}
    ];

    const result = toTable(data, names);

    expect(result).toEqual(expected);
  })

  it('测试都为对象的情况', () => {
    const data = {
      a: {
        b: {
          c: {
            d: 1
          }
        }
      }
    };

    const names = ['date', 'status', 'type', 'data'];
    const expected = [
      {date: 'a', status: 'b', type: 'c', data: 'd'}
    ]
    const result = toTable(data, names);
    expect(result).toEqual(expected);
  })

  it('正确转成数组', () => {
    const expected = [
      {
        "data": {
          "content": "你好",
          "name": "张三"
        },
        "date": "2020-10-10",
        "status": "success",
        "type": "text"
      },
      {
        "data": {
          "content": "喂喂喂",
          "name": "小明"
        },
        "date": "2020-10-10",
        "status": "success",
        "type": "text"
      },
      {
        "data": {
          "content": "Hello",
          "name": "小红"
        },
        "date": "2020-10-10",
        "status": "success",
        "type": "text"
      },
      {
        "data": {
          "content": "失败了哦",
          "name": "小明"
        },
        "date": "2020-10-10",
        "status": "success",
        "type": "text"
      },
      {
        "data": {
          "content": "正在发送",
          "name": "张三"
        },
        "date": "2020-10-10",
        "status": "success",
        "type": "text"
      },
      {
        "data": {
          "content": "发送着的文字",
          "name": "李四"
        },
        "date": "2020-10-10",
        "status": "success",
        "type": "text"
      },
      {
        "data": {
          "content": "在弄了",
          "name": "小明"
        },
        "date": "2020-10-10",
        "status": "success",
        "type": "text"
      },
      {
        "data": {
          "content": "很简单",
          "name": "小红"
        },
        "date": "2020-10-10",
        "status": "success",
        "type": "text"
      },
      {
        "data": {
          "content": "streetAddress",
          "name": "张三"
        },
        "date": "2020-10-10",
        "status": "success",
        "type": "text"
      },
      {
        "data": {
          "content": "transactionDescription",
          "name": "小明"
        },
        "date": "2020-10-10",
        "status": "success",
        "type": "text"
      },
      {
        "data": {
          "content": "adjective",
          "name": "张三"
        },
        "date": "2020-10-10",
        "status": "success",
        "type": "text"
      },
      {
        "data": {
          "content": "contextualCard",
          "name": "小红"
        },
        "date": "2020-10-10",
        "status": "success",
        "type": "text"
      }
    ]

    const names = ['date', 'status', 'type', 'data']

    const result = toTable(data, names, {});

    expect(result).toEqual(expected);
  })
})
