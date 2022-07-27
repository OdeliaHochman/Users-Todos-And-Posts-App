import axios from 'axios';


const getTodos = async () =>
{
    let resp = await axios.get("https://jsonplaceholder.typicode.com/todos");
    return resp.data;
}



export default {getTodos};