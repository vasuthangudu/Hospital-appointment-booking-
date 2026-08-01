import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AppointmentPage from './components/AppointmentPage';
import AllDoctors from './components/AllDoctors';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import MyProfile from './components/MyProfile';
import CreateAccount from './components/CreateAccount';
import MyAppointment from './components/MyAppoinment';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
  
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<CreateAccount />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/doctors" element={<AllDoctors />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/create-account" element={<CreateAccount />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointment" element={<MyAppointment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;   

{/* frontend client  */}