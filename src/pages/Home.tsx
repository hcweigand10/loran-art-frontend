import React, {useState} from 'react'
import GalleryPreview from '../components/GalleryPreview'
import whistle from "../assets/images/whistle.jpg"
import { Link } from 'react-router-dom'

const Home = () => {

    return (
        <div className=''>
             <h3>Home</h3>
             <div className='grid grid-cols-1 gap-6 md:grid-cols-3 max-w-xl mx-auto'>
                <GalleryPreview />
                <GalleryPreview />
                <GalleryPreview />
                <GalleryPreview />
                <GalleryPreview />
                <GalleryPreview />
                <GalleryPreview />
                <GalleryPreview />
                <GalleryPreview />
             </div>
        </div>
    )
}

export default Home