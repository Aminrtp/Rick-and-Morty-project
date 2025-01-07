import React, { useEffect, useState } from 'react'
import "./App.css"
import Navbar, { Search } from './components/Navbar'
import CharacterList from './components/CharacterList'
import CharacterDetail from './components/CharacterDetail'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'




function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

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
    axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
      .then(({ data }) => {
        setCharacters(data.results.slice(0, 5))
      })
      .catch((err) => {
        setCharacters([])
        toast.error(err.response.data.error)
      })
      .finally(
        () => setIsLoading(false)
      )
  }, [query])
  


  return (
    <div className='app'>
      <Toaster />
      <Navbar >
        <Search query={query} setQuery={setQuery} />
        <div className='navbar__result'>Found X characters</div>
      </Navbar>
      <div className='main'>

        <CharacterList characters={characters} isLoading={isLoading} />

        <CharacterDetail />
      </div>
    </div>
  )
}

export default App