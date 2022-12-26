import ReactDOM from 'react-dom';
import {RouterProvider } from "react-router-dom";
import './index.css'
import { Router } from './routes/route';
import { AliveScope } from 'react-activation'
import React from 'react';
import { RouterBeforeEach } from "@/utils/useUtilsNavigate";
RouterBeforeEach(( to,from) => { 
  console.log("路由守卫to", to)
  console.log("路由守卫from", from)
  return true;
})

ReactDOM.render(
    <AliveScope>
      <RouterProvider router={Router()}/>
    </AliveScope>,
  document.getElementById('root')
);
