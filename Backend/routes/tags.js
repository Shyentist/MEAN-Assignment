const express = require('express');
const router = express.Router();

const { Product } = require('../models/product.js');
const { authenticateToken } = require('../utils/authUser.js');

router.put('/', authenticateToken, async function(req, res, next) {
    const role = req.user.role;

    if(role === 'admin'){

        const { oldTags, newTags } = req.body
        
        if(oldTags && newTags){
            try {
                // Iterate through the oldTags array to find and update matching tags
                for (let i = 0; i < oldTags.length; i++) {
                  const oldTag = oldTags[i];
                  const newTag = newTags[i];

                  //Only query the database if the tags differ
                  if(oldTag !== newTag && newTag !== ''){
                    await Product.updateMany(
                        { tags: oldTag }, 
                        { $addToSet: { tags: newTag } } 
                    );

                    await Product.updateMany(
                        { tags: oldTag }, 
                        { $pull: { tags: oldTag } }
                    );
                  
                    console.log(`Updated tags from "${oldTag}" to "${newTag}" in the database.`);

                  } else if (oldTag !== newTag && newTag === ''){

                    await Product.updateMany(
                        { tags: oldTag }, 
                        { $pull: { tags: oldTag } }
                    );

                    console.log(`Deleted "${oldTag}" from the database`);
                  }
                }
            
                res.status(200).json({ message: 'All tags updated successfully' });
              } catch (error) {
                console.error('Error updating tags:', error);
              }
        }
    }
})

module.exports = router;