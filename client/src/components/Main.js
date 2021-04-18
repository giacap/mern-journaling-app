import React, {useContext, useEffect} from 'react'
import Record from './Record'
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { SelectedDayContext } from './SelectedDayContext';
import { RecordedDatesContext } from './RecordedDatesContext';
import { SelectedRecordContext } from './SelectedRecordContext'
import { RecordsContext} from './RecordsContext'
import Loading from './Loading'



function Main(){


    const [selectedDay, setSelectedDay] = useContext(SelectedDayContext)
    const [recordedDates, setRecordedDates] = useContext(RecordedDatesContext)
    const [records, setRecords] = useContext(RecordsContext)
    const [selectedRecord, setSelectedRecord] = useContext(SelectedRecordContext)
    

    //get all records
    const getRecords = async () => {
      const response = await fetch(`/api/v1/records`)
      const data = await response.json()
      setRecords(data)
    }


    useEffect( () => {
      getRecords()    
    }, [])



    useEffect( () => {
      //get recordedDates
      if(records){
        let x = records.data;
        const y = x.map( (item) => {
          return new Date(item.createdAt)
        })

        setRecordedDates(y)
      }
      
    }, [records])



   






    useEffect(function(){
      if(records){
        let todaysDate = new Date(new Date(selectedDay).getFullYear(), new Date(selectedDay).getMonth(), new Date(selectedDay).getDate())
        
        const x = records.data
         
        x.forEach(function(item){
          if(new Date(new Date(item.createdAt).getFullYear(), new Date(item.createdAt).getMonth(), new Date(item.createdAt).getDate()).toDateString === todaysDate.toDateString){
            setSelectedRecord(item)
          }
        })
        
      }
    }, [records, selectedDay])

    

    

    

   

    useEffect( () => {
      const item = localStorage.getItem('selectedDay')
      if(item){
        setSelectedDay(JSON.parse(item))
      } else {
        const todaysDate = new Date()
        setSelectedDay(todaysDate)
      }
    }, [])
    

    useEffect( () => {
      localStorage.setItem('selectedDay', JSON.stringify(selectedDay))
    }, [selectedDay])
    


    


    

    
    
    
    

    

    




  
    const selezionaDay = (e) => {
        setSelectedDay(e)
    }


    useEffect( () => {
      if(selectedDay && records){
        const x = records.data
        const y = x.filter( (item) => {
          return new Date(item.createdAt).toDateString() === new Date(selectedDay).toDateString()
        })
        
        if(y.length === 1){
          setSelectedRecord(y[0])
        } else {
          setSelectedRecord('no record')
        }
        
      }
    }, [selectedDay, records])
    



    
    
    
    

    
    

    return (

        <div className='main-container'>


                {/* only on smaller screens */}
              <div className='date-input-container'>
                <DayPickerInput
                    dayPickerProps={{
                      //selectedDays: selectedDay,
                      selectedDays: new Date(selectedDay),
                      modifiers : {used: recordedDates},
                      showOutsideDays: true
                    }}
                  //value={selectedDay}
                  value={new Date(selectedDay)}
                  onDayChange={selezionaDay}
                  
                />
              </div>


              {selectedRecord ? (
                <div className='record-container'>
                  <Record />
                </div>
              ) : (
                <div className='record-container loading'>
                  <Loading />
                </div>
              )}
              

                {/* only on bigger screens */}
              <div className='date-picker-container'>
                  <DayPicker 
                    //selectedDays={selectedDay}
                    selectedDays={new Date(selectedDay)}
                    onDayClick={selezionaDay}
                    modifiers={{used: recordedDates}}
                    showOutsideDays
                    value={selectedDay}
                    
                    month = { selectedDay ? (
                      new Date(selectedDay)
                    ) : (
                      new Date()
                    )}
                    
                    todayButton="Go to Current Month"
                    onTodayButtonClick={(day, modifiers) => console.log(day, modifiers)}
                    
                  />
              </div>



            

          </div>
    )
}


export default Main