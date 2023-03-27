import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTasks } from "../actions/tasks";
import Detail from "./Detail";
import Task from "./Task";
import "./taskList.css";

const TaskList = (props) => {
  //SERIAL NO
  var number = 1;
  const [drawer, setDrawer] = useState(false);

  const task = useSelector((state) => state.todos);
  const currentTab = useSelector((state) => state.currentTab);
  const taskDetail = useSelector((state)=>state.taskDetail)
  const dispatch = useDispatch();

  useEffect(() => {console.log(taskDetail);}, [task]);

  //TASK TO RENDER AS OUTPUT
  const getTodos = () => {
    if (currentTab === "active") {
      return task.data.filter((todo) => todo.status === "active");
    } else if (currentTab === "pending") {
      return task.data.filter((todo) => todo.status === "pending");
    } else if (currentTab === "done") {
      return task.data.filter((todo) => todo.status === "done");
    }
  };

  let count = getTodos().length;

  //TOGGLE TASK FUNCTION
  const toggle = (event) => {
    dispatch(toggleTasks(event.target.value, event.target.name));
  };

  return (
    <>
      <h5>{props.text}</h5>

      {drawer == false ? (
        <div className="tablediv">
          <table className="table">
            <thead className="table_head">
              <tr>
                <th className="srNo">Serial No.</th>
                <th>Task Name</th>
                {props.flag && (
                  <th>
                    {props.type === "appoint" ? "Assign To" : "Assigned By"}
                  </th>
                )}
                <th className="due_date">Due Date</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {getTodos().map((task) => (
                <>
                  <Task
                    task={task}
                    flag={props.flag}
                    edit={props.edit}
                    type={props.type}
                    toggle={toggle}
                    number={number++}
                    setDrawer={setDrawer}
                  />
                </>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Detail
        setDrawer={setDrawer}
        description={taskDetail.description}
        task={taskDetail}
      />
      )}

      {count === 0 && (
        <div>
          <h4 className="noRecord">No Record found</h4>
        </div>
      )}
    </>
  );
};

export default TaskList;
