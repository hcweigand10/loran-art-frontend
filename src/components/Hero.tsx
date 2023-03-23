import React, {useState} from 'react'
import whistle from "../assets/images/whistle.jpg"

const Hero = () => {

    return (
        <div>
            <div className='flex justify-center pt-8 pb-16'>
              <img src={whistle} alt="whistle art" width="120px" height="120px"/>
              <div className='ml-5'>
                <h2 className='text-4xl font-medium'>Loran Scruggs</h2>
                <h5 className='text-neutral-400 font-light mt-2'>Port Townsend, WA</h5>
                <h5 className='text-neutral-400 font-light mt-2'>Artist/Recycler</h5>
              </div>
            </div>
        </div>
    )
}

export default Hero