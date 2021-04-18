import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import AddRecord from './components/AddRecord';
import Main from './components/Main'
import EditRecord from './components/EditRecord'
import {SelectedDayProvider} from './components/SelectedDayContext'
import {RecordedDatesProvider} from './components/RecordedDatesContext'
import { SelectedRecordProvider } from './components/SelectedRecordContext';
import { RecordsProvider } from './components/RecordsContext';





function App() {

  
  
  
  



  return (
    <SelectedDayProvider>
      <RecordedDatesProvider>
        <SelectedRecordProvider>
          <RecordsProvider>
          <Router>
              <div className="app">
                
                

                <Header />

                <Switch>
                  
                  
                  <Route path='/add' component={AddRecord} />

                  <Route path='/edit/:id' component={EditRecord} />

                  <Route path='/' component={Main}/>


                  

                  

                </Switch>
                
                
                


              </div>

              
          </Router>
          </RecordsProvider>
        </SelectedRecordProvider>
      </RecordedDatesProvider>
    </SelectedDayProvider>
  );
}

export default App;
