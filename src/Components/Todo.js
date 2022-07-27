import {useEffect,useState} from 'react';
import '../Style.css';

function TodoComp(props) {
    

const[task,setTask] = useState({});

useEffect(() =>
{
    setTask(props.todo);
    
},[props.todo,props.isCompleted])


const clickedMarkCompleted = () =>
{
  let t = {...task};
  t.completed=true;
  setTask(t);
  props.callbackTaskCompleted(t);
}


  return (
    <div className='item' >

            <strong>Title:</strong> {task.title} <br/>
            <strong>Completed:</strong> {String(task.completed)}<br/>
            {
               task.completed? null :<input type="button" value="Mark Completed" className='btn-user' onClick={clickedMarkCompleted}/>
            }
       
    </div>
  );
}

export default TodoComp;
