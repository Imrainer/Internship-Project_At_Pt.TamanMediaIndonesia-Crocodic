import express from "express";
import {
    getGroups,
    getGroupnClient,
    getGroupbyId,
    createGroup,
    updateGroup,
    deleteGroup,
    createGroupMember,
    deleteGroupMember,
    getGroupmember,
    getHistory,
    createHistory,
} from "../controllers/GroupControllers.js";


const router = express.Router();

router.get('/group',getGroupnClient);
router.get('/groups',getGroups);
router.get('/groups/:id',getGroupbyId);
router.post('/create/group',createGroup);
router.patch('/groups/:id',updateGroup);
router.delete('/groups/:id',deleteGroup);
router.get('/groups/member',getGroupmember);
router.post('/groups/member-create',createGroupMember);
router.delete('/groups/:groupId/members/:memberId',deleteGroupMember);
router.get('/histori',getHistory);
router.post('/history-create',createHistory);
export default router;