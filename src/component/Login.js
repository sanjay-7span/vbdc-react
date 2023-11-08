import React, { useEffect, useState, useEffectuseState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { setUserSession } from '../auth/common';
import "../style.css";

const Login = () => {
  const history = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [uname, setUname] = useState("");
  const [pass, setPassword] = useState("");

  const [authenticated, setauthenticated] = useState(null);
  const loggedInUser = localStorage.getItem("amc-token");
  useEffect(() => {
    
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);
  if(loggedInUser){
    history('/dashboard');
  }
  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    console.log(uname);
    axios.post('https://malaria-api.preview.im/api/v1/login', { mobile: uname, password: pass,device_type : "web" }).then(response => {
      setUserSession(response.data.token, response.data.user);
      history('/dashboard');
    }).catch(error => {
      console.log(error);
      if (error.response.status === 401) setErrorMessages({ name: "pass", message: error.response.data.message});
      else setErrorMessages({ name: "pass", message: "Something went wrong.Please try again later."});
    });
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
  name === errorMessages.name && (
    <div className="error">{errorMessages.message}</div>
  )
  

  return (
    <div className="bg-gray-bg1 right h-full flex flex-col ml-20 justify-center">
      <div className="login-form">
        <div className="title">Sign In</div>
            <div className="form">
              <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <label>Username </label>
                  <input type="text" value={uname} required  onChange={(e) => setUname(e.target.value)} />
                  {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                  <label>Password </label>
                  <input type="password" value={pass} onChange={(e) => setPassword(e.target.value)} required />
                  {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                  <input type="submit" />
                </div>
              </form>
            </div>
      </div>
    </div>
  );
};

export default Login;