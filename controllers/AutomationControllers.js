import Client from "../models/clientModel.js";


//<---MENAMPILKAN DATA--->\\
export const getClient = async(req,res) =>{
    try{
        const response = await Client.findAll();
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
// SELECT * FROM `clients` WHERE bulan='November';


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
     await Client.create(req.body);
    res.status(201).json({msg:"Client Created successfully"});
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
     await User.destroy({
        where:{
            id: req.params.id
        }
     });
    res.status(201).json({msg:" Client Deleted successfully"});
    } catch (error) {
        console.log(error.message);
    }
    }



