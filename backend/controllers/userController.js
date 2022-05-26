const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// route: POST /api/users
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if(!name || !email || !password) {
    res.status(400)
    throw new Error('Missing field')
  }

  // Check if user exists
  const userExists = await User.findOne({email})

  if(userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })
  
  // If user was created successfully...
  if(user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
}) 

// route: POST /api/users/login - authenticate user
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body

  // Check for user email
  const user = await User.findOne({email})

  // If user exists, compare password entered to hashed password stored
  if(user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
}) 

// route: GET /api/users/me
const getMe = asyncHandler(async (req, res) => {
  res.json({message: 'User data'})
}) 

module.exports = {
  registerUser,
  loginUser,
  getMe
}