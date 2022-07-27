import {useEffect,useState} from 'react';
import '../Style.css';


function PostComp(props) {

  const[post,setPost] = useState({});

  useEffect(() =>
  {
      setPost(props.post);
      
  },[props.post])


  return (
    <div className='item' >
      <strong>Title:</strong> {post.title} <br/>
      <strong>Body:</strong> {post.body}<br/>
      
    </div>
  );
}

export default PostComp;
