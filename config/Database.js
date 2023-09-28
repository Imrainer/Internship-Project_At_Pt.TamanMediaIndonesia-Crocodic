import {Sequelize} from "sequelize";

const db = new Sequelize('api','root', '',{
    host: 'localhost',
    dialect:'mysql'
});

export default db;