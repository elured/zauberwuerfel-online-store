const { body } = require('express-validator')
const User = require('../models/user')

exports.registerValidators = [
    body('email')
        .isEmail()
        .withMessage('Email ist inkorrekt')
        .custom(async (value, { req }) => {
            try {
                const user = await User.findOne({ email: value })
                if (user) {
                    return Promise.reject('Das Email existiert schon')
                }
            } catch (err) {
                console.log(err)
            }
        })
        .normalizeEmail(),
    body('password', 'Kennwort muss von 6 bis 32 alphanumerischen Zeichen enthalten')
        .isLength({ min: 6, max: 32 })
        .isAlphanumeric()
        .trim(),
    body('confirm')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Die Kennwörter müssen miteinander übereinstimmen')
            }
            return true
        })
        .trim(),
    body('name')
        .isLength({ min: 3 })
        .withMessage('Der Name muss mindestens 3 Zeichen enthalten')
        .trim()
]   