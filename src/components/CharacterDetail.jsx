import React, { useEffect, useState } from 'react'
import { episodes } from "../../data/data";
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from './Loader'

function CharacterDetail({ selectedId }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


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
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`)
        setCharacter(data);

      } catch (error) {
        toast.error(error.response.data.error)
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
            {/* <span> - {character.species}</span> */}
          </div>
          <div className="location">
            <p>Last known Locations:</p>
            <p>{character.location.name}</p>
          </div>
          <div className='actions'>
            <button className='btn btn--primary'>
              Add to Favorite
            </button>
          </div>
        </div>
      </div>

      <div className="character-episodes">
        <div className="title">
          <h2> Last Episodes</h2>
          <button>
            <ArrowUpCircleIcon className='icon' />
          </button>
        </div>
        <ul>
          {
            episodes.map((item, index) => <li key={item.id}>
              <div>
                <span>{String(index + 1).padStart(2, "0")} - {item.episode}: {" "}</span>
                <strong>{item.name}</strong>
              </div>
              <div className='badge badge--secondary'>{item.air_date}</div>
            </li>)
          }
        </ul>
      </div>
    </div>
  )
}

export default CharacterDetail