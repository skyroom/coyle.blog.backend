const jwt = require('jsonwebtoken')

// 密钥
const secret = 'COYLEYUN'

function signToken(username) {
    // Token 数据
    const payload = {
        username: username,
        admin: true
    }

    // 签发 Token   过期时间1分钟
    const token = jwt.sign(payload, secret, { expiresIn: Math.floor(Date.now() / 1000) + 60 });

    // 输出签发的 Token
    return token;
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error, decoded) => {
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
