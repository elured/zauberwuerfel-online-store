const { Router } = require('express')
const Cube = require('../models/cube')
const router = Router()

router.get('/', (req, res) => {
    res.render('add',
        {
            title: 'Zauberwürfel hinzufügen',
            isAdd: true
        })
})

router.post('/', async (req, res) => {

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