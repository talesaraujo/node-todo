const express = require("express");

const PORT = 5000;
const HOST = '0.0.0.0';


const bodyParser = require("body-parser");

const path = require("path");
const Joi = require("joi");

const db = require("./db");
const collection = "todo";

const app = express();


// Schema used for data validation for the to-do document
const schema = Joi.object().keys({
    todo: Joi.string().required()
});


app.use(express.static('.'));

// Parses json data set by the user
app.use(bodyParser.json());

// Serve static html file to user
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/*
    Server side read portion
 */
app.get('/getTodos', (req, res) => {
    // Get all documents from todo collection and
    // send it back to the user as a json file
    db.getDB().collection(collection).find({}).toArray((err, documents) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(documents);
            res.json(documents);
        }
    });
});

/*
    Server side create portion
 */
app.post('/', (req, res, next) => {
    // Document to be inserted
    const userInput = req.body;

    Joi.validate(userInput, schema, (err, result) => {
        if (err) {
            const error = new Error("Invalid Input!");
            error.status = 400;
            next(error);
        }
        else {
            db.getDB().collection(collection).insertOne(userInput, (err, result) => {
                if (err) {
                    const error = new Error("Failed to insert document.");
                    error.status = 400;
                    next(error);
                }
                else {
                    res.json({result: result, document: result.ops[0], 
                              msg: "Successfully inserted.", 
                              error: null});
                }
            }); 

        }
    });
});

/*
    Server side update portion
 */
app.put('/:id', (req, res) => {
    // Primary key of document that is meant to be updated
    const todoID = req.params.id;
    // Document used to update
    const userInput = req.body;

    // Find documento by ID and update
    db.getDB().collection(collection).findOneAndUpdate(
        {_id: db.getPrimaryKey(todoID)},               
        {$set: { todo: userInput.todo}},                       
        {returnOriginal: false},                                               
        (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(result);
            }
    });

});


/*
    Server side delete portion
*/
app.delete('/:id', (req, res) => {
    const todoID = req.params.id;

    db.getDB().collection(collection).findOneAndDelete({_id: db.getPrimaryKey(todoID)}, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(result);
        }
    });
});

app.use((err, req, res, next) => {
    res.status(err.status).json({
        error: {
            message: err.message
        }
    });
});

db.connect((err) => {
    if (err) {
        console.log('Unable to connect to database');
        process.exit(1);
    }
    else {
        app.listen(PORT, HOST, () => {
            console.log('Connected to the database, app listening on port 3000')
        });
    }
});

