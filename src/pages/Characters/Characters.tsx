import React, { useEffect, useState } from 'react'
import './characters.scss'
import mainImg from '../../assets/characters-img.png'
import { CharactersItem } from '../../component/CharactersItem/CharactersItem'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchCharacters } from '../../store/characterActions'
import { Link, useSearchParams } from 'react-router-dom'
import { Loader } from '../../component/Loader/Loader'
import { Error } from '../../component/Error/Error'
import { useDebounce } from '../../hooks/useDebounce'
import { setQueryFilter } from '../../store/characterSlice'

export const Characters = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { characters, isLoading, error, queryFilter } = useAppSelector((state) => state.character)
  const [search, setSearch] = useState<string>(queryFilter)
  const debounsed = useDebounce(search, 1000)

  useEffect(() => {
    let queryFilter

    if (localStorage.getItem('queryFilter') !== null) {
      queryFilter = localStorage.getItem('queryFilter')
    }
    //the value from url is more important than the value from localStorage, therefore the last value take from url
    if (searchParams.get('name')) {
      queryFilter = searchParams.get('name')
    }

    if (queryFilter) {
      dispatch(setQueryFilter(queryFilter as string))
      setSearch(queryFilter)
      return
    }

    dispatch(fetchCharacters())
  }, [])

  useEffect(() => {
    
    dispatch(setQueryFilter(search as string))

    if (search) {
      localStorage.setItem('queryFilter', search)
      setSearchParams({ name: search })
    } else {
      //if value is empty, there is no need set search value in localStorage and url
      setSearchParams()
      localStorage.removeItem('queryFilter')
    }
  }, [debounsed])

  useEffect(() => {
    dispatch(fetchCharacters(queryFilter))
  }, [queryFilter])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <div className="characters">
      <div className="characters__img">
        <img src={mainImg} alt="" />
      </div>
      <div className="characters__search-form">
        <input
          className="characters__search-form--input"
          onChange={handleChange}
          value={search}
          placeholder="Filter by name"
          type="text"
        />
      </div>
      {isLoading && <Loader />}
      {error && <Error error={error} />}
      {!error && (
        <div className="characters__items">
          {characters.map(({ id, name, image, species }) => (
            <Link to={`/characterDetails/${id}`} key={id}>
              <CharactersItem id={id} image={image} species={species} name={name} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
