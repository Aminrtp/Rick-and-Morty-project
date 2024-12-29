import React, { useEffect, useState } from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import CharacterList from './components/CharacterList'
import CharacterDetail from './components/CharacterDetail'
import { allCharacters } from "../data/data"


function App() {
  const [characters, setCharacters] = useState([])
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => setCharacters(data.results.slice(0, 5)))
  }, [])


  return (
    <div className='app'>
     
      <Navbar />
      <div className='main'>
        <CharacterList characters={characters} />
        <CharacterDetail />
      </div>
    </div>
  )
}

export default App