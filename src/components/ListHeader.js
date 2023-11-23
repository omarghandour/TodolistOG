import React, { useState } from 'react'
import Modal from './Modal'
import { useCookies } from 'react-cookie'
import logo from './pic/OGTodo-logos_white.png'



const ListHeader = ({ listName, getData }) => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [showModal, setShowModal] = useState(false)
    const signOut = () => {
        console.log('signout')
        removeCookie('Email')
        removeCookie('AuthToken')
        window.location.reload()
    }
    function hanle() {
        window.location = '/';
    }
    return (
        <div className='list-header'>
            <img className='logo-lh' src={logo} alt="TodoList Logo" onClick={hanle} />
            <h1 className='date'>{listName}</h1>
            <div className='button-container'>

                <button className='create-lh' onClick={() => setShowModal(true)}>Add New</button>
                <button className='signout' onClick={signOut}>Sign Out</button>
            </div>
            {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />}
        </div>
    )
}

export default ListHeader