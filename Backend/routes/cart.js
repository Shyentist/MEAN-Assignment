const express = require('express');
const router = express.Router();
const { User } = require('../models/user.js');
const { Product } = require('../models/product.js');
const { authenticateToken } = require('../utils/authUser.js');

router.get('/', authenticateToken, async function (req, res, next) {

    const email = req.user.email

    const match = await User.findOne({ email: email })

    const cart = await Product.find({'_id': { $in: match.cart}});
    
    res.send(cart);
})

router.post('/', authenticateToken, async function (req, res, next) {

    try {
        const email = req.user.email;

        const { _id } = req.body;

        const match = await User.findOne({ email: email });

        if(match.cart.includes(_id) === false){
            match.cart.push(_id)
            await User.findOneAndUpdate({ email: email }, { cart: match.cart })
        }        
    
        res.status(200);
        res.send('Request handled successfully')
    } catch(err) {
        res.send(err.message);
    }
    
})

router.delete('/', authenticateToken, async function (req, res, next) {

    try {
        const email = req.user.email;

        const { _id } = req.body;

        const match = await User.findOne({ email: email });

        if(match.cart.includes(_id)){
            const newCart = match.cart.filter(function (code) {
                return code !== _id;
            });
            await User.findOneAndUpdate({ email: email }, { cart: newCart })
        }        
    
        res.status(200);
        res.send('Request handled successfully')
    } catch(err) {
        res.send(err.message);
    }
})

module.exports = router;
