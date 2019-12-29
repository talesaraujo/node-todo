const { Model, DataTypes } = require('sequelize');

class User extends Model {

    static init(connection) {
        
        super.init(
            {
                username: DataTypes.STRING,
                name: DataTypes.STRING,
                password: DataTypes.STRING
            },
            {
                sequelize: connection
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Todo, { foreignKey: 'user_id', as: 'todos' });
    }
}


module.exports = User;