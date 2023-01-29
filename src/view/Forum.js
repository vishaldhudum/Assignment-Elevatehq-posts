import React from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { setSearchedPosts } from '../redux/forum'

import Search from './search'
import AllPost from './AllPosts'

import axios from "axios";

function Forum() {
    const dispatch = useDispatch();
    const forum = useSelector(state => state.forum);

    const handleSearch = id => {
        if (id) {
            axios.get("https://jsonplaceholder.typicode.com/users/" + id + "/posts")
                .then((response) => {
                    dispatch(setSearchedPosts(response.data));
                });
        } else {
            dispatch(setSearchedPosts([]));
        }
    }

    return <>
        <Search
            forum={forum}
            handleSearch={handleSearch}
        />
        <AllPost
            users={forum.users}
            posts={forum.searchedPosts.length > 0 ? forum.searchedPosts : forum.posts}
        />
    </>
}
export default Forum;