import React from 'react'
import './charactersItem.scss'

interface CharactersItemProps {
  id: string
  image: string
  name: string
  species:  string

}

export const CharactersItem: React.FC<CharactersItemProps> = ({id, image, name, species}) => {
  return (
    <div className='characters__item'>
      <div className="characters__item--img">
        <img src={image} alt="" />
      </div>
      <div className="characters__item--info">
        <div className="item--info__name">{name}</div>
        <div className="item--info__species">{species}</div>
      </div>
    </div>
  )
}
