import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../actions/reply";

const AddComments = ({ task }) => {
  const [text, setText] = useState("");
  const user = useSelector((state) => state.user.email);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const addComments = async () => {
    const data = { id: task._id, text: text, by: user };
    console.log(data);
    dispatch(addComment(data));
    setText("")
  };

  return (
    <div className='commentSection'>
      <textarea
        className='comment_text' placeholder="add comments..."
        value={text}
        onChange={handleChange}
      ></textarea>
      <button className='add_btn' type="submit" onClick={addComments}>
        Add
      </button>
    </div>
  );
};

export default AddComments;
