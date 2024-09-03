import React, { useState } from 'react';
import '../CSS/LoginPage.css'; 
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleNavigate = (e) => {
    navigate('/dashboard')
  }

  return (
    <div className='xyz'>
      <img src={require("../assets/Logo.png")} className='logo' />
      <p className='OPM'>Online Project Management</p>
    <div className="login-container">
      <div className="login-card">
        <h2 style={{color:'grey'}}>Login to get started</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required='true'
            />
          </div>
          <div className="input-group password-group">
            <label htmlFor="password">Password:</label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required='true'
            />
            <button type="button" className="eye-button" onClick={togglePasswordVisibility} className="eye">
              {passwordVisible ? <IoEyeSharp /> : <FaEyeSlash /> }
            </button>
          </div>
          <button type="submit" className="group-3" onClick={handleNavigate}>Login</button>
          <a href="#" className='tag'>Forget Password</a>
        </form>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
