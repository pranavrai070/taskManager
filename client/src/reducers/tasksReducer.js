export const tasksReducer = (todos = {}, action) => {
  switch (action.type) {
    case "PERSONAL_TASK":
      return action.payLoad;

    case "ASSIGNED_TASK":
      return action.payLoad;

    case "ASSIGN_TASK":
      return action.payLoad;

    case "TOGGLE":
      return {
        ...todos,
        data: todos.data
          .map((task) => {
            if (task._id === action.payLoad.id)
              task.status = action.payLoad.status;
            return task;
          })
          .filter((task) => task.status !== "delete"),
      };

    case "EDIT_TASK":
      return {
        ...todos,
        data: todos.data.map((task) => {
          if (task._id === action.payLoad.id) task.data = action.payLoad.text;
          return task;
        }),
      };

    // case "ADD_COMMENT":
    //   for (let i = 0; i < todos.data.length; i++) {
    //     if (todos.data[i]._id === action.payLoad._id)
    //       todos.data[i].comments = action.payLoad.comments;
    //   }
    //   return todos;
    
    // case "DELETE_COMMENT":
    //   for (let i = 0; i < todos.data.length; i++) {
    //     // for(let j=0;j<todos.data[i].comments)
    //     // if (todos.data[i]._id === action.payLoad._id)
    //       // todos.data[i].comments = action.payLoad.comments;

    //       todos.data[i].comments.map((c)=>{
    //         if(c._id!==action.payLoad.task_id) return c
    //       })
    //   }
    //   return todos;
      

    case "LOGOUT_TASK":
      return {};

    default:
      return todos;
  }
};
