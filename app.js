var config = require('config-lite')(__dirname);
var express = require('express');
var routes = require('./routes');
var bodyParser = require('body-parser')


var app = express();

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization,Content-Type,token");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// app.get('/', function(req, res) {
//     res.send('Hello World!');
// });

// app.get('/b', function(req, res, next) {
//     console.log('response will be sent by the next function ...');
//     next();
// }, function(req, res) {
//     res.send('Hello from B!');
// });

// 获取所有的用户
// app.get('/users', function(req, res) {
//     getUsers(res);
// });


// 路由
app.use('/blog', routes);

var server = app.listen(config.port, function() {
    console.log(server.address());
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
console.log('                   ');

// var Mongolass = require('mongolass');
// var mongolass = new Mongolass();
//
// // 连接数据库
// mongolass.connect('mongodb://localhost:27017/users');
//
// var User = mongolass.model('students', {
//     name: {
//         type: 'string'
//     },
//     password: {
//         type: 'string'
//     },
//     gender: {
//         type: 'string',
//         enum: ['m', 'f', 'x']
//     }
// });

// User.createIndex({
//     name: 1
// }, {
//     unique: true
// }).exec(); // 根据用户名找到用户，用户名全局唯一
//
// User.createIndex({
//     password: 1,
//     _id: 1
// }).exec(); // 看看password
//
// var user1 = {
//     name: '王浩insertOne',
//     password: '2',
//     gender: 'm'
// }
//
// var user2 = {
//     name: '王浩insertOne',
//     password: '1',
//     gender: 'm'
// }
//
// User.insertOne(user1).exec().then((d) => {
//     User.insertOne(user2).exec().then((d) => {
//         console.log('d is ', d);
//     }).catch((e) => {
//         console.log('e is ', e);
//     })
// }).catch((e) => {
//     console.log('e is ', e);
// })

// function getUsers(res) {
//     var findResult = User.find({
//         name: '王浩insertOne'
//     })
//     .sort({
//         _id: 1
//     })
//     .exec();
//
//     findResult.then((data) => {
//         console.log(data);
//         // res.json(data);
//     });
// }
// getUsers();
