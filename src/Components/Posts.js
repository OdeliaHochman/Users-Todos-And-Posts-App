import {useEffect,useState} from 'react';
import '../Style.css';
import PostComp from './Post';


function PostsComp(props) {

  const[userId,setUserId] =useState(0);
  const[postsList , setPostsList] = useState([]);
 

  useEffect (() =>
{
    setUserId(props.userId);
    setPostsList(props.postsList);
    
    
},[props.userId,props.postsList])


  return (
    <div className='userDetails scroller'>
       <input className='btn-user' type="button" value="Add" style={{marginTop:"25px"}} onClick={() => {props.callbackClickedAddPost(true);}} />
        <h3>Posts - User {userId}</h3>
        {
            postsList.map((p,index) =>
                {
                    return <PostComp key={index} post={p} />
                })
        }
    </div>
  );
}

export default PostsComp;
