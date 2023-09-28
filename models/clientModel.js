import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const clientModel = db.define('client',{
    nama: DataTypes.STRING,
  nomor_hp: DataTypes.STRING,
   industri: DataTypes.STRING,
   bulan: DataTypes.STRING
},{ 
    timestamps: false
   
});

export default clientModel;


(async()=>{
await db.sync();
})();