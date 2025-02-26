import React, { useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'
import Modal from './Modal';
import { Character } from './CharacterList';
import { TrashIcon } from '@heroicons/react/24/solid';



function Navbar({ children }) {
    return (
        <nav className='navbar'>
            <Logo />
            {children}
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

export function Favourites({ favourites,onDeleteFavourite }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Modal open={open} title={"modal"} onOpen={setOpen}>
                {
                    favourites.map(item => <Character
                        key={item.id}
                        item={item}>
                        <button className='icon red' onClick={() => onDeleteFavourite(item.id)}>
                            <TrashIcon />
                        </button>
                    </Character>)
                }
            </Modal >
            <button className='heart'>
                <HeartIcon className='icon' onClick={() => setOpen(true)} />
                <span className='badge'>{favourites.length}</span>
            </button>
        </>
    )
}
