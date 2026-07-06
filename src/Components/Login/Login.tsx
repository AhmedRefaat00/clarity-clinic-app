import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

interface LoginProps {
  onLoginSuccess: (name: string) => void;
}

function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email) newErrors.email = 'Email address is required';
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Extract a nice name from email address if userName is not pre-populated
      const computedName = email.split('@')[0];
      const capitalizedName = computedName.charAt(0).toUpperCase() + computedName.slice(1);
      onLoginSuccess(capitalizedName); 
      navigate('/specialists');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome back</h2>
        <p className="login-subtitle">Please enter your details to sign in.</p>

        <form onSubmit={handleLogin} className="login-form">
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

          <button type="submit" className="btn-login-submit">Sign In</button>
        </form>

        <p className="auth-switch-text" style={{ marginTop: '20px', textAlign: 'center', color: '#6b7280' }}>
          Don't have an account? <span className="switch-link" style={{ color: '#0d9488', cursor: 'pointer', fontWeight: '600' }} onClick={() => navigate('/register')}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;