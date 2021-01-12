// database_connection_url can point to a local MongoDB, or to Heroku based MongoDB
// Example for local MongoDB URL: "mongodb://localhost:27017/node-mongo-registration-login-api"
// Example for Heroku based MongoDB: "mongodb+srv://root:root@cluster0-wqaum.mongodb.net/test?retryWrites=true&w=majority"

// TODO: Add your MongoDB connection URL
const database_connection_url = "mongodb://localhost:27017/node-mongo-registration-login-api";

const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(database_connection_url || database_connection_url, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Test: require('../users/test.model'),
    CardSortTest: require('../users/card-sort-test.model'),
    Result: require('../users/result.model'),
    CardSortResult: require('../users/card-sort-result.model'),
    database_connection_url
};
