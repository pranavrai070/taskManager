import React, { useEffect, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './editor.css'

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

    ['link', 'image'],
  
    ['clean']                                         // remove formatting button
  ];

const Editor = ({quill,setQuill,description,setDescription}) => {
    


    // useEffect(()=>{
    //   console.log('description: ' ,description);
    // },[description])

    //init quill
    useEffect(()=>{
        const quillServer = new Quill('#container',{theme:'snow',modules:{toolbar:toolbarOptions}})
        setQuill(quillServer)
    },[])

    //get Quill data and store in description state
    useEffect(()=>{
        if(quill===null) return

        // const handleChange=(delta,oldData,source)=>{
        //   if(source!=='user') return
        //   setDescription((state)=>{
        //     if(state.array===[]) state.array = [delta.ops[0]]
        //     else state.array = [oldData.ops[0],delta.ops[0]]
        //   })
        //   console.log(oldData);
        //   console.log(delta);
        //   console.log(description);
        // }

        // quill && quill.on('text-change',handleChange)
        quill && setDescription(quill.getContents())
        console.log(description);

        return ()=>{
          // quill && quill.off('text-change')
        }
    },[quill])

    // useEffect(()=>{
      // quill.deleteText()
      // quillServer.setContents([{ insert: '\n' }]);
    // },[quillClear])



  return (
    
    <div className='quill'>
        <h4 className='quillheading'>Discription</h4>
        <div id='container'></div>
    </div>
  )
}

export default Editor