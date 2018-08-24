var User = require('../lib/mongo').User;

module.exports = {
    // 注册一个用户
    // create: function create(user) {
    //     return User.insertOne(user).exec();
    // },

    // 通过用户名获取用户信息
    getUserByName: function getUserByName(username, password) {
        console.log('这里的name is ', username, password);
        return User
            .find({
                username: username,
                password: password
            })
            .addCreatedAt()
            .exec();
    }
};
