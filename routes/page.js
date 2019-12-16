const router = require('express').Router();
let Page = require('../models/page.model');
const crawler = require('../WebScape');
// Page.index({ wordname: 'text' });

router.route('/').get((req, res) => {
    Page.find()
        .then(page => res.json(page))
        .catch(err => res.status(400).json('Error: ' + err));
});

/** try partial match */
// router.route('/:wordname').get((req, res) => {
//     let fe = req.params.wordname;
//     Page.find({
//         $text: {
//             $search: wordname
//         }
//     }, function(err, result) {
//         if (err) throw err;
//         if (result) {
//             res.json(result)
//         } else {
//             res.send(JSON.stringify({
//                 error : 'Error'
//             }))
//         }
//     })
// })


/** use this route when we trying to search for the term. put term in the query string */
router.route('/:wordname').get((req, res) => {
    let fe = req.params.wordname;

    Page.find({
        'wordname': fe
    }, function(err, result) {
        if (err) throw err;
        // else if (result.length === 0){
        //     res.send('No result in the database!');
        // }
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

    crawler.handleInitialScraping(url, 3);
    /** crawler should return all the title, description, wordname and so on. */

    // const title = req.body.title;
    // const description = req.body.description;
    // const wordname = req.body.wordname;
    // let freq, timetoindex;
    // if(req.body.freq){
    //     freq = Number(req.body.freq);
    // }else {
    //     freq = 666;
    // }
    // if(req.body.timetoindex) {
    //     timetoindex = Number(req.body.timetoindex);
    // } else {
    //     timetoindex = Number(0.000000067);
    // }
    //
    // const newPage = new Page({
    //     url,
    //     title,
    //     description,
    //     wordname,
    //     freq,
    //     timetoindex
    // });
    //
    // newPage.save()
    //     .then(() => res.json('Page added!'))
    //     .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;