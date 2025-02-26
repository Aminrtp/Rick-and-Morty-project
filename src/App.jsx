import React, { useEffect, useState } from 'react'
import "./App.css"
import Navbar, { Favourites, Search } from './components/Navbar'
import CharacterList from './components/CharacterList'
import CharacterDetail from './components/CharacterDetail'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import Modal from './components/Modal'


function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useState([]);


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`, { signal })
        setCharacters(data.results.slice(0, 5))
      }
      catch (err) {
        if(!axios.isCancel()){   
          setCharacters([])
          toast.error(err.response.data.error)
        }
      }
      finally {
        setIsLoading(false)
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query]);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   setIsLoading(true);
  //   axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`, { signal })
  //     .then(({ data }) => {
  //       setCharacters(data.results.slice(0, 5))
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setCharacters([])
  //       toast.error(err.response.data.error)
  //     })

  //     .finally(
  //       () => setIsLoading(false)
  //     )

  //   return () => {
  //     controller.abort()
  //   }
  // }, [query])

  const handleSelectCharacter = (id) => {
    setSelectedId(prevId => prevId === id ? null : id);
  };

  const onAddFavourite = (char) => {
    setFavourites((prev) => [...prev, char])
  }

  const isAddToFavourite = favourites.map((fav) => fav.id).includes(selectedId);

  return (
    <div className='app'>
      <Toaster />
      {/* <Modal title={"modal"} open={true} onOpen={()=>{}} >
          Lorem, ipsum dolor.
        </Modal> */}
      <Navbar >
        <Search query={query} setQuery={setQuery} />
        <div className='navbar__result'>
          Found {characters.length} characters
        </div>
        <Favourites numOfFavourites={favourites.length} />
      </Navbar>
      <div className='main'>

        <CharacterList
          onSelectCharacter={handleSelectCharacter}
          characters={characters}
          isLoading={isLoading}
          selectedId={selectedId}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddFavourite={onAddFavourite}
          isAddToFavourite={isAddToFavourite}
        />
        
      </div>
    </div>
  )
}

export default App








