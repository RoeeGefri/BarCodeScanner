import express from 'express';
import {addItem, createUser, login, getList, deleteItem, getItemData} from '../controller/posts.js'

const router = express.Router();


router.post("/user/create",createUser);
router.patch("/user/addItem",addItem);
router.post("/user/login",login);
router.get("/user/list",getList); 
router.patch("/user/deleteItem",deleteItem);

router.get("/item",getItemData);




export default router;
