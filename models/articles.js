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
    getArticleListByBack: (params) => {
        let filter = {};
        for (var key in params) {
            if (params[key]) {
                if (key === 'id') {
                    filter._id = new ObjectID(params[key]);
                }
                if (key === 'title') {
                    filter.title = new RegExp(params[key]);
                }
            }
        }
        return Article
            .find(filter)
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
    editArticle: (id, data) => {
        return Article
            .updateOne({
                _id: new ObjectID(id),
            }, {
                $set: data
            })
            .exec()
            .then((result) => {
                console.log('编辑的结果是111', result);
                return Promise.resolve(result);
            })
            .catch((err) => {
                console.log('编辑错误的结果是111', err);
                return Promise.reject(err);
            })
    },
    getArticleViewByFront: (title) => {
        console.log('title is ', title);
        let filter = {}
        if (title) {
            filter = {
                title: new RegExp(title),
            };
        }
        return Article
            .find(filter)
            .exec()
            .then((result) => {
                console.log('前台获取的文章结果是111', result);
                return Promise.resolve(result);
            })
            .catch((err) => {
                return Promise.reject(err);
            })
    },
    getArticleByFront: (id) => {
        console.log('前台文章详情id is ', id);
        let filter = {
            _id: new ObjectID(id),
        }
        return Article
            .findOne(filter)
            .exec()
            .then((result) => {
                console.log('前台获取的文章详情是111', result);
                return Promise.resolve(result);
            })
            .catch((err) => {
                return Promise.reject(err);
            })
    },
};
