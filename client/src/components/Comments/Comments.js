import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getComment } from '../../actions/reply'
import AddComments from './AddComment/AddComments'
import AllComments from './AllComments/AllComments'
import "./comment.css"

const Comments = ({task}) => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getComment(task._id))

    return(()=>{
      //delet all comment in Redux for this task 

    })
  },[task])

  return (
    <div style={{border:'#000'}}>

      <h5 id='comment_heading'>Comments</h5>

        <div>
           <AllComments task={task}/>
        </div>

        <div style={{display:'flex'}}>
            <AddComments task={task}/>
        </div>
        
    </div>
  )
}

export default Comments