const User = require('../models/User');


const list = async (req, res) => {
    const users = await User.findAll(
        { attributes: ['username', 'name'] }
    );

    return res.json(users);
}


const create = async (req, res) => {
    const { username, name, password } = req.body;

    try {
        const user = await User.create({ username, name, password });

        return res.status(201).send({ status: "User created" });
    }
    catch (err) {
        const { message } = err.errors[0];

        return res.status(500).send({ error: "Internal server error", description: message });
    }
}


const edit = async (req, res) => {
    const { user_id } = req.params;
    const { name, password } = req.body;

    try {
       const query = await User.update(
           { name, password },
           { where: { id: user_id }}
        );

        if (query[0] == 0) {
            return res.status(404).send({ error: "User not found" });
        }

        return res.status(201).send({ status: "User updated"});
    }
    catch (err) {
        const { message } = err.errors[0];
        console.log(err);

        return res.status(500).send({ error: "Internal server error", description: message });
    }
}


const remove = async (req, res) => {
    const { user_id } = req.params;

    try {
        const query = await User.destroy({ where: { id: user_id }});

        if (query == 0) {
             return res.status(404).send({ error: "User not found" });
        }

        return res.status(200).send({ status: "User removed"});
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
