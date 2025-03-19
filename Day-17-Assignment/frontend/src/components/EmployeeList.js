import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortBy, setSortBy] = useState('Id');
  const [isAscending, setIsAscending] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // Redirect to login if token is missing.
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Fetch employees from the backend API.
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5137/api/Employees', {
        params: {
          pageNumber: currentPage,
          pageSize: pageSize,
          sortBy: sortBy,
          isAscending: isAscending,
          search: search
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, currentPage, sortBy, isAscending]);

  // Delete an employee by ID.
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5137/api/Employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEmployees(); // Refresh list after deletion.
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // Handle field sorting.
  const handleSort = (field) => {
    if (sortBy === field) {
      setIsAscending(!isAscending);
    } else {
      setSortBy(field);
      setIsAscending(true);
    }
  };

  return (
    <div>
      <div className="mb-3">
        <Link to="/add" className="btn btn-primary">
          Add Employee
        </Link>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th onClick={() => handleSort('Id')}>
              ID {sortBy === 'Id' ? (isAscending ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => handleSort('Name')}>
              Name {sortBy === 'Name' ? (isAscending ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => handleSort('Position')}>
              Position {sortBy === 'Position' ? (isAscending ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => handleSort('Salary')}>
              Salary {sortBy === 'Salary' ? (isAscending ? '↑' : '↓') : ''}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.salary}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm me-2"
                    onClick={() => navigate(`/edit/${employee.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button className="btn btn-primary" onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
