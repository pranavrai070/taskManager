import React from "react";
import CurrentDate from "../components/CurrentDate/CurrentDate";
import TaskForm from "../components/Form/TaskForm";

const AddTask = () => {
  return (
    <div>
      <CurrentDate />
      <TaskForm />
    </div>
  );
};

export default AddTask;
