const { Router } = require('express')
const cube = require('../models/cube')
const Cube = require('../models/cube')
const router = Router()

function mapCartItems(cart) {
    return cart.items.map(i => ({
        ...i.cubeId._doc,
        id: i.cubeId.id,
        count: i.count
    }))
}

function computePrice(cubes) {
    return cubes.reduce((total, cube) => {
        return total += cube.price * cube.count
    }, 0)
}

router.post('/add', async (req, res) => {
    const cube = await Cube.findById(req.body.id)
    await req.user.addToCart(cube)
    res.redirect('/card')
})

router.get('/', async (req, res) => {
    const user = await req.user.populate('cart.items.cubeId').execPopulate()

    const cubes = mapCartItems(user.cart)

    res.render('card', {
        title: 'Einkaufswagen',
        isCard: true,
        cubes: cubes,
        price: computePrice(cubes)
    })
})

router.delete('/remove/:id', async (req, res) => {
    await req.user.removeFromCart(req.params.id)
    const user = await req.user.populate('cart.items.cubeId').execPopulate()
    const cubes = mapCartItems(user.cart)
    const cart = { cubes, price: computePrice(cubes) }

    res.status(200).json(cart)
})

module.exports = router