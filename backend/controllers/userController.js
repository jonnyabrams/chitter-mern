// route: POST /api/users
const registerUser = (req, res) => {
  res.json({message: 'Register User'})
} 

// route: POST /api/users/login - authenticate user
const loginUser = (req, res) => {
  res.json({message: 'Login User'})
} 

// route: GET /api/users/me
const getMe = (req, res) => {
  res.json({message: 'User data'})
} 

module.exports = {
  registerUser,
  loginUser,
  getMe
}