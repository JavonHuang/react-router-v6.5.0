import axios, { AxiosResponse, AxiosRequestConfig, CancelTokenStatic, AxiosInstance,CreateAxiosDefaults } from 'axios'
@addInterceptorsRequest((config:any)=>{
  console.log("拦截1")
  return config;
})
@addInterceptorsResponse((config:any)=>{
  console.log("响应拦截1")
  return config;
})
@addInterceptorsRequest((config:any)=>{
  console.log("拦截2")
  return config;
})
@addInterceptorsResponse((config:any)=>{
  console.log("响应拦截2")
  return config;
})
class BaseRequest{
  static _instance: BaseRequest;
  protected service: AxiosInstance=axios;
  protected interceptorsRequestList:Array<any> | undefined;
  protected interceptorsResponsetList:Array<any> | undefined;
  constructor(params:CreateAxiosDefaults){
    if(new.target !== BaseRequest){
        return
    }
    if(!BaseRequest._instance){
        BaseRequest._instance = this
    }
    this.service = axios.create(params);
    this.interceptorsRequestList?.forEach((item)=>{
      this.service.interceptors.request.use(item)
    })
    this.interceptorsResponsetList?.forEach((item)=>{
      this.service.interceptors.response.use(item)
    })
    return BaseRequest._instance
  }

  public post=(url: string, data: any = {}, config: object = {})=>{
    return this.service!.post(url,data,config)
  }
}

function addInterceptorsRequest(func:Function){
  return function (target:any) {
    if(!target.prototype.interceptorsRequestList){
      target.prototype.interceptorsRequestList=[];
    }
    target.prototype.interceptorsRequestList.push(func)
  }
}

function addInterceptorsResponse(func:Function){
  return function (target:any) {
    if(!target.prototype.interceptorsResponsetList){
    target.prototype.interceptorsResponsetList=[];
    }
    target.prototype.interceptorsResponsetList.push(func)
  }
}
export default BaseRequest;