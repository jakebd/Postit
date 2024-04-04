import '../css/main.css';
import { useForm } from 'react-hook-form'
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Comment from './Comment';


const ViewProfile = (props) => {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: authService.signInName(),
        email: authService.signInEmail(),
        username: authService.signInNick(),
        isPro: (authService.signInIsPro()==='true'),
    });
    console.log(user)
    const signInId = authService.signInId();
    const [serverMesage, setServerMessage] = useState();
    

    const sendCredentials = data => {
        const formulatedData = {
            name: data.name,
            email: data.email,
            isPro: data.isPro
        }
        axios.put(`${import.meta.env.VITE_API_URL}/users/`+signInId, formulatedData)
                .then(response => {
                    console.log(response)
                    if(response.status==200){
                        sessionStorage.setItem("userName", formulatedData.name);
                        sessionStorage.setItem("eamil", formulatedData.email);
                        sessionStorage.setItem("isPro", formulatedData.isPro);
                        navigate('/');
                    }else{
                        console.log("Failed to submit and redirect");
                    }
                    //can be sessionStorage as well. 
                })
                .catch(err =>{ 
                    console.log(err);
                    setServerMessage("Can't Edit Post.");
                });
    }

    const nameValidationRules = {
        required: "Name is Required!",
        onChange: () => setServerMessage(null),

    }

    const emailValidationRules = {
        required: "Email Required!",
        onChange: () => setServerMessage(null),

    }

    return (
        <form onSubmit={handleSubmit(sendCredentials)} className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal text-center">Profile</h1>
            <label htmlFor="name" className="sr-only">Name</label>
            <input {...register('name', nameValidationRules)} type="text" id="Name" className="form-control" placeholder="Name" value={user.name} onChange={e => setUser({...user, name: e.target.value})} />
            {errors.name && <p className='ml-2 mt-1 small text-danger'>{errors.name.message}</p>}

            <label htmlFor="email" className="sr-only">Email</label>
            <input {...register('email', emailValidationRules)} type="text" id="content" className="form-control" placeholder="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})}/>
            {errors.email && <p className='ml-2 mt-1 small text-danger'>{errors.email.message}</p>}

            <div className="form-check">
                <input {...register('isPro')} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={user.isPro} onChange={e => setUser({...user, isPro: e.target.checked})}/>
                <label className="form-check-label" >Pro Subscription</label>
            </div>

            <button className="btn btn-lg btn-primary btn-block" type="submit">Update Profile</button>
            {serverMesage && <div className='ml-2 small text-danger'>{serverMesage}</div>}
        </form>
     );
}
 
export default ViewProfile;