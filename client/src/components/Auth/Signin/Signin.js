import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { signin } from "../../../actions/auth";
import "./signin.css";

const Signin = () => {

  //STATE
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((state) => state.text);

  //Regular expression for Validation
  let emailRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  let passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  //email change
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    setEmailIsValid(emailRegex.test(event.target.value));

    setFormIsValid(
      emailRegex.test(event.target.value) && passwordRegex.test(enteredPassword)
    );
  };

  //password vchnage
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setPasswordIsValid(passwordRegex.test(event.target.value));
    setFormIsValid(
      passwordRegex.test(event.target.value) && emailRegex.test(enteredEmail)
    );
  };

  // validate email
  const validateEmailHandler = () => {
    setEmailIsValid(emailRegex.test(enteredEmail));
  };

  //validate password
  const validatePasswordHandler = () => {
    setPasswordIsValid(passwordRegex.test(enteredPassword));
  };

  //toggle password
  const togglePassword = (event) => {
    setVisible((state) => !state);
  };

  //submit form
  const submitHandler = async (event) => {
    event.preventDefault();

    //API CALL FOR SIGNIN
    const form = { email: enteredEmail, password: enteredPassword };

    dispatch(signin(form, history));
  };

  return (
    <div className="bg-img">
      <form className="signinForm" action="" onSubmit={submitHandler}>
        <div className="mainContainer">
          <h1>SIGN IN</h1>
          <input
            className={emailIsValid === false ? "wrong" : ""}
            type="email"
            placeholder="Email Address"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            required
          />
          {emailIsValid === false && (
            <p>Invalid!(Please provide a properly formatted email address)</p>
          )}

          <input
            className={`pswrd ${passwordIsValid === false ? "wrong" : ""}`}
            type={visible ? "text" : "password"}
            placeholder="Enter Password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            required
          />

          {passwordIsValid === false && (
            <ul className="warning">
              <li>Password must be 8 or more character</li>
              <li>include both lower and upper case characters</li>
              <li>include at least one number and a special character</li>
            </ul>
          )}
          <input
            className="box"
            type="checkbox"
            id="showPassword"
            onChange={togglePassword}
          />
          <label className="checkbox" for="showPassword">
            Show password
          </label>

          <button
            className={`signinBtn ${formIsValid ? "valid" : null}`}
            type="submit"
            disabled={!formIsValid}
          >
            SIGN IN
          </button>

          {error && <p>{error}</p>}

          <h6 className="register">
            Not a member? <a href="/signup">Register here!</a>
          </h6>

          <h6 className="forgotP">
            <a href="/forgetpassword">Forgot Password</a>
          </h6>
        </div>
      </form>
    </div>
  );
};

export default Signin;
