import '../css/main.css';
import { useForm } from 'react-hook-form'
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Comment from './Comment';


const ViewPost = (props) => {

    const location = useLocation()
    const { postData } = location.state
    const [placeHolderText, setText] = useState(postData);
    const [comments, setComments] = useState([]);

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/comments/bypostid/`+postData["_id"])
            .then((response) => {
                setComments(response.data)
                console.log(response.data)
            }).catch(error =>{
                console.log(error);
            })
    }, []);

    return (
        <form className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal text-center">View Post</h1>
            <label htmlFor="title" className="sr-only">Title</label>
            <input type="text" id="title" className="form-control" placeholder="Post Title" value={placeHolderText.title} />

            <label htmlFor="content" className="sr-only">Post content</label>
            <input type="text" id="content" className="form-control" placeholder="Post Content" value={placeHolderText.content}/>

            <button className="btn btn-lg btn-primary btn-block" type="submit">Comment</button>

            {
              comments.map((item, index) => {
                return(
                  <Comment key={index} data={item}/>
                )
              })
            }
        </form>
     );
}
 
export default ViewPost;