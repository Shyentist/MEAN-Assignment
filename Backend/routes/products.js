const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const filterBySchema = require('../utils/filterBySchema');

const { Product, productSchema } = require('../models/product.js');
const { authenticateToken } = require('../utils/authUser.js');

router.get('/', async function(req, res, next) {
    res.send(await Product.find());
});

router.get('/query', async function(req, res, next) {

    let validObject = filterBySchema(req.query, productSchema);

    if(Object.keys(validObject).length === 0){
        res.send("Please provide proper parameters");
    } else {
        await Product.find(validObject).then((data) => {
            res.send(data);
        })
    }
});

router.post('/', authenticateToken, async function (req, res, next) {

    const role = req.user.role;

    if(role === 'admin'){
        let validObjects = [];

        req.body.forEach((object) => {
            let validObject = filterBySchema(object, productSchema);

            validObjects.push(validObject);
        });

        if(validObjects.length === 0){
            res.send("Please provide proper parameters");
        } else {
            try {
                await Product.insertMany(validObjects);
                res.status(200).json({ message: 'Products added successfully' });
            } catch (err) {
                res.send(err.message);
            }
        }
    }
});

router.put('/', authenticateToken, async function (req, res) {

    const role = req.user.role;

    if(role === 'admin'){
        try {
            // Get the array of selected products from the request body
            const selectedProducts = req.body.selectedProducts;
        
            // Update each selected product individually
            for (const product of selectedProducts) {
              const { _id, ...updates } = product;
        
              // Update the product in the database
              const updatedProduct = await Product.findByIdAndUpdate(_id, updates);
        
              if (!updatedProduct) {
                // Handle if the product is not found
                return res.status(404).json({ error: `Product not found: ${_id}` });
              }
            }
        
            // Send a response indicating successful update
            res.json({ message: 'Selected products updated successfully' });
          } catch (err) {
            // Handle any errors
            res.status(500).json({ error: 'Internal server error' });
          }
    }
});

router.delete('/', authenticateToken, async function (req, res, next) {

    const role = req.user.role

    if(role === 'admin') {
        let { ids, skus } = req.body;

        if(ids.length === 0){
            res.send("No entries selected");
        } else {
            try {
                await Product.deleteMany({'_id': { $in: ids}})
                console.log(`Deleted the following ids: ${ids.join(', ')}`)

                // also delete the image associated to that file
                skus.forEach(sku => {
                    if(sku !== "undefined"){
                        let fileName = sku + '.jpg'
                        let imagePath = path.join(__dirname, '..', 'public/img/products', fileName);
                        fs.unlink(imagePath, (err) => {
                            if (err) {
                                console.error('Error deleting file:', err);
                            } else {
                            console.log('File deleted successfully');
                            }
                      });
                    }
                })
                res.status(200).json({ message: 'Products deleted successfully' });
            } catch(err) {
                res.send(err.message)
            }   
        }
    }
});

module.exports = router;