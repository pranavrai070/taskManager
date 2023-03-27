import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required:true
  },
  post: {
    type: String,
    required:true,
  },
  postedBy: {
    type: String,
    required:true,
  },
});

const Comment = mongoose.model("comment", CommentSchema);
export default Comment;