const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

// Database name
const dbname = "todo_mongodb";

// Where mongoDB is located
const url = "mongodb://localhost:27017";

const mongoOptions = {useNewUrlParser : true};

const state = {
    db : null
};


const connect = (cb) => {
    /*
        Check whether there's already a db connection
     */
    if (state.db) {
        cb();
    }
    else {
        // Attempt to get db connection
        MongoClient.connect(url, mongoOptions, (err, client) => {
            if (err) {
                // Unable to get db connection, pass error to cb
                cb(err);
            }
            else {
                // Connected successfully to db, set connection and cb
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

// Returns ObjectID object
const getPrimaryKey = (_id) => {
    return ObjectID(_id);
}

// Returns a valid db connection
const getDB = () => {
    return state.db;
}

module.exports = {getDB, connect, getPrimaryKey};