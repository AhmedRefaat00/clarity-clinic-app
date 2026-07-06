import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

interface RegisterProps {
  onRegisterSuccess: (name: string) => void;
}

function Register({ onRegisterSuccess }: RegisterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; password?: string } = {};

    if (!name) newErrors.name = 'Full name is required';
    if (!email) newErrors.email = 'Email address is required';
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onRegisterSuccess(name); 
      navigate('/specialists');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create an account</h2>
        <p className="register-subtitle">Start booking your appointments easily.</p>

        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your full name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            {errors.name && <span className="inline-error-text">⚠️ {errors.name}</span>}
          </div>
          
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="text" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            {errors.email && <span className="inline-error-text">⚠️ {errors.email}</span>}
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            {errors.password && <span className="inline-error-text">⚠️ {errors.password}</span>}
          </div>

          <button type="submit" className="btn-register-submit">Create Account</button>
        </form>

        <p className="auth-switch-text" style={{ marginTop: '20px', textAlign: 'center', color: '#6b7280' }}>
          Already have an account? <span className="switch-link" style={{ color: '#0d9488', cursor: 'pointer', fontWeight: '600' }} onClick={() => navigate('/login')}>Sign in</span>
        </p>
      </div>
    </div>
  );
}

export default Register;