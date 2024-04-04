import { Link } from "react-router-dom";
import {useEffect, useState} from 'react';
import axios from 'axios';

const Comment = (props) => {
    console.log(props)
    const [user, setUser] = useState([]);
    const date = new Date(props.data.createdAt)

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/users/`+props.data.authorId)
            .then((response) => {
                setUser(response.data)
            }).catch(error =>{
                setUser({
                    name: "Deleted User",
                    username: "Deleted User"
                })
            })
    }, []);

    return (
      //move this jsx to a card component where we pass in some props and it returns a completed card
        <div className="box-comment">
            <img className="img-circle img-sm" 
                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22382%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20382%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16e231e5e51%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A19pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16e231e5e51%22%3E%3Crect%20width%3D%22382%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22126.96875%22%20y%3D%22120.9%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" 
                alt="User Image"
            />
            <div className="comment-text">
                <span className="username">
                {user.username}
                <span className="text-muted pull-right">{date.toLocaleString()}</span>
                </span>
                {props.data.text}
            </div>
        </div>
    );
}
 
export default Comment;

