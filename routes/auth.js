const { Router } = require('express')
const { route } = require('./home')
const router = Router()
const User = require('../models/user')

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        ritle: 'Autorisierung',
        isLogin: true
    })
})

router.post('/login', async (req, res) => {
    const user = await User.findById('5fe111ea84685b4c7b37e30d')
    req.session.user = user
    req.session.isAuthenticated = true
    req.session.save(err => {
        if (err) {
            throw err
        }
        res.redirect('/')
    })
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    })
})

router.post('/register', async (req, res) => {

})

module.exports = router