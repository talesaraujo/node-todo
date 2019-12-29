var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {
    return res.send({ message: "Welcome to the To-Do application!" })
});


module.exports = router;