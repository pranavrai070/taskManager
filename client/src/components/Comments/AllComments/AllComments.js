import React  from 'react'
import { useSelector } from 'react-redux'
import Comment from '../Comment/Comment'

const AllComments = ({task}) => {
  // const c = [{user:"Raj",point:"There should bne one"}, {user:"David",point:"There should bne two"},{user:"Mushkan",point:"There should bne three"}];
  const comment = useSelector(state=>state.comment)

  const getRelatedComment =()=>{
    var a=[]
    for(let i=0;i<comment.length;i++){
      if(comment[i].post===task._id) a.push(comment[i])
    }

    return a
    // console.log(comment)
    // return comment.filter((c)=>{
    //   if(c.post===task._id) return c
    // })

  }

  return (
    
    <div>

      {
        getRelatedComment().map((text)=>(
        <Comment text={text} id={task._id}/>
        ))
      }
      {/* { task.comments.map((comment) =>(
        <Comment comment={comment} id={task._id}/>
      ))
      } */}
 
    </div>
  )
}

export default AllComments