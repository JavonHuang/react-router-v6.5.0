import React, { memo,useState,useEffect} from 'react'

const Lifecycle = () => {
  let [count, setCount] = useState(0)
  
  // useEffect(() => { 
  //   console.log("Lifecycle")
  // });
  console.log("Lifecycle")
  return <div className="home">
    <button className="home" onClick={() => setCount(++count)}>增加</button>
    
    { count}
  </div>
}
export default Lifecycle;