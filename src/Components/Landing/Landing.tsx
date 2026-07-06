import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

interface LandingProps {
  userName: string;
  onLogout: () => void;
}

function Landing({ userName, onLogout }: LandingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    navigate(`/specialists?search=${encodeURIComponent(searchQuery)}&specialty=All`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className="landing-container">
      {/* 1. Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="logo-icon">CC</div>
            <span style={{ fontWeight: 'bold', color: '#0d9488', fontSize: '1.2rem' }}>Clarity Clinic</span>
          </div>
        </div>
        <div className="nav-center">
          <a href="#find-care" className="nav-link active" onClick={(e) => { e.preventDefault(); navigate('/specialists?search=&specialty=All'); }}>Find care</a>
          <a href="#how-it-works" className="nav-link">How it works</a>
          <a href="#for-clinics" className="nav-link">For clinics</a>
        </div>
        <div className="nav-right">
          {userName ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div className="avatar" style={{ width: '30px', height: '30px', fontSize: '0.8rem' }}>
                  {userName.substring(0, 2).toUpperCase()}
                </div>
                <span style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.95rem' }}>{userName}</span>
              </div>
              <button className="btn-signin" onClick={onLogout}>Sign out</button>
            </div>
          ) : (
            <>
              <button className="btn-signin" onClick={() => navigate('/login')}>Sign in</button>
              <button className="btn-create" onClick={() => navigate('/register')}>Create account</button>
            </>
          )}
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
            <input 
              type="text" 
              placeholder="e.g. dermatologist, Sarah..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn-search" onClick={handleSearchSubmit}>Search</button>
          </div>

          {/* Tags */}
          <div className="tags-container">
            {['Dermatology', 'Cardiology', 'General medicine', 'Pediatrics'].map((spec) => (
              <span key={spec} className="tag" onClick={() => navigate(`/specialists?search=&specialty=${encodeURIComponent(spec)}`)}>{spec}</span>
            ))}
          </div>
        </div>

        {/* Right Side Visuals */}
        <div className="hero-right-card">
          <div style={{ width: '100%', height: '280px', overflow: 'hidden', borderRadius: '12px' }}>
            <img 
              src="/clinic_hero.png" 
              alt="Clarity Clinic Hero illustration" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
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