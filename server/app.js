require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')
const Users = require('./models/users')
const auth = require ('./middleware/auth')
const moment = require('moment')
const axios = require('axios')
const randomstring = require('randomstring')

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', (error) => console.log('Connected to database.'))

app.post('/register', async (req, res) => {
    try {
        const user = new Users({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        })
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).json({ message: 'User registered.', token})
    } catch (e) {
        res.status(500).json({ message: e.message})
    }
})

app.post('/loginfb', async (req, res) => {
    if (req.body.userAccessToken) {
        try {
            await axios.get(process.env.FACEBOOK_API + req.body.userAccessToken)
            .then( async (response) => {
                const user = await Users.findOne({ username: response.data.name.replace(' ', '') })
                if (!user) {
                    const newUser = new Users({
                        username: response.data.name.replace(' ', ''),
                        password: randomstring.generate(),
                        email: response.data.name.replace(' ', '') + '@' + response.data.name.replace(' ', '') + '.fb'
                    })
                    await newUser.save()
                    const token = await newUser.generateAuthToken()
                    res.status(201).json({ message: 'User logged in', token })
                } else {
                    const token = await user.generateAuthToken()
                    res.status(201).json({ message: 'User logged in', token })
                }
            })
            .catch(e => {
                res.status(500).json({ message: e.message })
            })
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    } else {
        res.status(500).json({ message: 'No facebook access token provided' })
    }
})

app.post('/login', async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email })
        if (!user) {
            res.status(500).json({ message: 'Incorect Credentials'})
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = await user.generateAuthToken()
            res.status(201).json({ message: 'User logged in', token})
        } else {
            res.status(500).json({ message: 'Incorect Credentials'})
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
})

app.get('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.status(201).json({ message: 'Successfully logged out'})
    } catch (error) {
        res.status(500).json({ message: 'Error logging out '})
    }
})

app.get('/logoutall', auth, async(req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.status(201).json({ message: 'Successfully logged out'})
    } catch (error) {
        res.status(500).json({ message: 'Error logoutall '})
    }
})

app.get('/about.json', (req, res) => {
    res.status(201).json({
    "client": {
        "host": req.headers['x-forwarded-for'] ||
                req.ip.replace('::ffff:', '') ||
                req.connection.remoteAddress ||
                '127.0.0.1',
    },
    "server": {
        "current_time": moment().unix(),
        "services": [
            {
                "name": "Covid",
                "widgets": [
                    {
                        "name": "covidConfirmed",
                        "description": "Display a graph of confirmed cases for a specific country since the beginning of the pandemic",
                        "params": [
                            {
                                "name": "country",
                                "type": "string"
                            },
                            {
                                "name": "refresh_rate",
                                "type": "integer"
                            },
                        ]
                    },
                    {
                        "name": "covidDeath",
                        "description": "Display a graph of death cases for a specific country since the beginning of the pandemic",
                        "params": [
                            {
                                "name": "country",
                                "type": "string"
                            },
                            {
                                "name": "refresh_rate",
                                "type": "integer"
                            },
                        ]
                    }
                    ,
                    {
                        "name": "covidRecovered",
                        "description": "Display a graph of recovered cases for a specific country since the beginning of the pandemic",
                        "params": [
                            {
                                "name": "country",
                                "type": "string"
                            },
                            {
                                "name": "refresh_rate",
                                "type": "integer"
                            },
                        ]
                    }
                ]
            },
            {
                "name": "Weather",
                "widgets": [
                    {
                        "name": "weatherCurrent",
                        "description": "Display a the current weather for a specific location",
                        "params": [
                            {
                                "name": "city",
                                "type": "string"
                            },
                            {
                                "name": "refresh_rate",
                                "type": "integer"
                            },
                        ]
                    }
                ]
            },
            {
                "name": "Time",
                "widgets": [
                    {
                        "name": "timeCurrent",
                        "description": "Display a the current time for a specific location",
                        "params": [
                            {
                                "name": "city",
                                "type": "string"
                            },
                            {
                                "name": "refresh_rate",
                                "type": "integer"
                            },
                        ]
                    }
                ]
            },
            {
                "name": "Steam",
                "widgets": [
                    {
                        "name": "steam_profile_status",
                        "description": "Display a the current status for a specific user (parameter: steamID64)",
                        "params": [
                            {
                                "name": "steamID64",
                                "type": "string"
                            },
                            {
                                "name": "refresh_rate",
                                "type": "integer"
                            },
                        ]
                    }
                ]
            },
            {
                "name": "Imgur",
                "widgets": [
                    {
                        "name": "imgur_favorites",
                        "description": "Get oldest or newest favorites images from your account",
                        "params": [
                            {
                                "name": "favoritesSort",
                                "type": "string"
                            },
                            {
                                "name": "refresh_rate",
                                "type": "integer"
                            },
                        ]
                    }
                ]
            }
        ]
    }
    })
})

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const meRouter = require('./routes/me')
app.use(meRouter)

app.listen(8080, function () {
    console.log('Server started.');
});