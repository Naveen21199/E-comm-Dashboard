const jwt = require('jsonwebtoken')
function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1]
        // console.log("middleware called if", token)
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, valid) => {
            if (err) {
                res.status(401).send('Please provide a valid token')

            } else {
                next()
            }
        })

    } else {
        res.status(403).send('Please add token with header')

    }
}

module.exports = { verifyToken }