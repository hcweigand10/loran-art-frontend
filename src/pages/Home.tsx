import React, {useState} from 'react'
import GalleryPreview from '../components/GalleryPreview'
import whistle from "../assets/images/whistle.jpg"
import { Link } from 'react-router-dom'

const Home = () => {
  console.log(typeof whistle)

    return (
        <div className='max-w-2xl mx-auto'>
             <h3>Home</h3>
             <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                <GalleryPreview category='Small Wall Art' image={whistle}/>
                <GalleryPreview category='Medium Wall Art' image={whistle}/>
                <GalleryPreview category='Large Wall Art' image={whistle}/>
                <GalleryPreview category='Sculptures' image={whistle}/>
                <GalleryPreview category='Toys' image={whistle}/>
                <GalleryPreview category='Whistle' image={whistle}/>
                <GalleryPreview category='Wholesale' image={whistle}/>
                <GalleryPreview category='Planes' image={whistle}/>
                <GalleryPreview category='Past Works' image={whistle}/>
             </div>
        </div>
    )
}

export default Home