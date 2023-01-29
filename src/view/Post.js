import React from 'react';

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

import { getDataFromId } from '../utility'

import '../content/css/post.css'

function Post() {

    const forum = useSelector(state => state.forum);
    const { postId } = useParams()
    const [comments, setComments] = React.useState([])
    const [post, setPost] = React.useState({})
    const navigate = useNavigate();

    React.useEffect(() => {
        getCommentsFromPostId()
    }, [])

    React.useEffect(() => {
        if (forum && forum.posts && forum.posts.length) {
            let postData = getDataFromId(forum.posts, parseInt(postId));
            setPost({ ...postData, name: getDataFromId(forum.users, postData.userId).name })
        }
    }, [forum.posts, forum.users])

    const getCommentsFromPostId = () => {
        axios.get("https://jsonplaceholder.typicode.com/comments?postId=" + postId)
            .then((response) => {
                setComments(response.data);
            });
    }

    const handleAuthorClick = (userId) => navigate("/user/" + userId);

    const handleBack = () => navigate("/");

    return (
        <div>
            <p>
                <span
                    className='back-button'
                    onClick={handleBack}
                >
                    Back to all posts
                </span>
            </p>
            <p className='post-title'>{post.title}</p>
            <p className='post-body'>{post.body}</p>
            <span
                className='post-user'
                onClick={() => { handleAuthorClick(post.userId) }}
            >
                Author - {post.name}
            </span>

            <p className='post-heading'>Comments -</p>
            {
                comments.map((comment) => (
                    <div key={comment.id}>
                        <hr />
                        <div className='comment-box'>
                            <div className='comment-header'>
                                <p><b>{comment.name}</b></p>
                                <p>By - {comment.email}</p>
                            </div>
                            <p>{comment.body}</p>
                        </div>
                    </div>
                ))
            }
        </div >
    );
}
export default Post;