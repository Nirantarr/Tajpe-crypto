import React from 'react';
import Building from '../components/Building';
import Dapps from '../components/Dapps';
import Platform from '../components/Platform';
import ZeroTracking from '../components/ZeroTracking';
import HomePage from '../components/HomePage';
const Home = () => {
  return (
    <div>
    <HomePage/>
    <Building/>
    <Platform/>
    <Dapps/>
    <ZeroTracking/>
    </div>
  );
};

export default Home;
