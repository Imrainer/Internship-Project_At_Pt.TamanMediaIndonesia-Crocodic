import models from "../models/Client.js";
import {Op} from "sequelize";
const Client = models.Client;

//<---MENAMPILKAN DATA--->\\

export const getClients = async(req,res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Client.count({
        where:{
            [Op.or]: [{nama:{
                [Op.like]: '%'+search+'%'
            }}, {nomor_hp:{
                [Op.like]: '%'+search+'%'
            }},{industri:{
                [Op.like]: '%'+search+'%'
            }},{bulan:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    });

    const totalPage = Math.ceil(totalRows / limit);
    const result = await Client.findAll({
        where:{
            [Op.or]: [{nama:{
                [Op.like]: '%'+search+'%'
            }}, {nomor_hp:{
                [Op.like]: '%'+search+'%'
            }},{industri:{
                [Op.like]: '%'+search+'%'
            }},{bulan:{
                [Op.like]: '%'+search+'%'
            }}]
        },
        offset: offset,
        limit: limit,
        order:[
            ['id','DESC']
        ]
    });
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    });
}


export const getClient = async(req,res) =>{
    try{
        const response = await Client.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getBulan = async(req,res) =>{
    try{
        const response = await Bulan.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getClientbyId = async(req, res) =>{
    try {
        const response = await Client.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//GROUP BY DATA
export const getClientbyMonth = async(req,res) =>{
    try {
        const response = await Client.findAll({
            where:{
                bulan: req.params.bulan
            }
        });

        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getClientbyName = async(req,res) =>{
    try {
        const response = await Client.findOne({
            where:{
              nama: req.params.nama
            }
        });

        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//<---CREATE DATA--->\\
export const createClient = async(req,res) =>{
    try {
         const data = req.body
     await Client.create(data);
    res.status(200).json({msg:"Client Created successfully", data});
    } catch (error) {
        console.log(error.message);
    }
    }
//<---UPDATE DATA--->\\
export const updateClient = async(req,res) =>{
    try {
     await Client.update(req.body,{
        where:{
            id: req.params.id
        }
     });
    res.status(201).json({msg:" Client Updated successfully"});
    } catch (error) {
        console.log(error.message);
    }
    }

//<---DELETE DATA--->\\
export const deleteClient = async(req,res) =>{
    try {
     await Client.destroy({
        where:{
            id: req.params.id
        }
     });
    res.status(201).json({msg:" Client Deleted successfully"});
    } catch (error) {
        console.log(error.message);
    }
    }