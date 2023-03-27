import express, { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

  // const upload = multer({ storage: storage });

  let upload  = multer({ storage: storage });


import{ 
    addTodo,
    updateTodo,
    toggleTask,
    getAllUsers,
    getPersonalTasks,
    getAssignedTask,
    commentTask,
    getComments,
    deleteComment,
    updateComment,
    getAssignTask} from '../controller/todo-controller.js';

const route = express.Router();
import auth from "../middleware/auth.js";

route.post('/personaltask',auth,getPersonalTasks);
route.post('/assignedtask',auth,getAssignedTask);
route.post('/assigntask',auth,getAssignTask);
route.get('/taskform',auth,getAllUsers);
route.post('/addtask',upload.single('somefile'),auth,addTodo);
route.put('/toggletask/:id',auth, toggleTask);
route.put('/todos/:id',auth, updateTodo);

//coments routes
route.post('/:postId/comments',auth, commentTask);
route.get('/comments/:postId',auth,getComments);
route.patch('/:postId/comments/:commentId',auth,updateComment);
route.delete('/:postId/comments/:commentId',auth,deleteComment);

// route.delete('/todos/:id', deleteTodo);

export default route;