import Mock from 'mockjs'

let data = {
    users: []
};

for (let i = 1; i <= 30; i++) {
    data.users.push(Mock.mock({
        id: i,
        username: '@first',
        password: '123456',
        avatar: '@image',
        nickname: '@name',
        // avatar: Mock.Random.image(),
        created_at: '@datetime',
        updated_at: '@datetime',
        deleted_at: null
    }))
}

data.users[0].username = 'admin'


export default data
