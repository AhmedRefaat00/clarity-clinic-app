import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './FindSpecialist.css';

interface FindSpecialistProps {
  userName: string;
}

const DOCTORS_DATA = [
  { id: 1, name: 'Dr. Layla Hassan', specialty: 'Dermatology', rating: '4.9', reviews: '124', availability: 'Today - 3:00 PM, 5:30 PM', status: 'Online now', avatar: 'LH' },
  { id: 2, name: 'Dr. Ahmed Ali', specialty: 'Cardiology', rating: '4.8', reviews: '98', availability: 'Tomorrow - 11:00 AM', status: 'Available tomorrow', avatar: 'AA' },
  { id: 3, name: 'Dr. Sarah John', specialty: 'Pediatrics', rating: '5.0', reviews: '210', availability: 'Today - 6:00 PM', status: 'Online now', avatar: 'SJ' },
  { id: 4, name: 'Dr. Mohamed Omar', specialty: 'General medicine', rating: '4.7', reviews: '85', availability: 'Monday - 9:00 AM', status: 'Available', avatar: 'MO' }
];

function FindSpecialist({ userName }: FindSpecialistProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedSpecialty, setSelectedSpecialty] = useState(searchParams.get('specialty') || 'All');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const filteredDoctors = DOCTORS_DATA.filter(doc => {
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="specialist-container">
      <nav className="navbar">
        <div className="nav-left" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">{userName ? userName.substring(0, 2).toUpperCase() : 'CC'}</div>
        </div>
        <div className="nav-center"><span className="nav-link active">Find a Specialist</span></div>
        <div className="nav-right"><button className="btn-back" onClick={() => navigate('/')}>← Back to Home</button></div>
      </nav>

      <div className="specialist-content">
        <div className="filter-sidebar">
          <h3>Filter by Specialty</h3>
          <div className="filter-buttons">
            {['All', 'Dermatology', 'Cardiology', 'General medicine', 'Pediatrics'].map((spec) => (
              <button key={spec} className={`filter-btn ${selectedSpecialty === spec ? 'active' : ''}`} onClick={() => setSelectedSpecialty(spec)}>{spec}</button>
            ))}
          </div>
        </div>

        <div className="listings-section">
          <div className="search-bar-box">
            <input type="text" placeholder="Search doctor by name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          <h2 className="results-title">Available Specialists ({filteredDoctors.length})</h2>

          <div className="doctors-grid">
            {filteredDoctors.map((doc) => (
              <div key={doc.id} className="doc-card">
                <div className="doc-header">
                  <div className="doc-avatar">{doc.avatar}</div>
                  <div className="doc-meta">
                    <h3>{doc.name}</h3>
                    <p className="spec-tag">{doc.specialty}</p>
                    <span className={`status-badge ${doc.status.toLowerCase().replace(/ /g, '-')}`}>{doc.status}</span>
                  </div>
                  <div className="doc-rating"><span>★ {doc.rating}</span><small>({doc.reviews} reviews)</small></div>
                </div>
                <div className="doc-body">
                  <p><strong>Next Availability:</strong> {doc.availability}</p>
                  <button className="btn-book" onClick={() => navigate('/booking', { state: { doctor: doc } })}>Book Appointment</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindSpecialist;