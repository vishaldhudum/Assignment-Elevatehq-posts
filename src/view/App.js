import React from 'react';

import { HashRouter, Routes, Route } from "react-router-dom";

import Forum from './Forum';
import User from './User';
import Post from './Post';
import Header from '../components/Header'

import '../content/css/app.css'

import axios from "axios";
import { useDispatch } from 'react-redux'
import { setPostsAndUsers } from '../redux/forum'

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    getPostsAndUsers()
  }, [])

  const getPostsAndUsers = () => {
    axios.all([
      axios.get("https://jsonplaceholder.typicode.com/posts"),
      axios.get("https://jsonplaceholder.typicode.com/users")
    ])
      .then(axios.spread((posts, users) => {
        dispatch(setPostsAndUsers({ posts: posts.data, users: users.data }));
      }));
  }

  return (
    <>
      <Header />
      <div className='bodyWrapper'>
        <HashRouter>
          <Routes>
            <Route exact path='/' element={< Forum />}></Route>
            <Route exact path='/user/:userId' element={< User />}></Route>
            <Route exact path='/post/:postId' element={< Post />}></Route>
          </Routes>
        </HashRouter>
      </div>
    </>
  );
}

export default App;