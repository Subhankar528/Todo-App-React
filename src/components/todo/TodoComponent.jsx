import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoAiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { Formik ,Form,Field, ErrorMessage} from "formik"

export default function TodoComponent(){
  const {id}=useParams()
  const authContext=useAuth()
  const username=authContext.username
  const navigate=useNavigate()

  useEffect(
    ()=>retrieveTodos(),[id]
  )

  const [description,setDescription]=useState('')
  const [targetDate,setTargetDate]=useState('')

  function retrieveTodos(){

    if(id!=-1){
    retrieveTodoApi(username,id)
      .then(
        response=>{
          setDescription(response.data.description)
          setTargetDate(response.data.targetDate)
        }
      )
      .catch(error=>console.log(error))
  }}

  function onSubmit(values){
    const todo={
      id:id,
      username:username,
      description:values.description,
      targetDate:values.targetDate,
      done:false
    }

    if(id==-1){
      createTodoApi(username,todo)
      .then(response=>{
      navigate('/todos')
    })
    .catch(error=>console.log(error))
    }
    else{
      updateTodoApi(username,id,todo)
      .then(response=>{
       navigate('/todos')
    })
    .catch(error=>console.log(error))
    }
  }

  function validate(values){
    let error={

    }
    if(values.description.length<2){
      error.description="Enter a valid description"
    }
    if(values.targetDate==null || values.targetDate==''){
      error.targetDate="Enter a valid date"
    }
    return error
  }

  return (
    <div className="container">
      <h1>Enter Todo Details</h1>
      <div>
        <Formik initialValues={{targetDate,description}}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validate={validate}
                validateOnBlur={false}
                validateOnChange={false}
          >
          {

            (props)=>(
              <Form>
                <ErrorMessage
                     name="description"
                     component="div"
                     className="alert alert-warning"           
                />
                <ErrorMessage
                     name="targetDate"
                     component="div"
                     className="alert alert-warning"           
                />
                <fieldset className="form-group">
                  <label htmlFor="description">Description</label>
                  <Field type="text" className="form-control" name="description"/>
                </fieldset>
                <fieldset className="form-group">
                  <label htmlFor="targetDate">Target Date</label>
                  <Field type="date" className="form-control" name="targetDate"/>
                </fieldset>

                <div><button type="submit" className="btn btn-success m-5">Save</button></div>
              </Form>
            )

          }
        </Formik>
      </div>
    </div>
  )
}