import React, { useState } from 'react';
import authService from '../services/authService';
import {Link, useLocation} from 'react-router-dom'
import Logout from './Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavBar = ({ subpostitId }) => {
    // force the nav bar to re-render when location changes    
    const location = useLocation(); // useLocation to access the current path
    let path = "";
    let text = "";
    let state = {};
    if (location.pathname.includes("/posts")) {
        path = '/posts/create';
        text = 'Create Post';
        // Assuming subpostitId is passed as a prop to NavBar
        // and you want to ensure it's included only when necessary
        if (subpostitId) {
            state = { subpostitId }; // Pass subpostitId in state
        }
    } else {
        path = '/subpostit/create';
        text = 'Create a Sub-postIt';
        // Include any other necessary state, like user sign-in ID
        state = { signInId: authService.signInId() };
    }
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
      <div className="container">
        <a href="/" className="navbar-brand d-flex align-items-center text-dark">
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true" className="mr-2" viewBox="0 0 24 24" focusable="false"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg> */}
          <FontAwesomeIcon icon="fa-regular fa-note-sticky" /> 
          <strong> PostIt</strong>
        </a>
        <Link to={{ pathname: path }} state={state} className="btn btn-sm btn-secondary">{text}</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarsExample07">
          {/* signed in atempt 
              
          */}
          <ul className="navbar-nav ml-auto">
            {
              authService.isSignedIn() ? (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-dark" href="/#" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><FontAwesomeIcon icon="fa-regular fa-user"/>  {authService.signInNick()}</a>
                    <div className="dropdown-menu text-dark" aria-labelledby="dropdown07">
                      <Link  className="dropdown-item" to='/viewprofile' state={state}>View Profile</Link>
                      <Logout className="dropdown-item"></Logout>
                    </div>
                  </li>
              ) : 
              (
                <>
                  <li className="nav-item active text-dark h6 mt-2 mr-2">
                    <Link className="btn btn-sm btn-secondary" to="/signin">Sign In</Link>
                  </li>

                  <li className="nav-item active text-dark h6 mt-2">
                    <Link className="btn btn-sm btn-secondary" to="/register">Register</Link>
                  </li>
                </>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
    );
}
 
export default NavBar;