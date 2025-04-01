import React from 'react';
import { Outlet } from 'react-router-dom';
import MovieSearch from './MovieSearch';
import './App.css';

function Layout() {
  return (
    <div>
      {/* Include the MovieSearch component at the top of every page */}
      <MovieSearch />0

      {/* Render the current route's component */}
      <Outlet />
    </div>
  );
}

export default Layout;