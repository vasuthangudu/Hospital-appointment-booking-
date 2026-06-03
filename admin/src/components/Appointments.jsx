import React, { useEffect } from "react";

const Appointments = () => {
  const data = [
    {
      id: 1,
      patient: "Richard James",
      age: 28,
      department: "Cardiology",
      date: "24th July, 2024, 10:AM",
      doctor: "Dr. Richard James",
      fee: "$50",
    },
    {
      id: 2,
      patient: "John David",
      age: 30,
      department: "Neurology",
      date: "25th July, 2024, 11:AM",
      doctor: "Dr. Sarah Wilson",
      fee: "$60",
    },
  ];

  useEffect(() => {
    const patients = data.map((item) => ({
      name: item.patient,
      age: item.age,
      gender: "Male",
      phone: "9876543210",
    }));

    localStorage.setItem(
      "patients",
      JSON.stringify(patients)
    );
  }, []);

  return (
    <div className="p-4">
      <h5 className="mb-3">All Appointments</h5>

      <div className="card">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Department</th>
                <th>Age</th>
                <th>Date & Time</th>
                <th>Doctor</th>
                <th>Fees</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.patient}</td>
                  <td>{item.department}</td>
                  <td>{item.age}</td>
                  <td>{item.date}</td>
                  <td>{item.doctor}</td>
                  <td>{item.fee}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointments;