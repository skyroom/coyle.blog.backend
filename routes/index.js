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
        next();
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

module.exports = router;
