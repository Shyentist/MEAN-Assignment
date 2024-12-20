require('dotenv').config();
const jwt = require('jsonwebtoken');

process.env.TOKEN_SECRET;

function generateAccessToken(email, role) {
    return jwt.sign({ email, role }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 }); //expires in 1h
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err)
      
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
}

module.exports = { generateAccessToken, authenticateToken };
