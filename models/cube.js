const { Schema, model } = require('mongoose')

const cubeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

cubeSchema.method('toClient', function () {
    const cube = this.toObject()

    cube.id = cube._id
    delete cube._id
    return cube
})
module.exports = model('Cube', cubeSchema)