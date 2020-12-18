const { Router } = require('express')
const Cube = require('../models/cube')
const router = Router()

router.get('/', async (req, res) => {
    const cubes = await Cube.getAll()
    res.render('cubes',
        {
            title: 'Alle Zauberwürfel',
            isCubes: true,
            cubes
        })
})

router.get('/:id', async (req, res) => {
    const cube = await Cube.getById(req.params.id)
    res.render('cube', {
        layout: 'empty',
        title: `Zauberwürfel ${cube.title}`,
        cube
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const cube = await Cube.getById(req.params.id)

    res.render('cube-edit', {
        title: `Überarbeiten ${cube.title}`,
        cube
    })
})

router.post('/edit', async (req, res) => {
    await Cube.update(req.body)
    res.redirect('/cubes')
})

module.exports = router