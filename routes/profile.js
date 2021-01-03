const { Router } = require('express')
const auth = require('../middleware/auth')
const file = require('../middleware/file')
const router = Router()
const User = require('../models/user')

router.get('/', auth, async (req, res) => {
    res.render('profile', {
        title: 'Profil',
        isProfile: true,
        user: req.user.toObject()
    })
})

router.post('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        const toChange = { name: req.body.name }

        if (req.file) {
            toChange.avatarUrl = req.file.path
        }

        Object.assign(user, toChange)
        await user.save()
        res.redirect('/profile')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router