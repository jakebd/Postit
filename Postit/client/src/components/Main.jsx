import {useEffect, useState} from 'react';
import React from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import SubpostIt from './SubPostIt';
import { useCookies } from "react-cookie"
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import '../css/mainComp.css'



const Main = () => {
  const {register, handleSubmit, formState: { errors }} = useForm();
    const[subpostits, setSubPostIt] = useState([]);
    const[cookies, setCookie] = useCookies(["jwt"]);
    const [query, setQuery] = useState("");
    const[posts, setPosts] = useState([]);

    //axios.defaults.withCredentials = true;
    //make an initial call to our API to retrive all data
    useEffect(()=>{
      axios.get(`${import.meta.env.VITE_API_URL}/subpostits`)
            .then((response) => {
              setSubPostIt(response.data)
            }).catch(error =>{
              console.log(error);
            })
    }, []);

    useEffect(()=>{
      axios.get(`${import.meta.env.VITE_API_URL}/posts`)
            .then((response) => {
              setPosts(response.data)
              console.log(response.data)
            }).catch(error =>{
              console.log(error);
            })
    }, []);

    return ( 

      <div className="container bootstrap snippets bootdey">
      <div className="row">
          <h2 className="text-muted mt-2">Welcome To PostIt</h2>
      </div>
      <section className="navbar mb-2 text-center">
          <div className="container">
            <div className="input-group">
              <input name="searchQ"  type="search" className="form-control" placeholder="Search a Sub-PostIT" onChange={e => setQuery(e.target.value.toLowerCase())}/>
              <div className="input-group-append">
                <button className="btn btn-secondary" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      <div className="row">
      <div className="col-md-8">
        {
          subpostits.filter((sub)=>sub.name.toLowerCase().includes(query)).map((item, index) => {
            return(
              <SubpostIt key={index} data={item}/>
            )
          })
        }   
      </div>
          
          <div className="col-md-4">
              <h4 className="headline text-muted">
                POPULAR POSTS
                <span className="line"></span>
              </h4>
              {
                posts.map((item, index) => {
                  return(
                    <div key={index} className="media popular-post m-1">
                      <Link className="pull-left" to="/posts/view" state={{postData: item}}>
                        <img 
                        style={{height: 60, width: 60, display: 'block'}}
                        src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22382%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20382%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16e231e5e51%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A19pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16e231e5e51%22%3E%3Crect%20width%3D%22382%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22126.96875%22%20y%3D%22120.9%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" 
                        //src= {props.data.logo}  alt="Popular Post"
                        />
                      </Link>
                      <div className="media-body">
                      <h6 className="mt-0">{item.title}</h6>
                        {item.content}
                      </div>
                    </div>  
                  )
                })
              }          
          </div>
    </div>
  </div>
    );
}
 
export default Main;