import React, {useState, createContext} from 'react'


export const RecordsContext = createContext()



export function RecordsProvider( props ){

    const [records, setRecords] = useState()

    

    return (

        <div>
            <RecordsContext.Provider value={[records, setRecords]}>
                {props.children}
            </RecordsContext.Provider>
        </div>

    )
}