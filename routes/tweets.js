var express = require('express');
var router = express.Router();

require('../models/connection');
const Tweet = require('../models/tweets');

//ROUTE GET TWEETS
router.get('/', (req, res) => {
    Tweet.find()
    .then(data => res.json(
        { result:true, tweets:data }))
    .catch(err => res.status(500).json({ result:false, message:err.message }))
})

//ROUTE GET NUMBER OF TRENDS PER TWEETS
router.get('/numberOfTrends/:trendId', (req, res) => {
    Tweet.countDocuments({ trend: req.params.trendId })
    .then(data => res.json(
        { result:true, numberOfTweets:data }
    ))
    .catch(err => res.status(500).json({ result:false, message:err.message }))
})

//ROUTE POST TWEETS
router.post('/', (req, res) => {

    //Is the Tweet data valid ?
    if (!req.body.content) {
        res.json({ result:false, error:'Missing or empty field' })
        return;
    }

    const newTweet = new Tweet({
        content: req.body.content,
        date: new Date,
        // hashtags:
    })

    newTweet.save().then(() => {
        res.json({ result:true, message:'Tweet has been successfully created' })
    })
    .catch(err => res.status(500).json({ result:false, message:err.message }))
})
  

//ROUTE DELETE TWEETS
router.delete('/', (req, res) => {
    Tweet.deleteOne({ _id: req.body.id })
    .then(data => {
        if (data.deletedCount > 0) {
            res.json({ result:true, message:"This tweet has been successfully deleted" })
        } else {
            res.json({ result:false, error:"Tweet not found" })
        }
    })
})

module.exports = router;

