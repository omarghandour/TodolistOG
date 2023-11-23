import React from 'react'
import { NavLink } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div class="containerr">
            <div class="errorr">
                <h1>404</h1>
                <h2>Oops! Page not found</h2>
                <p>Sorry, the page you are looking for does not exist. You may have mistyped the address or the page may have moved.</p>

                <NavLink className={'Nav-link'} to={'/todo'}>Go back to home</NavLink>
            </div>
        </div>
    )
}

export default ErrorPage