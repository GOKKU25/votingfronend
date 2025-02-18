

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddVoting = () => {
  const [category, setCategory] = useState("");
  const [numOptions, setNumOptions] = useState(2);
  const [options, setOptions] = useState(["", ""]);
  const [createdVoting, setCreatedVoting] = useState({ category: "", options: [] });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);

    setCreatedVoting((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);

    setCreatedVoting((prev) => ({
      ...prev,
      category: newCategory,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!category.trim()) {
      setError("Category is required");
      return;
    }

    if (options.some((option) => !option.trim())) {
      setError("All options must be filled");
      return;
    }

    try {
      const response = await axios.post("https://votingbackend-favz.onrender.com/api/voting/create", {
        category,
        options,
      });

      if (response && response.data) {
        setSuccessMessage("Voting successfully created! You can see it below.");
        setCreatedVoting(response.data);
        setCategory("");
        setNumOptions(2);
        setOptions(["", ""]);
        navigate("/adminvoting");
      } else {
        setError("Unexpected response format.");
      }
    } catch (error) {
      setError("Failed to create voting. Please try again.");
    }
  };

  const handleNumOptionsChange = (e) => {
    const num = e.target.value;
    setNumOptions(num);
    setOptions(new Array(Number(num)).fill(""));

    setCreatedVoting((prev) => ({
      ...prev,
      options: new Array(Number(num)).fill(""),
    }));
  };

  useEffect(() => {
    console.log("Created Voting updated:", createdVoting);
  }, [createdVoting]);

  return (
    <div className="container">
      <div className="card">
        <div className="form-container">
          <h2>Create a Voting</h2>

          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="category">Voting Category</label>
            <input id="category" type="text" placeholder="Category Name" value={category} onChange={handleCategoryChange} required />

            <label htmlFor="numOptions">Number of Options</label>
            <input type="number" id="numOptions" value={numOptions} onChange={handleNumOptionsChange} min={2} max={10} />

            {Array.from({ length: numOptions }, (_, index) => (
              <div key={index}>
                <label htmlFor={`option${index}`}>Option {index + 1}</label>
                <input
                  id={`option${index}`}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={options[index]}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
              </div>
            ))}

            <button type="submit">Create Voting</button>
          </form>
        </div>

        <div className="details-container">
          {createdVoting.category || createdVoting.options.length > 0 ? (
            <div className="details">
              <h3>Voting Details</h3>
              <h4>Category: {createdVoting.category}</h4>
              <ul>
                {createdVoting.options.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="details-placeholder">Enter data to show voting details</div>
          )}
        </div>
      </div>

      {/* Styles */}
      <style>
        {`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem 1rem;
          background: linear-gradient(45deg, #ffffff, #ffffff);
          min-height: 90vh;
        }

        .card {
          display: flex;
          flex-direction: row;
          width: 100%;
          max-width: 1200px;
          background: white;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .form-container, .details-container {
          width: 50%;
          padding: 2rem;
          border-right: 1px solid #e5e7eb;
          overflow: auto;
        }

        h2, h3, h4 {
          color: #1f2937;
        }

        .error-message {
          color: #ef4444;
          margin-bottom: 1rem;
        }

        .success-message {
          background-color: #d4edda;
          color: #155724;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        label {
          font-size: 1.125rem;
          font-weight: 600;
          color: #4b5563;
        }

        input {
          width: 90%;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #ddd;
          font-size: 1rem;
          color: #4b5563;
        }

        button {
          background-color: #00796b;
          color: white;
          padding: 1rem;
          border-radius: 8px;
          font-size: 1.125rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: 0.3s;
        }

        button:hover {
          background-color: #005a4f;
        }

        .details {
          background: white;
          border-radius: 15px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
        }

        .details-placeholder {
          background: white;
          border-radius: 15px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          text-align: center;
          font-style: italic;
          color: #9ca3af;
        }

        @media (max-width: 768px) {
          .card {
            flex-direction: column;
          }

          .form-container, .details-container {
            width: 100%;
            border-right: none;
          }
        }
        `}
      </style>
    </div>
  );
};

export default AddVoting;
