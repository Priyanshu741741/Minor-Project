import React from "react";

const Home = () => (
  <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold text-primary">Welcome to College Dispensary</h1>
        <p className="py-6">
          Book your appointments, consult with doctors, and stay updated with 
          the latest health alerts powered by NLP insights.
        </p>
        <a href="/appointment" className="btn btn-primary">Book Appointment</a>
      </div>
    </div>
  </div>
);

export default Home;
