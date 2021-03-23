
const jwt = require('jsonwebtoken')
const Users = require('../models/users')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        try {
            jwt.verify(token, process.env.JWT_KEY)
            const user = await Users.findOne({ 'tokens.token': token })
            if (!user) {
                throw new Error()
            }
            req.user = user
            req.token = token
            next()
        } catch (e) {
            res.status(401).json({ message: 'Not authorized to access this resource' })
        }
    }
    else {
        res.status(401).json({ message: 'No token provided' })
    }
};

module.exports = auth