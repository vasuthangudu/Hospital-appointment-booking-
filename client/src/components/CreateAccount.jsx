import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("patient");
  const [formData, setFormData] = useState({ 
    fullName: "", 
    email: "", 
    password: "", 
    speciality: "General physician", 
    experience: "1 Year" 
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const endpoint = isLogin
        ? `/api/auth/${role}/login`
        : `/api/auth/${role}/register`;

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : role === "doctor"
        ? {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            speciality: formData.speciality,
            experience: formData.experience,
          }
        : { fullName: formData.fullName, email: formData.email, password: formData.password };

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Authentication failed");
      }

      localStorage.setItem("authToken", result.token);
      localStorage.setItem("authUser", JSON.stringify(result.user));
      
      const successMsg = `${role === "patient" ? "Patient" : "Doctor"} ${isLogin ? "login" : "registration"} successful.`;
      setMessage(successMsg);

      if (role === "patient") {
        setTimeout(() => {
          navigate("/home");
        }, 500);
      } else if (role === "doctor") {
        const adminUrl = process.env.REACT_APP_ADMIN_URL || "http://localhost:3001";
        const redirectUrl = `${adminUrl}/?token=${encodeURIComponent(result.token)}&user=${encodeURIComponent(JSON.stringify(result.user))}`;
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 500);
      }
    } catch (error) {
      setMessage(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div style={{ minHeight: "calc(100vh - 80px)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8f9fa", padding: "20px" }}>
        <div className="card shadow-sm p-4 border-0" style={{ width: "100%", maxWidth: "480px", borderRadius: "10px" }}>
          <h4 className="fw-bold mb-2">{isLogin ? "Login" : "Create Account"}</h4>
          <p className="text-muted mb-3">
            Please {isLogin ? "login" : "sign up"} to access your account ({role === "patient" ? "Patient" : "Doctor"})
          </p>

          {/* Account Type Toggle */}
          <div className="mb-3">
            <label className="form-label text-muted fw-semibold">Account Type</label>
            <div className="btn-group w-100" role="group">
              <button
                type="button"
                className={`btn ${role === "patient" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setRole("patient")}
              >
                Patient
              </button>
              <button
                type="button"
                className={`btn ${role === "doctor" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setRole("doctor")}
              >
                Doctor
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-3">
                <label className="form-label text-muted">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </div>
            )}

            {!isLogin && role === "doctor" && (
              <>
                <div className="mb-3">
                  <label className="form-label text-muted">Speciality</label>
                  <select
                    name="speciality"
                    className="form-select"
                    value={formData.speciality}
                    onChange={handleChange}
                  >
                    <option value="General physician">General physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatricians">Pediatricians</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">Gastroenterologist</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label text-muted">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    className="form-control"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 4 Years"
                  />
                </div>
              </>
            )}

            <div className="mb-3">
              <label className="form-label text-muted">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-muted">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            {message ? (
              <div className={`alert ${message.includes("successful") ? "alert-success" : "alert-danger"} py-2`}>
                {message}
              </div>
            ) : null}

            <button type="submit" className="btn btn-primary w-100 py-2 mt-2" disabled={loading}>
              {loading ? "Please wait..." : isLogin ? `Login as ${role === "patient" ? "Patient" : "Doctor"}` : `Create ${role === "patient" ? "Patient" : "Doctor"} Account`}
            </button>
          </form>

          <p className="mt-3 text-center text-muted">
            {isLogin ? "Create an account? " : "Already have an account? "}
            <span
              className="text-primary fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Click here" : "Login here"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;