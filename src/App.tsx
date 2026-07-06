import { useState } from 'react';
import Landing from './Components/Landing/Landing';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import FindSpecialist from './Components/FindSpecialist/FindSpecialist';
import Booking from './Components/Booking/Booking';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  avatar: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'register' | 'specialist' | 'booking' | 'success'>('landing');
  const [userName, setUserName] = useState<string>(''); 
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  return (
    <>
      {currentPage === 'landing' && (
        <div onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains('btn-search') || target.closest('.btn-search')) {
            setCurrentPage('specialist');
          }
        }}>
          <Landing userName={userName} onNavigate={(page) => setCurrentPage(page)} />
        </div>
      )}
      
      {currentPage === 'login' && (
        <Login 
          userName={userName}
          onLoginSuccess={(name) => {
            setUserName(name || 'Amr'); 
            setCurrentPage('specialist'); 
          }}
          onSwitchToRegister={() => setCurrentPage('register')}
        />
      )}
      
      {currentPage === 'register' && (
        <Register 
          userName={userName}
          onRegisterSuccess={(name) => {
            setUserName(name); 
            setCurrentPage('specialist'); 
          }} 
          onSwitchToLogin={() => setCurrentPage('login')} 
        />
      )}

      {currentPage === 'specialist' && (
        <FindSpecialist 
          userName={userName} 
          onBackToHome={() => setCurrentPage('landing')}
          onSelectDoctor={(doctor) => {
            setSelectedDoctor(doctor);
            setCurrentPage('booking');
          }}
        />
      )}

      {currentPage === 'booking' && (
        <Booking 
          userName={userName}
          doctor={selectedDoctor} 
          onBackToDocs={() => setCurrentPage('specialist')} 
          onConfirmBooking={() => {
            setCurrentPage('success'); 
          }} 
        />
      )}

      {currentPage === 'success' && (
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f7f6', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', width: '100%', maxWidth: '440px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
            <div style={{ backgroundColor: '#d1fae5', color: '#10b981', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 'bold', margin: '0 auto 20px auto' }}>✓</div>
            <h2 style={{ color: '#111827', fontSize: '1.5rem', marginBottom: '10px', fontWeight: '700' }}>Appointment Confirmed!</h2>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '24px' }}>
              Thank you <strong>{userName || 'Amr'}</strong>. Your appointment with <strong>{selectedDoctor?.name}</strong> has been successfully booked.
            </p>
            <button 
              onClick={() => setCurrentPage('landing')} 
              style={{ backgroundColor: '#0d9488', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', width: '100%', cursor: 'pointer', fontSize: '1rem' }}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;