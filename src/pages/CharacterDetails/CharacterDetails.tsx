import React, { useEffect } from 'react'
import './characterDetails.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from '../../component/Loader/Loader'
import arrowBack from '../../assets/arrow-back.png'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchCharacterDetails } from '../../store/characterActions'
import { Error } from '../../component/Error/Error'

export const CharacterDetails = () => {
  const { characterDetails, isLoading, error } = useAppSelector((state) => state.character)
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return
    dispatch(fetchCharacterDetails(id))
  }, [])

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="character__details">
      <div className="character__details--arrow" onClick={goBack}>
        <img src={arrowBack} alt="" />
        <span>GO BACK</span>
      </div>
      {isLoading && <Loader />}
      {error && <Error error={error} />}
      {!error && <div className="character__details--profile">
        <div className="details--profile__img">
          <img src={characterDetails.image} alt="" />
        </div>
        <div className="details--profile__name">{characterDetails.name}</div>
        <div className="details--profile__info">
          <h3 className="profile__info--title">Informations</h3>
          <ul className="profile__info--list">
            <li>
              <h4>Gender</h4>
              <span>{characterDetails.gender}</span>
            </li>
            <li>
              <h4>Status</h4>
              <span>{characterDetails.status}</span>
            </li>
            <li>
              <h4>Specie</h4>
              <span>{characterDetails.species}</span>
            </li>
            <li>
              <h4>Origin</h4>
              <span>{characterDetails.origin?.name}</span>
            </li>
            <li>
              <h4>Type</h4>
              <span>{characterDetails.type ? characterDetails.type : 'Unknown'}</span>
            </li>
          </ul>
        </div>
      </div>}
    </div>
  )
}
