import React from 'react';
import Routes from './Routes'
import Navbar from './components/Navbar';
import "tailwindcss/tailwind.css"

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
