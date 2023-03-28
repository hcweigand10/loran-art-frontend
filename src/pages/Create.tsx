import React, {useState} from 'react'
import Form from '../components/Form'

const Create = () => {

    return (
        <div>
            <h2 className="text-2xl font-medium text-gray-800 dark:text-white">
              Create New
            </h2>
            <Form artId={0}/>
        </div>
    )
}

export default Create