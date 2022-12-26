import React, { useEffect,useState} from 'react'
import { Outlet } from 'react-router-dom'
import "./portal.scss";
import LeftMenu from './leftMenu';
function Portal() {
  // let [count, setCount] = useState(0)

  // useEffect(() => { 
  //   console.log("Portal")
  // });

  return <div className="portal">
    <div className='portal-header'>
      头部
      {/* <button className="home" onClick={() => setCount(++count)}>增加</button> */}
    </div>
    <div className='portal-main'>
      <div className='portal-main-left'>
        <LeftMenu></LeftMenu>
      </div>
      <div className='portal-main-context'>
      <Outlet/>
      </div>
   </div>
  </div>
}
export default Portal