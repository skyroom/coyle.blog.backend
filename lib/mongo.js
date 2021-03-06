var config = require('config-lite')(__dirname);
var Mongolass = require('mongolass');
// console.log('ObjectID', Mongolass.ObjectID)
var mongolass = new Mongolass();

// 连接数据库
mongolass.connect(config.mongodb);

var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
    afterFind: function(results) {
        results.forEach(function(item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm:ss');
        });
        return results;
    },
    afterFindOne: function(result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format();
        }
        return result;
    },
    beforeInsertOne: function (format) {
        // console.log('beforeInsertOne', this._op, this._args, format)
        // beforeInsert insert [ { firstname: 'san', lastname: 'zhang' } ] YYYY-MM-DD
        this._args[0].createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    },
});

exports.Article = mongolass.model('articles', {
    title: {
        type: 'string'
    },
    short: {
        type: 'string'
    },
    content: {
        type: 'string'
    },
    // tag: {
    //     type: 'string',
    // }
    createdAt: {
        type: 'string',
    }
});

// 文章标题唯一
exports.Article.createIndex({
    title: 1
}, {
    unique: true
}).exec();

exports.Article.createIndex({
    _id: -1
}).exec(); // 按创建时间降序查看文章列表

exports.User = mongolass.model('user', {
    username: {
        type: 'string'
    },
    password: {
        type: 'string'
    },
});

// 根据用户名找到用户，用户名全局唯一
exports.User.createIndex({
    username: 1
}, {
    unique: true
}).exec();


// Post model
// exports.Post = mongolass.model('Post', {
//     author: {
//         type: Mongolass.Types.ObjectId
//     },
//     title: {
//         type: 'string'
//     },
//     content: {
//         type: 'string'
//     },
//     pv: {
//         type: 'number'
//     }
// });
// exports.Post.index({
//     author: 1,
//     _id: -1
// }).exec(); // 按创建时间降序查看用户的文章列表
//
// // Comment model
// exports.Comment = mongolass.model('Comment', {
//     author: {
//         type: Mongolass.Types.ObjectId
//     },
//     content: {
//         type: 'string'
//     },
//     postId: {
//         type: Mongolass.Types.ObjectId
//     }
// });
// exports.Comment.index({
//     postId: 1,
//     _id: 1
// }).exec(); // 通过文章 id 获取该文章下所有留言，按留言创建时间升序
// exports.Comment.index({
//     author: 1,
//     _id: 1
// }).exec(); // 通过用户 id 和留言 id 删除一个留言
