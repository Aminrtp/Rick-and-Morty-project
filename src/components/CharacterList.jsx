import React from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Loader from './Loader'


function CharacterList({ characters, isLoading, onSelectCharacter, selectedId }) {

  if (isLoading) return (
    <div className='characters-list'>
      <Loader />
    </div>
  )
  return (
    <div className='characters-list'>
      {
        characters.map(item => (
          <Character
            key={item.id}
            item={item}
            onSelectCharacter={onSelectCharacter}
            selectedId={selectedId}
          >
            <button className='icon red' onClick={() => onSelectCharacter(item.id)}>
              {selectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
            </button>
          </Character>
        ))
      }
    </div>
  )
}

export default CharacterList

export function Character({ item, children }) {
  return (
    <div className='list__item'>
      <img src={item.image} alt={item.name} />
      <h3 className='name'>
        <span  >{item.gender === "Male" ? "🧑 " : "👩 "}</span>
        <span>{item.name}</span>
      </h3>
      <div className='info list-item__info'>
        <span className={` status ${item.status === "Dead" ? "red" : ""}`}></span>
        <span> {item.status}</span>
        <span> - {item.species}</span>
      </div>
      {children}
    </div>
  )
}