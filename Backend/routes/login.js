const express = require('express');
const router = express.Router();
const { generateAccessToken } = require('../utils/authUser.js');
const { User } = require('../models/user.js');
const bcrypt = require('bcryptjs');

router.post('/', async function (req, res, next) {
    if(Object.keys(req.body).includes("email") && Object.keys(req.body).includes("pw")){

        const { email, pw } = req.body;

        const match = await User.findOne({ email: email })
            
            if(!match){ 
                res.status(401);
                res.send('Failed to authenticate')
            } else {
                //if email is in the database
                //compare sent hashed password with stored hashed password

                bcrypt.compare(pw, match.pw, (error, result) => {
                    if(result) {
                        let token = generateAccessToken(email, match.role);
                        res.status(200).json({token})
                    }
                    else {
                      console.log(error)
                      return next({ status: 401 })
                    }
                  })
            }
    }
})

module.exports = router;
