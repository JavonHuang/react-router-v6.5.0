import React from 'react'
import './login.scss'
import { useNavigate,useLocation } from "react-router-dom";
import { useUtilsNavigate } from "@/utils/useUtilsNavigate";
function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  console.log("login")
  const handleClick = () => {
    useUtilsNavigate(navigate, location, '/Portal/Home' + '?id=878787', {
      state: {
        name: '测试传值',
      }
    });
  }
  

  return <div className="login">
    <button className="login-btn" onClick={handleClick}>登录</button>
  </div>
}
export default Login