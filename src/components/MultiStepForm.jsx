import React, { useState } from 'react';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    accountNumber: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State to manage the visibility of the success message and store submitted data
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Security constraint: Sanitize input to prevent XSS attacks
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
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
    
    // Hide success message if user starts typing a new entry
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
      
      // Simulating a slow network connection (3G) as per requirements
      setTimeout(() => {
        console.log("[Analytics] User interacted with Complex Validation Hooks");
        
        setIsSubmitting(false); 
        setShowSuccess(true);
        
        // Store data for displaying in the success message
        setSubmittedData({ ...formData }); 
        
        // Reset form fields and navigate back to step 1
        setFormData({ username: '', accountNumber: '' });
        setCurrentStep(1);

        // Auto-hide the success message after 7 seconds
        setTimeout(() => {
            setShowSuccess(false);
            setSubmittedData(null);
        }, 7000);
      }, 2500);
    }
  };

  // Dynamic styling for input fields based on validation errors
  const getInputStyle = (fieldName) => ({
    display: 'block', 
    width: '100%', 
    boxSizing: 'border-box', 
    padding: '16px', 
    marginTop: '8px', 
    border: errors[fieldName] ? '2px solid #ef4444' : '1px solid #d1d5db',
    borderRadius: '8px', 
    fontSize: '16px',
    backgroundColor: '#f9fafb'
  });

  // Base styles for buttons to ensure consistent height and padding
  const buttonBaseStyle = {
    padding: '16px 32px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '16px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '56px', // Fixed height to prevent layout shifts
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '64px' }}>
      
      <h1 style={{ marginBottom: '24px', color: '#111827', textAlign: 'center', fontSize: '32px' }}>
        Complex Validation Hooks
      </h1>

      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '32px', 
        border: '1px solid #e5e7eb', 
        borderRadius: '12px', 
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)', 
        maxWidth: '450px', 
        width: '100%',
        boxSizing: 'border-box'
      }}>
        
        {/* Step Progress Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', gap: '8px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            backgroundColor: currentStep >= 1 ? '#2563eb' : '#e5e7eb',
            color: currentStep >= 1 ? '#fff' : '#6b7280',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
          }}>1</div>
          <div style={{ height: '3px', width: '40px', backgroundColor: currentStep === 2 ? '#2563eb' : '#e5e7eb', borderRadius: '2px' }}></div>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            backgroundColor: currentStep === 2 ? '#2563eb' : '#e5e7eb',
            color: currentStep === 2 ? '#fff' : '#6b7280',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
          }}>2</div>
        </div>

        <h2 style={{ marginBottom: '24px', color: '#111827', fontSize: '24px', textAlign: 'center' }}>
          Step {currentStep} of 2
        </h2>
        
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
                placeholder="Enter username"
              />
              {errors.username && <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px', display: 'block' }}>{errors.username}</span>}
            </label>
            <button 
              onClick={nextStep} 
              style={{ 
                ...buttonBaseStyle,
                backgroundColor: '#1f2937', 
                color: '#ffffff', 
                border: 'none', 
                marginTop: '16px',
                width: '100%', 
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
                  ...buttonBaseStyle,
                  flex: 1, 
                  backgroundColor: '#f3f4f6', 
                  color: '#374151', 
                  border: '1px solid #d1d5db', 
                  opacity: isSubmitting ? 0.5 : 1,
                }}
                aria-label="Navigate back to the previous step"
              >
                Back
              </button>
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                style={{ 
                  ...buttonBaseStyle,
                  flex: 1, 
                  backgroundColor: '#1f2937', 
                  color: '#ffffff', 
                  border: 'none', 
                  opacity: isSubmitting ? 0.7 : 1,
                }}
                aria-label="Submit validation form"
              >
                {isSubmitting ? 'Processing...' : 'Submit'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Success Message Rendering */}
      {showSuccess && submittedData && (
        <div style={{
          marginTop: '24px',
          padding: '24px',
          backgroundColor: '#d1fae5',
          color: '#065f46',
          borderRadius: '8px',
          border: '1px solid #34d399',
          width: '100%',
          maxWidth: '450px',
          textAlign: 'left',
          boxSizing: 'border-box',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '16px', textAlign: 'center', fontSize: '18px' }}>
            ✔ Form Submitted Successfully
          </div>
          <div style={{ fontSize: '16px', lineHeight: '1.8' }}>
            <strong>Username :</strong> {submittedData.username} <br />
            {/* Account number masking: 8 asterisks followed by the last 2 digits */}
            <strong>Account :</strong> {"*".repeat(8) + submittedData.accountNumber.slice(-2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;