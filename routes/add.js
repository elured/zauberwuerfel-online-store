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

    const cube = new Cube(req.body.title, req.body.price, req.body.img)
    await cube.save()
    res.redirect('/cubes')
})

module.exports = router