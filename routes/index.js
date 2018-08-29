var express = require('express');
var path = require('path');
var router = express.Router();
var myJwt = require('../lib/jsonwebtoken');

const multer = require("multer");

//文件上传所需代码
//设置文件上传路径和文件命名
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        //文件上传成功后会放入public下的upload文件夹
        cb(null, './public/upload')
    },
    filename: function (req, file, cb){
        //设置文件的名字为其原本的名字，也可以添加其他字符，来区别相同文件，例如file.originalname+new Date().getTime();利用时间来区分
        console.log('file.originalname is', file.originalname);
        var pIndex = file.originalname.lastIndexOf('.');
        var length = file.originalname.length;
        var houzui = file.originalname.substring(pIndex + 1, length);
        var name = file.originalname.substring(0, pIndex);
        var tempName = name + Date.now() + '.' + houzui;
        console.log('tempName is', tempName);
        cb(null, tempName);
    }
});

var upload = multer({
    storage: storage
});

// 首页 文章预览接口
router.post('/articles-view', require('./articles').getArticleViewByFront);

// 文章列表接口
router.get('/articles-list', require('./articles').getArticleListByFront);

// 文章详情接口
router.get('/article/:id', require('./articles').getArticleByFront);

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
router.post('/back/articles-list', require('./articles').getArticleListByBack);

// 后台添加文章
router.post('/back/article', require('./articles').addArticleListByBack);

// 后台删除文章
router.delete('/back/article/:id', require('./articles').deleteArticleListByBack);

// 后台编辑文章
router.put('/back/article/:id', require('./articles').editArticleListByBack);

// 文件上传
router.post('/back/upload', upload.single('file'), function(req, res, next) {
    //拼接文件上传后的网络路径
	console.log("file:" + req.file.filename)
    var url = 'http://' + req.headers.host + '/upload/' + req.file.filename;
    console.log("url:" + url);
    res.json({
        code: 200,
        data: url,
    });
});

module.exports = router;
