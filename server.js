const mongoose = require('mongoose');
const request = require('request');
const express = require("express");
const app = express();
// const cheerio = require('cheerio');
const axios = require('axios');
const router = require('express').Router();
const bodyParser = require('body-parser')

const crawler = require('./WebScape');

let path = require('path');

if (process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });

}


// process is a global object. Heroku will set port for you.
const port = process.env.PORT || 5000;
//cors: cross origin resource sharing, allowed ajax request access resource from remote host.
const cors = require('cors');
// dotenv: load environment variables file
// require('dotenv').config();

// middleware
app.use(cors());
//allow us to parse json, this should work but not.
app.use(express.json());
//this is working.
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }));

// const uri = process.env.ATLAS_URI;
mongoose.connect("mongodb+srv://aimeedu:aimeedu@cluster0-1n0aq.gcp.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

/** require the files */
const searchRouter = require('./routes/search');
const pageRouter = require('./routes/page');

/** go to /custom, load methods in searchRouter */
app.use('/custom', searchRouter);
app.use('/admin', pageRouter);

/** call the crawler, should call it in post routes */
// crawler.handleInitialScraping("https://www.pizzahut.com/", 2);


// const as = [{id:1, name:"aimee"},{id:2, name:"amy"}];
//
// app.get('/', (req, res) => {
//     res.send("heo");
// });
//
//
// app.get('/test', (req, res) => {
//     res.send(as);
// });
//
// app.get('/test/:name', (req, res) => {
//     const re = as.find(a => a.name === req.params.name);
//     res.send(re);
// });

// router.post("/sendResultsForSearchTerm", (req,res)=>{
//     let searchTerm = req.body.searchTerm;
//     enterSearchIntoDb(searchTerm);
//     return res.json();
// });

//
// let final;
// let searchTermInstances = [];
//
// const enterSearchIntoDb = (term) =>{
//     let stopwatch = new Stopwatch();
//     stopwatch.start();
//     let searchDate = moment().format('LLLL');
//     let finalResults = {};
//     let freqSum;
//     let timeToSearch;
//
//     Word.find({wordName: term})
//         .then(wordResult =>{
//             finalResults.word = wordResult;
//             let wordIds = [];
//             wordResult.forEach(value =>{
//                 wordIds.push(value._id);
//             });
//
//             PageWord.find({
//                 wordId: {
//                     $in: [...wordIds]
//                 }
//             }).then(pageWordResult =>{
//                 finalResults.pageWord = pageWordResult;
//                 let pageIds = [];
//                 pageWordResult.forEach(value =>{
//                     freqSum += value.freq;
//                     pageIds.push(value.pageId);
//                 });
//
//                 Page.find({
//                     _id: {
//                         $in: [...pageIds]
//                     }
//                 }).then(pageResult =>{
//                     finalResults.page = pageResult;
//                     timeToSearch = stopwatch.stop();
//                     // console.log(finalResults);
//
//                     let searchTermInstance = new Search({
//                         terms: term,
//                         count: freqSum,
//                         searchDate: searchDate,
//                         timeToSearch: timeToSearch
//                     });
//
//                     searchTermInstances.push(searchTermInstance);
//
//                     final = finalResults;
//                 });
//             });
//         })
//         .catch(error =>{
//             console.log(error);
//         });
//
// };



app.listen(port, () => console.log(`Server is running on port ${port}`));

