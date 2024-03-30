import {useEffect, useState} from 'react';
import React from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import SubpostIt from './SubPostIt';
import { useCookies } from "react-cookie"
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';



const Main = () => {
  const {register, handleSubmit, formState: { errors }} = useForm();
    const[subpostits, setSubPostIt] = useState([]);
    const[cookies, setCookie] = useCookies(["jwt"]);
    const [query, setQuery] = useState("");

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

    return ( 
      <div>
        <section className="jumbotron text-center">
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

        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">

            {
              subpostits.filter((sub)=>sub.name.toLowerCase().includes(query)).map((item, index) => {
                return(
                  <SubpostIt key={index} data={item}/>
                )
              })
            }

            </div>
          </div>
        </div>
      </div>
    );
}
 
export default Main;