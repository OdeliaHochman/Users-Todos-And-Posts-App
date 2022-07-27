import {useEffect,useState} from 'react';
import '../Style.css';
import TodosComp from './Todos';
import PostsComp from './Posts';
import AddNewTodoComp from './AddNewTodo';
import AddNewPostComp from './AddNewPost';

function UserDetailsComp(props) {

    const [user ,setUser] = useState({});
    const [isClickedAddTodo , setIsClickedAddTodo] = useState(false);
    const [isClickedAddPost , setIsClickedAddPost] = useState(false);

    

    useEffect(() =>
    {
        setUser(props.userData);
   
    },[props.selectedId,props.userData])


    const closeAddNewItem = (isCanceled , itemName) =>
    {
        switch(itemName)
        {
            case "todo":
                if(isCanceled)
                {
                  setIsClickedAddTodo(false);
                }
            break;

            case "post":
                if(isCanceled)
                {
                  setIsClickedAddPost(false);
                }
            break;
        }
    }

const addNewItem = (newItem , itemName) =>
{
    switch(itemName)
    {
        case "todo":
            let todosList = [...user.todos];
            todosList.push(newItem);
            setUser({...user,todos: todosList});
            setIsClickedAddTodo(false);          
        break;

        case "post":
            let postsList = [...user.posts];
            let us = {...user};
            postsList.push(newItem);
            us.posts = postsList;
            setUser(us);
            //setUser({...user,posts: postsList});
            setIsClickedAddPost(false);
            props.postsAfterUpdate(us);
        break;
    }

}
  

const setTaskCompletedUser = (isComp) =>
{
    let us = {...user};
    us.isTasksCompleted = isComp;
    props.callbackIsTasksCompleted(us);
    setUser(us);    
}
 

    return (
    <div >
        <div className='todos'>
         {
            user.isSelected?
            isClickedAddTodo? <AddNewTodoComp key={user.todos.length} userId={user.id} newTodoId={user.todos.length} callbackIsCanceled={isCanceled => closeAddNewItem(isCanceled , "todo")} callbackAddTodo={newTodo => {addNewItem(newTodo ,"todo"); }}/> :
            <TodosComp key={user.id} userId={user.id} todosList={user.todos} callbackTasksCompleted={isComp => setTaskCompletedUser(isComp)} callbackClickedAddTodo={clickedAdd => setIsClickedAddTodo(clickedAdd)} callbackTodosAfterUpdate={tasks => setUser({...user,todos:tasks})}  /> 
             : null 
        }
     
        </div>

        <div className='posts' style={{marginTop:"10px" , marginBottom:"10px"}}>
         {
            user.isSelected?
            isClickedAddPost? <AddNewPostComp key={user.posts.length+1} userId={user.id} newPostId={user.posts.length+1} callbackIsCanceled={isCanceled => closeAddNewItem(isCanceled , "post")} callbackAddPost={newPost => addNewItem(newPost , "post")}/>:
             <PostsComp key={user.id} userId={user.id} postsList={user.posts} callbackClickedAddPost={clickedAdd => setIsClickedAddPost(clickedAdd)} /> 
             : null
        }
        </div>

    </div>
  );
}

export default UserDetailsComp;


