import { apiClient } from "./ApiClient";

// export function retrieveHelloWorldBean(){
//   return axios.get('http://localhost:8080/hello-world-bean')
// }


export const retrieveHelloWorld=()=>apiClient.get('/hello-world')

export const retrieveHelloWorldBean=()=>apiClient.get('/hello-world-bean')

export const retrieveHelloWorldBeanPathVariable=(username,token)=>apiClient.get(`/hello-world/path-variable/${username}`)

export const executeBasicAuthenticationService=(token)=>apiClient.get('/basicauth',{
  headers:{Authorization: token}
})