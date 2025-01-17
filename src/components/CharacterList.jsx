import React, { useEffect, useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import Loader from './Loader'
import { EyeDropperIcon } from '@heroicons/react/24/solid'



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
          />
        ))
      }
    </div>
  )
}

export default CharacterList

function Character({ item, onSelectCharacter, selectedId }) {
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
      <button className='icon red' onClick={() => onSelectCharacter(item.id)}>
        {selectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
      </button>
    </div>
  )
}