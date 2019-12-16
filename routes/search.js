//import router
const router = require('express').Router();
//require model
let Search = require('../models/search.model');

router.route('/').get((req, res) => {
    Search.find()
    /** find method returns a promise. print all the entries from this collection. */
        .then(search => res.json(search))
        .catch(err => res.status(400).json('Error: ' + err));
});

/** endpoints. post request handle insert into search table. */
router.route('/').post((req, res) => {
    let timetosearch;
    const term = req.body.term;
    const count = req.body.searchFreq;
    /** when front end query the page table, return the count to post in search table */

    if(req.body.timetosearch){
        timetosearch = req.body.timetosearch
    } else {
        timetosearch = 0.000003426
    }
    /** searchdate is the default timestamps*/

    const newSearch = new Search({
        term,
        count,
        timetosearch,
    });

    newSearch.save()
        .then(() => res.json('term added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;