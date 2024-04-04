import '../css/signin.css';
import { useForm } from 'react-hook-form'
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom'


const Register = props => {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    
    const sendCredentials = data => {
        console.log(data);
        authService.register(data, (signinSuccessful)=>{
            if(signinSuccessful){
                console.log('Success!')
                navigate('/');//main.jsx
            }else{
                console.log("Failed!")
            }
        })
    }
    return (
        <form onSubmit={handleSubmit(sendCredentials)} className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal text-center">Please Register</h1>
            <label htmlFor="inputFName" className="sr-only">First Name</label>
            <input {...register('name')} type="text" id="inputFName" className="form-control" placeholder="Name" required autoFocus />
            <label htmlFor="inputFName" className="sr-only">Last Name</label>
            <input {...register('lname')} type="text" id="inputFName" className="form-control" placeholder="Name" required autoFocus />
            <label htmlFor="inputLName" className="sr-only">UserName</label>
            <input {...register('username')} type="text" id="inpuUsername" className="form-control" placeholder="Username" required autoFocus />
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input {...register('email')} type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input {...register('password')} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
            <div className="form-check">
                <input {...register('isPro')} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                <label className="form-check-label" >Pro Subscription</label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
     );
}
 
export default Register;