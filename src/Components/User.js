import {useEffect,useState} from 'react';
import '../Style.css';



function UserComp(props) {


   const[user,setUser] = useState({});
   const[onMouseOver,setOnMouseOver] = useState(false);
   

   useEffect( () =>
   {
    setUser(props.userData);
    
   },[props.userData,props.isSelected, props.isCompleted])




  return (
<div>
    <div className="user" style={{backgroundColor: user.isSelected? "orange" : "white", borderColor: user.isTasksCompleted? "green" : "red"}}>

        <form key={user.id} >       
            <label onClick={function() {props.callbackSelectedId(user.id); setUser({...user,isSelected: true});}} >
              ID: {user.id}</label>
              <br/>
           <label>
            Name:
            <input className='input-text' type="text" value={user.name} onChange={e => setUser({...user,name: e.target.value})} /> <br/>
            Email:
            <input className='input-text' type="text" value={user.email} onChange={e => setUser({...user,email: e.target.value})}/> <br/>
        </label>
               

        <div className='divOtherDataUser' onMouseOver={() => setOnMouseOver(true)} onClick={() => setOnMouseOver(false)} >
        Other Data </div>
        
          {
            onMouseOver? 
          
          <div className='divOtherDataSquare' >
          
          <label>
            Street:
            <input className='input-text' type="text" value={user.street} onChange={e => setUser({...user,street: e.target.value})} /> <br/>
            City:
            <input className='input-text' type="text" value={user.city} onChange={e => setUser({...user,city: e.target.value})} /> <br/>
            Zip Code:
            <input className='input-text' type="text" value={user.zipcode} onChange={e => setUser({...user,zipcode: e.target.value})} /> <br/>
          </label>
          
        </div>
        : null}
        
        <input type="button"  value="Delete" className='btn-user' onClick={() => props.callbackDeleteUser(user)} />
        <input type="button"  value="Update" className='btn-user' onClick={() => props.callbackUpdateUser(user)}  />
       
        </form>
        </div>
          
        </div>
        
    
  );
}

export default UserComp;
