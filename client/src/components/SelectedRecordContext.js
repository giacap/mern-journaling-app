import React, {useState, createContext} from 'react'


export const SelectedRecordContext = createContext()



export function SelectedRecordProvider( props ){

    const [selectedRecord, setSelectedRecord] = useState()

    

    return (

        <div>
            <SelectedRecordContext.Provider value={[selectedRecord, setSelectedRecord]}>
                {props.children}
            </SelectedRecordContext.Provider>
        </div>

    )
}