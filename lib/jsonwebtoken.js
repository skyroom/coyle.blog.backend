const jwt = require('jsonwebtoken')
var config = require('config-lite')(__dirname);

// 密钥
// const secret = 'COYLEYUN'

function signToken(username) {
    // 签发 Token   过期时间1分钟
    var exp = Math.ceil(Date.now() / 1000) + config.expiresIn;
    console.log('exp is', exp);

    // Token 数据
    const payload = {
        username: username,
        admin: true,
        exp: exp,
    }


    // const token = jwt.sign(payload, config.secret, { expiresIn: exp });
    const token = jwt.sign(payload, config.secret);

    // 输出签发的 Token
    return token;
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secret, (error, decoded) => {
            if (error) {
                console.log(error.message)
                reject(error)
            }
            resolve(decoded)
        })
    })
}

module.exports = {
    signToken,
    verifyToken,
}
