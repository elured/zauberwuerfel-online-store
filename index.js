const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const session = require('express-session')
const app = express()
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cubesRoutes = require('./routes/cubes')
const ordersRoutes = require('./routes/orders')
const uathRoutes = require('./routes/auth')
const aboutRoutes = require('./routes/about')
const cardRoutes = require('./routes/card')
const mongoose = require('mongoose')
const User = require('./models/user')
const varMiddleware = require('./middleware/variables')

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

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false
}))
app.use(varMiddleware)

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/cubes', cubesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', uathRoutes)
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

        // const candidat = await User.findOne()
        // if (!candidat) {
        //     const user = new User({
        //         email: 'elured@bigmir.net',
        //         name: 'Koleso',
        //         cart: { items: [] }
        //     })
        //     await user.save()
        // }
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }

}

start()

