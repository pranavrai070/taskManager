import Quill from "quill";
import React, { useEffect, useState } from "react";
import Comments from "./Comments/Comments";
import "./detail.css";

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

const Detail = ({ task,description,setDrawer}) => {
  const [quill,setQuill] = useState()

  //initialize quill
  useEffect(()=>{
    const quillServer = new Quill('#quillEditor',{theme:'snow',modules:{toolbar:toolbarOptions}})
    setQuill(quillServer)
    quillServer.setContents(description)
    quillServer.disable()
  },[])

  //getting description of that file
  useEffect(()=>{
    if(quill===null) return
    // quill && quill.setContents(description)
  },[])

  return (
    <div class="editor">
      <div className="editor_head">
      <h3 className="editorh3">Discription</h3>
      <button className="exitbtn" onClick={()=>setDrawer(false)}>X</button>
      </div>
 
      <hr></hr>
      <div id='quillEditor' />

      <div>
        <Comments task={task}/>
      </div>
    </div>
  );
};

export default Detail;
