import React, { useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import {RecordedDatesContext} from './RecordedDatesContext'


function AddRecord(){

    let history = useHistory();
    
    

    const [textInput, setTextInput] = useState('')
    const [tagsInput, setTagsInput] = useState('')
    const [recordedDates, setRecordedDates] = useContext(RecordedDatesContext)
    const [error, setError] = useState(false)




    const getTextInput = (e) => {
        setTextInput(e.target.value)
    }

    const getTagsInput = (e) => {
        setTagsInput(e.target.value)
    }




    
    
    const postRecord = async (e) => {
        e.preventDefault() 

        
        

        const record = {text: textInput.trim(), tags: tagsInput}    

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(record)
        }

        const response = await fetch('/api/v1/records', options)
        const data = await response.json()

        
        if(data.success === true){

            


            setRecordedDates([...recordedDates, data.data.createdAt])
            history.push("/");
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
                <form className='form' onSubmit={postRecord}>
                    <div>
                        {error ? (
                            <label className='error-label'>
                                {error}
                            </label>
                        ) : (
                            <label>What are your thoughts today?</label>
                        )}
                        {/*<label>What are your thoughts today?</label>*/}
                        <textarea name="" id="" cols="60" rows="13" autoFocus onChange={getTextInput} required></textarea>
                    </div>
                    <div>
                        <input type="text" placeholder='#goals #work ...' onChange={getTagsInput} />
                        <button type='submit' className='addBtn'>ADD</button>
                    </div>
                </form>


            </div>

            
        </div>

        
    )
}


export default AddRecord