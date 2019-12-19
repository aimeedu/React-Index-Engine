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
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://aimeedu:aimeedu@cluster0-1n0aq.gcp.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
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


if (process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });

}

app.listen(port, () => console.log(`Server is running on port ${port}`));

