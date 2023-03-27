import mongoose from "mongoose";
import autoIncrementModelID from './Counter.js';
// import moment from "moment/moment.js";
// const today = moment();

const TodoSchema = new mongoose.Schema({
    id:{type:Number,unique:true,min:1},
    data: {
        type: String,
        required:true 
    },
    status:String,//// boolen --
    date:String,
    due:String,
    image:{
        name:String,
        img:{
            data:Buffer,
            contentType:String
           }
    },
    description:{
    type:Object
    },
    createdAt:{
     type:Date,
     default:new Date().toDateString()
    },
    to:String,
    by:String,
    delete:{
        type:Boolean,
        default:false
    }    
},{timestamps:true});

TodoSchema.pre('save', function (next){
    if (!this.isNew) {
      next();
      return;
    }

    autoIncrementModelID('activities', this, next);
});

const todo = mongoose.model('todo', TodoSchema);
export default todo;