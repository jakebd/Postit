import '../css/main.css';
import { useForm } from 'react-hook-form'
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';


const EditSubPostIt = props => {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const navigate = useNavigate();
    const [serverMesage, setServerMessage] = useState();

    const location = useLocation()
    const { postsData } = location.state
    console.log(postsData)
    const [placeHolderText, setText] = useState(postsData);


    const sendCredentials = data => {
        const formulatedData = {
            name:data.name,
            creatorId: authService.signInId(),
        }
        axios.put(`${import.meta.env.VITE_API_URL}/subpostits/`+postsData.data["_id"], formulatedData)
                .then(response => {
                    console.log(response)
                    //console.log(response.headers['x-auth-token'])
                    //localStorage.setItem('token', response.headers['x-auth-token']);
                    if(response.status==200){
                        navigate('/');
                    }else{
                        console.log("Failed to submit and redirect");
                    }
                    //can be sessionStorage as well. 
                })
                .catch(err =>{ 
                    console.log(err);
                    if(err.request.status == 406){
                        setServerMessage("Please Provide a unique Sub-Postit name");
                    }else{
                        setServerMessage("Can't Edit Subpostit.");
                    }
                    

                });
    }

    const nameValidationRules = {
        required: "Name is Required!",
        onChange: () => setServerMessage(null),
    }

    return (
        <form onSubmit={handleSubmit(sendCredentials)} className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal text-center">Edit a Sub-PostIt</h1>
            <label htmlFor="companyName" className="sr-only">Name</label>
            <input {...register('name', nameValidationRules)} type="text" id="Name" className="form-control" placeholder="Sub-PostIt Name" />
            {errors.name && <p className='ml-2 mt-1 small text-danger'>{errors.name.message}</p>}

            <button className="btn btn-lg btn-primary btn-block" type="submit">Edit</button>

            {serverMesage && <div className='ml-2 small text-danger'>{serverMesage}</div>}
        </form>
     );
}
 
export default EditSubPostIt;