import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";

const MyAppointments = () => {
  const appointments = [
    { id: 1, name: "Dr. Richard James", speciality: "General Physician", address: "57th Cross, Richmond\nCircle, Church Road, London", date: "25, July, 2024 | 8:30 PM", status: "booked", image: "/images/1.png" },
    { id: 2, name: "Dr. Richard James", speciality: "General Physician", address: "57th Cross, Richmond\nCircle, Church Road, London", date: "25, July, 2024 | 8:30 PM", status: "pending", image: "/images/2.png" },
    { id: 3, name: "Dr. Richard James", speciality: "General Physician", address: "57th Cross, Richmond\nCircle, Church Road, London", date: "25, July, 2024 | 8:30 PM", status: "paid", image: "/images/3.png" },
  ];

  return (
    <div>
        <NavBar/>
    
    <div className="container py-4">
      <h4 className="fw-bold mb-4">My Appointments</h4>
      <hr />
      {appointments.map((item) => (
        <div key={item.id} className="row align-items-center py-3 border-bottom">
          {/* Doctor Image */}
          <div className="col-3 col-md-2 col-lg-1">
            <img src={item.image} alt={item.name} className="img-fluid rounded bg-light" />
          </div>

          {/* Details */}
          <div className="col-9 col-md-7 col-lg-8">
            <h5 className="fw-bold mb-1">{item.name}</h5>
            <p className="text-muted mb-1 small">{item.speciality}</p>
            <p className="mb-1 small"><strong>Address:</strong><br />{item.address}</p>
            <p className="mb-0 small"><strong>Date & Time:</strong> {item.date}</p>
          </div>

          {/* Action Buttons */}
          <div className="col-12 col-md-3 col-lg-3 mt-3 mt-md-0 d-flex flex-md-column gap-2">
            {item.status === "pending" && <button className="btn btn-outline-primary w-100">Pay here</button>}
            {item.status === "paid" && <button className="btn btn-success w-100" disabled>Paid</button>}
            <button className="btn btn-outline-danger w-100">Cancel appointment</button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default MyAppointments;