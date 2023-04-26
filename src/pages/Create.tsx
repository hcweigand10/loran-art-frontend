import React, {useEffect, useContext} from 'react'
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
        <div className='pt-5 lg:max-w-4xl mx-auto'>
            <h1 className="text-3xl font-light tracking-wider mb-4 pt-6">Create</h1>
            <Form artId={0}/>
        </div>
    )
}

export default Create