import { useParams,Link } from "react-router-dom";
import { useState } from "react";
import { retrieveHelloWorldBeanPathVariable} from "./api/HelloWorldApiService";
function WelcomeComponent(){
  const {username}=useParams();

  const [message,setMessage]=useState(null)

  function callWorldRestApi(){
    
    retrieveHelloWorldBeanPathVariable(username)
      .then ( (response)=>successfulResponse(response))
      .catch( (error)=>errorResponse(error) )
      .finally( ()=> console.log('cleanup') )
  }

  function successfulResponse(response){
    setMessage(response.data.message)
  }

  function errorResponse(error){
    setMessage(error)
  }
  return(
    <div className="Welcome">
      <h1>Welcome {username}</h1>
      <div>
        Manage your todos - <Link to='/todos'>Go Here</Link>
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={callWorldRestApi}>Click Me</button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  )
}

export default WelcomeComponent


/*

1:  Change your CrossOrigins annotation in your JAVA code to @CrossOrigins(origins = "http://localhost:3000", allowCredentials = "true")

2: Add  Origin header to your requests

'Origin': 'http://localhost:3000'

*/