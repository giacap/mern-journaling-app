import React, { useContext, useEffect, useState } from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'
import { SelectedRecordContext } from './SelectedRecordContext'


function EditRecord(){

    
    const [selectedRecord, setSelectedRecord] = useContext(SelectedRecordContext)
    const [textInput, setTextInput] = useState('')
    const [tagsInput, setTagsInput] = useState('')

    const [error, setError] = useState(false)

    



    useEffect( () => {
        if(selectedRecord){
            setTextInput(selectedRecord.text)
            setTagsInput(selectedRecord.tags.join(' '))
        }
        
    }, [selectedRecord])



    const handleTextInput = (e) => {
        setTextInput(e.target.value)
    }

    const handleTagsInput = (e) => {
        setTagsInput(e.target.value)
    }




    const {id} = useParams()
    let history = useHistory()
    // PUT (edit) record
    const putRecord = async (e) => {
        e.preventDefault()

        const update = {text: textInput.trim(), tags: tagsInput, lastUpdatedAt: new Date()}

        const options = {
            method : 'PUT',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(update)
        }

        const response = await fetch(`/api/v1/records/${id}`, options)
        const data = await response.json()
        

        
        if(data.success === true){
            history.push('/')
        } else {
            setError(data.error)
        }
        
    }
  



    return (

        <div>
            
            <div className='backToHome-container'>
                <Link to='/'>
                    BACK TO HOME
                </Link>
            </div>
            <div className='form-container'>
                <form className='form' onSubmit={putRecord}>
                    <div>
                        {error ? (
                            <label className='error-label'>
                                {error}
                            </label>
                        ) : (
                            <label>Reelaborate your thoughts is a good idea</label>
                        )}
                        <textarea name="" id="" cols="60" rows="13" value={textInput} autoFocus onChange={handleTextInput} required></textarea> 
                    </div>
                    <div>
                        <input type="text" value={tagsInput} onChange={handleTagsInput}/>
                        <button className='editBtn' type='submit'>CONFIRM</button>
                    </div>
                </form>


            </div>

        </div>
    )
}

export default EditRecord