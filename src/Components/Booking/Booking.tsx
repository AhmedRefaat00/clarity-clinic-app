import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Booking.css';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  avatar: string;
}

interface BookingProps {
  userName: string;
}

function Booking({ userName }: BookingProps) {
  const [selectedTime, setSelectedTime] = useState('');
  const [patientNote, setPatientNote] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const doctor = location.state?.doctor as Doctor | undefined;

  const availableTimes = ['03:00 PM', '04:30 PM', '05:30 PM', '07:00 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime) {
      alert('Please select an appointment time!');
      return;
    }
    navigate('/success', { state: { doctorName: doctor?.name } });
  };

  // لو مفيش دكتور مبعوت لسبب ما (صيانة احترازية للـ TypeScript)
  if (!doctor) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>No doctor selected. <button onClick={() => navigate('/specialists')}>Go Back</button></div>;
  }

  return (
    <div className="booking-container">
      <nav className="navbar">
        <div className="nav-left" onClick={() => navigate('/specialists')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">{userName ? userName.substring(0, 2).toUpperCase() : 'CC'}</div>
        </div>
        <div className="nav-center"><span className="nav-link active">Book Appointment</span></div>
        <div className="nav-right"><button className="btn-back" onClick={() => navigate('/specialists')}>← Back</button></div>
      </nav>

      <div className="booking-content">
        <div className="booking-card">
          <h2 className="booking-title">Confirm Your Visit</h2>
          <p className="booking-subtitle">Review clinic details and select your preferred slot.</p>

          {/* عرض بيانات الدكتور المختار ديناميكياً */}
          <div className="mini-doc-card">
            <div className="mini-avatar">{doctor.avatar}</div>
            <div className="mini-info">
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty} Specialist</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="time-picker-group">
              <label>Available Slots for Today</label>
              <div className="slots-grid">
                {availableTimes.map((time) => (
                  <button
                    type="button"
                    key={time}
                    className={`slot-box ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="notes-group">
              <label>Reason for Visit / Notes (Optional)</label>
              <textarea 
                placeholder="Briefly describe your symptoms or reason for the visit..."
                value={patientNote}
                onChange={(e) => setPatientNote(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-confirm-submit">Confirm and Book</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Booking;