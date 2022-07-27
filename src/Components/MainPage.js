import {useEffect,useState} from 'react';
import users_utils from '../Utils/Users_Utils';
import posts_utils from '../Utils/Posts_Utils';
import todos_utils from '../Utils/Todos_Utils';
import UserComp from './User';
import AddNewUserComp from './AddNewUser';
import UserDetailsComp from './UserDetails';




function MainPageComp() {
    
 const [users,setUsers] = useState([]);
 const [selectedUserId , setSelectedUserId] = useState(0);
 const [usersSearchList ,setUsersSearchList] = useState([]);
 const [isClickedAddNewUser ,setIsClickedAddNewUser] = useState(false);
 const [maxUserId,setMaxUserId] = useState(0);
 

  
  useEffect( () =>
  {
    async function usersData()
    {
      let users_list = await users_utils.getUsers();
      let todos_list = await todos_utils.getTodos();
      let posts_list = await posts_utils.getPosts();

      users_list.forEach(u => u.id > maxUserId? setMaxUserId(u.id) : null);

      let allUsersData = [];
      users_list.map( user =>
        {
          let todosByUserId = todos_list.filter(todo => todo.userId == user.id);

          let todosAfterTasksIdsChanged = [];
          todosByUserId.forEach((t,index) =>
          {
            let todo = {...t};
            todo.id = index;
            todosAfterTasksIdsChanged.push(todo);
          });

          let postsByUserId = posts_list.filter(post => post.userId == user.id);
          let postsAfterTasksIdsChanged = [];
          postsByUserId.forEach((p,index) =>
          {
            let post = {...p};
            post.id = index;
            postsAfterTasksIdsChanged.push(post);
          });

          let userData= {id: user.id ,name: user.name, email: user.email,street: user.address.street ,city: user.address.city,zipcode: user.address.zipcode, todos: todosAfterTasksIdsChanged , posts: postsByUserId , isSelected: false , isTasksCompleted: false};
          allUsersData.push(userData);
          
        })

        setUsers(allUsersData);
        setUsersSearchList(allUsersData);
    }

    usersData();
   
  } ,[])


useEffect(() =>
{
  setIsSelectedUserForAllById();
  setIsClickedAddNewUser(false);

},[selectedUserId])


useEffect(() =>
{
  setUsersSearchList(users);

},[users])


const setIsSelectedUserForAllById = () =>
  {
    let usersList = [...users];
      usersList.forEach(u =>
    { 
      u.id != selectedUserId? u.isSelected = false : u.isSelected = true;        
    })
    setUsers(usersList);
        
  }

  const deleteUser = (us) =>
  {
    let usersList = [...users];
    let index =  usersList.findIndex(x => x.id == us.id);

    if(index >=0)
    {
      usersList.splice(index,1);
      console.log(usersList);
      console.log(maxUserId);
      if(us.id == maxUserId)
      {
        let maxId = usersList.at(-1).id;
        setMaxUserId(maxId);
      }
    }
    setUsers(usersList);

    
    if(selectedUserId == us.id)
    {
      setSelectedUserId(0);
    }
    
   
  }

  const updateUser = (us) =>
  {
    let usersList = [...users];
    let index =  usersList.findIndex(x => x.id == us.id);
    if(index >=0)
    {
      usersList[index] = us;
    }
    setUsers(usersList);
  }


  const searchText = (sText) =>
  {
    let users_list = [];
    if(sText.length > 0)
    {
      users.filter(user =>
        {
          if(user.name.toLowerCase().includes(sText.toLowerCase()) || 
          user.email.toLowerCase().includes(sText.toLowerCase()))
          {
            users_list.push(user);
          }
        })
        setUsersSearchList(users_list);
    }
    else
    {
      setUsersSearchList(users);
    }
  }



const addNewUser = (newUser) =>
{
  let usersList = [...users];
  let userData = {id: newUser.id ,name: newUser.name, email: newUser.email,street:"" ,city:"",zipcode:"", todos:[] , posts: [] , isSelected: false , isTasksCompleted: false};
  usersList.push(userData);
  setUsers(usersList);
  setIsClickedAddNewUser(false);
  setMaxUserId(newUser.id);  
}


const closeAddNewUser = (isCanceled) =>
{
  if(isCanceled)
  {
    setIsClickedAddNewUser(false);
  }
}

 

  return (  

    <div>
      
      <h1>React Mid Project</h1>

      <div className='divLeftSide'>
        <div className='divSearch'>
        <br/>
        Search:
        <input className='input-text' type="search" placeholder="Search.." onChange={e => searchText(e.target.value)}/>
        <input className='btn-user' type="button" value="Add" onClick={()=> setIsClickedAddNewUser(true)}/><br/>
       <br/>
          {
            usersSearchList.map(user=>
              {
               return <UserComp  key={user.id} userData={user} callbackSelectedId={id => setSelectedUserId(id)} 
                callbackDeleteUser={us => deleteUser(us)} callbackUpdateUser={us => updateUser(us)} isSelected={user.isSelected} isCompleted ={user.isTasksCompleted}/>
              })
          }
          
           
     </div>
      </div>


      <div className='divRightSide'>
        
          {
            isClickedAddNewUser? <AddNewUserComp key={maxUserId+1} newUserId={maxUserId+1} callbackIsCanceled={isCanceled => closeAddNewUser(isCanceled)} callbackAddUser={newUser => addNewUser(newUser)}  /> : null
          }
          
          {            
            (selectedUserId != 0) && !isClickedAddNewUser? <UserDetailsComp key={selectedUserId} selectedId={selectedUserId} userData={users.find(u => u.id == selectedUserId)} callbackIsTasksCompleted={userCompletedAllTodos => updateUser(userCompletedAllTodos)} postsAfterUpdate={u => updateUser(u)} /> : null
          }  

      </div>

    </div>
  );
}

export default MainPageComp;

