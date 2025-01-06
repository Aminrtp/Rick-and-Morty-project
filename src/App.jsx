import React, { useEffect, useState } from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import CharacterList from './components/CharacterList'
import CharacterDetail from './components/CharacterDetail'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'




function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://rickandmortyapi.com/api/character")
  //     .then((res) => {
  //       if (!res.ok) new Error("Errorr")
  //       return res.json()
  //     })
  //     .then((data) => {
  //       setCharacters(data.results)
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  //     .finally(() => setIsLoading(false))
  // }, [])

  useEffect(() => {
    setIsLoading(true);
    axios.get("https://rickandmortyapi.com/api/character")
      .then(({ data }) => {
        console.log(data);
        setCharacters(data.results.slice(0, 5))
      })
      .catch((err) => {
        toast.error(err.response.data.error)
      })
      .finally(
        () => setIsLoading(false)
      )
  }, [])


  return (
    <div className='app'>
      <Toaster />
      <Navbar />
      <div className='main'>

        <CharacterList characters={characters} isLoading={isLoading} />

        <CharacterDetail />
      </div>
    </div>
  )
}

export default App