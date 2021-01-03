const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const csurf = require('csurf')
const flash = require('connect-flash')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const cubesRoutes = require('./routes/cubes')
const ordersRoutes = require('./routes/orders')
const uathRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const aboutRoutes = require('./routes/about')
const cardRoutes = require('./routes/card')
const mongoose = require('mongoose')
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')
const fileMiddleware = require('./middleware/file')
const keys = require('./keys')
const errorHandler = require('./middleware/error')

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: require('./utils/hbs-helpers')
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI
})

app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(fileMiddleware.single('avatar'))
app.use(csurf())
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)


app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/cubes', cubesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', uathRoutes)
app.use('/about', aboutRoutes)
app.use('/profile', profileRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

async function start() {

    try {

        await mongoose.connect(keys.MONGODB_URI, {
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

