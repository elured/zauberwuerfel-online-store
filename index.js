const express = require('express')
const { join } = require('path')
const path = require('path')
const exphbs = require('express-handlebars')
const { title } = require('process')
const app = express()
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cubesRoutes = require('./routes/cubes')
const ordersRoutes = require('./routes/orders')
const aboutRoutes = require('./routes/about')
const cardRoutes = require('./routes/card')
const mongoose = require('mongoose')
const User = require('./models/user')

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5fe111ea84685b4c7b37e30d')
        req.user = user
        next()
    } catch (err) {
        console.log(err)
    }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/cubes', cubesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/about', aboutRoutes)
const PORT = process.env.PORT || 3000

async function start() {

    try {
        const url = `mongodb+srv://koleso:AtWc8T8zkNtQ83N@zwoscluster.aljnm.mongodb.net/ZwosDb`

        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        const candidat = await User.findOne()
        if (!candidat) {
            const user = new User({
                email: 'elured@bigmir.net',
                name: 'Koleso',
                cart: { items: [] }
            })
            await user.save()
        }
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }

}

start()

