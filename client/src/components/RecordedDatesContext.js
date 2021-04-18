import React, {useState, createContext} from 'react'


export const RecordedDatesContext = createContext()



export function RecordedDatesProvider( props ){

    const [recordedDates, setRecordedDates] = useState([])

    

    return (

        <div>
            <RecordedDatesContext.Provider value={[recordedDates, setRecordedDates]}>
                {props.children}
            </RecordedDatesContext.Provider>
        </div>

    )
}