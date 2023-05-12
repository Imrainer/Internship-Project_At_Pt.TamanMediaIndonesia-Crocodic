import {Sequelize} from "sequelize";
import db from "../config/Database.js";
const {DataTypes} = Sequelize;

const Client = db.define('client',{

    nama: DataTypes.STRING,
    nomor_hp: DataTypes.STRING,
    industri: DataTypes.STRING,
    bulan: DataTypes.STRING,
   
  },{timestamps : false});
  

const Groupmember = db.define('groupmember'); 
const Group = db.define('group',{

group: {
type: DataTypes.STRING,
allowNull: false
}});

const History = db.define('histori',{
  tanggal_histori: {
    type:DataTypes.DATE,
  }
});

Group.hasMany(Groupmember);
Group.hasMany(History);
Groupmember.hasMany(Client);
Client.belongsTo(Groupmember);
Client.hasMany(Groupmember);
Groupmember.belongsTo(Group);
Groupmember.belongsTo(Client);
History.belongsTo(Group);
Group.hasMany(History)

export default {Client, Group, Groupmember, History};



/*UNCOMMENT IF YOU WANT TO MIGRATE */
(async()=>{
await db.sync();
})();