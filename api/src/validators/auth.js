const {check} = require('express-validator')
const db = require('../db')
const {compare} = require('bcryptjs')

// password
const password = check('password').isLength({min: 6, max:15}).withMessage('Password needs to be between 6 and 15 characters.')

// email
const email = check('email').isEmail().withMessage('Please enter a valid email.')

// check if email exists
const emailExists = check('email').custom(async (value) => {
    const {rows} = await db.query('SELECT * FROM golf_player WHERE email = $1', [value,])
    if (rows.length) {
        throw new Error('Email already in use.')
    }
})

// login validation
const loginFieldsCheck = check('email').custom(async (value, {req}) => {
    const golf_player = await db.query('SELECT * FROM golf_player WHERE email = $1', [value])
    if (!golf_player.rows.length){
        throw new Error('This email is not registered with any account.')
    }

    const validPassword = await compare(req.body.password, golf_player.rows[0].password)

    if (!validPassword){
        throw new Error('Incorrect password.')
    }

    req.golf_player = golf_player.rows[0]

})

module.exports = {
    registerValidation: [email, password, emailExists],
    loginValidation: [loginFieldsCheck]
}