const express = require('express')
const { join } = require('path')
const path = require('path')
const exphbs = require('express-handlebars')
const { title } = require('process')
const app = express()
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cubesRoutes = require('./routes/cubes')
const aboutRoutes = require('./routes/about')
const cardRoutes = require('./routes/card')
const mongoose = require('mongoose')

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/cubes', cubesRoutes)
app.use('/about', aboutRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000

async function start() {

    try {
        const url = `mongodb+srv://koleso:123456789@zwoscluster.aljnm.mongodb.net/<dbname>?retryWrites=true&w=majority`
        await mongoose.connect(url, { useNewUrlParser: true })

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }

}

start()

