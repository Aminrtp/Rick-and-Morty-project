import React, { useEffect, useState } from 'react'
import "./App.css"
import Navbar, { Favourites, Search } from './components/Navbar'
import CharacterList from './components/CharacterList'
import CharacterDetail from './components/CharacterDetail'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useState(()=> JSON.parse(localStorage.getItem("FAVOURITES")) || []);
 


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
        if (!axios.isCancel()) {
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

  useEffect(() => {
    localStorage.setItem("FAVOURITES", JSON.stringify(favourites))
  }, [favourites])


  const handleSelectCharacter = (id) => {
    setSelectedId(id);
  };

  const onAddFavourite = (char) => {
    setFavourites((prev) => [...prev, char])
  }

  const isAddToFavourite = favourites.map((fav) => fav.id).includes(selectedId);

  const onDeleteFavourite = (id) => setFavourites(favourites.filter(fav => fav.id !== id))

  return (
    <div className='app'>
      <Toaster />
      <Navbar >
        <Search query={query} setQuery={setQuery} />
        <div className='navbar__result'>
          Found {characters.length} characters
        </div>
        <Favourites favourites={favourites} onDeleteFavourite={onDeleteFavourite} />
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








