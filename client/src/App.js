import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AppointmentPage from './components/AppointmentPage';
import AllDoctors from './components/AllDoctors';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import MyProfile from './components/MyProfile';
import CreateAccount from './components/CreateAccount';
import NavBar from'./components/NavBar'
import Footer from'./components/Footer'
import MyAppointment from './components/MyAppoinment';


function App() {
  return (
  
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/doctors" element={<AllDoctors />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path='navbar'element={<NavBar/>}/>
        <Route path='footer' element={<Footer/>}/>
        <Route path="/my-appointment" element={<MyAppointment/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;   

{/* frontend client side */}