import React from 'react';
import './Landing.css';

interface LandingProps {
  userName: string;
  onNavigate: (page: 'login' | 'register') => void;
}

function Landing({ userName, onNavigate }: LandingProps) {
  return (
    <div className="landing-container">
      {/* 1. Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          {/* تم إزالة علامة الـ + وإظهار الاسم مباشرة لوحده بنظافة */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {userName && <span style={{ fontWeight: 'bold', color: '#111827', fontSize: '0.95rem' }}>{userName}</span>}
          </div>
        </div>
        <div className="nav-center">
          <a href="#find-care" className="nav-link active">Find care</a>
          <a href="#how-it-works" className="nav-link">How it works</a>
          <a href="#for-clinics" className="nav-link">For clinics</a>
        </div>
        <div className="nav-right">
          <button className="btn-signin" onClick={() => onNavigate('login')}>Sign in</button>
          <button className="btn-create" onClick={() => onNavigate('register')}>Create account</button>
        </div>
      </nav>

      {/* 2. Main Hero Content */}
      <div className="hero-section">
        {/* Left Side Content */}
        <div className="hero-left">
          <span className="badge">● Same day appointments</span>
          <h1 className="hero-title">Care, made calm.</h1>
          <p className="hero-description">
            Find the right doctor, see real availability, and book in under a minute — in clinic or online. No phone calls, no waiting on hold.
          </p>

          {/* Search Box */}
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="e.g. dermatologist, knee pain..." />
            <button className="btn-search">Search</button>
          </div>

          {/* Tags */}
          <div className="tags-container">
            <span className="tag">Dermatology</span>
            <span className="tag">Cardiology</span>
            <span className="tag">General medicine</span>
            <span className="tag">Pediatrics</span>
          </div>
        </div>

        {/* Right Side Visuals */}
        <div className="hero-right-card">
          <div className="image-placeholder">
            <span className="placeholder-text">clinic / care imagery</span>
          </div>
          <div className="doctor-info-card">
            <div className="doctor-profile">
              <div className="avatar">LH</div>
              <div className="doctor-details">
                <h4>Dr. Layla Hassan</h4>
                <p>Dermatologist • online now</p>
              </div>
            </div>
            <div className="rating">★ 4.9</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;