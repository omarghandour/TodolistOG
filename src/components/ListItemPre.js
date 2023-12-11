import React, { useState } from 'react'
import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import '../pages/Pages.css'
const ListItemPre = ({ task }) => {
    const [check, setCheck] = useState(false);



 
    const handleCheck = () => {
        setCheck(!check)
    }

    return (
        <div><li className='list-item'>

            <div className='info-container'>
                <TickIcon handleCheck={handleCheck} />
                <p className='task-title-home' style={check || task.progress === 100 ? {textDecoration: "line-through"} : {}} id={task.id}>{task.title}</p>
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