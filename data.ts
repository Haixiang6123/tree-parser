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
    success: {
      text: [
        {name: '张三', content: 'faker'},
        {name: '李四', content: 'internet'},
        {name: '王五', content: 'Rusty'},
      ],
      audio: [
        {name: '小明', content: 'randomEmail'},
        {name: '小红', content: 'Methods'},
      ]
    },
    fail: {
      text: [
        {name: '张三', content: 'streetAddress'},
        {name: '李四', content: 'currencyName'},
        {name: '王五', content: 'ethereumAddress'},
      ],
      audio: [
        {name: '小明', content: 'transactionDescription'},
        {name: '小红', content: 'branch'},
      ]
    },
    sending: {
      text: [
        {name: '张三', content: 'adjective'},
        {name: '李四', content: 'verb'},
      ],
      audio: [
        {name: '小明', content: 'regexpStyleStringParse'},
        {name: '小红', content: 'contextualCard'},
      ]
    }
  }
}

export default data;
