const { Router } = require('express')
const router = Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const keys = require('../keys')
const regEmail = require('../emails/registration')
const sgMail = require('@sendgrid/mail')
const { registerValidators } = require('../utils/validators')

const transporter = nodemailer.createTransport(sendgrid({
    auth: { api_key: keys.SENDGRID_API_KEY }
}))
sgMail.setApiKey(keys.SENDGRID_API_KEY)

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        ritle: 'Autorisierung',
        isLogin: true,
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError')
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

                req.flash('loginError', 'Kennwort ist falsch')
                res.redirect('/auth/login#login')
            }
        } else {
            req.flash('loginError', 'Benutzer mit dem eingegebenen E-Mail existiert nicht')
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

router.post('/register', registerValidators, async (req, res) => {
    try {
        const { email, password, name } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('registerError', errors.array()[0].msg)
            return res.status(422).redirect('/auth/login#register')
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            email, name, password: hashPassword, cart: { items: [] }
        })
        await user.save()
        res.redirect('/auth/login#login')
        const regEmailObjct = regEmail(email)
        console.log(regEmailObjct)
        //await transporter.sendMail(regEmailObjct)
        // sgMail
        //     .send(regEmailObjct)
        //     .then(() => {
        //         console.log('Email sent')
        //     })
        //     .catch((error) => {
        //         console.error(error)
        //     })

    } catch (err) {
        console.log(err)
    }
})

module.exports = router