import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from './Loader';
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';


function CharacterDetail({ selectedId, onAddFavourite, isAddToFavourite }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  // useEffect(() => {
  //   axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`)
  //     .then((res) => setCharacter(res.data)
  //     ).catch((err) => {
  //       console.log("Error fetching character:", err);
  //     })
  // }, [selectedId])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`)
  //       setCharacter(data)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData()
  // }, [selectedId])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`);
  //       setCharacter(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (selectedId) {
  //     fetchData();
  //   }
  // }, [selectedId]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`);
        setCharacter(data);

        const episodesId = data.episode.map(e => e.split("/").at(-1))
        setEpisodes(episodesId)


        const { data: episodes } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`);
        setEpisodes([episodes].flat().slice(0, 6));

      } catch (error) {
        toast.error(error.response.data.error)
        console.log(error.response.data.error);

      } finally {
        setIsLoading(false)
      }
    }

    if (selectedId) fetchData()
  }, [selectedId])


  if (!character) return (
    <div style={{ flex: 1, color: "var(--slate-100)", }}>select a character</div>
  )

  if (isLoading) return <Loader />
  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo character={character} isAddToFavourite={isAddToFavourite} />
      <EpisodeList episodes={episodes} />

    </div>
  )
}

export default CharacterDetail


function CharacterSubInfo({ character, isAddToFavourite }) {
  return (
    <div className='character-detail'>
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "🧑" : "👩"}</span>
          <span> {character.name}</span>
        </h3>
        <div className="info">
          <span className={`status ${character.status === "Dead" ? "red" : ""}`}></span>
          <span> {character.status}</span>
          <span> - {character.species}</span>
        </div>
        <div className="location">
          <p>Last known Locations:</p>
          <p>{character.location.name}</p>
        </div>
        <div className='actions'>

          {
            isAddToFavourite ? (<p>already added to favorite ✔</p>
            ) : (
              <button onClick={() => onAddFavourite(character)} className='btn btn--primary'>
                Add to Favorite
              </button>)
          }

        </div>
      </div>
    </div>
  )
}

function EpisodeList({ episodes }) {
  const [sortBy, setSortBy] = useState(true);
  let sortedEpisodes ;
  if (sortBy) {
    sortedEpisodes = [...episodes].sort((a, b) => new Date(a.created) - new Date(b.created))
  } else {
    sortedEpisodes = [...episodes].sort((a, b) => new Date(b.created) - new Date(a.created))
  }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2> Last Episodes</h2>
        <button onClick={() =>  setSortBy((is) => !is) }>
          <ArrowUpCircleIcon className='icon' style={{ rotate: sortBy ? "0deg" : "180deg" }} />
        </button>
      </div>
      <ul>
        {
          sortedEpisodes.map((item, index) => <li key={item.id}>
            <div>
              <span>{String(index + 1).padStart(2, "0")} - {item.episode}: {" "}</span>
              <strong>{item.name}</strong>
            </div>
            <div className='badge badge--secondary'>{item.air_date}</div>
          </li>)
        }
      </ul>
    </div>
  )
}

