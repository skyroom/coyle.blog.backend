// var express = require('express');
// var router = express.Router();
// var PostModel = require('../models/posts');
// var CommentModel = require('../models/comments');
// var checkLogin = require('../middlewares/check').checkLogin;

// GET /posts 所有用户或者特定用户的文章页
//   eg: GET /posts?author=xxx



// 此文件主要处理首页请求-文章列表
var Article = require('../models/articles');

// 前台获取文章预览列表
var getArticleViewByFront = function(req, res, next) {
    Article.getArticleViewByFront(req.body.title || '')
    .then((data) => {
        res.json({
            code: 200,
            data: data,
            msg: ''
        });
    })
    .catch((err) => {
        console.log('前台获取文章列表发生错误', err);
        res.json({
            code: 500,
            msg: err,
        });
    });
}

// 前台获取文章列表
var getArticleListByFront = function(req, res, next) {
    res.send('这是首页列表接口');
}

// 前台获取文章详情
var getArticleByFront = function(req, res, next) {
    console.log('前台获取文章详情的id is', req.params.id);
    Article.getArticleByFront(req.params.id)
    .then((data) => {
        res.json({
            code: 200,
            data: data,
            msg: ''
        });
    })
    .catch((err) => {
        console.log('前台获取文章列表发生错误', err);
        res.json({
            code: 500,
            msg: err,
        });
    });
}


// 后台获取文章列表
var getArticleListByBack = function(req, res, next) {
    Article.getArticleListByBack(req.body || {})
    .then((data) => {
        res.json({
            code: 200,
            data: data,
            msg: ''
        });
    })
    .catch((err) => {
        console.log('后台获取文章列表发生错误', err);
        res.json({
            code: 500,
            msg: err,
        });
    });
}

// 后台添加文章
var addArticleListByBack = function(req, res, next) {
    console.log('添加文章的body is', req.body);
    Article.addArticle(req.body)
    .then((data) => {
        res.json({
            code: 200,
            msg: ''
        });
    })
    .catch((err) => {
        console.log('后台添加文章发生错误', String(err));
        if (String(err).indexOf('duplicate key') > -1) {
            res.json({
                code: 400,
                msg: '标题重复，请更改标题',
            });
        }
        res.json({
            code: 500,
            msg: err,
        });
    });
}

// 删除文章
var deleteArticleListByBack = function(req, res, next) {
    console.log('删除文章的id is', req.params.id);
    Article.deleteArticle(req.params.id)
    .then((data) => {
        res.json({
            code: 200,
            msg: ''
        });
    })
    .catch((err) => {
        console.log('后台删除文章发生错误', String(err));
        res.json({
            code: 500,
            msg: err,
        });
    });
}

// 编辑文章
var editArticleListByBack = function(req, res, next) {
    console.log('编辑文章的id is', req.params.id);
    console.log('编辑文章的body is', req.body);
    Article.editArticle(req.params.id, req.body)
    .then((data) => {
        res.json({
            code: 200,
            msg: ''
        });
    })
    .catch((err) => {
        console.log('后台编辑文章发生错误', String(err));
        res.json({
            code: 500,
            msg: err,
        });
    });
}

module.exports = {
    getArticleViewByFront: getArticleViewByFront,
    getArticleListByFront: getArticleListByFront,
    getArticleByFront: getArticleByFront,
    getArticleListByBack: getArticleListByBack,
    addArticleListByBack: addArticleListByBack,
    deleteArticleListByBack: deleteArticleListByBack,
    editArticleListByBack: editArticleListByBack,
};

