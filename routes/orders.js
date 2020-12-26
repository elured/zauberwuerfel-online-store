const { Router } = require('express')
const cube = require('../models/cube')
const router = Router()
const Order = require('../models/order')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    try {
        const orders = await Order.find({ 'user.userId': req.user._id })
            .populate('user.userId')

        res.render('orders', {
            isOrder: true,
            title: 'Bestellungen',
            orders: orders.map(i => {
                return {
                    ...i._doc,
                    price: i.cubes.reduce((total, j) => {
                        return total += j.count * j.cube.price
                    }, 0)
                }
            })
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/', auth, async (req, res) => {

    try {
        const user = await req.user
            .populate('cart.items.cubeId')
            .execPopulate()

        const cubes = user.cart.items.map(i => ({
            count: i.count,
            cube: { ...i.cubeId._doc }
        }))

        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            cubes: cubes
        })

        await order.save()
        await req.user.clearCart()

        res.redirect('/orders')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router