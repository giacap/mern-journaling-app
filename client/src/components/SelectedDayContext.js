import React, {useState, createContext} from 'react'


export const SelectedDayContext = createContext()



export function SelectedDayProvider( props ){

    const [selectedDay, setSelectedDay] = useState('')

    

    return (

        <div>
            <SelectedDayContext.Provider value={[selectedDay, setSelectedDay]}>
                {props.children}
            </SelectedDayContext.Provider>
        </div>

    )
}