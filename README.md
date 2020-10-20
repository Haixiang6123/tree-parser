# 为了解析后端数据，我竟然写了个递归？

> 代码仓库：https://github.com/Haixiang6123/tree-parser

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

## 最后

看到这，可能会有人说：这种代码以后会很难维护，不好看懂，过度优化等等等等。

这里只是提供另一种思路。想想如果都是一层一层 for loop 来解析数据，那业务代码就会变得特别多且冗余，而这种比较抽象的工具函数却可以应对下一次相同数据结构。

（完）
