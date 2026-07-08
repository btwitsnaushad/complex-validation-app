import React, { useState, useEffect } from 'react';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    accountNumber: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [focusedField, setFocusedField] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

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
        newErrors.accountNumber = "Account number is required";
      } else if (!accountRegex.test(formData.accountNumber)) {
        newErrors.accountNumber = "Account number must be exactly 10 digits.";
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
        setShowSuccess(true);
        setSubmittedData({ ...formData }); 
      }, 2500);
    }
  };

  const handleReset = () => {
    setFormData({ username: '', accountNumber: '' });
    setCurrentStep(1);
    setShowSuccess(false);
    setSubmittedData(null);
  };

  // Input styling updated with the new soft glow shadow
  const getInputStyle = (fieldName) => {
    const hasError = errors[fieldName];
    const isFocused = focusedField === fieldName;
    const isDisabled = isSubmitting;

    return {
      display: 'block', 
      width: '100%', 
      boxSizing: 'border-box', 
      padding: '0 14px', 
      height: '48px', 
      marginTop: '8px', 
      border: hasError ? '2px solid #ef4444' : isFocused ? '1px solid #3b82f6' : '1px solid #cbd5e1',
      // Focus shadow updated to requested exact rgba values
      boxShadow: (isFocused && !hasError && !isDisabled) ? '0 0 0 4px rgba(59,130,246,0.15)' : 'none',
      outline: 'none', 
      borderRadius: '8px', 
      fontSize: '16px',
      color: '#0f172a',
      backgroundColor: isDisabled ? '#f3f4f6' : '#ffffff', 
      cursor: isDisabled ? 'not-allowed' : 'text',
      transition: 'all 0.25s ease'
    };
  };

  // Button base styles updated with 0.25s transition
  const buttonBaseStyle = {
    padding: '0 32px',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '16px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '48px', 
    transition: 'all 0.25s ease', 
    border: 'none',
    cursor: 'pointer'
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: "'Inter', 'Poppins', sans-serif" }}>
      
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        paddingTop: '40px', 
        paddingBottom: '64px', 
        paddingLeft: '16px', 
        paddingRight: '16px' 
      }}>
        
        <h1 style={{ marginBottom: '12px', color: '#0f172a', textAlign: 'center', fontSize: '32px', fontWeight: '700', letterSpacing: '-0.5px' }}>
          Complex Validation Hooks
        </h1>
        
        <p style={{ marginBottom: '32px', color: '#64748b', textAlign: 'center', fontSize: '16px', maxWidth: '300px', lineHeight: '1.6' }}>
          A simple multi-step form with custom React hooks, real-time validation and async submission.
        </p>

        {!showSuccess && (
          <div style={{ 
            backgroundColor: '#ffffff', 
            padding: '32px', 
            border: '1px solid #eef2f7', 
            borderRadius: '18px', 
            // Shadow updated to be softer and wider
            boxShadow: '0 20px 50px rgba(15,23,42,0.12)', 
            maxWidth: '430px', 
            width: '100%',
            boxSizing: 'border-box',
            opacity: animate ? 1 : 0,
            transform: animate ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s ease'
          }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', gap: '8px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: currentStep >= 1 ? '#3b82f6' : '#f1f5f9',
                color: currentStep >= 1 ? '#ffffff' : '#64748b',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}>1</div>
              
              <div style={{ 
                height: '4px', width: '40px', 
                backgroundColor: currentStep === 2 ? '#3b82f6' : '#e2e8f0', 
                borderRadius: '2px', 
                transition: 'all 0.3s ease' 
              }}></div>
              
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: currentStep === 2 ? '#3b82f6' : '#f1f5f9',
                color: currentStep === 2 ? '#ffffff' : '#64748b',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}>2</div>
            </div>
            
            {currentStep === 1 && (
              <div>
                <label style={{ display: 'block', marginBottom: '16px', fontWeight: '600', color: '#0f172a' }}>
                  Username
                  <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    onFocus={() => setFocusedField('username')} 
                    onBlur={() => setFocusedField(null)} 
                    style={getInputStyle('username')}
                    aria-label="Username input" 
                    placeholder="Enter username"
                    disabled={isSubmitting}
                  />
                  {errors.username && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'block' }}>{errors.username}</span>}
                </label>
                <button 
                  onClick={nextStep} 
                  disabled={isSubmitting}
                  style={{ 
                    ...buttonBaseStyle,
                    backgroundColor: '#0f172a', 
                    color: '#ffffff', 
                    marginTop: '24px',
                    width: '100%', 
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                  aria-label="Proceed to the next step"
                  onMouseOver={(e) => { 
                    if(!isSubmitting) { 
                      e.currentTarget.style.backgroundColor = '#111827'; 
                      e.currentTarget.style.transform = 'translateY(-2px)'; 
                    } 
                  }}
                  onMouseOut={(e) => { 
                    if(!isSubmitting) { 
                      e.currentTarget.style.backgroundColor = '#0f172a'; 
                      e.currentTarget.style.transform = 'translateY(0)'; 
                    } 
                  }}
                >
                  Next
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                 <label style={{ display: 'block', marginBottom: '16px', fontWeight: '600', color: '#0f172a' }}>
                  Account Number
                  <input 
                    type="text" 
                    name="accountNumber" 
                    value={formData.accountNumber} 
                    onChange={handleChange}
                    onFocus={() => setFocusedField('accountNumber')} 
                    onBlur={() => setFocusedField(null)} 
                    style={getInputStyle('accountNumber')}
                    aria-label="Account Number input"
                    placeholder="Enter 10 digit account number"
                    disabled={isSubmitting} 
                  />
                  {errors.accountNumber && <span style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'block' }}>{errors.accountNumber}</span>}
                </label>
                <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
                  
                  <button 
                    onClick={prevStep} 
                    disabled={isSubmitting}
                    style={{ 
                      ...buttonBaseStyle,
                      flex: 1, 
                      backgroundColor: '#ffffff', 
                      color: '#0f172a', 
                      border: '1px solid #94a3b8', 
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                    aria-label="Navigate back to the previous step"
                    onMouseOver={(e) => { 
                      if(!isSubmitting) { 
                        e.currentTarget.style.backgroundColor = '#f1f5f9'; 
                        e.currentTarget.style.transform = 'translateY(-2px)'; 
                      } 
                    }}
                    onMouseOut={(e) => { 
                      if(!isSubmitting) { 
                        e.currentTarget.style.backgroundColor = '#ffffff'; 
                        e.currentTarget.style.transform = 'translateY(0)'; 
                      } 
                    }}
                  >
                    Back
                  </button>
                  
                  <button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    style={{ 
                      ...buttonBaseStyle,
                      flex: 1, 
                      backgroundColor: '#0f172a', 
                      color: '#ffffff', 
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                    aria-label="Submit validation form"
                    onMouseOver={(e) => { 
                      if(!isSubmitting) { 
                        e.currentTarget.style.backgroundColor = '#111827'; 
                        e.currentTarget.style.transform = 'translateY(-2px)'; 
                      } 
                    }}
                    onMouseOut={(e) => { 
                      if(!isSubmitting) { 
                        e.currentTarget.style.backgroundColor = '#0f172a'; 
                        e.currentTarget.style.transform = 'translateY(0)'; 
                      } 
                    }}
                  >
                    {isSubmitting ? 'Processing...' : 'Submit'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Updated Premium Success Card */}
        {showSuccess && submittedData && (
          <div style={{
            marginTop: '20px', 
            padding: '40px 32px', 
            backgroundColor: '#f0fdf4', // Halka green background applied to the whole card
            borderRadius: '18px', 
            border: '1px solid #bbf7d0',
            width: '100%',
            maxWidth: '430px',
            boxSizing: 'border-box',
            boxShadow: '0 20px 50px rgba(15,23,42,0.12)', 
            transition: 'all 0.3s ease',
            textAlign: 'center',
            opacity: animate ? 1 : 0,
            transform: animate ? 'translateY(0)' : 'translateY(16px)'
          }}>
            
            {/* Green Circle Icon */}
            <div style={{ 
              width: '64px', 
              height: '64px', 
              backgroundColor: '#dcfce7', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 24px auto' 
            }}>
              <span style={{ fontSize: '32px', color: '#16a34a', lineHeight: '1' }}>✔</span>
            </div>
            
            {/* Bada Success Text */}
            <h2 style={{ 
              fontWeight: '700', 
              margin: '0 0 12px 0', 
              color: '#166534', 
              fontSize: '28px' 
            }}>
              Success
            </h2>
            
            <p style={{ margin: '0 0 32px 0', fontSize: '16px', color: '#15803d', lineHeight: '1.6' }}>
              Your information has been submitted successfully.
            </p>
            
            <button
              onClick={handleReset}
              style={{
                ...buttonBaseStyle,
                width: '100%',
                backgroundColor: '#166534', 
                color: '#ffffff',
                border: '1px solid #14532d'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#14532d';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#166534';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start New Form
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;