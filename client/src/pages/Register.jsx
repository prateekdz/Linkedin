import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import AuthCard from '../components/ui/AuthCard';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      const { data } = await authService.register(payload);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4 py-8">
      <AuthCard title="Create account" subtitle="Join the network">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input id="firstName" label="First name" value={formData.firstName} onChange={handleChange} placeholder="First" required />
            <Input id="lastName" label="Last name" value={formData.lastName} onChange={handleChange} placeholder="Last" required />
          </div>

          <Input id="email" label="Email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required autoComplete="email" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input id="password" label="Password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required autoComplete="new-password" />
            <Input id="confirmPassword" label="Confirm" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm" required />
          </div>

          <Button type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </AuthCard>
    </div>
  );
};

export default Register;
