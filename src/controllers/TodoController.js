const Todo = require('../models/Todo');
const User = require('../models/User');


const create = async (req, res) => {
    const { user_id } = req.params;
    const { desc } = req.body;

    try {
        const query = await User.findByPk(user_id);
        
        if (!query) {
            return res.status(404).send({ error: "User not found" });            
        }

        await Todo.create({ user_id, desc, done: 0 });

        return res.status(201).send({ status: "Todo created" });
    }
    catch (err) {
        const { message } = err.errors[0];
        console.log(err);

        return res.status(500).send({ error: "Internal server error", description: message });
    }
}


const list = async (req, res) => {
    const { user_id } = req.params;

    try {
        const query = await User.findByPk(user_id);

        if (!query) {
            return res.status(404).send({ error: "User not found" });
        }

        const todos = await Todo.findAll(
            { 
                attributes: ['desc', 'done'], 
                where: { user_id: user_id } 
            }
        );

        return res.json(todos);
    }
    catch (err) {
        const { message } = err.errors[0];
        console.log(err);

        return res.status(500).send({ error: "Internal server error", description: message });
    }
}


const edit = async (req, res) => {
    const { user_id, todo_id } = req.params;
    const { desc, done } = req.body;

    try {
        const query = await Todo.update(
            { desc, done },
            { where: { user_id: user_id, id: todo_id } }
        );

        if (query[0] == 0) {
            return res.status(404).send({ error: "Either user or todo was not found" });
        }

        return res.status(200).send({ status: "Todo updated" });
    }
    catch (err) {
        const { message } = err.errors[0];
        console.log(err);
        
        return res.status(500).send({ error: "Internal server error", description: message });
    }
}


const remove = async (req, res) => {
    const { user_id, todo_id } = req.params;

    try {
        const query = await Todo.destroy({ where: { user_id, id: todo_id } });

        if (query == 0) {
            return res.status(404).send({ error: "Either user or todo was not found" });
        }

        return res.status(200).send({ status: "Todo removed"});
    }
    catch (err) {
        const { message } = err.errors[0];
        console.log(err);

        return res.status(500).send({ error: "Internal server error", description: message });
    }
}


module.exports = {
    create, list, edit, remove
}
