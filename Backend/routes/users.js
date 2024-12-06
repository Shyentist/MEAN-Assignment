const express = require('express');
const router = express.Router();
const filterBySchema = require('../utils/filterBySchema')

const { User, userSchema } = require('../models/user.js');

/* Only used in development

router.get('/', async function(req, res, next) {
    res.send(await User.find());
});

router.get('/query', async function(req, res, next) {

    let validObject = filterBySchema(req.query, userSchema);

    if(Object.keys(validObject).length === 0){
        res.send("Please provide proper parameters");
    } else {
        await User.find(validObject).then((data) => {
            res.send(data);
        })
    }
});

router.post('/', async function (req, res, next) {

    let validObjects = []

    req.body.forEach((object) => {
        let validObject = filterBySchema(object, userSchema);

        validObjects.push(validObject);
    });

    if(validObjects.length === 0){
        res.send("Please provide proper parameters");
    } else {
        try {
            await User.insertMany(validObjects);
            res.send(validObjects);
        } catch (err) {
            res.send(err.message);
        }
    }
});

router.delete('/', async function (req, res, next) {

    let ids = [];

    req.body.forEach((object) => {
        Object.entries(object).forEach(([key, value]) => {
            if (key === "_id") {
                ids.push(value);
            }
        });
    });

    if(ids.length === 0){
        res.send("No entries selected");
    } else {
        try {
            await User.deleteMany({ _id: ids })
            res.send(`Deleted the following ids: ${ids.join(', ')}`)
        } catch(err) {
            res.send(err.message)
        }   
    }
});*/

module.exports = router;