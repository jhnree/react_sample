import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
    return(
        <header className="fixed-top">
            <div>
                <Link to="/" className="home">Home</Link>
            </div>
        </header>
    )
}

export default Header;