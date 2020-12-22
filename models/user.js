const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                cubeId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Cube',
                    required: true
                }
            }
        ]
    }
})

userSchema.methods.addToCart = function (cube) {
    const items = [...this.cart.items]
    const index = items.findIndex(i => {
        return i.cubeId.toString() === cube._id.toString()
    })

    if (index >= 0) {
        items[index].count = items[index].count + 1
    } else {
        items.push({
            cubeId: cube._id,
            count: 1
        })
    }
    this.cart = { items: items }
    return this.save()
}

userSchema.methods.removeFromCart = function (id) {
    let items = [...this.cart.items]
    const index = items.findIndex(i => i.cubeId.toString() === id.toString())

    if (items[index].count === 1) {
        items = items.filter(i => i.cubeId.toString() !== id.toString())
    } else {
        items[index].count--
    }
    this.items = { items }
    return this.save()
}

userSchema.methods.clearCart = function () {
    this.cart = { items: [] }
    return this.save()
}

module.exports = model('User', userSchema)