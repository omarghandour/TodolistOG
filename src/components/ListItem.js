import React, { useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'
import TickIcon from './TickIcon'
import Modal from './Modal';

const ListItem = ({ task, getData, authToken, pass }) => {
    const [tr, setTr] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const deleteItem = async () => {
        try {
            const response = await fetch(`https://us-central1-back-e8f9a.cloudfunctions.net/api/todos/${task.id}`, {
                method: 'DELETE'
            })
            if (response.status === 200) {
                getData()
            }
        } catch (err) {
            console.log(err);
        }
    }
    const ele = document.getElementById(`${task.id}`)
    const mo = () => {
        if (ele) {
            ele.style.textDecoration = "line-through"
        }
    }
    const nomo = () => {
        if (ele) {
            document.getElementById(`${task.id}`).style.textDecoration = "none"
        }

    }
    const prog = async () => {

        if (task.progress === 100 || tr === true) {
            mo()
        } else {
            nomo()
        }

    }
    useEffect(() => {
        prog()
    }, [])

    // prog();
    const handleCheck = () => {
        setTr(!tr)
    }



    // window.onload = (event) => {
    //     console.log("page is fully loaded");
    //     prog();
    // };
    if (authToken) {
        prog();
    }
    return (
        <li className='list-item'>

            <div className='info-container'>
                <TickIcon handleCheck={handleCheck} />
                <p className='task-title' id={task.id}>{task.title}</p>
            </div>
            <div className='ss'>
                <ProgressBar progress={task.progress} />
                <div className='button-container blist'>
                    <button className='edit' onClick={() => { setShowModal(true) }}>Edit</button>
                    <button className='delete' onClick={deleteItem}>X</button>
                </div>
            </div>
            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} />}
        </li>
    )
}

export default ListItem