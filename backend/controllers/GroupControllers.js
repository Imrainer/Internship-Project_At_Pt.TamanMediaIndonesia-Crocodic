import models from "../models/Client.js";
import {Op} from "sequelize";
const Group = models.Group;
const Groupmember = models.Groupmember;
const Client = models.Client;
const History = models.History;

//<---MENAMPILKAN DATA--->\\
export const getGroups = async(req,res) =>{
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Group.count({
        where:{
            [Op.or]: [{group:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    });

    const totalPage = Math.ceil(totalRows / limit);
    const result = await Group.findAll({
        where:{
            [Op.or]: [{group:{
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

export const getGroupnClient = async(req,res) =>{
    try {
        const response = await Group.findAll({
            include: {
                model: Groupmember,
                include:{
                    model: Client,
                }
            }
        });


    let groups = []
    
    response.forEach(response => {
        let clients = []
        response.groupmembers.forEach(item => {
            clients.push(item.clients[0])            
        });
        const newResponse = {
            id: response.id,
            group: response.group,
            createdAt: response.createdAt,
            updatedAt: response.updatedAt,
            members: clients
        }
        groups.push(newResponse);
    });
    
    res.status(200).json(groups);
} catch (error) {
    console.log(error.message);
}
}

export const getGroupbyId = async(req, res) =>{
    try {
        const response = await Group.findOne({
            where:{
                id: req.params.id
            },
            include: {
                model: Groupmember,
                include:{
                    model: Client,
                }
            }
        });
        let clients = []
    
        response.groupmembers.forEach(item => {
            console.log(item)
            clients.push(item.clients[0])            
        });
        const newResponse = {
            id: response.id,
            group: response.group,
            createdAt: response.createdAt,
            updatedAt: response.updatedAt,
            members: clients
        }
        
        res.status(200).json(newResponse);
    } catch (error) {
        console.log(error.message);
    }
}

//<---CREATE DATA--->\\
export const createGroup = async(req,res) =>{
    try {
         const data = req.body
     await Group.create(data);
     console.log('created');
    res.status(200).json({msg:"New Group Created successfully", data});
    } catch (error) {
        console.log(error.message);
    }
    }
//<---UPDATE DATA--->\\
export const updateGroup = async(req,res) =>{
    try {
     await Group.update(req.body,{
        where:{
            id: req.params.id
        }
     });
    res.status(201).json({msg:" Group Updated successfully"});
    } catch (error) {
        console.log(error.message);
    }
    }

//<---DELETE DATA--->\\
export const deleteGroup = async(req,res) =>{
    try {
     await Group.destroy({
        where:{
            id: req.params.id
        }
     });
    res.status(201).json({msg:" Group Deleted successfully"});
    } catch (error) {
        console.log(error.message);
    }
    }


//<---MENAMPILKAN DATA--->\\
export const getGroupmember = async(req,res) =>{
    try{
        const response = await Groupmember.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//<---CREATE MEMBER--->\\
export const createGroupMember = async(req,res) =>{
    try {
         const {groupId} = req.body;
         const {clientId} = req.body;

         console.log(groupId, clientId);

         const group = await Group.findByPk(groupId);
         if (!group) {
           return res.status(404).json({ msg: 'Group not found' });
         }

     const newGroupMember = await Groupmember.create({
        groupId: groupId,
        clientId: clientId
     });
    await Client.update({ groupmemberId: newGroupMember.id }, { where: { id: req.body.clientId }});

    res.status(200).json({msg:"New Member added successfully", newGroupMember});
    } catch (error) {
        console.log(error.message);
    }
    }
//<---UPDATE MEMBER--->\\
export const updateGroupmember = async(req,res) =>{
    try {
     await Groupmember.update(req.body,{
        where:{
            id: req.params.id
        }
     });
    res.status(201).json({msg:" Group Updated successfully"});
    } catch (error) {
        console.log(error.message);
    }
    }

//<---DELETE MEMBER--->\\
export const deleteGroupMember = async (req, res) => {
    try {
      const group = await Group.findByPk(req.params.groupId, {
        include: {
          model: Groupmember,
          include: {
            model: Client,
          },
        },
      });
  
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
  
      const member = group.groupmembers.find(
        (item) => item.clients[0].id === Number(req.params.memberId)
      );
  
      if (!member) {
        return res.status(404).json({ error: 'Member not found' });
      }
  
      await member.destroy();
  
      res.status(200).json({ message: 'Member deleted successfully' });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


    //HISTORY PAGE 

    export const getHistory = async (req, res) => {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || "";
        const offset = limit * page;
      
        try {
          const { count, rows } = await History.findAndCountAll({
            where: {
              [Op.or]: [
                { groupId: { [Op.like]: `%${search}%` } }
              ]
            },
            offset: offset,
            limit: limit,
            order: [
              ['id', 'DESC']
            ],
            include: [
              {
                model: Group,
                attributes: ['group'],
                as: 'group'
              }
            ]
          });
      
          const totalRows = count;
          const totalPage = Math.ceil(totalRows / limit);
      
          res.json({
            result: rows,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage
          });
        } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: 'Failed to get history' });
        }
      };


      export const createHistory = async (req, res) => {
        try {
          const { groupId } = req.body;
          const tanggal_histori = new Date();
      
          const group = await Group.findByPk(groupId);
          if (!group) {
            return res.status(404).json({ msg: 'Group not found' });
          }
      
          const history = await History.create({
            tanggal_histori: tanggal_histori,
            groupId: groupId
          });
      
          console.log('New History created');
          return res.status(200).json({ msg: 'New History Added successfully', history });
        } catch (error) {
          console.log(error.message);
          return res.status(500).json({ msg: 'Failed to create history' });
        }
      };