import Sequelize from 'sequelize'

export const sequelize = new Sequelize(
    process.env.databaseIgnore,
    process.env.userIgnore,
    process.env.passwordIgnore,
    {
    host: process.env.serverIgnore,
    dialect: process.env.dialectIgnore
    }
);