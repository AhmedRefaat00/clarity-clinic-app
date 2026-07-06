import { useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import FindSpecialist from './Components/FindSpecialist/FindSpecialist';
import Booking from './Components/Booking/Booking';

function SuccessPage({ userName }: { userName: string }) {
  const location = useLocation();
  const navigate = useNavigate();
  const doctorName = location.state?.doctorName;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f7f6', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', width: '100%', maxWidth: '440px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
        <div style={{ backgroundColor: '#d1fae5', color: '#10b981', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 'bold', margin: '0 auto 20px auto' }}>✓</div>
        <h2 style={{ color: '#111827', fontSize: '1.5rem', marginBottom: '10px', fontWeight: '700' }}>Appointment Confirmed!</h2>
        <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '24px' }}>
          Thank you <strong>{userName || 'Amr'}</strong>. {doctorName ? <>Your appointment with <strong>{doctorName}</strong> has been successfully booked.</> : <>Your appointment has been successfully booked.</>}
        </p>
        <button 
          onClick={() => navigate('/')} 
          style={{ backgroundColor: '#0d9488', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', width: '100%', cursor: 'pointer', fontSize: '1rem' }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

function App() {
  const [userName, setUserName] = useState<string>(() => localStorage.getItem('userName') || '');

  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    localStorage.setItem('userName', name);
  };

  const handleLogout = () => {
    setUserName('');
    localStorage.removeItem('userName');
  };

  return (
    <Routes>
      <Route path="/" element={<Landing userName={userName} onLogout={handleLogout} />} />
      <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/register" element={<Register onRegisterSuccess={handleLoginSuccess} />} />
      <Route path="/specialists" element={<FindSpecialist userName={userName} />} />
      <Route path="/booking" element={<Booking userName={userName} />} />
      <Route path="/success" element={<SuccessPage userName={userName} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;