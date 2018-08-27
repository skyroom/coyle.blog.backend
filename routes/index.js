var express = require('express');
var router = express.Router();
var myJwt = require('../lib/jsonwebtoken');

// 首页 文章预览接口
router.get('/articles-view', require('./articles').getArticleViewByFront);

// 文章列表接口
router.get('/articles-list', require('./articles').getArticleListByFront);

// 登录
router.post('/back/login', require('./user').login);

// 此路由中间件用来控制验证登录
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    var token = req.headers['token'];
    console.log('我拿到的token is ', token);
    var verifyResult = myJwt.verifyToken(token);
    verifyResult
    .then((decoded) => {
        console.log('decoded is ', decoded);
        var current = Date.now();
        console.log('现在的时间是: ', current);
        console.log('过期的时间是: ', decoded.exp * 1000)
        if (current >= decoded.exp * 1000) {
            // 说明token过期
            res.json({
                code: 401,
                msg: '没有登录'
            });
        } else {
            next();
        }
    })
    .catch(() => {
        res.json({
            code: 401,
            msg: '没有登录'
        });
    });
});

// 后台获取文章列表
router.get('/back/articles-list', require('./articles').getArticleListByBack);

// 后台添加文章
router.post('/back/article', require('./articles').addArticleListByBack);

// 后台删除文章
router.delete('/back/article/:id', require('./articles').deleteArticleListByBack);

module.exports = router;
