var express = require('express');
var router = express.Router();

require('../models/connection');
const Trend = require('../models/trends');


//ROUTE GET TRENDS
router.get('/', (req, res) => {
    Trend.find()
    .then(data => res.json(
        { result:true, trends:data }))
    .catch(err => res.status(500).json({ result:false, message:err.message }))
})


//ROUTE POST TRENDS
router.post('/', (req, res) => {

    //Is the Trend data valid ?
    if (!req.body.hashtags) {
        res.json({ result:false, error:'Empty field' })
        return;
    }

    for (let hashtag of req.body.hashtags) {
    
        Trend.findOne({ name: hashtag })
        .then(data => {
            if (data === null) {
                const newTrend = new Trend({
                    name: hashtag,
                    number : 1,
                })
                newTrend.save()
            } else {
                data.number += 1
            }
        })
    .catch(err => res.status(500).json({ result:false, message:err.message }))
    }
    res.json({ result:true, message:'Trend has been successfully created' })
    })


module.exports = router;
