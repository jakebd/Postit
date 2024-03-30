import '../css/main.css';
import { useForm } from 'react-hook-form'
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';


const EditPost = (props) => {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const navigate = useNavigate();
    const [serverMesage, setServerMessage] = useState();

    const location = useLocation()
    const { postData } = location.state
    const [placeHolderText, setText] = useState(postData);



    const sendCredentials = data => {
        const formulatedData = {
            title: data.title,
            content: data.content,
            authorId: authService.signInId(),
            subpostitsId: postData.subpostitsId
        }
        axios.put(`${import.meta.env.VITE_API_URL}/posts/`+postData["_id"], formulatedData)
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
                    setServerMessage("Can't Edit Post.");
                });
    }

    const titleValidationRules = {
        required: "Title is Required!",
        onChange: () => setServerMessage(null),
    }

    const contentValidationRules = {
        required: "Content Required!",
        onChange: () => setServerMessage(null),
    }

    return (
        <form onSubmit={handleSubmit(sendCredentials)} className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal text-center">Edit Post</h1>
            <label htmlFor="title" className="sr-only">Title</label>
            <input {...register('title', titleValidationRules)} type="text" id="title" className="form-control" placeholder="Post Title" value={placeHolderText.title} onChange={e => setText({...placeHolderText, [e.target.name]: e.target.value})}/>
            {errors.title && <p className='ml-2 mt-1 small text-danger'>{errors.title.message}</p>}

            <label htmlFor="content" className="sr-only">Post content</label>
            <input {...register('content', contentValidationRules)} type="text" id="content" className="form-control" placeholder="Post Content" value={placeHolderText.content} onChange={e => setText({...placeHolderText, [e.target.name]: e.target.value})}/>
            {errors.content && <p className='ml-2 mt-1 small text-danger'>{errors.content.message}</p>}

            <button className="btn btn-lg btn-primary btn-block" type="submit">Edit</button>

            {serverMesage && <div className='ml-2 small text-danger'>{serverMesage}</div>}
        </form>
     );
}
 
export default EditPost;