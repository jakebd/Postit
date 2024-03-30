import '../css/signin.css';
import { useForm } from 'react-hook-form'
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'



const SignIn = props => {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const navigate = useNavigate();
    const [serverMesage, setServerMessage] = useState();

    const sendCredentials = data => {
        console.log(data);

        authService.signin(data, (isSignInSuccessfull, reason) => {
            if(isSignInSuccessfull){
                navigate('/');//main.jsx
            }else{
                //mike had to put reason.serverMessage
                setServerMessage(reason);
            }
        });
    }

    const validationEmailRules = {
        required: "Email Required!",
        pattern:{
            value: /\S+@\S+\.\S+/,
            message:"Must be a valid email",
        },
        onChange: () => setServerMessage(null),
    }

    const passwordValidationRules = {
        required: "Password Required!",
        onChange: () => setServerMessage(null),
    }

    return (
        <form onSubmit={handleSubmit(sendCredentials)} className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input {...register('email', validationEmailRules)} type="text" id="inputEmail" className="form-control" placeholder="Email address" />
            {errors.email && <p className='ml-2 mt-1 small text-danger'>{errors.email.message}</p>}
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input {...register('password', passwordValidationRules)} type="password" id="inputPassword" className="form-control" placeholder="Password" />
            {errors.password && <p className='ml-2 small text-danger'>{errors.password.message}</p>}
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            
            {serverMesage && <div className='ml-2 small text-danger'>{serverMesage}</div>}
            
            </form>
     );
}
 
export default SignIn;