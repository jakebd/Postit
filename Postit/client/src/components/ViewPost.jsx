import '../css/main.css';
import { useForm } from 'react-hook-form'
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Comment from './Comment';
import '../css/viewPost.css'


const ViewPost = (props) => {
    const {register, handleSubmit, formState: { errors }, reset} = useForm();
    const location = useLocation()
    const navigate = useNavigate();

    const { postData } = location.state
    const [placeHolderText, setText] = useState(postData);
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState([]);
    const [serverMesage, setServerMessage] = useState();

    const fetchComments = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/comments/bypostid/${postData["_id"]}`)
            .then((response) => {
                setComments(response.data);
            }).catch(error => {
                console.log(error);
            });
    };

    useEffect(()=>{
        fetchComments();
        axios.get(`${import.meta.env.VITE_API_URL}/users/`+postData.authorId)
            .then((response) => {
                setUser(response.data)
                console.log(response.data)
            }).catch(error =>{
                console.log(error);
            })
    }, [postData]);

    const sendCredentials = data => {
        const formulatedData = {
            text: data.text,
            postId: postData["_id"],
            authorId: authService.signInId(),
        }
        axios.post(`${import.meta.env.VITE_API_URL}/comments/`, formulatedData)
                .then(response => {
                    console.log(response)
                    //console.log(response.headers['x-auth-token'])
                    //localStorage.setItem('token', response.headers['x-auth-token']);
                    if(response.status==201){
                        fetchComments();
                        reset();
                    }else{
                        console.log("Failed to submit and redirect");
                        console.log(response)
                    }
                    //can be sessionStorage as well. 
                })
                .catch(err =>{ 
                    console.log(err); 
                    setServerMessage("Can't Create Comment.");
                });
    }

    const date = new Date(postData.createdAt)

    const textValidationRules = {
        required: "Title is Required!",
        onChange: () => setServerMessage(null),
    }


    return (
        <div className="container bootstrap snippets bootdey mt-2">
            <div className='row d-flex justify-content-center'>
                <div className="col-md-8">
                    <div className="box box-widget">
                        <div className="box-header with-border">
                            <div className="user-block">
                                <img className="img-circle"                    
                                    src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22382%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20382%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16e231e5e51%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A19pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16e231e5e51%22%3E%3Crect%20width%3D%22382%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22126.96875%22%20y%3D%22120.9%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" 
                                    alt="User Image"
                                />
                                <span className="username"><a href="#">{user.username}</a></span>
                                <span className="description">Created: {date.toLocaleDateString('en-US')}</span>
                            </div>
                        </div>
                        <div className="box-body" style={{display: 'block'}}>
                            <img className="img-responsive pad" 
                                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22382%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20382%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16e231e5e51%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A19pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16e231e5e51%22%3E%3Crect%20width%3D%22382%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22126.96875%22%20y%3D%22120.9%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" 
                                alt="Photo"
                            />
                            <h5>{postData.title}</h5>
                            <p>{postData.content}</p>
                            <button type="button" className="btn btn-xs"><i className="fa fa-share"></i> Share</button>
                            <button type="button" className="btn btn-xs"><i className="fa fa-thumbs-o-up"></i> Like</button>
                        </div>
                        <div className="box-footer box-comments" style={{display: 'block'}}>
                        {
                            comments.map((item, index) => {
                                return(
                                    <Comment key={index} data={item}/>
                                )
                            })
                        }
                        </div>
                        <div className="box-footer" style={{display: 'block'}}>
                            <form onSubmit={handleSubmit(sendCredentials)}>
                                <div className="img-push" style={{display: 'flex', alignItems: 'center'}}>
                                    <img className="img-responsive img-circle img-sm mr-2"                     
                                        src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22382%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20382%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16e231e5e51%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A19pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16e231e5e51%22%3E%3Crect%20width%3D%22382%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22126.96875%22%20y%3D%22120.9%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" 
                                        alt="Alt Text"
                                    />
                                    <input  {...register('text', textValidationRules)}  type="text" className="form-control input-sm" placeholder="Type comment here" style={{flexGrow: 1, marginRight: '8px'}}/>
                                    {errors.text && <p className='ml-2 mt-1 small text-danger'>{errors.text.message}</p>}
                                    <button className="btn btn-sm btn-primary m-2 p-2" type="submit"> Post </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ViewPost;
