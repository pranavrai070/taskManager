import Todo from '../model/Todo.js';
import User from '../model/User.js';
import Comment from '../model/Comment.js';
import Notification from '../model/Notification.js';
import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();

  
export const addTodo = async (request, response,next) => {
    console.log(request.body);
    // console.log(request.file);
    const {to,by}=request.body;
    try {
        const rightTo=await User.findOne({ email:to });
        const rightBy=await User.findOne({ email:by });
        if(rightTo && rightBy){
            var newTo=rightTo.email;
            var newBy=rightBy.email;
        }else{
            return response.status(400).json({message:"Email id given is missing."});
        }

        const newTodo = await Todo.create({
            data: request.body.data,
            date: request.body.date,
            to:newTo,
            by:newBy,
            due:request.body.due,
            status:request.body.status,
            description:request.body.description,
            // image:{
            //     name:request.file.originalname,
            //     img:{
            //        data:fs.readFileSync(path.join(__dirname + '/uploads/' + request.file.filename)),
            //        contentType:'image/png'
            //     }
            //    }
        });
        await newTodo.save();
        return response.status(200).json(newTodo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}


export const getPersonalTasks = async (request, response) => {
    console.log(" get personal task called");
    console.log(request.body);
    console.log(request.query);
    const {page}=request.query;

    const userEmail=request.body.email
    const selectedDate=request.body.date
    // console.log(request.body)
    try {

        const LIMIT = 9;
        const startIndex = (Number(page) - 1) * LIMIT;

        const total = await Todo.countDocuments({status:request.body.status});

        const todos= await Todo.find({to:userEmail,
            by:userEmail,
            date:selectedDate,
            status:{$ne:"delete"},
            status:request.body.status
        }).sort({id:-1}).limit(LIMIT).skip(startIndex);
        // console.log(todos);
        return response.status(200).json({ data:todos, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const getAssignedTask = async (request, response) => {
    const userEmail=request.body.email
    const selectedDate=request.body.date
    const {page}=request.query;
    // console.log(request.body)
    try {

        const LIMIT = 9;
        const startIndex = (Number(page) - 1) * LIMIT;

        const total = await Todo.countDocuments({status:request.body.status});

        const todos=await Todo.find({by:{$ne:userEmail},status:{$ne:"delete"},
            to:userEmail,
            date:selectedDate,
            status:request.body.status
        }).sort({id:-1}).limit(LIMIT).skip(startIndex);
        // console.log(todos);
        return response.status(200).json({ data:todos, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const getAssignTask = async (request, response) => {
    const userEmail=request.body.email
    const selectedDate=request.body.date
    const {page}=request.query;
    // console.log(request.body)
    try {

        const LIMIT = 9;
        const startIndex = (Number(page) - 1) * LIMIT;

        const total = await Todo.countDocuments({status:request.body.status});

        const todos=await Todo.find({to:{$ne:userEmail},status:{$ne:"delete"},
            by:userEmail,
            date:selectedDate,
            status:request.body.status
        }).sort({id:-1}).limit(LIMIT).skip(startIndex);
        // console.log(todos);
        return response.status(200).json({ data:todos, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    
    } catch (error) {
        return response.status(500).json(error.message);
    }
}


export const getAllUsers = async (request, response) => {
    
    try {
        const users=await User.find({}).select('email');
        // console.log(users);
        return response.status(200).json(users);
    
    } catch (error) {
        return response.status(500).json(error.message);
    }
}



// export const getDateTask = async (request, response) => {
//     const selectedDate=request.body.date
//     const userEmail=request.body.email
//     console.log(request.body);
//     try {
//         const todos=await Todo.find({$or:[ {'to':userEmail},
//          {'by':userEmail},
//          {'date':selectedDate} 
//         ]}).sort({id:-1});
//         console.log(todos);
//         return response.status(200).json(todos);
    
//     } catch (error) {
//         return response.status(500).json(error.message);
//     }
// }


export const toggleTask = async (request, response) => {
    try {
        // const todoRef = await Todo.findById(request.params.id);
        // // console.log(request.params);
        // // console.log(todoRef);
        // console.log(request.body);
        // console.log(request.params);

        const todo = await Todo.findOneAndUpdate(
            { _id: request.params.id },
            {status:request.body.status}
        )
        await todo.save();
        
        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}


export const updateTodo= async (request, response) => {
    console.log("update called")
    // console.log(request.body);
    try {

        // console.log(request.params);
        // console.log(request.body);

        await Todo.findOneAndUpdate(
            { _id: request.params.id },
            { data: request.body.data }
        );
        
        const todo = await Todo.findById(request.params.id);
        console.log(todo)
        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
};

export const commentTask = async (req, res) => {
    console.log("adding comment called");
    // console.log("comments kro");
    // console.log(req.params)
    // const { id } = req.params;
    // console.log(req.body);
    // const comment = {
    //     text:req.body.comment,
    //     postedBy:req.body.by
    // }

    // try {
    
    // await Todo.findByIdAndUpdate(id,{
    //     $push:{comments:comment}
    // },{
    //     new:true
    // })

    // const updatedTodo= await Todo.findById(id);

    // return res.status(200).json(updatedTodo);
    // } catch (error) {
    //     return res.status(500).json(error.message);
    // }
   console.log(req.params);
   console.log(req.body);
    try {
        const post = await Todo.findById(req.params.postId);
        if (!post) return res.status(404).send({ error: 'Post not found' });
    
        const comment = await Comment.create({
          text: req.body.text,
          post: req.params.postId,
          postedBy:req.body.by
        });
    
        await comment.save();
        res.status(201).send(comment);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }

};


export const getComments = async (req, res) => {
    const postId = req.params.postId;
    
    try {
        const post = await Todo.findById(postId);
        if (!post) {
          return res.status(404).send("Post not found");
        }
    
        const comments = await Comment.find({ post: postId });
        res.send(comments);
      } catch (err) {
        res.status(500).send("Server error");
      }
};




export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) return res.status(404).send({ error: 'Comment not found' });
    
        if (comment.post.toString() !== req.params.postId)
          return res.status(403).send({ error: 'Not authorized' });
    
        comment.text = req.body.text;
        await comment.save();
        res.status(200).send(comment);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
};

export const deleteComment = async (req, res) => {

    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) return res.status(404).send({ error: 'Comment not found' });
    
        if (comment.post.toString() !== req.params.postId)
          return res.status(403).send({ error: 'Not authorized' });
    
        await comment.remove();
        res.status(204).send();
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
};





// export const deleteTodo = async (request, response) => {
//     try {
//         const todo = await Todo.findByIdAndDelete(request.params.id);

//         return response.status(200).json(todo);
//     } catch (error) {
//         return response.status(500).json(error.message);
//     }
// }

