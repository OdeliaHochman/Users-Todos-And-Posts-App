import {useEffect,useState} from 'react';
import '../Style.css';

function AddNewTodoComp(props) {
    

    const[newTodo,setNewTodo] = useState({});
    const[isCanceled,setIsCanceled] = useState(false);
    const[textInputTitle,setTextInputTitle] =useState("")

    useEffect(() =>
    {
      setNewTodo({userId: props.userId , id: props.newTodoId , completed: false, title:""});
    },[])
    


    const checkTodoDetailsBeforeAdd = () =>
    {
      if (!textInputTitle.trim()) {
        alert('Title cannot be empty'); 
      }
      else
      {
        props.callbackAddTodo(newTodo);
      }
       
    }



      return (
        <div className='divAddNewItem' >
    
        <h2>New Todo - User {props.userId}</h2>
        <form key={props.newTodoId} >       
            
          <label>
              Title:
              <input className='input-text' type="text" onChange={e => {setNewTodo({...newTodo, title: e.target.value}); setTextInputTitle(e.target.value);}}  /> <br/>

          </label>
          <input type="button"  value="Add" className='btn-user' onClick={checkTodoDetailsBeforeAdd} style={{marginTop:"20px"}} />
          <input type="button"  value="Cancel" className='btn-user' onClick={() => {setIsCanceled(true); props.callbackIsCanceled(isCanceled);}} style={{marginTop:"20px"}} />

        </form>

           
        </div>
      );
    }
    
    export default AddNewTodoComp;