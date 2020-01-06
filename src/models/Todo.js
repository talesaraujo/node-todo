const { Model, DataTypes } = require('sequelize');

class Todo extends Model {

    static init(connection) {
        
        super.init(
            {
                desc: DataTypes.STRING,
                done: DataTypes.INTEGER
            },
            {
                sequelize: connection
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});
    }
}


module.exports = Todo;