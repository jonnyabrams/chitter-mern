const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// route: POST /api/users
const registerUser = asyncHandler(async (req, res) => {
  res.json({message: 'Register User'})
}) 

// route: POST /api/users/login - authenticate user
const loginUser = asyncHandler(async (req, res) => {
  res.json({message: 'Login User'})
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