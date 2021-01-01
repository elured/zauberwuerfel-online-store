const { Router } = require('express')
const Cube = require('../models/cube')
const auth = require('../middleware/auth')
const router = Router()
const { validationResult } = require('express-validator')
const { courseValidators } = require('../utils/validators')

router.get('/', auth, (req, res) => {
    res.render('add',
        {
            title: 'Zauberwürfel hinzufügen',
            isAdd: true
        })
})

router.post('/', auth, courseValidators, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).render('add', {
            title: 'Zauberwürfel hinzufügen',
            isAdd: true,
            error: errors.array()[0].msg,
            data: {
                title: req.body.title,
                price: req.body.price,
                img: req.body.img
            }
        })
    }

    const cube = new Cube({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user//._id
    })
    console.log(cube)
    try {
        await cube.save()
        res.redirect('/cubes')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
//https://images-na.ssl-images-amazon.com/images/I/41KTj4TgWPL._SCLZZZZZZZ__.jpg