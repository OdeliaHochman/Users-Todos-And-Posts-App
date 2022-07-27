import {useEffect,useState} from 'react';
import '../Style.css';

function AddNewPostComp(props) {
    

    const[newPost,setNewPost] = useState({});
    const[isCanceled,setIsCanceled] = useState(false);
    const[textInputTitle,setTextInputTitle] =useState("")
    const[textInputBody,setTextInputBody] =useState("")


    useEffect(() =>
    {
      setNewPost({...newPost, userId: props.userId , id: props.newPostId});
    },[props.userId ,props.newPostId])
    
    
    const checkPostDetailsBeforeAdd = () =>
    {
      if (!textInputTitle.trim()) {
        alert('Title cannot be empty'); 
      }
      else if(!textInputBody.trim())
      {
        alert('Body cannot be empty');
      }
      else
      {
        props.callbackAddPost(newPost);
      }
       
    }


      return (
        <div className='divAddNewItem' >
    
    <h2>New Post - User {props.userId}</h2>
        <form key={props.newPostId} >       
            
        <label>
            Title:
            <input className='input-text' type="text" onChange={e => {setNewPost({...newPost, title: e.target.value});setTextInputTitle(e.target.value);}}  /> <br/>
            Body:
            <input className='input-text' type="text" onChange={e => {setNewPost({...newPost, body: e.target.value});setTextInputBody(e.target.value);} }/> <br/>
        </label>
        <input type="button"  value="Add" className='btn-user' onClick={checkPostDetailsBeforeAdd} style={{marginTop:"20px"}} />
        <input type="button"  value="Cancel" className='btn-user' onClick={() => {setIsCanceled(true); props.callbackIsCanceled(isCanceled);}} style={{marginTop:"20px"}} />

        </form>

           
        </div>
      );
    }
    
    export default AddNewPostComp;