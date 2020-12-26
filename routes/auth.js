const { Router } = require('express')
const router = Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
router.get('/login', async (req, res) => {
    res.render('auth/login', {
        ritle: 'Autorisierung',
        isLogin: true
    })
})

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body

        const candidate = await User.findOne(({ email }))

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)
            if (areSame) {
                const user = candidate
                req.session.user = user
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if (err) {
                        throw err
                    }
                    res.redirect('/')
                })
            } else {
                res.redirect('/auth/login#login')
            }
        } else {
            res.redirect('/auth/login#login')
        }

    } catch (err) {
        console.log(err)
    }

})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    })
})

router.post('/register', async (req, res) => {
    try {
        const { email, password, repeat, name } = req.body
        const candidate = await User.findOne({ email })

        if (candidate) {
            res.redirect('/auth/login#register')
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const user = new User({
                email, name, password: hashPassword, cart: { items: [] }
            })
            await user.save()
            res.redirect('/auth/login#login')
        }

    } catch (err) {
        console.log(err)
    }
})

module.exports = router