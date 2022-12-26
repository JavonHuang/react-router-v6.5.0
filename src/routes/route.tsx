import { createHashRouter,useRouteError,redirect} from "react-router-dom";
import { Suspense, lazy } from 'react'
import React from "react";
import KeepAlive from 'react-activation'

type IRouterBeforeLoad = (res:any, redirectUrl: string) => Boolean;
let routerLoader: IRouterBeforeLoad;
let _redirectUrl: string = "/";
const routes = [
  {
    path: '/',
    auth: false,
    name:"login",
    component:lazy(() => import('@/page/login/login'))
  },
  {
    path: '/Portal',
    name:"Portal",
    component:lazy(() => import('@/page/portal/portal')),
    children: [
      { 
        path: '/Portal/Home',
        name:"Home",
        component:lazy(() => import('@/page/home/home'))
      },
      { 
        path: '/Portal/Lifecycle',
        name:"Lifecycle",
        component:lazy(() => import('@/page/lifecycle/lifecycle'))
      },
      { 
        path: '/Portal/NotFound',
        name:"NotFound",
        component:lazy(() => import('@/page/error/NotFound'))
      },
      { 
        path: '*',
        component:lazy(() => import('../page/error/NotFound'))
      },
    ]
  },
  { 
    path: '*',
    component:lazy(() => import('../page/error/NotFound'))
  },
]


function ErrorBoundary() {
  let error:any = useRouteError();
  return <div>
    <div>{ error.message}</div>
    <div>{ error.stack}</div>
  </div>;
  return <></>
}

// 路由处理方式
const generateRouter = (routers:any) => {
  return routers.map((item:any) => {
    if (item.children) {
      item.children = generateRouter(item.children)
    }
    item.element = <Suspense fallback={
      <div>加载中...</div>
    }>
      {/* 把懒加载的异步路由变成组件装载进去 */}
      {/* <KeepAlive id={item.name} cacheKey={item.name}> */}
        <item.component />
      {/* </KeepAlive> */}
    </Suspense>
    item.errorElement = <ErrorBoundary></ErrorBoundary>
    item.loader = async (res: any) => {
      if (routerLoader && !item.children) {
        if (routerLoader(res,_redirectUrl)) {
          return res;
        } else { 
          return redirect(_redirectUrl);
        }
      }
      return res;
    }
    return item
  })
}

const RouterLoader = (fun: IRouterBeforeLoad) => {
  routerLoader = fun;
}

const Router  = ()=>createHashRouter(generateRouter([...routes]))
export{ Router,RouterLoader}