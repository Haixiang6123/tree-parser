const data = {
  '2020-10-10': {
    success: {
      text: [
        {name: '张三', content: '你好'},
      ],
      audio: [
        {name: '小明', content: '喂喂喂'},
        {name: '小红', content: 'Hello'},
      ]
    },
    fail: {
      text: [],
      audio: [
        {name: '小明', content: '失败了哦'},
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
      text: [],
      audio: []
    },
    fail: {
      text: [
        {name: '张三', content: 'streetAddress'},
      ],
      audio: [
        {name: '小明', content: 'transactionDescription'},
      ]
    },
    sending: {
      text: [
        {name: '张三', content: 'adjective'},
      ],
      audio: [
        {name: '小红', content: 'contextualCard'},
      ]
    }
  }
}

export default data;
