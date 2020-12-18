const { Router } = require('express')
const Card = require('../models/card')
const Cube = require('../models/cube')
const router = Router()

router.post('/add', async (req, res) => {
    const cube = await Cube.getById(req.body.id)
    await Card.add(cube)
    res.redirect('/card')
})

router.get('/', async (req, res) => {
    const card = await Card.fetch()
    res.render('card', {
        title: 'Einkaufswagen',
        isCard: true,
        cubes: card.cubes,
        price: card.price
    })
})

router.delete('/remove/:id', async (req, res) => {
    const card = await Card.remove(req.params.id)
    res.status(200).json(card)
})

module.exports = router