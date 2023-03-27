import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TaskList from "./TaskList";
import { useDispatch } from "react-redux";
import "./MyTask.css";
import { personalTask } from "../actions/tasks";
import { useHistory } from "react-router-dom";
import Loader from "./Loader/Loader";
import BasicPagination from "./Pagination/BasicPagination";

const MyTask = () => {
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
  const loader = useSelector((state) => state.loader);

  useEffect(() => {
    dispatch(personalTask(history, data));
  }, [data.date, pageNo]);

  const onActive = () => {
    const newData = { ...data, page: 1, status: "active" };
    dispatch(personalTask(history, newData));
    dispatch({ type: "ACTIVE" });
    setPageNo(1);
  };

  const onPending = () => {
    const newData = { ...data, page: 1, status: "pending" };
    dispatch(personalTask(history, newData));
    dispatch({ type: "PENDING" });
    setPageNo(1);
  };

  const onDone = () => {
    const newData = { ...data, page: 1, status: "done" };
    dispatch(personalTask(history, newData));
    dispatch({ type: "DONE" });
    setPageNo(1);
  };

  const getPageNo = (event, value) => {
    setPageNo(value);
  };

  return (
    <div className="task">
      {!loader ? (
        <>
          <div className="tab">
            <button
              className={`ABtn`}
              style={{
                backgroundColor:
                  currentTab === "active" ? "rgb(24, 200, 248)" : "",
              }}
              onClick={onActive}
            >
              Active
            </button>
            <button
              className={`PBtn`}
              style={{
                backgroundColor:
                  currentTab === "pending" ? "rgb(24, 200, 248)" : "",
              }}
              onClick={onPending}
            >
              Pending
            </button>
            <button
              className={`DBtn`}
              style={{
                backgroundColor:
                  currentTab === "done" ? "rgb(24, 200, 248)" : "",
              }}
              onClick={onDone}
            >
              Done
            </button>
          </div>

          <TaskList
            flag={false}
            type="myList"
            text="Personal Task"
            edit={true}
            pageNo={pageNo}
          />
          <BasicPagination getPageNo={getPageNo} page={pageNo} />
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  );
};

export default MyTask;
