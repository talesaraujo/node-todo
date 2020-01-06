const express = require('express');
const UserController = require('../controllers/UserController');


const router = express.Router();

// List users
router.get('/', UserController.list);


// Edit users
router.put('/:user_id', UserController.edit);


// Delete users
router.delete('/:user_id', UserController.remove);


module.exports = router;
