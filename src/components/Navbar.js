import React from 'react'


const Navbar = () => {
    return(
        <div>
            <nav className='navbar'>
                <div className='navbar-brand'>
                    <a className='image is-64x64'>
                           <img alt='site logo' src=
                        'https://mckeeper.s3.us-east-2.amazonaws.com/mckeeper_logo.png'
                        /> 
                        
                    </a>
                </div>
                <div className='navbar-menu' id='nav-links'>
                    <div className='navbar-end'>
                        <a className='navbar-item'>My Account</a>
                        <a className='navbar-item'>Addresses</a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar