import {useEffect,useReducer,useState} from 'react';
import '../Style.css';


function AddNewUserComp(props) {


   const[newUser,setNewUser] = useState({name:"" , email: ""});
   const[isCanceled,setIsCanceled] = useState(false);
   const[textInputName,setTextInputName] = useState("");
   const[textInputEmail,setTextInputEmail] = useState("");


  useEffect(() =>
  {
    setNewUser({...newUser, id: props.newUserId});
  },[])

  const checkUserDetailsBeforeAdd = () =>
  {
    
    if (!textInputName.trim()) {
      alert('Name cannot be empty');
      
    }
    else if(!textInputEmail.trim())
    {
      alert('Email cannot be empty');
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(textInputEmail)) {
      alert('Invalid email address');
    }
    else
    {
      props.callbackAddUser(newUser);
    }
    
   
  }
   


  return (

    <div className='divAddNewItem'>
        <h2>Add New User</h2>
        <form key={props.newUserId} >       
            
        <label>
            Name:
            <input className='input-text' type="text" onChange={e => {setNewUser({...newUser, name: e.target.value});setTextInputName(e.target.value);}}  /> <br/>
            Email:
            <input className='input-text' type="text" onChange={e => {setNewUser({...newUser, email: e.target.value}); setTextInputEmail(e.target.value);}} /> <br/>
        </label>
        <input type="button"  value="Add" className='btn-user' onClick={checkUserDetailsBeforeAdd} style={{marginTop:"20px"}} />
        <input type="button"  value="Cancel" className='btn-user' onClick={() => {setIsCanceled(true); props.callbackIsCanceled(isCanceled);}} style={{marginTop:"20px"}} />

        </form>

    
    </div>
  );
}

export default AddNewUserComp;
