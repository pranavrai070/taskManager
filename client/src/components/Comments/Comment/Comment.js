import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../../actions/reply";

const Comment = ({ text, id }) => {
  // useEffect(()=>{console.log(comment);},[comment])
  const [editing, setEditing] = useState(false);
  const [msg,setMsg] =useState(text.text)
 
  const dispatch = useDispatch();

  const deleteComments = () => {
    const data = { task_id: id, comment_id: text._id };
    dispatch(deleteComment(data));
  };

  const edit = () => {
    setEditing(state=>!state)
  };

  const editComments =(e)=>{
    e.preventDefault()
    dispatch(editComment({task_id:id,comment_id:text._id,text:msg}))    
    setEditing(false)
  }

  return (
    <>
       {/* <div style={{ display: editing ? "none" : "flex" }}> */}
      <div className='comment_box'>
      <h6 className='text_comment'>{text.text}</h6>
     
        <p id='user_name' classname='username_comment'>{text.postedBy}</p>
     <div className="comment_btn">
        <button className='edit_btn' onClick={edit}>Edit</button>
        <button className='delete_btn' onClick={deleteComments}>Delete</button>
    </div>
      </div>
    
      <div style={{ display: editing ? "flex" : "none" }}>
        <form className="edittask-box wrapper" onSubmit={editComments}>
          <textarea
            type="text"
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
              const textarea = document.querySelector("textarea");
              textarea.addEventListener("keyup", (e) => {
                textarea.style.height = "60px";
                let scHeight = e.target.scrollHeight;
                textarea.style.height = `${scHeight}px`;
              });
            }}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default Comment;
