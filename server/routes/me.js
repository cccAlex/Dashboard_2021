const express = require('express')
const router = express.Router()
const auth = require ('../middleware/auth')

//get user info
router.get('/me', auth, (req, res) => {
    res.status(201).json({ data: req.user})
})

//update user
router.patch('/me', auth, async (req, res) => {
    if (req.body.username != null) {
        req.user.username = req.body.username
    }
    if (req.body.password != null) {
        req.user.password = req.body.password
    }
    if (req.body.email != null) {
        req.user.email = req.body.email
    }
    try {
        await req.user.save()
        res.status(201).json({ message: 'User information successfuly updated'})
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})

//delete user
router.delete('/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.status(201).json({ message: 'Deleted user'})
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

module.exports = router