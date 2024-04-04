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
        lname: authService.signInlName(),
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
            lname: data.lname,
            email: data.email,
            isPro: data.isPro
        }
        axios.put(`${import.meta.env.VITE_API_URL}/users/`+signInId, formulatedData)
                .then(response => {
                    console.log(response)
                    if(response.status==200){
                        sessionStorage.setItem("userName", formulatedData.name);
                        sessionStorage.setItem("loggedin", formulatedData.email);
                        sessionStorage.setItem("userlName", formulatedData.lname);
                        sessionStorage.setItem("userName", formulatedData.name);
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

    const usernameValidationRules = {
        required: "Username is Required!",
        onChange: () => setServerMessage(null),

    }

    const emailValidationRules = {
        required: "Email Required!",
        onChange: () => setServerMessage(null),

    }

    return (

        <div className="container-xl px-4 mt-4 mb-5" style={{height: 500}}>
            <div className="row">
                <div className="col-xl-4">
                    {/* <!-- Profile picture card--> */}
                    <div className="card mb-4 mb-xl-0">
                        <div className="card-header">Profile Picture</div>
                        <div className="card-body text-center">
                            {/* <!-- Profile picture image--> */}
                            <img className="img-account-profile rounded-circle mb-2"                                         
                                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22255%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20382%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16e231e5e51%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A19pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16e231e5e51%22%3E%3Crect%20width%3D%22382%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22126.96875%22%20y%3D%22120.9%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" 
                                alt=""/>
                            {/* <!-- Profile picture help block--> */}
                            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                            {/* <!-- Profile picture upload button--> */}
                            <button className="btn btn-primary" type="button">Upload new image</button>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    {/* <!-- Account details card--> */}
                    <div className="card mb-4">
                        <div className="card-header">Account Details</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(sendCredentials)}>
                                {/* <!-- Form Group (username)--> */}
                                <div className="mb-3">
                                    <label htmlFor="name" className="small mb-1">Username</label>
                                    <input {...register('username', usernameValidationRules)} type="text" id="Name" className="form-control" placeholder="Username" value={user.username} onChange={e => setUser({...user, username: e.target.value})} />
                                    {errors.name && <p className='ml-2 mt-1 small text-danger'>{errors.name.message}</p>}
                                </div>
                                {/* <!-- Form Row--> */}
                                <div className="row gx-3 mb-3">
                                    {/* <!-- Form Group (first name)--> */}
                                    <div className="col-md-6">
                                        <label htmlFor="name" className="small mb-1">First Name</label>
                                        <input {...register('name', nameValidationRules)} type="text" id="Name" className="form-control" placeholder="First Name" value={user.name} onChange={e => setUser({...user, name: e.target.value})} />
                                        {errors.name && <p className='ml-2 mt-1 small text-danger'>{errors.name.message}</p>}
                                    </div>
                                    {/* <!-- Form Group (last name)--> */}
                                    <div className="col-md-6">
                                        <label htmlFor="name" className="small mb-1">Last Name</label>
                                        <input {...register('lname', nameValidationRules)} type="text" id="Name" className="form-control" placeholder="Last Name" value={user.lname} onChange={e => setUser({...user, lname: e.target.value})} />
                                        {errors.name && <p className='ml-2 mt-1 small text-danger'>{errors.name.message}</p>}
                                    </div>
                                </div>
                                {/* <!-- Form Group (email address)--> */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="small mb-1">Email Address</label>
                                    <input {...register('email', emailValidationRules)} type="text" id="content" className="form-control" placeholder="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})}/>
                                    {errors.email && <p className='ml-2 mt-1 small text-danger'>{errors.email.message}</p>}
                                </div>

                                <div className="row gx-3 mb-3 ml-2">
                                    {/* <!-- Form Group (first name)--> */}
                                    <div className="col-md-6">
                                        <input {...register('isPro')} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={user.isPro} onChange={e => setUser({...user, isPro: e.target.checked})}/>
                                        <label className="form-check-label" >Pro Subscription</label>
                                    </div>
                                </div>

                                {/* <!-- Save changes button--> */}
                                <button className="btn btn-lg btn-primary btn-block" type="submit">Update Profile</button>
                                {serverMesage && <div className='ml-2 small text-danger'>{serverMesage}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

     );
}
 
export default ViewProfile;

/*

<form onSubmit={handleSubmit(sendCredentials)} className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal text-center">Profile</h1>
            <label htmlFor="name" className="sr-only">Name</label>
            <input {...register('name', nameValidationRules)} type="text" id="Name" className="form-control" placeholder="Name" value={user.name} onChange={e => setUser({...user, name: e.target.value})} />
            {errors.name && <p className='ml-2 mt-1 small text-danger'>{errors.name.message}</p>}

            <label htmlFor="name" className="sr-only">Username</label>
            <input {...register('username', nameValidationRules)} type="text" id="Name" className="form-control" placeholder="Name" value={user.username} onChange={e => setUser({...user, username: e.target.value})} />
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


<div className="container-xl px-4 mt-4">
    <!-- Account page navigation-->
    <nav className="nav nav-borders">
        <a className="nav-link active ms-0" href="https://www.bootdey.com/snippets/view/bs5-edit-profile-account-details" target="__blank">Profile</a>
        <a className="nav-link" href="https://www.bootdey.com/snippets/view/bs5-profile-billing-page" target="__blank">Billing</a>
        <a className="nav-link" href="https://www.bootdey.com/snippets/view/bs5-profile-security-page" target="__blank">Security</a>
        <a className="nav-link" href="https://www.bootdey.com/snippets/view/bs5-edit-notifications-page"  target="__blank">Notifications</a>
    </nav>
    <hr className="mt-0 mb-4">
    <div className="row">
        <div className="col-xl-4">
            <!-- Profile picture card-->
            <div className="card mb-4 mb-xl-0">
                <div className="card-header">Profile Picture</div>
                <div className="card-body text-center">
                    <!-- Profile picture image-->
                    <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="">
                    <!-- Profile picture help block-->
                    <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                    <!-- Profile picture upload button-->
                    <button className="btn btn-primary" type="button">Upload new image</button>
                </div>
            </div>
        </div>
        <div className="col-xl-8">
            <!-- Account details card-->
            <div className="card mb-4">
                <div className="card-header">Account Details</div>
                <div className="card-body">
                    <form>
                        <!-- Form Group (username)-->
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="inputUsername">Username (how your name will appear to other users on the site)</label>
                            <input className="form-control" id="inputUsername" type="text" placeholder="Enter your username" value="username">
                        </div>
                        <!-- Form Row-->
                        <div className="row gx-3 mb-3">
                            <!-- Form Group (first name)-->
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value="Valerie">
                            </div>
                            <!-- Form Group (last name)-->
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="Luna">
                            </div>
                        </div>
                        <!-- Form Row        -->
                        <div className="row gx-3 mb-3">
                            <!-- Form Group (organization name)-->
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputOrgName">Organization name</label>
                                <input className="form-control" id="inputOrgName" type="text" placeholder="Enter your organization name" value="Start Bootstrap">
                            </div>
                            <!-- Form Group (location)-->
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputLocation">Location</label>
                                <input className="form-control" id="inputLocation" type="text" placeholder="Enter your location" value="San Francisco, CA">
                            </div>
                        </div>
                        <!-- Form Group (email address)-->
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                            <input className="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value="name@example.com">
                        </div>
                        <!-- Form Row-->
                        <div className="row gx-3 mb-3">
                            <!-- Form Group (phone number)-->
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                <input className="form-control" id="inputPhone" type="tel" placeholder="Enter your phone number" value="555-123-4567">
                            </div>
                            <!-- Form Group (birthday)-->
                            <div className="col-md-6">
                                <label className="small mb-1" htmlFor="inputBirthday">Birthday</label>
                                <input className="form-control" id="inputBirthday" type="text" name="birthday" placeholder="Enter your birthday" value="06/10/1988">
                            </div>
                        </div>
                        <!-- Save changes button-->
                        <button className="btn btn-primary" type="button">Save changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
*/