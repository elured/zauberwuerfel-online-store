const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    cubes: [
        {
            cube: {
                type: Object,
                required: true
            },
            count: {
                type: Number,
                require: true
            }
        }
    ],
    user: {
        name: String,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }, date: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Order', orderSchema)