// router.get('/', function(req, res, next) {
//     var author = req.query.author;
//
//     PostModel.getPosts(author)
//         .then(function(posts) {
//             res.render('posts', {
//                 posts: posts
//             });
//         })
//         .catch(next);
// });
//
// // GET /posts/create 发表文章页
// router.get('/create', checkLogin, function(req, res, next) {
//     res.render('create');
// });
//
// // POST /posts 发表一篇文章
// router.post('/', checkLogin, function(req, res, next) {
//     var author = req.session.user._id;
//     var title = req.fields.title;
//     var content = req.fields.content;
//
//     // 校验参数
//     try {
//         if (!title.length) {
//             throw new Error('请填写标题');
//         }
//         if (!content.length) {
//             throw new Error('请填写内容');
//         }
//     } catch (e) {
//         req.flash('error', e.message);
//         return res.redirect('back');
//     }
//
//     var post = {
//         author: author,
//         title: title,
//         content: content,
//         pv: 0
//     };
//
//     PostModel.create(post)
//         .then(function(result) {
//             // 此 post 是插入 mongodb 后的值，包含 _id
//             post = result.ops[0];
//             req.flash('success', '发表成功');
//             // 发表成功后跳转到该文章页
//             res.redirect(`/posts/${post._id}`);
//         })
//         .catch(next);
// });
//
// // GET /posts/:postId 单独一篇的文章页
// router.get('/:postId', function(req, res, next) {
//     var postId = req.params.postId;
//
//     Promise.all([
//             PostModel.getPostById(postId), // 获取文章信息
//             CommentModel.getComments(postId), // 获取该文章所有留言
//             PostModel.incPv(postId) // pv 加 1
//         ])
//         .then(function(result) {
//             var post = result[0];
//             var comments = result[1];
//             if (!post) {
//                 throw new Error('该文章不存在');
//             }
//
//             res.render('post', {
//                 post: post,
//                 comments: comments
//             });
//         })
//         .catch(next);
// });
//
// // GET /posts/:postId/edit 更新文章页
// router.get('/:postId/edit', checkLogin, function(req, res, next) {
//     var postId = req.params.postId;
//     var author = req.session.user._id;
//
//     PostModel.getRawPostById(postId)
//         .then(function(post) {
//             if (!post) {
//                 throw new Error('该文章不存在');
//             }
//             if (author.toString() !== post.author._id.toString()) {
//                 throw new Error('权限不足');
//             }
//             res.render('edit', {
//                 post: post
//             });
//         })
//         .catch(next);
// });
//
// // POST /posts/:postId/edit 更新一篇文章
// router.post('/:postId/edit', checkLogin, function(req, res, next) {
//     var postId = req.params.postId;
//     var author = req.session.user._id;
//     var title = req.fields.title;
//     var content = req.fields.content;
//
//     PostModel.updatePostById(postId, author, {
//             title: title,
//             content: content
//         })
//         .then(function() {
//             req.flash('success', '编辑文章成功');
//             // 编辑成功后跳转到上一页
//             res.redirect(`/posts/${postId}`);
//         })
//         .catch(next);
// });
//
// // GET /posts/:postId/remove 删除一篇文章
// router.get('/:postId/remove', checkLogin, function(req, res, next) {
//     var postId = req.params.postId;
//     var author = req.session.user._id;
//
//     PostModel.delPostById(postId, author)
//         .then(function() {
//             req.flash('success', '删除文章成功');
//             // 删除成功后跳转到主页
//             res.redirect('/posts');
//         })
//         .catch(next);
// });
//
// // POST /posts/:postId/comment 创建一条留言
// router.post('/:postId/comment', checkLogin, function(req, res, next) {
//     var author = req.session.user._id;
//     var postId = req.params.postId;
//     var content = req.fields.content;
//     var comment = {
//         author: author,
//         postId: postId,
//         content: content
//     };
//
//     CommentModel.create(comment)
//         .then(function() {
//             req.flash('success', '留言成功');
//             // 留言成功后跳转到上一页
//             res.redirect('back');
//         })
//         .catch(next);
// });
//
// // GET /posts/:postId/comment/:commentId/remove 删除一条留言
// router.get('/:postId/comment/:commentId/remove', checkLogin, function(req, res, next) {
//     var commentId = req.params.commentId;
//     var author = req.session.user._id;
//
//     CommentModel.delCommentById(commentId, author)
//         .then(function() {
//             req.flash('success', '删除留言成功');
//             // 删除成功后跳转到上一页
//             res.redirect('back');
//         })
//         .catch(next);
// });
