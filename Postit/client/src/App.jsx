import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import Register from './components/Register';
import { Routes, Route } from 'react-router-dom'
import Posts from './components/Posts';
import CreateSubForm from './components/CreateSubForm';
import ProtectedRoutes from './components/ProtectedRoutes';
import DeleteSub from './components/DeleteSubPostIt';
import EditSub from './components/EditSubPostIt';
import ViewPost from './components/ViewPost';
import DeletePost from './components/DeletePost';
import EditPost from './components/EditPost';
import CreatePost from './components/CreatePost';


const App = () => {
  const [subid, setSubid] = useState("")
  return (
    <React.Fragment>
      <NavBar subpostitId={subid}/>
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts data={setSubid}/>} />
          <Route path="/posts/view" element={<ViewPost />} />
          <Route element={<ProtectedRoutes/>}>
            <Route path="/subpostit/create" element={<CreateSubForm/>}/>
            <Route path="/subpostit/edit" element={<EditSub />} />
            <Route path="/subpostit/delete" element={<DeleteSub />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/posts/edit" element={<EditPost />} />
            <Route path="/posts/delete" element={<DeletePost />} />
          </Route>
          {/* need to fill in your element once create form is built out
            he showed this in at 1:30hrs into the lecture DEC 5th.
          */}
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App
