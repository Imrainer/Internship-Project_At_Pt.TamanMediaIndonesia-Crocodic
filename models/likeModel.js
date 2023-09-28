import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const User = db.define('like_table',{
   user_id:DataTypes.INTEGER,
   user_id_like:DataTypes.INTEGER
},{
    freezeTableName:true
});

export default User;


(async()=>{
await db.sync();
})();
