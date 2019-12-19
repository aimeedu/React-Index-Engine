const router = require('express').Router();
let Page = require('../models/page.model');
const crawler = require('../WebScape');

router.route('/').get((req, res) => {
    Page.aggregate( [ { $group : {
            _id : "$url",
            // url: { $first: "url" },
            title: { $first: "$title" },
            description: { $first: "$description" },
            createdAt: { $first: "$createdAt" },
            timeToIndex: { $first: "$timeToIndex" },
    } } ] )
        .then(page => res.json(page))
        .catch(err => res.status(400).json('Error: ' + err));
});



/** try partial match */
router.route('/p/:wordname').get((req, res) => {
    let term = req.params.wordname;
    // console.log(typeof(term));
    Page.find({
        'wordname': {
            // '$regex': new RegExp(".*"+term+".*", "i")
    $regex: ".*" + term + ".*"
        }, function(err, result) {
            if (err) throw err;
            else if (result) {
                res.json(result)

            } else {
                res.send(JSON.stringify({
                    error : 'Error'
                }))
            }
        }
    })
})

/** for case insensitive */
router.route('/case/:wordname').get((req, res) => {
    let term = req.params.wordname;
    Page.find({
        'wordname': term
    }, function(err, result) {
        if (err) throw err;
        else if (result) {
            res.json(result)

        } else {
            res.send(JSON.stringify({
                error : 'Error'
            }))
        }
    }).collation( { locale: 'en', strength: 1 } )
})

/** use this route when we trying to search for the term. put term in the query string */
router.route('/:wordname').get((req, res) => {
// router.route('/term').get((req, res) => {
    let term = req.params.wordname;
    // Page.find( { wordname: term } ).collation( { locale: 'en', strength: 1 } )
    Page.find({
        'wordname': term
    }, function(err, result) {
        if (err) throw err;
        else if (result) {
            res.json(result)

        } else {
            res.send(JSON.stringify({
                error : 'Error'
            }))
        }
    })
})

/** call the crawler, should call it in post routes */
router.route('/').post((req, res) => {
    const url = req.body.inputURL;
    const depth = req.body.inputDepth;
    crawler.handleInitialScraping(url, depth);
});

module.exports = router;