import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieSearch from './MovieSearch'; 
import MovieDetails from './MovieDetails'; 
import Layout from './layout';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route index element={<MovieSearch />} /> {/* Home page */}
      </Routes>
    </Router>
  );
}

export default App;