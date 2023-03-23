import React, {useState} from 'react'
import GalleryPreview from '../components/GalleryPreview'
import whistle from "../assets/images/whistle.jpg"
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'

const Home = () => {

    return (
        <div className='bg-white'>
          <Hero/>
             <h1 className='text-3xl font-light tracking-wider mb-4'>Categories</h1>
             <hr/>
             <div className='grid grid-cols-1 gap-10 md:grid-cols-3 py-6'>
                <GalleryPreview category='small-walls' image={whistle}/>
                <GalleryPreview category='medium-walls' image={whistle}/>
                <GalleryPreview category='large-walls' image={whistle}/>
                <GalleryPreview category='sculptures' image={whistle}/>
                <GalleryPreview category='toys' image={whistle}/>
                <GalleryPreview category='whistles' image={whistle}/>
                <GalleryPreview category='wholesale' image={whistle}/>
                <GalleryPreview category='planes' image={whistle}/>
                <GalleryPreview category='past-works' image={whistle}/>
             </div>
        </div>
    )
}

export default Home