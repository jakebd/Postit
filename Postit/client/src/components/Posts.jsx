import {useEffect, useState} from 'react';
import React from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Post from './Post';


const Posts = ({data}) => {
    const[posts, setPosts] = useState([]);
    const [query, setQuery] = useState("")

    const navigate = useNavigate();

    const location = useLocation()
    const { postsData } = location.state
    //console.log(postsData)

    useEffect(() => {
      if(postsData && postsData.data && postsData.data["_id"]) {
        data(postsData.data["_id"]);
      }
    }, [postsData, data]);

    //axios.defaults.withCredentials = true;
    //make an initial call to our API to retrive all data
    useEffect(()=>{
      axios.get(`${import.meta.env.VITE_API_URL}/posts/subpostit/`+postsData.data["_id"])
            .then((response) => {
              setPosts(response.data)
            }).catch(error =>{
              console.log(error);
            })
    }, []);


    return ( 
        <div>
        <section className="jumbotron text-center">
          <div className="container">
            <div className="input-group">
              <input name="searchQ"  type="search" className="form-control" placeholder="Search a Post" onChange={e => setQuery(e.target.value.toLowerCase())}/>
              <div className="input-group-append">
                <button className="btn btn-secondary" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">

            {
              posts.filter((post)=>post.title.toLowerCase().includes(query)).map((item, index) => {
                return(
                  <Post key={index} data={item}/>
                )
              })
            }

            </div>
          </div>
        </div>
      </div>
    );
}
 
export default Posts;