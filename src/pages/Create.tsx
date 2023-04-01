import React, {useState, useEffect, useContext} from 'react'
import userContext from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import Form from '../components/Form'

const Create = () => {

  const {loggedIn} = useContext(userContext)

  const navigate = useNavigate()

  useEffect(() => {
    if(!loggedIn) {
      navigate("/admin")
    }
  }, [])

    return (
        <div className='pt-5 lg:max-w-4xl mx-auto container'>
            <h2 className="text-2xl font-medium text-gray-800 dark:text-white">
              Create New
            </h2>
            <Form artId={0}/>
        </div>
    )
}

export default Create