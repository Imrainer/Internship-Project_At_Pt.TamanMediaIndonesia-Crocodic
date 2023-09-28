import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    like
} from "../controllers/UserApiController.js";

const router = express.Router();

router.get('/Api/users',getUsers);
router.get('/Api/users/:id',getUserById);
router.post('/Api/users',createUser);
router.patch('/Api/users/:id',updateUser);
router.delete('/Api/users/:id',deleteUser);
router.post('/Api/users/login',login);
router.post('/Api/users/like',like);
export default router;