import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import edit from "../assets/icons/edit.svg";
import { changeTask, toggleTasks } from "../actions/tasks";
import "./taskList.css";
import Detail from "./Detail";

const Task = (props) => {
  const [text, setText] = useState(props.task.data);
  const [editing, setEditing] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(props.task);
  }, []);

  const clickHandler = () => setEditing((flag) => !flag);

  const editTask = (event) => {
    event.preventDefault();

    const newTask = {
      id: props.task._id,
      text: text,
    };

    dispatch(changeTask(newTask.id, newTask.text));
    clickHandler();
  };

  const showDetail=()=>{
    dispatch({type:"SET_DETAIL", payLoad:props.task})
    props.setDrawer((state) => !state)
  }

  //TOGGLE TASK TO ACTIVE PENDING DONE DELETE

  return (
    <>
        <tr>
          <td className="srNumber" data-label="Serial no.">
            <h6 style={{ fontWeight: "bold", fontSize: "12px" }}>
              {" "}
              {props.number}
            </h6>
          </td>

          <td
            data-label="Task Name"
            style={{ display: editing ? "none" : " " }}
          >
            <p
              className="task_name"
              onClick={showDetail}
            >
              {props.task.data}
            </p>
            {props.edit === true && (
              <span onClick={props.edit ? clickHandler : () => {}}>
                <img className="editbtn" src={edit} alt="edit" />
              </span>
            )}
          </td>

          <td
            style={{ display: editing ? "" : "none" }}
            className="edittask-box"
          >
            <form className="edittask-box wrapper" onSubmit={editTask}>
              <textarea
                type="text"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
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
          </td>

          {props.flag && (
            <td data-label="usermail">
              {props.type === "appoint" ? props.task.to : props.task.by}
            </td>
          )}

          <td className="due_date" data-label="Due Date">
            {props.task.due}{" "}
          </td>

          <td className="Btn" data-label="change status">
            {props.task.status !== "active" && (
              <button
                className="active listBtn"
                value={props.task._id}
                name="active"
                onClick={props.toggle}
              >
                Active
              </button>
            )}
            {props.task.status !== "pending" && (
              <button
                className="pending listBtn"
                value={props.task._id}
                name="pending"
                onClick={props.toggle}
              >
                Pending
              </button>
            )}
            {props.task.status !== "done" && (
              <button
                className="done listBtn"
                value={props.task._id}
                name="done"
                onClick={props.toggle}
              >
                Done
              </button>
            )}

            <button
              className="delete listBtn"
              data-label="Change status"
              name="delete"
              value={props.task._id}
              onClick={props.toggle}
            >
              Delete
            </button>
          </td>
        </tr>
    </>
  );
};

export default Task;
