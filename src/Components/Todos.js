import {useEffect,useState} from 'react';
import '../Style.css';
import TodoComp from './Todo';

function TodosComp(props) {
    
const[userId,setUserId] =useState(0);
const[todosList,setTodosList] = useState([]);
const [isTasksCompleted,setIsTasksCompleted] =useState(false);


    
useEffect (() =>
{
    setUserId(props.userId);
    setTodosList(props.todosList);
    checkIfAllTasksCompleted();
    
},[props.userId,props.todosList,isTasksCompleted])


const checkIfAllTasksCompleted =() =>
{
    let flag = true;   
    todosList.forEach(t =>
    {
        if (!(t.completed ))
        {
            flag = false;  
        }
        
    })
    setIsTasksCompleted(flag);
    props.callbackTasksCompleted(flag);
}


const updateTodosList = (compTask) =>
{
    let todos = [...todosList];
    let index =  todos.findIndex(t => t.id == compTask.id);
    if(index >=0)
    {
      todos[index] = compTask;
    }
    setTodosList(todos);
    console.log(todos);
    props.callbackTodosAfterUpdate(todos);
   
}


  return (
    <div className='userDetails scroller' >
        <input className='btn-user' type="button" value="Add" style={{marginTop:"25px"}} onClick={() => {props.callbackClickedAddTodo(true);}} />
        <h3>Todos - User {userId}</h3>
        {
            todosList.map((t) =>
                {
                    return <TodoComp key={t.id} todo={t}  callbackTaskCompleted={compTask => updateTodosList(compTask)} isCompleted={t.completed}/>
                })
        }
      
    </div>
  );
}

export default TodosComp;
