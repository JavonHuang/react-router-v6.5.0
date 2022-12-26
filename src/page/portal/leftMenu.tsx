import React, { useEffect ,memo} from 'react'
import { useNavigate,useLocation } from "react-router-dom";

import { useUtilsNavigate } from "@/utils/useUtilsNavigate";

const LeftMenu = () => { 
  const navigate = useNavigate()
  const location=useLocation()
  const handleClick = (url:any)=>{
    // navigate(url)
    useUtilsNavigate(navigate,location,url)
  }
  

  return <>
    <div onClick={()=>handleClick('/Portal/Home' + '?id=878787')}>主页</div>
    <div onClick={() => handleClick("/Portal/Lifecycle")}>生命周期</div>
    <div onClick={()=>handleClick("/Portal/NotFound")}>错误</div>
  </>
}

export default memo(LeftMenu);