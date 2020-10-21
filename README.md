# 为了解析后端数据，我竟然写了个递归？

[![Build Status](https://travis-ci.org/Haixiang6123/tree-parser.svg?branch=main)](https://travis-ci.org/Haixiang6123/tree-parser)

> 代码仓库：https://github.com/Haixiang6123/tree-parser
> 所写代码都是经过了单元测试的，并不是打个 log 就完事的。

曾经的我特别讨厌 LeetCode 算法题，当时就觉得写项目好玩，算法没什么用。不喜欢归不喜欢，为了面试，还是写了 476 道题 = =。非常感激默默地刷题的那段时光，在处理数据方面确实给了我不一样的思路。算法和数据结构果然还是基本功呀。

## 需求

我接到的需求很简单：后端返回一个 JSON，页面展示多个下拉选择器，根据用户不同的选择筛选不同的数据。例如：

![](https://upload-images.jianshu.io/upload_images/2979799-8ef479489735021e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

而后端给我们的数据是这样的：

```ts
const data = {
  '2020-10-10': {
    success: {
      text: [
        {name: '张三', content: '你好'},
        {name: '李四', content: '哈哈哈哈'},
        {name: '王五', content: 'EZEZ'},
      ],
      audio: [
        {name: '小明', content: '喂喂喂'},
        {name: '小红', content: 'Hello'},
      ]
    },
    fail: {
      text: [
        {name: '张三', content: 'Yoyoyo'},
        {name: '李四', content: 'yeyeye'},
        {name: '王五', content: 'rerere'},
      ],
      audio: [
        {name: '小明', content: '失败了哦'},
        {name: '小红', content: '你好呀'},
      ]
    },
    sending: {
      text: [
        {name: '张三', content: '正在发送'},
        {name: '李四', content: '发送着的文字'},
      ],
      audio: [
        {name: '小明', content: '在弄了'},
        {name: '小红', content: '很简单'},
      ]
    }
  },
  '2020-10-11': {
   ...
  }
  ...
}
```

乍一看，感觉这个结构还是很清晰的，时间，消息状态，消息类型，再到消息内容都以树状结构返回。但是，对应到我们的需求，就感觉有点不对劲。

## 问题

首先，我们要展示可选项，按这里的需求就是时间、消息状态、消息类型。那就要对应3个数组：

```
const dateOptions = ['2020-10-10', '2020-10-11']
const statusOptions = ['success', 'fail', 'sending']
const typeOptions = ['text', 'audio']
```

刚开始可能会想用 `Object.keys()` 去拿，但是如果我们不断地循环，循环再循环把这些拼起来就会现好麻烦啊。

第二个问题我们要面对的就是怎么去获取选中结果的过滤结果。假如选中 2020-10-10 就要在这个对象里将数组里的内容都拼在一起，以此类推。

其实这两个问题抽象出来就是怎么在一棵树里收集结果，那都简单的方法就是 DFS 或者 BFS 去找。

## 实现

### 收集所有结果

最好的效果就是丢什么对象进去都可以直接返回那个对象下所有数组的合集，例如：

```js
// 返回所有数据
collectArraysDFS(data)
// 返回 2020-10-10 下面的数据
collectArraysDFS(data['2020-10-10'])
// 返回 2020-10-10 且成功的数据
collectArraysDFS(data['2020-10-10']['success'])
...
```

这个问题还算比较简单，使用 DFS 是比较好做的，只要判断当前是否为 Array，如果是 Array，则加入结果，否则如果是 Object，则进入下一步的递归。

```js
const collectArraysDFS = (object) => {
  if (!object) { return [] }

  // 如果本身就是数组，直接返回
  if (object instanceof Array) { return object }

  return Object.values(object).reduce((prev, value) => {
    // 继续递归
    if (value instanceof Object) {
      prev = prev.concat(collectArraysDFS(value));
    }

    return prev;
  }, []);
};
```

BFS 实现的版本：

```js
const collectArraysBFS = (object) => {
  if (!object) { return [] }

  let queue = [object];
  let result = [];

  while (queue.length > 0) {
    const curtNode = queue.pop();

    // 如果是数组，则存起来
    if (curtNode instanceof Array) {
      result = result.concat(curtNode);
    }

    // 如果还是对象，则继续下一层
    if (curtNode instanceof Object) {
      const values = Object.values(curtNode);
      queue = queue.concat(values);
    }
  }

  return result;
};
```

### 收集所有选项

我们希望的效果是，给一个对象，我要哪一层的 key，就返回哪一层的 key，如：

```
// 返回第2层的所有的key
collectKeysDFS(data, 2, 1)
```

这里的思路是 DFS 走完整个树，然后设定好一个 targetLevel，表示只会收集那一层的所有 keys 就好，同时我们还需要 step 来计算当前层。只要在到了 targetLevel，就 Object.keys() 一下，表返回结果，在前面的层则负责收集结果就好了。最后回到 root，就能收集到所有的 key。

简单的 DFS 实现如下：

```js
const collectKeysDFS = (object, targetLevel, step) => {
  if (!object || targetLevel < step) { return [] }

  // 到达层数，返回所有 keys
  if (step === targetLevel) {
    return Object.keys(object);
  }

  // 继续递归
  return Object.values(object).reduce((prev, value) => {
    if (value instanceof Object) {
      return prev.concat(collectKeysDFS(value, targetLevel, step + 1));
    }
  }, []);
};
```

使用 BFS 的版本：

```js
const collectArraysBFS = (object) => {
  if (!object) { return [] }

  let queue = [object];
  let result = [];

  while (queue.length > 0) {
    const curtNode = queue.pop();

    // 如果是数组，则存起来
    if (curtNode instanceof Array) {
      result = result.concat(curtNode);
    }

    // 如果还是对象，则继续下一层
    if (curtNode instanceof Object) {
      const values = Object.values(curtNode);
      queue = queue.concat(values);
    }
  }

  return result;
};
```

## 另一种思路

另一种我想到的思路是将上面的树状结构变回数据表那样的 Table 结构，即数组：

```json
[
  { date: 'xxx', status: 'xxx', type: 'xxx', data: {...} }
]
```

有了这个表结构，过滤数组这个需求就会变得更加简单，不再需要上面的BFS或者DFS了：

```js
// 直接选出所有 date 为 'xxx' 的数据
table.filter(item => item.date === 'xxx')
```

要变成 Table 结构，很简单的一个想法就是要求出原始数据里的每条 root 到 leaf 的 path，同时对每个 key 都设定一个名字，这里就叫 keyName，对象里的 key 反而变成了 value，可以参考 [LeetCode 这道题](https://leetcode.com/problems/binary-tree-paths/)。

思路就是我们先要给定每个 key 对应的 keyName 数组，每到一层的时候获取这个 key，以及 keyName 就好了。到最后一层就直接包住最后一层的对象即可完成该次递归。下面直接展示我的解法吧：

```js
// Helper 函数
const dfsHelper = (object, names, step, tempRow, result) => {
  // 异常值的情况
  if (!object) return;

  // 如果超过 names 长度，则开始搜集结果
  if (step === names.length) {
    return result.push({ ...tempRow });
  }

  // 获取对应的 key 的名字
  const keyName = names[step];

  // 如果值为数组，则直接 push 数组里的每个元素
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

  // 复制一份临时的对象
  tempRow = { ...tempRow, [keyName]: key };

  // 继续下一层的递归
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
```

## 最后

这次的思考给我的感受就是算法虽然在平时项目没什么用，但是在解决基础底层问题的时候确实可以考验一个程序员的基本素养，会给自己不一样的解决思路。

（完）
