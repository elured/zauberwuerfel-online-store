const { Router } = require('express')
const Cube = require('../models/cube')
const auth = require('../middleware/auth')
const router = Router()

function isOwner(cube, req) {
    return cube.userId.toString() === req.user._id.toString()
}

router.get('/', async (req, res) => {
    try {
        const cubes = await Cube.find()
            .populate('userId', 'email name')
            .select('price title img')

        res.render('cubes',
            {
                title: 'Alle Zauberwürfel',
                isCubes: true,
                userId: req.user ? req.user._id.toString() : null,
                cubes
            })
    } catch (err) {
        console.log(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const cube = await Cube.findById(req.params.id)
        res.render('cube', {
            layout: 'empty',
            title: `Zauberwürfel ${cube.title}`,
            cube
        })
    } catch (err) {
        console.log(err)
    }
})

router.get('/:id/edit', auth, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    try {
        const cube = await Cube.findById(req.params.id)

        if (!isOwner(cube, req)) {
            return res.redirect('/cubes')
        }

        res.render('cube-edit', {
            title: `Überarbeiten ${cube.title}`,
            cube
        })
    } catch (err) {
        console.log(err)
    }


})

router.post('/remove', auth, async (req, res) => {
    try {
        await Cube.deleteOne({
            _id: req.body.id,
            userId: req.user._id
        })
        res.redirect('/cubes')
    } catch (err) {
        console.log(err)
    }
})

router.post('/edit', auth, async (req, res) => {
    try {
        const { id } = req.body
        delete req.body.id
        const cube = await Cube.findById(id)
        if (!isOwner(cube, req)) {
            return res.redirect('/cubes')
        }
        Object.assign(cube, req.body)
        await cube.save()
        res.redirect('/cubes')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router