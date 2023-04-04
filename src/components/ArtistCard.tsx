import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

interface props {
  artist: {
    name: string,
    description: string,
    link: string
  }
}

const ArtistCard = (props: props) => {

    return (
      <div className="shadow-card flex flex-col rounded-xl bg-white bg-clip-border mb-3 mx-4">
      <div className="text-secondary flex-1 p-6">
        <a className='hover:text-blue-600' href={props.artist.link} target="_blank" rel='noreferrer'>
          <h3 className='mb-3 underline text-2xl'>{props.artist.name}<FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-2 text-sm"/></h3>
        </a>
        <p className="mb-3 opacity-60">
          {props.artist.description}
        </p>
      </div>
    </div>
    )
}

export default ArtistCard