const { Router } = require('express')
const Cube = require('../models/cube')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', async (req, res) => {
    const cubes = await Cube.find().populate('userId', 'email name')
    console.log(cubes)
    res.render('cubes',
        {
            title: 'Alle Zauberwürfel',
            isCubes: true,
            cubes
        })
})

router.get('/:id', async (req, res) => {
    const cube = await Cube.findById(req.params.id)
    res.render('cube', {
        layout: 'empty',
        title: `Zauberwürfel ${cube.title}`,
        cube
    })
})

router.get('/:id/edit', auth, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const cube = await Cube.findById(req.params.id)

    res.render('cube-edit', {
        title: `Überarbeiten ${cube.title}`,
        cube
    })
})

router.post('/remove', auth, async (req, res) => {
    try {
        await Cube.deleteOne({ _id: req.body.id })
        res.redirect('/cubes')
    } catch (err) {
        console.log(err)
    }
})

router.post('/edit', auth, async (req, res) => {
    const { id } = req.body
    delete req.body.id
    await Cube.findByIdAndUpdate(id, req.body)
    res.redirect('/cubes')
})

module.exports = router