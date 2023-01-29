import React from 'react';

import { useNavigate } from "react-router-dom";

import { getDataFromId } from '../utility'

function AllPost(props) {
    const navigate = useNavigate();

    const handleAuthorClick = (userId) => {
        navigate("/user/" + userId)
    }

    const handlePostClick = (postId) => {
        navigate("/post/" + postId)
    }

    return <div className='posts'>
        {
            props.posts.map((post) => {
                let user = getDataFromId(props.users, post.userId)
                return (
                    <div className='post-box' key={post.id} >
                        <div className='post-wrapper'
                            onClick={() => { handlePostClick(post.id) }}
                        >
                            <p className='post-title'>{post.title}</p>
                            <p className='post-body'>{post.body}</p>
                        </div>
                        {
                            user &&
                            <span
                                className='post-user'
                                onClick={() => { handleAuthorClick(post.userId) }}
                            >
                                Author - {user.name}
                            </span>
                        }
                    </div>
                )
            })
        }
    </div>
}
export default AllPost;