import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./currentDate.css";

const CurrentDate = () => {
  const currentDate = useSelector((state) => state.date);
  const dispatch = useDispatch();

  const datePickHandler = (event) => {
    dispatch({ type: "CHANGE_DATE", payLoad: event.target.valueAsDate });
  };

  return (
    <div className="date">
      <p className="headDate">{currentDate}</p>
      <input
        className="calender"
        type="date"
        id="date-object"
        onChange={datePickHandler}
      />
    </div>
  );
};

export default CurrentDate;
