import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

function AppointmentPage() {
  const { docId } = useParams();
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <div>
      <NavBar/>
    <div className="container py-5">
      <div className="row">
        {/* Doctor Info */}
        <div className="col-12 col-md-4">
          <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500" className="img-fluid rounded shadow" alt="Doctor" />
        </div>
        <div className="col-12 col-md-8 mt-4 mt-md-0">
          <h2 className="fw-bold">Dr. Richard James</h2>
          <p className="text-muted">General Physician | MBBS</p>
          <p className="text-secondary">Dr. Richard James has a strong commitment to delivering comprehensive medical care.</p>
          
          <h5 className="mt-4">Select Time Slot</h5>
          <div className="d-flex gap-2 flex-wrap py-2">
            {["10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM"].map((slot) => (
              <button 
                key={slot} 
                className={`btn ${selectedSlot === slot ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
          <button className="btn btn-primary mt-4 px-5">Confirm Appointment</button>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
export default AppointmentPage;