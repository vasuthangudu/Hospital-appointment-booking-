import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./NavBar";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  return (
    <div>
      <NavBar/>
    
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8f9fa", padding: "20px" }}>
      <div className="card shadow-sm p-4 border-0" style={{ width: "100%", maxWidth: "450px", borderRadius: "10px" }}>
        
        {/* Header */}
        <h4 className="fw-bold mb-2">{isLogin ? "Login" : "Create Account"}</h4>
        <p className="text-muted mb-4">
          Please {isLogin ? "login" : "sign up"} to book appointment
        </p>

        {/* Form */}
        <form>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label text-muted">Full Name</label>
              <input 
                type="text" 
                className="form-control" 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                required 
              />
            </div>
          )}
          
          <div className="mb-3">
            <label className="form-label text-muted">Email</label>
            <input 
              type="email" 
              className="form-control" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label text-muted">Password</label>
            <input 
              type="password" 
              className="form-control" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100 py-2 mt-2">
            {isLogin ? "Login" : "Create account"}
          </button>
        </form>

        {/* Toggle Link */}
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