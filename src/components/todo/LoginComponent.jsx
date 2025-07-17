import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { useAuth } from './security/AuthContext';
function LoginComponent(){

  const navigate=useNavigate();
  const authContext=useAuth()

  const[username,setUsername]=useState('')
  function handleUsernameChange(event){
    setUsername(event.target.value)
  }

  const[password,setPassword]=useState('')
  function handlePasswordChange(event){
    setPassword(event.target.value)
  }

  const[showErrorMessage,setShowErrorMessagae]=useState(false)

  async function handleSubmit(){
    if(await authContext.login(username,password)) {
      navigate(`/welcome/${username}`)
    }
    else{
      setShowErrorMessagae(true)
    }
    }
  return(
    <div className="Login">
      <h1>Time to login</h1>
      <div className="LoginForm">
        <div>
          <label htmlFor="userName">UserName</label>
          <input type="text" name="userName" id="userName" placeholder='Enter username' value={username} onChange={handleUsernameChange}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder='********' value={password} onChange={handlePasswordChange}/>
        </div>
        <div>
          <button type="submit" name="login" onClick={handleSubmit}>Login</button>
        </div>
        {showErrorMessage && <div className="ErrorMessage">Authentication Failed. Please check credentials.</div>}
      </div>
    </div>
  )
}

export default LoginComponent