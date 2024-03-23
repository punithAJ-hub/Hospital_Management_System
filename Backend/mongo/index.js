const express = require('express');
const config = require('config');
const app = express();
const port = config.get('server.port');
const host = config.get('server.host');
const router = express.Router();
const mongoose = require('mongoose');

const mongoURL = config.get('mongo.mongoURL');

// CONNECT TO MONGO
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log('Connected to Mongo DB');
    } catch (error) {
        console.log(error);
    }
};

module.exports = { connectDB };
