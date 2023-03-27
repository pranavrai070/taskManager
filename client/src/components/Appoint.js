import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./MyTask.css";
import { useHistory } from "react-router-dom";
import { assignTask } from "../actions/tasks";
import BasicPagination from "./Pagination/BasicPagination";


const Appoint = () => {
  const [pageNo, setPageNo] = useState(1);

  const data = {
    email: useSelector((state) => state.user.email),
    date: useSelector((state) => state.date),
    status: useSelector((state) => state.currentTab),
    page: pageNo,
  };


  const currentTab = useSelector((state) => state.currentTab);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(assignTask(history, data));
  }, [data.date]);

  const onActive = () => {
    const newData = { ...data, page: 1, status: "active" };
    dispatch(assignTask(history, newData));
    dispatch({ type: "ACTIVE" });
    setPageNo(1);
  };

  const onPending = () => {
    const newData = { ...data, page: 1, status: "pending" };
    dispatch(assignTask(history, newData));
    dispatch({ type: "PENDING" });
    setPageNo(1);
  };

  const onDone = () => {
    const newData = { ...data, page: 1, status: "done" };
    dispatch(assignTask(history, newData));
    dispatch({ type: "DONE" });
    setPageNo(1);
  }

  const getPageNo = (event, value) => {
    setPageNo(value);
  };
  return (
    <div className="task">
      <div className="tab">
        <button
          className={`ABtn`}
          style={{
            backgroundColor:
              currentTab === "active" ? " rgb(24, 200, 248)" : "",
          }}
          onClick={onActive}
        >
          Active
        </button>
        <button
          className={`PBtn`}
          style={{
            backgroundColor:
              currentTab === "pending" ? " rgb(24, 200, 248)" : "",
          }}
          onClick={onPending}
        >
          Pending
        </button>
        <button
          className={`DBtn`}
          style={{
            backgroundColor: currentTab === "done" ? " rgb(24, 200, 248)" : "",
          }}
          onClick={onDone}
        >
          Done
        </button>
      </div>
      <TaskList
        tab={currentTab}
        flag={true}
        type="appoint"
        text="Task for Other"
        edit={true}
      />
      <BasicPagination getPageNo={getPageNo} page={pageNo} />
    </div>
  );
};

export default Appoint;
