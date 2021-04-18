import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { SelectedDayContext } from './SelectedDayContext';
import { SelectedRecordContext } from './SelectedRecordContext';
import { RecordsContext} from './RecordsContext'



function Record (){

   
    
    const [selectedRecord, setSelectedRecord] = useContext(SelectedRecordContext)
    const [selectedDay, setSelectedDay] = useContext(SelectedDayContext)
    const [records, setRecords] = useContext(RecordsContext)


    
    const handleDeleteRecord = async () => {
        
        //to show spinner while deleting record
        setSelectedRecord(undefined)
        //

        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const response = await fetch(`/api/v1/records/${selectedRecord._id}`, options)
        const data = await response.json()

        const getRecords = async () => {
            const response = await fetch(`/api/v1/records`)
            const data = await response.json()
            setRecords(data)
          }

        getRecords()
    }



    
    
    

    return (
        <div className='provadiv'>
            <div className='buttons-container'>
                <Link
                    to={new Date(selectedDay).toDateString() !== new Date().toDateString() || selectedRecord !== 'no record' ? '/' : '/add'} 
                    className={new Date(selectedDay).toDateString() === new Date().toDateString() && selectedRecord === 'no record' ? 'addBtn' : 'disabledBtn'}>
                    ADD                    
                </Link>
                <Link 
                    to={selectedRecord !== 'no record' ? `/edit/${selectedRecord._id}` : '/'} 
                    className={selectedRecord !== 'no record' ? 'editBtn' : 'disabledEditBtn' }> 
                    EDIT
                </Link>
                <button 
                    className={selectedRecord !== 'no record' ? 'deleteBtn' : 'disabledBtn'} 
                    onClick={selectedRecord !== 'no record' ? handleDeleteRecord : null}>
                    DELETE
                </button>
            </div>
            <div className='record-inner-container'>

                
                    <>
                        <small className='intestation-text'>
                            {selectedRecord !== 'no record' ? (
                                `Created: ${new Date(selectedRecord.createdAt).toDateString()}`
                            ) : (
                                ``
                            )}
                        </small>
                        <br/>
                        <small className='intestation-text'>
                            {selectedRecord !== 'no record' ? (
                                `Last Modified: ${new Date(selectedRecord.lastUpdatedAt).toDateString()}`
                            ) : (
                                ``
                            )}
                        </small>
                        <br/>
                        <small className='intestation-text'>
                            {selectedRecord !== 'no record' ? (
                                `Tags: ${selectedRecord.tags.map( tag => ` ${tag}`)}`
                            ) : (
                                ``
                            )}
                            
                        </small>
                        <p className='text'>
                            {selectedRecord !== 'no record' ? (
                                `${selectedRecord.text}`
                            ) : (
                                'No Record for selected Day'
                            )}
                        </p>
                    </>
                
                
            </div>
        </div>
    )
}


export default Record