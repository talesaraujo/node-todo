module.exports = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOSTNAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    define: {
        timestamps: true,   //created_at, updated_at
        underscored: true
    }
}