export default [
  {
    url: '/api/getUserInfo', // 注意，这里只能是string格式
    method: 'get',
    response: () => {
      return {

          data: [
            { id: 1, user_name: '小鱼', group_name: '开发', is_active: 0 },
            { id: 2, user_name: '李李好', group_name: '开发', is_active: 0 },
            { id: 3, user_name: '脆脆鲨', group_name: '秘书处', is_active: 1 },
            { id: 4, user_name: '崔东山', group_name: '设计', is_active: 1 },
            { id: 5, user_name: '智慧狗', group_name: '开发', is_active: 0 },
            { id: 6, user_name: '笨蛋猫', group_name: '秘书处', is_active: 0 },
            { id: 7, user_name: '大卷卷', group_name: '开发', is_active: 0 },
            { id: 8, user_name: '小卷卷', group_name: '设计', is_active: 0 },
            { id: 9, user_name: '张三', group_name: '开发', is_active: 0 },
            { id: 10, user_name: '李四', group_name: '设计', is_active: 0 },
            { id: 11, user_name: '王五', group_name: '开发', is_active: 1 },
            { id: 12, user_name: '赵六七八九', group_name: '开发', is_active: 1 },
            { id: 13, user_name: '李李坏', group_name: '开发', is_active: 1 },
          ],
        
      }
    }
  }
]

