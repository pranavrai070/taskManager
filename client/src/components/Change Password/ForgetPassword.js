import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { forgetPassword } from "../../api";
import "./forget.css";

const ForgetPassword = () => {
  //STATE
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [securityQues, setSecurityQues] = useState("");
  const [securityAns, setSecurityAns] = useState("");

  const [error, setError] = useState("");

  let emailRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  const dispatch = useDispatch();
  const history = useHistory();

  //email change
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    setEmailIsValid(emailRegex.test(event.target.value));
  };

  const gotoNewPassword = async () => {
    const data = {
      email: enteredEmail,
      question: securityQues,
      answer: securityAns,
    };

    try {
      const res = await forgetPassword(data);
      const userdata = { email: data.email, token: res.data.token };
      dispatch({ type: "CHANGE_PASSWORD", payLoad: userdata });
      history.push("/newpassword");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="forgotpagebg">
      <form className="forgotpasswordForm" action="">
        <div className="container">
          <p className="forgotp">Forgot Password</p>

          <input
            className="email"
            type="email"
            placeholder="Email Address"
            onChange={emailChangeHandler}
            required
          />

          {emailIsValid === false && (
            <li className="war">
              Invalid!(Please provide a properly formatted email address)
            </li>
          )}
        </div>

        <div className="securityForm">
          <p className="question">
            <select
              className="security"
              id="forget"
              onChange={() => {
                var e = document.getElementById("forget");
                var text = e.options[e.selectedIndex].text;
                setSecurityQues(text);
              }}
            >
              <option value="0">Select Your Security Questions</option>
              <option value="1">What city were you born in?</option>
              <option value="2">What is your favorite book?</option>
              <option value="3">
                What was your favorite place to visit as a child?
              </option>
              <option value="4">What was the first exam you failed?</option>
              <option value="5">What was your first pet's name?</option>
            </select>
          </p>

          <input
            className="Answer"
            type="text"
            placeholder="Answer"
            onChange={(event) => setSecurityAns(event.target.value.trim())}
          />
        </div>
        <button className="submitBtn" type="button" onClick={gotoNewPassword}>
          SUBMIT
        </button>
        {error !== "" && <p>{error}</p>}
      </form>
    </div>
  );
};

export default ForgetPassword;
