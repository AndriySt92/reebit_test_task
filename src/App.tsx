import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Characters } from './pages/Characters/Characters';
import { CharacterDetails } from './pages/CharacterDetails/CharacterDetails';
import { NotFound } from './pages/NotFound/NotFound';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/characterDetails/:id" element={<CharacterDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
