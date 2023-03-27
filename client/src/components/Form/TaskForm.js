import React, {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { addTask } from "../../actions/tasks";
import { useDispatch } from "react-redux";
import "./taskForm.css";
import Editor from "../Editor/Editor";

const TaskForm = () => {
  //state declaration
  const [flag, setFlag] = useState(false);
  const [taskname, setTaskname] = useState("");
  const [validTask, setValidTask] = useState(null);

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(null);

  const [msg, setMsg] = useState("");
  const [validMsg, setValidMsg] = useState(null);

  const [quill,setQuill] =useState()
  const [description, setDescription] = useState({array:[]});
  
  const [due,setDue]=useState(new Date().toDateString())
  



  // const [formIsValid,setFormIsValid] = useState(null)

  const dispatch = useDispatch();

  //GETTING IMP DATA FROM REDUX
  const date = useSelector((state) => state.date);
  const userlist = useSelector((state) => state.userList);
  const currentUser = useSelector((state) => state.user.email);

  //on ForMebutton Click
  const onForMeHandler = () => {
    setUser(currentUser);
    setValidUser(true);
  };

  //on For other button
  const onForOtherButton = () => {
    setFlag((state) => !state);
  };

  const clear = () => {
    setUser("");
    setValidUser(null);
    setTaskname("");
    setFlag(false);
    setValidTask(null);
    setMsg("");
    setValidMsg(null);
    // setDescription([])
    // quill.setText("Give me Description....")
  };

  //on task input chnage
  const onTasknameChange = (event) => {
    setTaskname(event.target.value.trimStart());
    setValidTask(event.target.value.trimStart().length !== 0);
  };

  //username
  const onUsernameChange = (event) => {
    setUser(event.target.value);
    setValidUser(() => userlist.includes(event.target.value));
  };

  const handleDueDate =(event)=>{
    setDue(event.target.valueAsDate)
  }

  //on Form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(validUser);

    //API CALL
    if (validUser === true && validTask === true) {
      const data = {
        data: taskname.trim(),
        by: currentUser,
        to: user,
        date: date,
        createdAt: new Date(),
        status: "pending",
        due:due,
        description: quill.getContents(),
      };
      dispatch(addTask(data));
      console.log(data);

      setMsg("Task added successfully");
      setValidMsg(true);

      setTimeout(() => clear(), 1000);
    } else if (validTask === true) {
      setMsg("User not Exist");
      setValidMsg(true);
      // setTimeout(()=>{clear()},3000)
    } else if (validUser === true) {
      setMsg("Invalid Task");
      setValidMsg(true);
      // setTimeout(()=>{clear()},3000)
    } else {
      setMsg("Unsuccessful. Try Again!");
      setValidMsg(true);
      setTimeout(() => {
        clear();
      }, 3000);
    }

    quill.setContents([{ insert: '\n' }]);


  };

  return (
    <>
      <div className="heading">
        {" "}
        <h1> Task Form</h1>
      </div>
      
      {/* <div style={{display:'flex'}}> */}
      <div>
        <Form className="taskform" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Col sm={12}>
              {/* onBlur={()=>setValidTask(taskname.trim().length===0)} */}
              <textarea
                className="mb-3 enterTask"
                size="md"
                type="text"
                placeholder="Enter the Task Name"
                value={taskname}
                onChange={onTasknameChange}
              />
            </Col>

        <div className='dueDate'>
          <div> <label for="duedate">Due Date :</label></div>
          <div className="c" ><input className='duedateCal' type="date"  name="duedate"/></div>
        </div> 

              <Row>
                <Col sm={12}>
                  <Button
                    className={`taskformbtn ${
                      validTask === true ? "valid" : null
                    }`}
                    variant="outline-success"
                    size="sm"
                    type="submit"
                    onClick={onForMeHandler}
                  >
                    For Me
                  </Button>
                  {validTask === false && (
                    <p>Some character needed(Whitespace is not char)</p>
                  )}
                </Col>
                <Col sm={12}>
                  <Button
                    className={`mt-3 taskformbtn ${
                      validTask === true ? "valid" : null
                    }`}
                    variant="outline-info"
                    type="button"
                    size="sm"
                    onClick={onForOtherButton}
                  >
                    For Other
                  </Button>
                </Col>
              </Row>

              {flag && (
                <>
                  <Col sm={12}>
                    <Form.Control
                      className="mt-3 enterEmail"
                      size="md"
                      type="email"
                      placeholder="Enter the Email"
                      value={user}
                      onChange={onUsernameChange}
                      list="userList"
                    />

                    <datalist id="userList">
                      {userlist.map((user) => (
                        <option value={user}>{user}</option>
                      ))}
                    </datalist>
                  </Col>
                  {/* {validUser && <p>User not exist.Please select from Menu if forget Gmail of User.</p>} */}
                  <Button
                    className="mt-3 saveBtn"
                    variant="warning"
                    type="submit"
                    size="sm"
                  >
                    Save
                  </Button>
                </>
              )}

              {validMsg === true && <p className="taskmsg">{msg}</p>}
            </Form.Group>

            <div>
              <Editor quill={quill} setQuill={setQuill} description={description} setDescription={setDescription}  />
            </div>
          </Form>
        </div>

        {/* <div>
        <Editor/>
      </div> */}
    </>
  );
};

export default TaskForm;
