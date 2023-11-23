import React from 'react'

const ProgressBar = ({ progress }) => {
    const colors = [
        'rgb(150 125 103)',
        '#433C76',
        '#763C3C',
        '#3D514D',
        '#3F3D51',
        'black',
        '#b4b4b4'
    ]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    return (
        <div className='outer-bar'>

            <div
                className='inner-bar'
                style={{ width: `${progress}%`, backgroundColor: randomColor }}
            >{progress}</div>
        </div>
    )
}

export default ProgressBar