import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeftNav from './Components/LeftNav';
import Dashboard from './Components/Dashboard'
import ExamCreation from './Components/ExamCreation'
import DrawingApp from "./Components/DrawingApp";
function App() {
  return (
    <Router>
      
        <Routes>
         <Route path='/' element={<LeftNav/>} />
         <Route path='/Dashboard' element={<Dashboard/>}/>
         <Route path='/exams' element={<ExamCreation/>}/>
         <Route path='/DrawingApp' element={<DrawingApp/>}/>
        </Routes>
      
    </Router>
  );
}
 
export default App;