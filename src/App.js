import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginScreen from './endpoints/loginScreen/LoginScreen.js';
import RegisterScreen from './endpoints/registerScreen/RegisterScreen.js';
import TestScreen from './endpoints/testScreen/TestScreen.js';
import ProfileScreen from './endpoints/profileScreen/ProfileScreen.js';
import IngredientsInventory from './endpoints/ingredientsInventory/IngredientsInventory.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<TestScreen />} />

        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profiles/:profileId" element={<ProfileScreen />}></Route>
          <Route path="/profiles/:profileId/ingredients-inventory" element={<IngredientsInventory />}/>
     </Routes>
    </Router>
  );
}

export default App;