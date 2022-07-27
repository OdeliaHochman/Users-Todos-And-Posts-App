import axios from 'axios';


const getPosts = async () =>
{
    let resp = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return resp.data;
}



export default {getPosts};