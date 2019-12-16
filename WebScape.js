const Crawler = require("crawler");
const Stopwatch = require('statman-stopwatch');
const Page = require('./models/page.model'),
      PageWord  = require("./models/pageword.model"),
      Word      = require("./models/word.model");

let date = new Date(); // Default value for lastModified if site is missing the required header
let sitesVisited = []; // Array to keep track of visited sites for BFS

// Initial start for method of starting the webscaping
const handleInitialScraping = (startingUrl, limit) =>{
    if (limit <= 0){    // This is set so we don't exceed daily quota of url clicked.
        console.log("Maximum url visitation has been reached.");
        return;
    }
    if (sitesVisited.indexOf(startingUrl) !== -1){
        return;
    }
    sitesVisited.push(startingUrl);

    let stopwatch = new Stopwatch(); // Used to keep track of indexing interval attribute
    let page = {};
    let baseUrl = startingUrl;
    console.log("The url: " + startingUrl);

    stopwatch.start();

    // Start of the crawler given the url
    let c = new Crawler({
        callback: (error, res, done)=>{
            let localCounter;
            let globalCounter;
            if (error) {
                console.log(error);
                return;
            } else {
                let hrefs = [];
                let $ = res.$;

                page.title = res.$('h1').text().trim(); // Gets the title tag using h1
                console.log("Page title: " + page.title);
                page.url = startingUrl;
                // We need to find the meta tag  that has description and get the content
                page.description = res.$('meta[name="description"]').attr('content'); // Gets the description
                if (page.description != null) {
                    page.description.trim();
                } else{
                    /* If the description is unavailable set the description to the title */
                    page.description = page.title;
                }
                console.log("Page description: " + page.description);

                page.lastModified = res.headers["last-modified"]; // Gets the last modified
                if(page.lastModified == null) {             // If last modified is not available we use current time
                    page.lastModified = date;
                }
                console.log("Last time it was modified was: " + page.lastModified)

                let words = [];
                let wordsBucket = $('p').text().split(/\s/g);
                let wordCount = 0;
                wordsBucket.forEach(value => {
                    let sanitizedString;
                    if (value && wordCount < 450) {
                        sanitizedString = value.trim().replace(/[^A-Za-z]/g, '');
                        if (sanitizedString.length > 0) {
                            words.push(sanitizedString);
                        }
                        wordCount++;
                    }
                });

                let wordsFreq = {};
                words.forEach(word => {
                    if (wordsFreq[word]) {
                        wordsFreq[word]++;
                    } else {
                        wordsFreq[word] = 1;
                    }
                });

                /** convert counts {  "word1": 34, "word2": 5, "word3": 1 ... } to an array of array [[word, freq], [word1, 34], [word2, 5], [word3, 1] ...] */
                let converted = Object.entries(wordsFreq);
                // let len = converted.length;

// console.log(wordsFreq);
                page.wordsFreq = converted;
                // console.log(page.wordsFreq);
                console.log(page.wordsFreq[0]);
                // console.log(converted);
                // console.log(wordsFreq);
                page.words = words;


                localCounter = 0;
                globalCounter = 0;

                $('a').each((index, value) => {
                    let link = $(value).attr('href');
                    if (validLink(link)) {
                        if (isLocal(link) && localCounter < 20) {
                            link = baseUrl + link;
                            hrefs.push(link);
                            localCounter++;
                        } else if (!isLocal(link) && globalCounter < 20) {
                            hrefs.push(link);
                            globalCounter++;
                        }
                    }
                });

                page.timeToIndex = stopwatch.stop();

                /** call the function to insert data into to the table*/
                // insertDB(page);
                insertAll(page);
                console.log("Time Interval was: " + (stopwatch.stopTime-stopwatch.startTime));

                let randomIndex = Math.floor(Math.random() * Math.floor(hrefs.length));
                let nextUrl = hrefs[randomIndex];
                handleInitialScraping(nextUrl, --limit);
            }
            done();

        }
    });
    c.queue(startingUrl);
};
//handleInitialScraping method ends
/** insert into page table, then call the function insert into word table, then pageword table */
// const insertDB = (page) => {
//
//     let pageInstance = new Page ({
//         url: page.url,
//         title: page.title,
//         description: page.description,
//         lastModified: page.lastModified,
//         lastIndexed: page.lastIndexed,
//         timeToIndex: page.timeToIndex
//         // wordname: page.words,
//         // freq: page.wordsFreq
//     });
//
//     // put into db:
//     Page.create(pageInstance)
//         .then((pageResult)=>{
//             console.log("New Page added into database: ");
//             // console.log(pageResult);
//             enterWordIntoDb(page, pageResult, pageInstance);
//         })
//         .catch((error)=>{
//             console.log(error);
//         });
// }

const insertAll = (page) =>{
    let instances = [];
    page.wordsFreq.forEach((word)=>{
        let inst = new Page ({
            url: page.url,
            title: page.title,
            description: page.description,
            lastModified: page.lastModified,
            lastIndexed: page.lastIndexed,
            timeToIndex: page.timeToIndex,
            wordname: word[0],
            freq: word[1]
        });
        instances.push(inst);
    });

    Page.insertMany(instances)
        .then((wordResults)=>{
            // console.log("Word Results created: ");
            // console.log(wordResults);
            // enterPageWordIntoDb(page, wordResults, pageInstance);
        })
        .catch((error)=>{
            console.log(error);
        });

};



// const enterWordIntoDb = (page, pageResult, pageInstance) =>{
//     let wordInstances = [];
//     page.words.forEach((word)=>{
//         let wordInstance = new Word ({
//             wordname: word
//         });
//         wordInstances.push(wordInstance);
//     });
//
//     Word.insertMany(wordInstances)
//         .then((wordResults)=>{
//             // console.log("Word Results created: ");
//             // console.log(wordResults);
//             enterPageWordIntoDb(page, wordResults, pageInstance);
//         })
//         .catch((error)=>{
//             console.log(error);
//         });
//
// };

// const enterPageWordIntoDb = (page, wordResults, pageInstance) =>{
//     let pageWordInstances = [];
//
//     wordResults.forEach((wordObj)=>{
//         let pageWordInstance = new PageWord({
//             pageId: pageInstance,
//             wordId: wordObj._id,
//             freq: page.wordsFreq[wordObj.wordname]
//         });
//         pageWordInstances.push(pageWordInstance);
//     });
//
//     PageWord.insertMany(pageWordInstances)
//         .then((pageWordResults)=>{
//             // console.log("Page Word Results created: ");
//             // console.log(pageWordResults);
//             console.log("Database has been succesfully updated.");
//         })
//         .catch((error)=>{
//             console.log(error);
//         });
//
// };


const validLink = (href) =>{
    return href && href.match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
};

const isLocal = (href)=>{
    return href.trim().startsWith('/');
};

// handleInitialScraping("https://www.pizzahut.com/", 10);


module.exports = {
    handleInitialScraping
}