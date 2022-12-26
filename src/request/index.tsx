import BaseRequest from "./baseRequest"

const baseRequest=new BaseRequest({
  baseURL:"https://mock.apifox.cn/m1/1994533-0-default/"
})

const post=(url: string, data: any = {}, config: object = {})=>{
  return baseRequest.post(url,data,config)
}
export  {post}