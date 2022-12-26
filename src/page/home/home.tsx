
import React, { useState,useEffect,memo} from 'react'
import {useSearchParams,useLocation ,useParams } from "react-router-dom";
const Home=()=> {
  let [detail, SetDetail] = useState<any>()

  // const [searchParams, setSearchParams] = useSearchParams()
  // const location =useLocation()
  // const params = useParams()
  console.log("home")
  // console.log(searchParams.get('age'))
  // console.log(searchParams.get('name'))
  // console.log(location)

  return <div className="home">
    
    <button className="home">
      主页
      {detail.name}
    </button>
  </div>
}
export default memo(Home)