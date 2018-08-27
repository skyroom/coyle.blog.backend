module.exports = {
    port: 3001,
    session: {
        secret: 'nodeblog',
        key: 'nodeblog',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/blog',
    secret: 'COYLEYUN', // 秘钥
    expiresIn: 60 * 60 * 24, // 过期时间，秒
};

// port: 程序启动要监听的端口号
// session: express-session 的配置信息，后面介绍
// mongodb: mongodb 的地址，nodeblog 为 db 名
