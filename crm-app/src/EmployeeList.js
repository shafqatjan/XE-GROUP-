import React, { useState, useEffect } from "react";
import { fetchEmployeeList, addEmployee, editEmployee, deleteEmployee, fetchCompanyList } from "./services";

function EmployeeList() {
    // State variables
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAddEmployeeVisible, setAddEmployeeVisible] = useState(false);
    const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [companies, setCompanies] = useState([]); // State for the list of companies

    // Form fields for adding/editing an employee
    const [employeeForm, setEmployeeForm] = useState({
        id: 0,
        first_name: "",
        last_name: "",
        company_id: 0, // Initialize to 0
        email: "",
        phone: "",
    });

    // Function to load the list of employees
    const loadEmployeeList = () => {
        fetchEmployeeList()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error("API Error:", error);
            });
    };

    // Function to load the list of companies
    const loadCompanyList = () => {
        fetchCompanyList()
            .then((response) => {
                setCompanies(response.data);
            })
            .catch((error) => {
                console.error("API Error:", error);
            });
    };

    useEffect(() => {
        loadEmployeeList();
        loadCompanyList(); // Load the list of companies when the component mounts
    }, []);

    // Function to handle adding or editing an employee
    const handleSaveEmployee = () => {
        if (employeeForm.id === 0) {
            // Add a new employee
            addEmployee(employeeForm)
                .then(() => {
                    loadEmployeeList();
                    setAddEmployeeVisible(false);
                    setEmployeeForm({
                        id: 0,
                        first_name: "",
                        last_name: "",
                        company_id: 0,
                        email: "",
                        phone: "",
                    });
                })
                .catch((error) => {
                    console.error("API Error:", error);
                });
        } else {
            // Edit an existing employee
            editEmployee(employeeForm)
                .then(() => {
                    loadEmployeeList();
                    setAddEmployeeVisible(false);
                    setEmployeeForm({
                        id: 0,
                        first_name: "",
                        last_name: "",
                        company_id: 0,
                        email: "",
                        phone: "",
                    });
                })
                .catch((error) => {
                    console.error("API Error:", error);
                });
        }
    };

    // Function to handle editing an employee
    const handleEditClick = (employee) => {
        setSelectedEmployee(employee);
        setEmployeeForm(employee);
        setAddEmployeeVisible(true);
    };

    // Function to handle deleting an employee
    const handleDeleteClick = (employee) => {
        setSelectedEmployee(employee);
        setDeleteConfirmationVisible(true);
    };

    // Function to confirm and delete an employee
    const handleConfirmDelete = () => {
        if (selectedEmployee) {
            deleteEmployee(selectedEmployee.id)
                .then(() => {
                    loadEmployeeList();
                    setDeleteConfirmationVisible(false);
                    setSelectedEmployee(null);
                })
                .catch((error) => {
                    console.error("API Error:", error);
                    setDeleteConfirmationVisible(false);
                });
        }
    };

    return (
        <div>
            <h2>Employee List</h2>
            <button onClick={() => setAddEmployeeVisible(true)}>Add Employee</button>

            {/* Table to display the list of employees */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Company</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.company_id}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>
                                <button onClick={() => handleEditClick(employee)}>Edit</button>
                                <button onClick={() => handleDeleteClick(employee)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isAddEmployeeVisible && (
                <div className="modal fade show" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {employeeForm.id ? "Edit Employee" : "Add Employee"}
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setAddEmployeeVisible(false)}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={employeeForm.first_name}
                                            onChange={(e) =>
                                                setEmployeeForm({
                                                    ...employeeForm,
                                                    first_name: e.target.value,
                                                })
                                            }
                                            required // Input is required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={employeeForm.last_name}
                                            onChange={(e) =>
                                                setEmployeeForm({
                                                    ...employeeForm,
                                                    last_name: e.target.value,
                                                })
                                            }
                                            required // Input is required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Company:</label>
                                        <select
                                            className="form-control"
                                            value={employeeForm.company_id}
                                            onChange={(e) =>
                                                setEmployeeForm({
                                                    ...employeeForm,
                                                    company_id: e.target.value,
                                                })
                                            }
                                            required // Selection is required
                                        >
                                            <option value={0}>Select a Company</option>
                                            {companies.map((company) => (
                                                <option key={company.id} value={company.id}>
                                                    {company.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input
                                            type="email" // Use email type for email validation
                                            className="form-control"
                                            value={employeeForm.email}
                                            onChange={(e) =>
                                                setEmployeeForm({
                                                    ...employeeForm,
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone:</label>
                                        <input
                                            type="tel" // Use tel type for phone number validation
                                            className="form-control"
                                            value={employeeForm.phone}
                                            onChange={(e) =>
                                                setEmployeeForm({
                                                    ...employeeForm,
                                                    phone: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setAddEmployeeVisible(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSaveEmployee}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {isDeleteConfirmationVisible && (
                <div>
                    <h2>Confirm Deletion</h2>
                    <p>
                        Are you sure you want to delete {selectedEmployee.first_name} {selectedEmployee.last_name}?
                    </p>
                    <button onClick={handleConfirmDelete}>Yes</button>
                    <button onClick={() => setDeleteConfirmationVisible(false)}>No</button>
                </div>
            )}
        </div>
    );
}

export default EmployeeList;
