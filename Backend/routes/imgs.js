const express = require('express');
const fs = require('fs');
const path = require('path');
const { authenticateToken } = require('../utils/authUser.js');
const { Product } = require('../models/product.js');

const router = express.Router();

router.post('/', authenticateToken, async function (req, res) {

    const role = req.user.role;

    if(role === 'admin'){
        if (!req.files || !req.files.image || req.files.image.name === "undefined.jpg") {
            return res.status(400).json({ error: 'No file uploaded' });
          }
        
          const image = req.files.image;
          const name = image.name;
          const sku = path.parse(name).name;
          const uploadPath = path.join(__dirname, '..', 'public/img/products', name);
        
          image.mv(uploadPath, async (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Failed to upload file' });
            }

            await Product.findOneAndUpdate({sku: sku}, {img: name})
            
            // File upload successful
            res.status(200).json({ message: 'File uploaded successfully' });
          });
     } else {
        return res.status(403).json({ error: 'Permission denied' });
     }
});

module.exports = router;
