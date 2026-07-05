import React, { useState } from 'react';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    accountNumber: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Nayi State: Custom Success Message dikhane ke liye
  const [showSuccess, setShowSuccess] = useState(false);

  const sanitizeInput = (input) => {
    return input.replace(/</g, "").replace(/>/g, "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: sanitizedValue
    }));
    
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
    // Agar user naya data type karna shuru kare, toh success message hata dein
    if (showSuccess) {
      setShowSuccess(false);
    }
  };

  const validateStep = () => {
    let newErrors = {};

    if (currentStep === 1) {
      const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
      if (!formData.username) {
        newErrors.username = "Username is required";
      } else if (!usernameRegex.test(formData.username)) {
        newErrors.username = "Username must be 3-15 alphanumeric characters";
      }
    } else if (currentStep === 2) {
      const accountRegex = /^\d{10}$/;
      if (!formData.accountNumber) {
        newErrors.accountNumber = "Account Number is required";
      } else if (!accountRegex.test(formData.accountNumber)) {
        newErrors.accountNumber = "Account Number must be exactly 10 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    setErrors({}); 
  };

  const handleSubmit = () => {
    if (validateStep()) {
      setIsSubmitting(true);
      setShowSuccess(false); 
      
      setTimeout(() => {
        console.log("[Analytics] User interacted with Complex Validation Hooks");
        
        setIsSubmitting(false); 
        setShowSuccess(true); // Alert ki jagah green message true kiya
        
        setFormData({ username: '', accountNumber: '' });
        setCurrentStep(1);

        // Optional: 5 second baad success message apne aap gayab ho jayega
        setTimeout(() => setShowSuccess(false), 5000);
      }, 2500);
    }
  };

  const getInputStyle = (fieldName) => ({
    display: 'block', 
    width: '100%', 
    boxSizing: 'border-box', 
    padding: '16px', 
    marginTop: '8px', 
    border: errors[fieldName] ? '2px solid #ef4444' : '1px solid #d1d5db',
    borderRadius: '6px', 
    outline: 'none',
    fontSize: '16px',
    backgroundColor: '#f9fafb'
  });

  return (
    // Main Wrapper jisme sab kuch center rahega
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '64px' }}>
      
      {/* 1. Centered Heading */}
      <h1 style={{ marginBottom: '24px', color: '#111827', textAlign: 'center', fontSize: '32px' }}>
        Complex Validation Hooks
      </h1>

      {/* 2. Card with max-width: 500px and width: 100% */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '32px', 
        border: '1px solid #e5e7eb', 
        borderRadius: '12px', 
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)', 
        maxWidth: '500px', 
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ marginBottom: '32px', color: '#111827', fontSize: '24px' }}>Step {currentStep} of 2</h2>
        
        {currentStep === 1 && (
          <div>
            <label style={{ display: 'block', marginBottom: '16px', fontWeight: '600', color: '#374151' }}>
              Username:
              <input 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                style={getInputStyle('username')}
                aria-label="Username input" 
                // 3. Simple Placeholder Added
                placeholder="Enter username"
              />
              {errors.username && <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px', display: 'block' }}>{errors.username}</span>}
            </label>
            <button 
              onClick={nextStep} 
              style={{ 
                padding: '16px 32px', 
                backgroundColor: '#1f2937', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                marginTop: '16px',
                width: '100%', 
                fontWeight: '600',
                fontSize: '16px'
              }}
              aria-label="Proceed to the next step"
            >
              Next
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div>
             <label style={{ display: 'block', marginBottom: '16px', fontWeight: '600', color: '#374151' }}>
              Account Number (10 Digits):
              <input 
                type="text" 
                name="accountNumber" 
                value={formData.accountNumber} 
                onChange={handleChange} 
                style={getInputStyle('accountNumber')}
                aria-label="Account Number input"
                placeholder="e.g. 1234567890"
              />
              {errors.accountNumber && <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px', display: 'block' }}>{errors.accountNumber}</span>}
            </label>
            <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
              <button 
                onClick={prevStep} 
                disabled={isSubmitting}
                style={{ 
                  flex: 1, 
                  padding: '16px 32px', 
                  backgroundColor: '#f3f4f6', 
                  color: '#374151', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '6px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer', 
                  opacity: isSubmitting ? 0.5 : 1,
                  fontWeight: '600',
                  fontSize: '16px'
                }}
                aria-label="Navigate back to the previous step"
              >
                Back
              </button>
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                style={{ 
                  flex: 1, 
                  padding: '16px 32px', 
                  backgroundColor: '#1f2937', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '6px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer', 
                  opacity: isSubmitting ? 0.7 : 1,
                  fontWeight: '600',
                  fontSize: '16px'
                }}
                aria-label="Submit validation form"
              >
                {isSubmitting ? 'Processing (3G)...' : 'Submit'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. Beautiful Green Success Message */}
      {showSuccess && (
        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#d1fae5',
          color: '#065f46',
          borderRadius: '6px',
          border: '1px solid #34d399',
          width: '100%',
          maxWidth: '500px',
          textAlign: 'center',
          fontWeight: '600',
          boxSizing: 'border-box',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          ✅ Form submitted successfully!
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;