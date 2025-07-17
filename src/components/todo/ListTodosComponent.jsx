import { useEffect, useState } from "react"
import { deleteTodoApi, retrieveAllTodosForUsernameApi } from "./api/TodoAiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"

function ListTodosComponent(){

  const authContext=useAuth()
  const userName=authContext.username

  const[todos,setTodos]=useState([])
  const[message,setMessage]=useState(null)

  const navigate=useNavigate()

  function deleteTodo(id){
    deleteTodoApi(userName,id)
    .then(
      ()=>{
        setMessage(`Successfully deleted todo with id ${id}`)
        refreshTodos()
      }
    )
    .catch(error=>console.log(error))
  }

  function updateTodo(id){
    navigate(`/todo/${id}`)
  }

  function addNewTodo(){
    navigate(`/todo/-1`)
  }


  useEffect(
    ()=>refreshTodos(),[]
  );
  
  function refreshTodos(){
    retrieveAllTodosForUsernameApi(userName)
    .then((response)=>setTodos(response.data))
    .catch(error=>console.log(error))
  }

  return(
    <div className="container">
      <h1>Things You Want to Do!</h1>
      {message && <div className="alert alert-warning">{message}</div>}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Is Done ?</th>
              <th>Target Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              todos.map(
                todo=>(
                  <tr key={todo.id}>
                    <td>{todo.description}</td>
                    <td>{todo.done.toString()}</td>
                    <td>{todo.targetDate.toString()}</td>
                    <td><button className="btn btn-warning" onClick={()=> deleteTodo(todo.id)}>Detele</button></td>
                    <td><button className="btn btn-success" onClick={()=> updateTodo(todo.id)}>Update</button></td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>
      </div>
      <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
    </div>
  )
}

export default ListTodosComponent