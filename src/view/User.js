import React from 'react';

import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';

import { getDataFromId } from '../utility'

import '../content/css/user.css'

function User() {

    const forum = useSelector(state => state.forum);
    const { userId } = useParams()
    const [user, setUser] = React.useState({})
    const navigate = useNavigate();

    React.useEffect(() => {
        if (forum && forum.users && forum.users.length) {
            setUser(getDataFromId(forum.users, parseInt(userId)))
        }
    }, [forum.users])

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
            <div className='user-box'>
                <div>
                    <p><b>{user.name}</b></p>
                    <div className='block'>{user.username}</div>
                    <div className='block'>{user.phone}</div>
                    <div className='block'>{user.email}</div>
                    <div className='user-email'>
                        <a href={"mailto:" + user.email}>{user.email}</a>
                    </div>

                    <p><b>Address</b></p>
                    <div className='block'>{user.address && user.address.street}</div>
                    <div className='block'>{user.address && user.address.city} {user.address && user.address.zipcode}</div>

                    <p><b>Company Details</b></p>
                    <div className='block'>{user.company && user.company.name}</div>
                    <div className='block'>{user.company && user.company.bs} {user.company && user.company.catchPhrase}</div>
                </div>
                <img src="https://via.placeholder.com/150/f9cee5" alt="profile" />
            </div>
        </div>
    );
}
export default User;