import React, {useEffect} from 'react'
import GalleryPreview from '../components/GalleryPreview'
import largeheart from "../assets/images/large-heart.jpeg"
import mediumbee from "../assets/images/medium-bee.jpeg"
import toys from "../assets/images/toys-rush-hour.jpeg"
import pastworks from "../assets/images/past-works-heart.jpeg"
import planes from "../assets/images/planes.jpeg"
import ratking from "../assets/images/rat-king.jpeg"
import smallbee from "../assets/images/small-sunny-bee.jpeg"
import turtle from "../assets/images/whistle-turtle.jpeg"
import wholesale from "../assets/images/wholesale-whistles.jpeg"
import Hero from '../components/Hero'
import galleryAPI from '../utils/axios'

const Home = () => {

  useEffect(() => {
    fetchCategories()
  }, [])
  
  const fetchCategories = async () => {
    const categories = await galleryAPI.get("/api/categories")
    console.log(categories)
  }
  

    return (
        <div className='lg:max-w-4xl mx-auto container pb-5'>
          <Hero/>
             <h1 className='text-3xl font-light tracking-wider mb-4'>Categories</h1>
             <hr/>
             <div className='grid grid-cols-1 gap-10 md:grid-cols-3 py-6'>
                <GalleryPreview category='small-walls' image={smallbee}/>
                <GalleryPreview category='medium-walls' image={mediumbee}/>
                <GalleryPreview category='large-walls' image={largeheart}/>
                <GalleryPreview category='sculptures' image={ratking}/>
                <GalleryPreview category='toys' image={toys}/>
                <GalleryPreview category='whistles' image={turtle}/>
                <GalleryPreview category='wholesale' image={wholesale}/>
                <GalleryPreview category='planes' image={planes}/>
                <GalleryPreview category='past-works' image={pastworks}/>
             </div>
        </div>
    )
}

export default Home