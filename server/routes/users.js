const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const auth = require ('../middleware/auth')

//get all users
router.get('/', auth, async (req, res) => {
    try {
        const users = await Users.find({}, {
            password: 0
        })
        res.json(users)
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

//get user info
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

//create new user
router.post('/new', async (req, res) => {
    const user = new Users({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    try {
        await user.save()
        res.status(201).json({ message: 'User created.'})
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})

//update user
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.username != null) {
        res.user.username = req.body.username
    }
    if (req.body.password != null) {
        res.user.password = req.body.password
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }
    try {
        await res.user.save()
        res.status(201).json({ message: 'User information successfuly updated'})
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})

//delete user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Deleted user'})
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

async function getUser(req, res, next) {
    try {
        user = await Users.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user'})
        }
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
    res.user = user
    next()
}

module.exports = router