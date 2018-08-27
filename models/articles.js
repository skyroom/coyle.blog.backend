var { ObjectID } = require('mongolass');
var Article = require('../lib/mongo').Article;

module.exports = {
    // 注册一个用户
    // create: function create(user) {
    //     return User.insertOne(user).exec();
    // },

    // 添加文章
    addArticle: (params) => {
        console.log('这里的params is ', params);
        return Article
            .insertOne(params)
            .addCreatedAt()
            .exec()
            .then((result) => {
                // console.log('添加文章操作数据库then', result);
                return Promise.resolve(result);
            })
            .catch((err) => {
                return Promise.reject(err);
            })
    },
    getArticleListByBack: () => {
        return Article
            .find()
            .exec()
            .then((result) => {
                // console.log('获取的结果是111', result);
                return Promise.resolve(result);
            })
            .catch((err) => {
                return Promise.reject(err);
            })
    },
    deleteArticle: (id) => {
        return Article
            .deleteOne({
                _id: new ObjectID(id),
            })
            .exec()
            .then((result) => {
                console.log('删除的结果是111', result);
                return Promise.resolve(result);
            })
            .catch((err) => {
                console.log('删除错误的结果是111', result);
                return Promise.reject(err);
            })
    },
};
