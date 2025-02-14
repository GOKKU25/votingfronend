import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Open = () => {
  const [category, setCategory] = useState('');
  const [numOptions, setNumOptions] = useState(2);
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Check if the category is provided
    if (!category.trim()) {
      setError('Category is required');
      return;
    }

    // Check if all options are filled
    if (options.some(option => !option.trim())) {
      setError('All options must be filled');
      return;
    }

    const votingData = { category, options };

    console.log('Sending voting data:', votingData);  // Debugging log

    try {
      // Send the voting data to the backend
      const response = await fetch('http://localhost:5000/api/open-voting/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(votingData),
      });

      console.log('Response from server:', response);  // Log server response

      if (!response.ok) {
        throw new Error('Failed to save open voting data');
      }

      const result = await response.json();

      // After successful submission, set a success message
      setSuccessMessage('Voting created successfully!');

      // Navigate to the QR code page with the result data
      navigate('/qr-code', { state: { votingData: result } });
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  const handleNumOptionsChange = (e) => {
    const num = e.target.value;
    setNumOptions(num);
    setOptions(new Array(Number(num)).fill(''));
  };

  return (
    <div style={{
      minHeight: '30vh',
      background: 'linear-gradient(45deg,rgb(255, 255, 255),rgb(246, 247, 255))',
      padding: '4rem 1rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: '1200px',
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}>
        <div style={{
          width: '50%',
          padding: '2rem',
          borderRight: '1px solid #e5e7eb',
          overflow: 'auto',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '900',
            color: '#1f2937',
            marginBottom: '1.5rem',
          }}>
            Create an Open Voting
          </h2>

          {/* Display error if there's any */}
          {error && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}

          {/* Display success message */}
          {successMessage && <div style={{ color: '#10b981', marginBottom: '1rem' }}>{successMessage}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label htmlFor="category" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#4b5563' }}>
                Voting Category
              </label>
              <input
                id="category"
                type="text"
                placeholder="Enter voting category"
                value={category}
                onChange={handleCategoryChange}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="numOptions" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#4b5563' }}>
                Number of Options
              </label>
              <input
                id="numOptions"
                type="number"
                value={numOptions}
                onChange={handleNumOptionsChange}
                min="2"
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {options.map((option, index) => (
                <div key={index}>
                  <label htmlFor={`option-${index}`} style={{ fontSize: '1.125rem', fontWeight: '600', color: '#4b5563' }}>
                    Option {index + 1}
                  </label>
                  <input
                    id={`option-${index}`}
                    type="text"
                    placeholder={`Enter option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      outline: 'none',
                    }}
                    required
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#00796b',
                color: 'white',
                fontWeight: '600',
                padding: '1rem',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Generate QR Code
            </button>
          </form>
        </div>

        <div style={{
          width: '50%',
          padding: '2rem',
          backgroundColor: '#f9fafb',
          overflow: 'auto',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '900',
            color: '#1f2937',
            marginBottom: '1.5rem',
          }}>
            Generated Voting Details
          </h2>

          <p style={{ color: '#6b7280' }}>
            Fill out the form and click "Generate QR Code" to navigate to the next page and view the generated voting QR.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Open;
