const db = require('../db')
const {hash} = require('bcryptjs')
const {sign} = require('jsonwebtoken')
const { SECRET } = require('../constants')

exports.register = async (req,res) => {
  const {email, password} = req.body
  try {
    const hashedPassword = await hash(password, 10)

    await db.query('INSERT INTO golf_player(email, password) VALUES ($1, $2)', [email, hashedPassword])

    return res.status(201).json({
      success: true,
      message: 'The registration was successfull'
    })

  } catch (error) {
      console.log(error.message);
      res.status(500).json({
        error: error.message,
      })
  }
}

exports.login = async (req, res) => {
  let golf_player = req.golf_player
  let payload = {
    id: golf_player.id,
    email: golf_player.email
  }

  try {
    const token = await sign(payload, SECRET)

    return res.status(200).cookie('token', token, {httpOnly: true}).json({
      success: true,
      message: 'Logged in successfully!',
    })
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    })
  }
}

exports.logout = async (req,res) => {
  try {
    return res.status(200).clearCookie('token', {httpOnly: true}).json({
      success: true,
      message: 'Logged out successfully.'
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    })
  }
}