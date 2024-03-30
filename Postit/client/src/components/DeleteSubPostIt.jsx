import '../css/main.css';
import { useForm } from 'react-hook-form'
import authService from '../services/authService';
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';


const DeleteSubPostIt = (props) => {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const location = useLocation()
    const { postsData } = location.state
    console.log(postsData.data)
    const [placeHolderText, setText] = useState(postsData);

    const axiosdeleteStock = data => {
        console.log(data);
        axios.delete(`${import.meta.env.VITE_API_URL}/subpostits/`+postsData.data["_id"])
                .then(response => {
                    console.log(response)
                    //console.log(response.headers['x-auth-token'])
                    //localStorage.setItem('token', response.headers['x-auth-token']);
                    if(response.status==200){
                        navigate('/');
                    }else{
                        console.log("Failed to Delete and redirect");
                    }
                    //can be sessionStorage as well. 
                })
                .catch(err => console.log(err));
    }
    return (
        <form onSubmit={handleSubmit(axiosdeleteStock)} className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal text-center">Are you sure you want to delete?</h1>

            <button className="btn btn-lg btn-primary btn-block" type="submit">Yes</button>
            <Link className="btn btn-lg btn-primary btn-block" to="/">No</Link>
        </form>
     );
}
 
export default DeleteSubPostIt;