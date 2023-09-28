import User from "../models/UserModel.js";


//USER LIST
export const getUsers = async(req,res) =>{
try {
    const response = await User.findAll();
res.status(200).json(response);
} catch (error) {
    console.log(error.message);
}
}

export const getUserById = async(req,res) =>{
    try {
        const response = await User.findOne({
            where:{
               id: req.params.id

        }
    });
    res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
    }

         //CREATE
    export const createUser = async(req,res) =>{
        try {
         await User.create(req.body);
        res.status(201).json({msg:" User Created successfully"});
        } catch (error) {
            console.log(error.message);
        }
        }

         //UPDATE
    export const updateUser = async(req,res) =>{
        try {
         await User.update(req.body,{
            where:{
                id: req.params.id
            }
         });
        res.status(201).json({msg:" User Updated successfully"});
        } catch (error) {
            console.log(error.message);
        }
        }

        //DELETE
        export const deleteUser = async(req,res) =>{
            try {
             await User.destroy({
                where:{
                    id: req.params.id
                }
             });
            res.status(201).json({msg:" User Deleted successfully"});
            } catch (error) {
                console.log(error.message);
            }
            }