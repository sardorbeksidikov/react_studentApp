import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Add from './components/Add';
import Students from './components/Students';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Students/>}></Route>
        <Route path="add" element={<Add />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App