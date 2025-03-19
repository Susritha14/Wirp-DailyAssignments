import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeForm = () => {
  const { id } = useParams(); // Edit mode if id exists.
  const navigate = useNavigate();

  // State to manage form data.
  const [employee, setEmployee] = useState({
    id: 0,
    name: '',
    position: '',
    salary: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Fetch employee data when editing.
  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:5137/api/Employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  // Update state as user types.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission for create/update.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5137/api/Employees/${id}`, employee, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5137/api/Employees', employee, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Position:</label>
          <input
            type="text"
            name="position"
            className="form-control"
            value={employee.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Salary:</label>
          <input
            type="number"
            name="salary"
            className="form-control"
            value={employee.salary}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
