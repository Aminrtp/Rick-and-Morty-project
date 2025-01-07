import React from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'



function Navbar({ children }) {
    return (
        <nav className='navbar'>
            <Logo />

            {children}
            <Favourites />
        </nav>
    );
}

export default Navbar

function Logo() {
    return (
        <div className='navbar__logo'>LOGO 😍</div>
    )
}

export function Search({ query, setQuery }) {
    return (
        <div>
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                type="text"
                className='text-field'
                placeholder='search ...'
            />
        </div>
    )
}

function Favourites() {
    return (
        <button className='heart'>
            <HeartIcon className='icon' />
            <span className='badge'>4</span>
        </button>
    )
}
