import {Sequelize} from "sequelize";
import db from "../config/Database.js";


const {DataTypes} = Sequelize;

const User = db.define('users',{
    name: DataTypes.STRING,
   school: DataTypes.STRING,
    phone: DataTypes.STRING,
    photo: DataTypes.BLOB,
    password: DataTypes.STRING, 
    description: DataTypes.TEXT
},
{
    freezeTableName:true
});



export default User;


(async()=>{
await db.sync();
})();
