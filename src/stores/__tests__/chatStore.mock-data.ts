const mockUserInfo = {
  "username": "Joe",
  "status": "offline",
  "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
}

const mockUsers = [
  {
    "username": "Joe",
    "status": "offline",
    "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
  },
  {
    "username": "Jane",
    "status": "offline",
    "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jane"
  },
  {
    "username": "John",
    "status": "offline",
    "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=john"
  },
  {
    "username": "Linda",
    "status": "offline",
    "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=linda"
  },
  {
    "username": "David",
    "status": "offline",
    "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=david"
  },
  {
    "username": "Jessica",
    "status": "offline",
    "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jessica"
  },
  {
    "username": "Amanda",
    "status": "offline",
    "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=amanda"
  },
  {
    "username": "Emily",
    "status": "offline",
    "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=emily"
  },
  {
    "username": "Jason",
    "status": "offline",
    "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jason"
  }
]

const mockToken = 'mock-token'

const mockViteEnv = {
  VITE_WS_BASE_URL: 'ws://mock-base-url'
};

// 剛連上 WebSocket 時的資料
const mockWebSocketOpenEvents = [
  {
    "event": "unreadMessages",
    "data": {
      "room": "private_Jessica_Joe",
      "count": 1
    }
  },
  {
    "event": "unreadMessages",
    "data": {
      "room": "general",
      "count": 0
    }
  },
  {
    "event": "generalUnReadInfo",
    "data": {
      "Joe": 0,
      "Jane": 0,
      "John": 2,
      "Linda": 2,
      "David": 2,
      "Jessica": 2,
      "Amanda": 2,
      "Emily": 2,
      "Jason": 2
    }
  },
  {
    "event": "messageHistory",
    "data": {
      "room": "private_Jessica_Joe",
      "messages": [
        {
          "to": "Joe",
          "message": "嗨嗨 Joe",
          "sender": "Jessica",
          "replyToMessageId": "",
          "date": "2024-06-13T04:03:34.001Z",
          "id": "1900fc3e1f1-ffef-2612",
          "isRead": false,
          "isRecalled": false,
          "room": "private_Jessica_Joe"
        }
      ]
    }
  },
  {
    "event": "messageHistory",
    "data": {
      "room": "private_Joe_Jessica",
      "messages": [
        {
          "to": "Joe",
          "message": "嗨嗨 Joe",
          "sender": "Jessica",
          "replyToMessageId": "",
          "date": "2024-06-13T04:03:34.001Z",
          "id": "1900fc3e1f1-ffef-2612",
          "isRead": false,
          "isRecalled": false,
          "room": "private_Joe_Jessica"
        }
      ]
    }
  },
  {
    "event": "onlineUsers",
    "data": {
      "users": [
        "Joe",
        "Jessica"
      ]
    }
  },
  {
    "event": "messageHistory",
    "data": {
      "room": "general",
      "messages": [
        {
          "room": "general",
          "message": "安安",
          "sender": "Joe",
          "replyToMessageId": "",
          "date": "2024-06-13T04:02:00.933Z",
          "id": "1900fc27665-65d0-7136",
          "isRecalled": false,
          "readBy": [
            "Joe",
            "Jane"
          ]
        },
        {
          "room": "general",
          "message": "嗨嗨",
          "sender": "Jane",
          "replyToMessageId": "",
          "date": "2024-06-13T04:02:41.136Z",
          "id": "1900fc31370-8b08-6f1a",
          "isRecalled": false,
          "readBy": [
            "Jane",
            "Joe"
          ]
        }
      ]
    }
  },
  {
    "event": "initializationComplete",
    "data": {
      "message": "Relevant initialization data has been sent"
    }
  }
]
const expectedStoreAfterWebSocketOpen = {
  "isSocketStable": true,
  "userInfo": {
    "username": "Joe",
    "status": "offline",
    "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
  },
  "currentRoom": "",
  "users": [
    {
      "username": "Joe",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
    },
    {
      "username": "Jane",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jane"
    },
    {
      "username": "John",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=john"
    },
    {
      "username": "Linda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=linda"
    },
    {
      "username": "David",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=david"
    },
    {
      "username": "Jessica",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jessica"
    },
    {
      "username": "Amanda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=amanda"
    },
    {
      "username": "Emily",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=emily"
    },
    {
      "username": "Jason",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jason"
    }
  ],
  "generalMessages": [
    {
      "room": "general",
      "message": "安安",
      "sender": "Joe",
      "replyToMessageId": "",
      "date": "2024-06-13T04:02:00.933Z",
      "id": "1900fc27665-65d0-7136",
      "isRecalled": false,
      "readBy": [
        "Joe",
        "Jane"
      ]
    },
    {
      "room": "general",
      "message": "嗨嗨",
      "sender": "Jane",
      "replyToMessageId": "",
      "date": "2024-06-13T04:02:41.136Z",
      "id": "1900fc31370-8b08-6f1a",
      "isRecalled": false,
      "readBy": [
        "Jane",
        "Joe"
      ]
    }
  ],
  "privateMessages": [
    {
      "to": "Joe",
      "message": "嗨嗨 Joe",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T04:03:34.001Z",
      "id": "1900fc3e1f1-ffef-2612",
      "isRead": false,
      "isRecalled": false,
      "room": "private_Jessica_Joe"
    },
    {
      "to": "Joe",
      "message": "嗨嗨 Joe",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T04:03:34.001Z",
      "id": "1900fc3e1f1-ffef-2612",
      "isRead": false,
      "isRecalled": false,
      "room": "private_Joe_Jessica"
    }
  ],
  "unreadCounts": {
    "private_Jessica_Joe": 1,
    "general": 0
  }
}
const expectedComputedStateAfterWebSocketOpen = {
  onlineUsers: [
    {
      "username": "Joe",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
    },
    {
      "username": "Jessica",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jessica"
    }
  ],
  offlineUsers: [
    {
      "username": "Jane",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jane"
    },
    {
      "username": "John",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=john"
    },
    {
      "username": "Linda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=linda"
    },
    {
      "username": "David",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=david"
    },
    {
      "username": "Amanda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=amanda"
    },
    {
      "username": "Emily",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=emily"
    },
    {
      "username": "Jason",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jason"
    }
  ],
  currentChatPartner: null,
  messageNotifications: {
    "general": {
      "room": "general",
      "unreadCount": 0,
      "lastMessage": {
        "room": "general",
        "message": "嗨嗨",
        "sender": "Jane",
        "replyToMessageId": "",
        "date": "2024-06-13T04:02:41.136Z",
        "id": "1900fc31370-8b08-6f1a",
        "isRecalled": false,
        "readBy": [
          "Jane",
          "Joe"
        ]
      }
    },
    "private": [
      {
        "username": "Jessica",
        "room": "private_Jessica_Joe",
        "status": "online",
        "unreadCount": 1,
        "lastMessage": {
          "to": "Joe",
          "message": "嗨嗨 Joe",
          "sender": "Jessica",
          "replyToMessageId": "",
          "date": "2024-06-13T04:03:34.001Z",
          "id": "1900fc3e1f1-ffef-2612",
          "isRead": false,
          "isRecalled": false,
          "room": "private_Jessica_Joe"
        }
      },
      {
        "username": "Joe",
        "room": "private_Joe_Joe",
        "status": "online",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Jane",
        "room": "private_Jane_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "John",
        "room": "private_John_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Linda",
        "room": "private_Linda_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "David",
        "room": "private_David_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Amanda",
        "room": "private_Amanda_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Emily",
        "room": "private_Emily_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Jason",
        "room": "private_Jason_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      }
    ]
  },
  allUnreadCount: 1,
  currentChatMessages: [],
}

// 收回訊息
const mockRecallMessageEvents = [
  {
    "event": "messageRecalled",
    "data": {
      "sender": "Jessica",
      "to": "Joe",
      "room": "private_Jessica_Joe",
      "id": "1900fc3e1f1-ffef-2612",
      "isRecalled": true,
      "replyToMessageId": ""
    }
  },
  {
    "event": "messageRecalled",
    "data": {
      "sender": "Jessica",
      "to": "Joe",
      "room": "private_Joe_Jessica",
      "id": "1900fc3e1f1-ffef-2612",
      "isRecalled": true,
      "replyToMessageId": ""
    }
  },
  {
    "event": "unreadMessages",
    "data": {
      "room": "private_Jessica_Joe",
      "count": 0
    }
  },
]

const expectedStoreAfterRecallMessage = {
  "isSocketStable": true,
  "userInfo": {
    "username": "Joe",
    "status": "offline",
    "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
  },
  "currentRoom": "",
  "users": [
    {
      "username": "Joe",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
    },
    {
      "username": "Jane",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jane"
    },
    {
      "username": "John",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=john"
    },
    {
      "username": "Linda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=linda"
    },
    {
      "username": "David",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=david"
    },
    {
      "username": "Jessica",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jessica"
    },
    {
      "username": "Amanda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=amanda"
    },
    {
      "username": "Emily",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=emily"
    },
    {
      "username": "Jason",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jason"
    }
  ],
  "generalMessages": [
    {
      "room": "general",
      "message": "安安",
      "sender": "Joe",
      "replyToMessageId": "",
      "date": "2024-06-13T04:02:00.933Z",
      "id": "1900fc27665-65d0-7136",
      "isRecalled": false,
      "readBy": [
        "Joe",
        "Jane"
      ]
    },
    {
      "room": "general",
      "message": "嗨嗨",
      "sender": "Jane",
      "replyToMessageId": "",
      "date": "2024-06-13T04:02:41.136Z",
      "id": "1900fc31370-8b08-6f1a",
      "isRecalled": false,
      "readBy": [
        "Jane",
        "Joe"
      ]
    }
  ],
  "privateMessages": [
    {
      "to": "Joe",
      "sender": "Jessica",
      "replyToMessageId": "",
      "id": "1900fc3e1f1-ffef-2612",
      "isRecalled": true,
      "room": "private_Jessica_Joe"
    },
    {
      "to": "Joe",
      "sender": "Jessica",
      "replyToMessageId": "",
      "id": "1900fc3e1f1-ffef-2612",
      "isRecalled": true,
      "room": "private_Joe_Jessica"
    }
  ],
  "unreadCounts": {
    "private_Jessica_Joe": 0,
    "general": 0
  }
};

const expectedComputedStateAfterRecallMessage = {
  onlineUsers: [
    {
      "username": "Joe",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
    },
    {
      "username": "Jessica",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jessica"
    }
  ],
  offlineUsers: [
    {
      "username": "Jane",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jane"
    },
    {
      "username": "John",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=john"
    },
    {
      "username": "Linda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=linda"
    },
    {
      "username": "David",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=david"
    },
    {
      "username": "Amanda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=amanda"
    },
    {
      "username": "Emily",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=emily"
    },
    {
      "username": "Jason",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jason"
    }
  ],
  currentChatPartner: null,
  messageNotifications: {
    "general": {
      "room": "general",
      "unreadCount": 0,
      "lastMessage": {
        "room": "general",
        "message": "嗨嗨",
        "sender": "Jane",
        "replyToMessageId": "",
        "date": "2024-06-13T04:02:41.136Z",
        "id": "1900fc31370-8b08-6f1a",
        "isRecalled": false,
        "readBy": [
          "Jane",
          "Joe"
        ]
      }
    },
    "private": [
      {
        "username": "Joe",
        "room": "private_Joe_Joe",
        "status": "online",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Jane",
        "room": "private_Jane_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "John",
        "room": "private_John_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Linda",
        "room": "private_Linda_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "David",
        "room": "private_David_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "lastMessage": undefined,
        "room": "private_Jessica_Joe",
        "status": "online",
        "unreadCount": 0,
        "username": "Jessica",
      },
      {
        "username": "Amanda",
        "room": "private_Amanda_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Emily",
        "room": "private_Emily_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Jason",
        "room": "private_Jason_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      }
    ]
  },
  allUnreadCount: 0,
  currentChatMessages: [],
}

// 恢復訊息
const mockUndoRecallMessageEvents = [
  {
    "event": "messageUndoRecalled",
    "data": {
      "to": "Joe",
      "message": "嗨嗨 Joe",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T04:03:34.001Z",
      "id": "1900fc3e1f1-ffef-2612",
      "isRead": false,
      "isRecalled": false,
      "room": "private_Jessica_Joe"
    },
    "isRecalled": false
  },
  {
    "event": "messageUndoRecalled",
    "data": {
      "to": "Joe",
      "message": "嗨嗨 Joe",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T04:03:34.001Z",
      "id": "1900fc3e1f1-ffef-2612",
      "isRead": false,
      "isRecalled": false,
      "room": "private_Joe_Jessica"
    },
    "isRecalled": false
  },
  {
    "event": "unreadMessages",
    "data": {
      "room": "private_Jessica_Joe",
      "count": 1
    }
  },
]

const expectedStoreAfterUndoRecallMessage = {
  "isSocketStable": true,
  "userInfo": {
    "username": "Joe",
    "status": "offline",
    "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
  },
  "currentRoom": "",
  "users": [
    {
      "username": "Joe",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
    },
    {
      "username": "Jane",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jane"
    },
    {
      "username": "John",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=john"
    },
    {
      "username": "Linda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=linda"
    },
    {
      "username": "David",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=david"
    },
    {
      "username": "Jessica",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jessica"
    },
    {
      "username": "Amanda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=amanda"
    },
    {
      "username": "Emily",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=emily"
    },
    {
      "username": "Jason",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jason"
    }
  ],
  "generalMessages": [
    {
      "room": "general",
      "message": "安安",
      "sender": "Joe",
      "replyToMessageId": "",
      "date": "2024-06-13T04:02:00.933Z",
      "id": "1900fc27665-65d0-7136",
      "isRecalled": false,
      "readBy": [
        "Joe",
        "Jane"
      ]
    },
    {
      "room": "general",
      "message": "嗨嗨",
      "sender": "Jane",
      "replyToMessageId": "",
      "date": "2024-06-13T04:02:41.136Z",
      "id": "1900fc31370-8b08-6f1a",
      "isRecalled": false,
      "readBy": [
        "Jane",
        "Joe"
      ]
    }
  ],
  "privateMessages": [
    {
      "to": "Joe",
      "message": "嗨嗨 Joe",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T04:03:34.001Z",
      "id": "1900fc3e1f1-ffef-2612",
      "isRead": false,
      "isRecalled": false,
      "room": "private_Jessica_Joe"
    },
    {
      "to": "Joe",
      "message": "嗨嗨 Joe",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T04:03:34.001Z",
      "id": "1900fc3e1f1-ffef-2612",
      "isRead": false,
      "isRecalled": false,
      "room": "private_Joe_Jessica"
    }
  ],
  "unreadCounts": {
    "private_Jessica_Joe": 1,
    "general": 0
  }
}

const expectedComputedStateAfterUndoRecallMessage = {
  onlineUsers: [
    {
      "username": "Joe",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
    },
    {
      "username": "Jessica",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jessica"
    }
  ],
  offlineUsers: [
    {
      "username": "Jane",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jane"
    },
    {
      "username": "John",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=john"
    },
    {
      "username": "Linda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=linda"
    },
    {
      "username": "David",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=david"
    },
    {
      "username": "Amanda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=amanda"
    },
    {
      "username": "Emily",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=emily"
    },
    {
      "username": "Jason",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jason"
    }
  ],
  currentChatPartner: null,
  messageNotifications: {
    "general": {
      "room": "general",
      "unreadCount": 0,
      "lastMessage": {
        "room": "general",
        "message": "嗨嗨",
        "sender": "Jane",
        "replyToMessageId": "",
        "date": "2024-06-13T04:02:41.136Z",
        "id": "1900fc31370-8b08-6f1a",
        "isRecalled": false,
        "readBy": [
          "Jane",
          "Joe"
        ]
      }
    },
    "private": [
      {
        "username": "Jessica",
        "room": "private_Jessica_Joe",
        "status": "online",
        "unreadCount": 1,
        "lastMessage": {
          "to": "Joe",
          "message": "嗨嗨 Joe",
          "sender": "Jessica",
          "replyToMessageId": "",
          "date": "2024-06-13T04:03:34.001Z",
          "id": "1900fc3e1f1-ffef-2612",
          "isRead": false,
          "isRecalled": false,
          "room": "private_Jessica_Joe"
        }
      },
      {
        "username": "Joe",
        "room": "private_Joe_Joe",
        "status": "online",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Jane",
        "room": "private_Jane_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "John",
        "room": "private_John_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Linda",
        "room": "private_Linda_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "David",
        "room": "private_David_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Amanda",
        "room": "private_Amanda_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Emily",
        "room": "private_Emily_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Jason",
        "room": "private_Jason_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      }
    ]
  },
  allUnreadCount: 1,
  currentChatMessages: [],
}

// 進入其中一個聊天室後的資料
const mockEnterChatRoomEvents = [
  {
    "event": "privateMessageRead",
    "data": {
      "room": "private_Jessica_Joe"
    }
  },
  {
    "event": "privateMessageRead",
    "data": {
      "room": "private_Joe_Jessica"
    }
  },
  {
    "event": "unreadMessages",
    "data": {
      "room": "private_Jessica_Joe",
      "count": 0
    }
  }
]
const expectedStoreAfterEnterChatRoom = {
  "isSocketStable": true,
  "userInfo": {
    "username": "Joe",
    "status": "offline",
    "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
  },
  "currentRoom": "private_Jessica_Joe",
  "users": [
    {
      "username": "Joe",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
    },
    {
      "username": "Jane",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jane"
    },
    {
      "username": "John",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=john"
    },
    {
      "username": "Linda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=linda"
    },
    {
      "username": "David",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=david"
    },
    {
      "username": "Jessica",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jessica"
    },
    {
      "username": "Amanda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=amanda"
    },
    {
      "username": "Emily",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=emily"
    },
    {
      "username": "Jason",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jason"
    }
  ],
  "generalMessages": [
    {
      "room": "general",
      "message": "安安",
      "sender": "Joe",
      "replyToMessageId": "",
      "date": "2024-06-13T04:02:00.933Z",
      "id": "1900fc27665-65d0-7136",
      "isRecalled": false,
      "readBy": [
        "Joe",
        "Jane"
      ]
    },
    {
      "room": "general",
      "message": "嗨嗨",
      "sender": "Jane",
      "replyToMessageId": "",
      "date": "2024-06-13T04:02:41.136Z",
      "id": "1900fc31370-8b08-6f1a",
      "isRecalled": false,
      "readBy": [
        "Jane",
        "Joe"
      ]
    }
  ],
  "privateMessages": [
    {
      "to": "Joe",
      "message": "嗨嗨 Joe",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T04:03:34.001Z",
      "id": "1900fc3e1f1-ffef-2612",
      "isRead": true,
      "isRecalled": false,
      "room": "private_Jessica_Joe"
    },
    {
      "to": "Joe",
      "message": "嗨嗨 Joe",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T04:03:34.001Z",
      "id": "1900fc3e1f1-ffef-2612",
      "isRead": true,
      "isRecalled": false,
      "room": "private_Joe_Jessica"
    }
  ],
  "unreadCounts": {
    "private_Jessica_Joe": 0,
    "general": 0
  }
}
const expectedComputedStateAfterEnterChatRoom = {
  onlineUsers: [
    {
      "username": "Joe",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
    },
    {
      "username": "Jessica",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jessica"
    }
  ],
  offlineUsers: [
    {
      "username": "Jane",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jane"
    },
    {
      "username": "John",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=john"
    },
    {
      "username": "Linda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=linda"
    },
    {
      "username": "David",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=david"
    },
    {
      "username": "Amanda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=amanda"
    },
    {
      "username": "Emily",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=emily"
    },
    {
      "username": "Jason",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jason"
    }
  ],
  currentChatPartner: {
    "username": "Jessica",
    "status": "online",
    "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jessica"
  },
  messageNotifications: {
    "general": {
      "room": "general",
      "unreadCount": 0,
      "lastMessage": {
        "room": "general",
        "message": "嗨嗨",
        "sender": "Jane",
        "replyToMessageId": "",
        "date": "2024-06-13T04:02:41.136Z",
        "id": "1900fc31370-8b08-6f1a",
        "isRecalled": false,
        "readBy": [
          "Jane",
          "Joe"
        ]
      }
    },
    "private": [
      {
        "username": "Jessica",
        "room": "private_Jessica_Joe",
        "status": "online",
        "unreadCount": 0,
        "lastMessage": {
          "to": "Joe",
          "message": "嗨嗨 Joe",
          "sender": "Jessica",
          "replyToMessageId": "",
          "date": "2024-06-13T04:03:34.001Z",
          "id": "1900fc3e1f1-ffef-2612",
          "isRead": true,
          "isRecalled": false,
          "room": "private_Jessica_Joe"
        }
      },
      {
        "username": "Joe",
        "room": "private_Joe_Joe",
        "status": "online",
        "unreadCount": 0,
        "lastMessage": undefined,
      },
      {
        "username": "Jane",
        "room": "private_Jane_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined,
      },
      {
        "username": "John",
        "room": "private_John_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined,
      },
      {
        "username": "Linda",
        "room": "private_Linda_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined,
      },
      {
        "username": "David",
        "room": "private_David_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined,
      },
      {
        "username": "Amanda",
        "room": "private_Amanda_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined,
      },
      {
        "username": "Emily",
        "room": "private_Emily_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined,
      },
      {
        "username": "Jason",
        "room": "private_Jason_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined,
      }
    ]
  },
  allUnreadCount: 0,
  currentChatMessages: [
    {
      "to": "Joe",
      "message": "嗨嗨 Joe",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T04:03:34.001Z",
      "id": "1900fc3e1f1-ffef-2612",
      "isRead": true,
      "isRecalled": false,
      "room": "private_Jessica_Joe"
    }
  ]
}

// 新訊息 (General:2 + Private:1)
const mockNewMessagesEvents = [
  {
    "event": "unreadMessages",
    "data": {
      "room": "general",
      "count": 0
    }
  },
  {
    "event": "message",
    "data": {
      "room": "general",
      "message": "嗨嗨～",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T12:49:04.877Z",
      "id": "19011a5016d-90be-7fa5",
      "isRecalled": false,
      "readBy": [
        "Jessica"
      ]
    }
  },
  {
    "event": "unreadMessages",
    "data": {
      "room": "general",
      "count": 1
    }
  },
  {
    "event": "messagesReadByUpdated",
    "data": [
      {
        "id": "1900fc27665-65d0-7136",
        "readBy": [
          "Joe",
          "Jane",
          "Jessica"
        ]
      },
      {
        "id": "1900fc31370-8b08-6f1a",
        "readBy": [
          "Jane",
          "Joe",
          "Jessica"
        ]
      },
      {
        "id": "19011a5016d-90be-7fa5",
        "readBy": [
          "Jessica"
        ]
      }
    ]
  },
  {
    "event": "unreadMessages",
    "data": {
      "room": "general",
      "count": 1
    }
  },
  {
    "event": "privateMessage",
    "data": {
      "to": "Joe",
      "message": "嗨",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T12:49:10.420Z",
      "id": "19011a51714-11be-04bc",
      "isRead": false,
      "isRecalled": false,
      "room": "private_Jessica_Joe"
    }
  },
  {
    "event": "privateMessage",
    "data": {
      "to": "Joe",
      "message": "嗨",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T12:49:10.420Z",
      "id": "19011a51714-11be-04bc",
      "isRead": false,
      "isRecalled": false,
      "room": "private_Joe_Jessica"
    }
  },
  {
    "event": "unreadMessages",
    "data": {
      "room": "private_Jessica_Joe",
      "count": 1
    }
  },
  {
    "event": "message",
    "data": {
      "room": "general",
      "message": "😀",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T12:49:16.063Z",
      "id": "19011a52d1f-c7fe-7e6b",
      "isRecalled": false,
      "readBy": [
        "Jessica"
      ]
    }
  },
  {
    "event": "messagesReadByUpdated",
    "data": [
      {
        "id": "1900fc27665-65d0-7136",
        "readBy": [
          "Joe",
          "Jane",
          "Jessica"
        ]
      },
      {
        "id": "1900fc31370-8b08-6f1a",
        "readBy": [
          "Jane",
          "Joe",
          "Jessica"
        ]
      },
      {
        "id": "19011a5016d-90be-7fa5",
        "readBy": [
          "Jessica"
        ]
      },
      {
        "id": "19011a52d1f-c7fe-7e6b",
        "readBy": [
          "Jessica"
        ]
      }
    ]
  },
  {
    "event": "unreadMessages",
    "data": {
      "room": "general",
      "count": 2
    }
  }
];

const expectedStoreAfterNesMessages = {
  "isSocketStable": true,
  "userInfo": {
    "username": "Joe",
    "status": "offline",
    "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
  },
  "currentRoom": "",
  "users": [
    {
      "username": "Joe",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
    },
    {
      "username": "Jane",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jane"
    },
    {
      "username": "John",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=john"
    },
    {
      "username": "Linda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=linda"
    },
    {
      "username": "David",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=david"
    },
    {
      "username": "Jessica",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jessica"
    },
    {
      "username": "Amanda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=amanda"
    },
    {
      "username": "Emily",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=emily"
    },
    {
      "username": "Jason",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jason"
    }
  ],
  "generalMessages": [
    {
      "room": "general",
      "message": "安安",
      "sender": "Joe",
      "replyToMessageId": "",
      "date": "2024-06-13T04:02:00.933Z",
      "id": "1900fc27665-65d0-7136",
      "isRecalled": false,
      "readBy": [
        "Joe",
        "Jane",
        "Jessica"
      ]
    },
    {
      "room": "general",
      "message": "嗨嗨",
      "sender": "Jane",
      "replyToMessageId": "",
      "date": "2024-06-13T04:02:41.136Z",
      "id": "1900fc31370-8b08-6f1a",
      "isRecalled": false,
      "readBy": [
        "Jane",
        "Joe",
        "Jessica"
      ]
    },
    {
      "room": "general",
      "message": "嗨嗨～",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T12:49:04.877Z",
      "id": "19011a5016d-90be-7fa5",
      "isRecalled": false,
      "readBy": [
        "Jessica"
      ]
    },
    {
      "room": "general",
      "message": "😀",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T12:49:16.063Z",
      "id": "19011a52d1f-c7fe-7e6b",
      "isRecalled": false,
      "readBy": [
        "Jessica"
      ]
    }
  ],
  "privateMessages": [
    {
      "to": "Joe",
      "message": "嗨嗨 Joe",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T04:03:34.001Z",
      "id": "1900fc3e1f1-ffef-2612",
      "isRead": false,
      "isRecalled": false,
      "room": "private_Jessica_Joe"
    },
    {
      "to": "Joe",
      "message": "嗨嗨 Joe",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T04:03:34.001Z",
      "id": "1900fc3e1f1-ffef-2612",
      "isRead": false,
      "isRecalled": false,
      "room": "private_Joe_Jessica"
    },
    {
      "to": "Joe",
      "message": "嗨",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T12:49:10.420Z",
      "id": "19011a51714-11be-04bc",
      "isRead": false,
      "isRecalled": false,
      "room": "private_Jessica_Joe"
    },
    {
      "to": "Joe",
      "message": "嗨",
      "sender": "Jessica",
      "replyToMessageId": "",
      "date": "2024-06-13T12:49:10.420Z",
      "id": "19011a51714-11be-04bc",
      "isRead": false,
      "isRecalled": false,
      "room": "private_Joe_Jessica"
    }
  ],
  "unreadCounts": {
    "private_Jessica_Joe": 1,
    "general": 2
  }
}

const expectedComputedStateAfterNesMessages = {
  onlineUsers: [
    {
      "username": "Joe",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=joe"
    },
    {
      "username": "Jessica",
      "status": "online",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jessica"
    }
  ],
  offlineUsers: [
    {
      "username": "Jane",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jane"
    },
    {
      "username": "John",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=john"
    },
    {
      "username": "Linda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=linda"
    },
    {
      "username": "David",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=david"
    },
    {
      "username": "Amanda",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=amanda"
    },
    {
      "username": "Emily",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=emily"
    },
    {
      "username": "Jason",
      "status": "offline",
      "avatar": "https://api.dicebear.com/8.x/pixel-art/svg?seed=jason"
    }
  ],
  currentChatPartner: null,
  messageNotifications: {
    "general": {
      "room": "general",
      "unreadCount": 2,
      "lastMessage": {
        "room": "general",
        "message": "😀",
        "sender": "Jessica",
        "replyToMessageId": "",
        "date": "2024-06-13T12:49:16.063Z",
        "id": "19011a52d1f-c7fe-7e6b",
        "isRecalled": false,
        "readBy": [
          "Jessica"
        ]
      }
    },
    "private": [
      {
        "username": "Jessica",
        "room": "private_Jessica_Joe",
        "status": "online",
        "unreadCount": 1,
        "lastMessage": {
          "to": "Joe",
          "message": "嗨",
          "sender": "Jessica",
          "replyToMessageId": "",
          "date": "2024-06-13T12:49:10.420Z",
          "id": "19011a51714-11be-04bc",
          "isRead": false,
          "isRecalled": false,
          "room": "private_Jessica_Joe"
        }
      },
      {
        "username": "Joe",
        "room": "private_Joe_Joe",
        "status": "online",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Jane",
        "room": "private_Jane_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "John",
        "room": "private_John_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Linda",
        "room": "private_Linda_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "David",
        "room": "private_David_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Amanda",
        "room": "private_Amanda_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Emily",
        "room": "private_Emily_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      },
      {
        "username": "Jason",
        "room": "private_Jason_Joe",
        "status": "offline",
        "unreadCount": 0,
        "lastMessage": undefined
      }
    ]
  },
  allUnreadCount: 3,
  currentChatMessages: []
}

// 要 export 的測試資料
const connectionTestData = {
  mockToken,
  mockViteEnv,
  expectedWebSocketUrl: mockViteEnv.VITE_WS_BASE_URL + '?token=' + mockToken
}

const webSocketOpenTestData = {
  mockEvents: mockWebSocketOpenEvents,
  expectedStore: expectedStoreAfterWebSocketOpen,
  expectedComputed: expectedComputedStateAfterWebSocketOpen
}

const recallMessageTestData = {
  mockEvents: mockRecallMessageEvents,
  expectedStore: expectedStoreAfterRecallMessage,
  expectedComputed: expectedComputedStateAfterRecallMessage
}

const undoRecallMessageTestData = {
  mockEvents: mockUndoRecallMessageEvents,
  expectedStore: expectedStoreAfterUndoRecallMessage,
  expectedComputed: expectedComputedStateAfterUndoRecallMessage
}

const enterChatRoomTestData = {
  params: {
    room: "private_Jessica_Joe"
  },
  mockEvents: mockEnterChatRoomEvents,
  expectedStore: expectedStoreAfterEnterChatRoom,
  expectedComputed: expectedComputedStateAfterEnterChatRoom
}

const newMessagesTestData = {
  mockEvents: mockNewMessagesEvents,
  expectedStore: expectedStoreAfterNesMessages,
  expectedComputed: expectedComputedStateAfterNesMessages
}

const apiTestData = {
  mockUserInfo,
  mockUsers,
  expectedStoreUserInfo: mockUserInfo,
  expectedStoreUsers: mockUsers
}

const setCurrentRoomTestData = {
  params: {
    room: 'private_Jessica_Joe'
  },
  expectedStoreCurrentRoom: 'private_Jessica_Joe'
}

const sendGeneralMessageTestData = {
  params: {
    message: '安安',
    replyToMessageId: 'abc-123',
    room: 'general'
  },
  expectedSocketSend: {
    "event": "message",
    "data": {
      "room": "general",
      "message": '安安',
      "sender": mockUserInfo.username,
      "replyToMessageId": 'abc-123'
    }
  }
}

const sendPrivateMessageTestData = {
  params: {
    message: '嗨嗨',
    replyToMessageId: 'abc-12456',
    room: 'private_Jessica_Joe'
  },
  expectedSocketSend: {
    "event": "privateMessage",
    "data": {
      "to": "Jessica",
      "message": '嗨嗨',
      "sender": mockUserInfo.username,
      "replyToMessageId": 'abc-12456'
    }
  }
}

const sendMarkGeneralAsReadTestData = {
  params: {
    room: 'general'
  },
  expectedSocketSend: {
    "event": "markAsRead",
    "data": {
      "room": 'general',
      "type": 'general',
      "reader": mockUserInfo.username
    }
  }
}

const sendMarkPrivateAsReadTestData = {
  params: {
    room: 'private_Jessica_Joe',
  },
  expectedSocketSend: {
    "event": "markAsRead",
    "data": {
      "room": 'private_Jessica_Joe',
      "type": 'private',
      "reader": mockUserInfo.username
    }
  }
}

const sendRecallMessageTestData = {
  params: {
    room: 'private_Jessica_Joe',
    id: 'abc-123456'
  },
  expectedSocketSend: {
    "event": "recallMessage",
    "data": {
      "room": 'private_Jessica_Joe',
      "id": 'abc-123456'
    }
  }
}

const sendUndoRecallMessageTestData = {
  params: {
    room: 'private_Jessica_Joe',
    id: 'abc-123456'
  },
  expectedSocketSend: {
    "event": "undoRecallMessage",
    "data": {
      "room": 'private_Jessica_Joe',
      "id": 'abc-123456'
    }
  }
}

export {
  apiTestData,
  connectionTestData,
  webSocketOpenTestData,
  recallMessageTestData,
  undoRecallMessageTestData,
  enterChatRoomTestData,
  newMessagesTestData,
  setCurrentRoomTestData,
  sendGeneralMessageTestData,
  sendPrivateMessageTestData,
  sendMarkGeneralAsReadTestData,
  sendMarkPrivateAsReadTestData,
  sendRecallMessageTestData,
  sendUndoRecallMessageTestData,
}