const express = require('express');
const TodoController = require('../controllers/TodoController');

const router = express.Router();


// List todos
//router.get('/:user_id/todos', );

// Create todo
router.post('/:user_id/todos', TodoController.create);

// Edit todo
//router.put('/:user_id/todos/:todo_id', );

// Delete todo
//router.delete('/:user_id/todos/:todo_id', );



module.exports = router;