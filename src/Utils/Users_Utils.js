import axios from 'axios';


const getUsers = async () =>
{
    let resp = await axios.get("https://jsonplaceholder.typicode.com/users");
    return resp.data;
}



export default {getUsers};