import User from "../models/UserModel.js";
import like_table from "../models/likeModel.js"
import db from "../config/Database.js";


//<!-----USERLIST-----!>


export const getUsers = async(req,res) =>{
    try {
        const response = await User.findAll();
    res.status(200).json({status: 200, message: "OK",data: response});
    } catch (error) {
        console.log(error.message);
    }}

    
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

//<!-----LOGIN-----!>

export const login = async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          phone: req.body.phone,
        },
      });
  
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      
     
  
      if ( req.body.password != user.password) {
        return res.status(401).send({
          message: "Invalid Password!",
        });
      }
  
 
     
      res.status(200).json({status: 200, message:" Selamat Datang", data: user});
    } catch (error) {
        console.log(error.message);
    }
  };
  
//<!-----LOGOUT-----!>

  export const logout = async (req, res) => {
    try {
      req.session = null;
      return res.status(200).send({
        message: "You've been logged out!"
      });
    } catch (err) {
      this.next(err);
    }
  };
    
//<!-----CREATE-----!>

    export const createUser = async(req,res) =>{
        try {
         await User.create(req.body);
         const response = await User.findOne({
            where: {
              phone: req.body.phone,
            },
          });

          if (response) {
            return res.status(401).send({
              message: "phone already use!",
            });
          }


        res.status(200).json({status: 200, message:" Berhasil Mendaftar", data: response});
        } catch (error) {
            console.log(error.message);
        }
        }

//<!-----UPDATE-----!>
    export const updateUser = async(req,res) =>{
        try {
         await User.update(req.body,{
            where:{
                id: req.params.id
            }
         });
        res.status(200).json({message:"Berhasil"});
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
            res.status(200).json({message:" User Deleted successfully"});
            } catch (error) {
                console.log(error.message);
            }
            }


//<!-----LIKE-----!>
export const like = async (req,res) =>{
try {
    const select = await User.findOne({
        where:{
           id: req.params.id

    }
});

    if(req.body.id != select.id){
        return res.send({like: false });
    }

  res.status(200).json({status: 200, message:" Berhasil", like: select[0]})
 } catch (error) {
    console.log(error.message);
}
}; 


