import { XCircleIcon } from '@heroicons/react/24/outline';
import React, { Children } from 'react'

function Modal({ title, children, onOpen, open }) {
    if (!open) return null;
    return (
        <div>
            <div className="backdrop" onClick={() => onOpen(false)}></div>
            <div className="modal">
                <div className='modal__header'>
                    <h2 className='title'>{title}</h2>
                    <button onClick={() => onOpen(false)}>
                        <XCircleIcon className='icon close' />
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default Modal