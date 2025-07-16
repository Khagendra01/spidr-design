import React, { useState } from 'react';
import { User, Phone, Mail, DollarSign, Lock, Send } from 'lucide-react';
import { FormData, FormErrors } from './types/airFryerForm';
import './styles/airFryerForm.css';

export default function AirFryerForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    airFryerCost: '',
    spidrPin: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.airFryerCost.trim()) {
      newErrors.airFryerCost = 'Air fryer cost guess is required';
    } else if (parseFloat(formData.airFryerCost) <= 0) {
      newErrors.airFryerCost = 'Please enter a valid dollar amount';
    }

    if (!formData.spidrPin.trim()) {
      newErrors.spidrPin = 'Spidr PIN is required';
    } else if (formData.spidrPin.replace(/\D/g, '').length !== 16) {
      newErrors.spidrPin = 'Spidr PIN must be exactly 16 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Format Spidr PIN with dashes
    if (name === 'spidrPin') {
      const numbersOnly = value.replace(/\D/g, '');
      const formatted = numbersOnly.replace(/(\d{4})(?=\d)/g, '$1-');
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form Data:', formData);
      alert('Form submitted successfully! Check the console for your data.');
    } else {
      alert('Please fill in all required fields correctly.');
    }
  };

  return (
    <div className="air-fryer-container">
      <div className="air-fryer-form">
        <h1 className="air-fryer-title">
          Air Fryer Contest Entry
        </h1>
        
        <div>
          <div className="form-field">
            <label className="form-label">
              <User size={16} color="#a9a9a9" />
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`form-input ${errors.firstName ? 'error' : ''}`}
            />
            {errors.firstName && (
              <div className="error-message">
                {errors.firstName}
              </div>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">
              <User size={16} color="#a9a9a9" />
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`form-input ${errors.lastName ? 'error' : ''}`}
            />
            {errors.lastName && (
              <div className="error-message">
                {errors.lastName}
              </div>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">
              <Phone size={16} color="#a9a9a9" />
              Phone Number *
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`form-input ${errors.phoneNumber ? 'error' : ''}`}
            />
            {errors.phoneNumber && (
              <div className="error-message">
                {errors.phoneNumber}
              </div>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">
              <Mail size={16} color="#a9a9a9" />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && (
              <div className="error-message">
                {errors.email}
              </div>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">
              <DollarSign size={16} color="#a9a9a9" />
              Guess the Air Fryer's Cost *
            </label>
            <input
              type="number"
              name="airFryerCost"
              value={formData.airFryerCost}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="Enter dollar amount"
              className={`form-input ${errors.airFryerCost ? 'error' : ''}`}
            />
            {errors.airFryerCost && (
              <div className="error-message">
                {errors.airFryerCost}
              </div>
            )}
          </div>

          <div className="form-field last-field">
            <label className="form-label">
              <Lock size={16} color="#a9a9a9" />
              Very, Very Secret 16-digit Spidr PIN *
            </label>
            <input
              type="text"
              name="spidrPin"
              value={formData.spidrPin}
              onChange={handleChange}
              maxLength={19}
              placeholder="####-####-####-####"
              className={`form-input spidr-pin ${errors.spidrPin ? 'error' : ''}`}
            />
            {errors.spidrPin && (
              <div className="error-message">
                {errors.spidrPin}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="submit-button"
          >
            <Send size={16} />
            Submit Entry
          </button>
        </div>
      </div>
    </div>
  );
}