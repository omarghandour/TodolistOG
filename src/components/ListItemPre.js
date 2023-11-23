import React, { useState } from 'react'
import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import '../pages/Pages.css'
const ListItemPre = ({ task }) => {
    const [tr, setTr] = useState(false);
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
    const handleCheck = () => {
        setTr(!tr)
    }
    prog();

    return (
        <div><li className='list-item'>

            <div className='info-container'>
                <TickIcon handleCheck={handleCheck} />
                <p className='task-title-home' id={task.id}>{task.title}</p>
            </div>
            <div className='ss'>
                <ProgressBar progress={task.progress} />
                <div className='button-container blist'>
                    <button className='edit' onClick={() => { window.location = '/todo'; }}>Edit</button>
                    <button className='delete' onClick={() => { window.location = '/todo'; }}>X</button>
                </div>
            </div>
        </li></div>
    )
}

export default ListItemPre