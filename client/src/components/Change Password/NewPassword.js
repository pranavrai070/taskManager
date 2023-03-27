import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changePassword } from "../../api";
import "./new.css";

const NewPassword = () => {
  const [visible, setVisible] = useState(false);

  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();

  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState();

  const [success, setSuccess] = useState(null);

  let passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (success === true) {
      setTimeout(() => {
        history.push("/");
        dispatch({ type: "LOGOUT" });
      }, 3000);
    }
  }, [success]);

  //password value
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setPasswordIsValid(passwordRegex.test(event.target.value));
    // setConfirmPasswordIsValid(enteredPassword===enteredConfirmPassword)
  };

  const confirmPasswordChangeHandler = (event) => {
    setEnteredConfirmPassword(event.target.value);
    setConfirmPasswordIsValid(event.target.value === enteredPassword);
    // setPasswordIsValid(passwordRegex.test(enteredPassword))
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(passwordRegex.test(enteredPassword));
  };

  const validateConfirmPasswordHandler = () => {
    setConfirmPasswordIsValid(enteredPassword === enteredConfirmPassword);
  };

  const togglePassword = () => {
    setVisible((state) => !state);
  };

  const sendNewPassword = async () => {
    const data = {
      password: enteredPassword,
      email: email,
    };

    try {
      await changePassword(data);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="newpasswordbg">
      <form className="newpassForm" action="">
        <div className="mainContainer">
          <h1>Reset Password</h1>

          <input
            class="Newpass"
            type={visible ? "text" : "password"}
            style={{
              fontSize: visible ? 15 : null,
              display: success === true ? "none" : null,
            }}
            placeholder="Enter New Password"
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
          {passwordIsValid === false && (
            <ul class="warning">
              <li>Password must be 8 or more character</li>
              <li>include both lower and upper case characters</li>
              <li>include at least one number and a special character</li>
            </ul>
          )}

          <input
            class="Confirmpass"
            type={visible ? "text" : "password"}
            style={{
              fontSize: visible ? 15 : null,
              display: success === true ? "none" : null,
            }}
            placeholder="Confirm Password "
            onChange={confirmPasswordChangeHandler}
            onBlur={validateConfirmPasswordHandler}
          />

          {confirmPasswordIsValid === false && (
            <li class="war">Password did not matched</li>
          )}

          <input
            className="box"
            type="checkbox"
            id="showPassword"
            onChange={togglePassword}
            style={{ display: success === true ? "none" : null }}
          />
          <label
            className="checkbox"
            for="showPassword"
            style={{ display: success === true ? "none" : null }}
          >
            Show password
          </label>

          <button
            class="submitBtn"
            type="button"
            onClick={sendNewPassword}
            disabled={confirmPasswordIsValid === true ? false : true}
            style={{ display: success === true ? "none" : null }}
          >
            SUBMIT
          </button>

          {success === true && (
            <div>
              <h1 style={{ color: "green", fontSize: 14 }}>
                {" "}
                Your password has been reset successfully. Taking you to SignIn
                page
              </h1>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewPassword;
