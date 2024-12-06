const fs = require('fs');
const express = require('express');
const router = express.Router();

const { Product } = require('../models/product.js');
const { User } = require('../models/user.js');

router.get('/', async function(req, res, next) {

    try {

        let rawDataProducts = fs.readFileSync(require('path').resolve(__dirname, '../utils/products.json'));
        let products = JSON.parse(rawDataProducts);
    
        await Product.create(products);

        let rawDataUsers = fs.readFileSync(require('path').resolve(__dirname, '../utils/users.json'));
        let users = JSON.parse(rawDataUsers);
    
        await User.create(users);

        res.send('Products and Users collections successfully initialised');

    } catch (err) {
        res.send(err.message);
    }
});

router.get('/drop', async function(req, res, next) {

    try {

        await Product.collection.drop()
        await User.collection.drop()

        res.send('Products and Users collections successfully dropped');

    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router;