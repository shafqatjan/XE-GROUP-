import React, { useState, useEffect } from "react";
import api from "./api";
import {
  fetchCompanyList,
  addCompany,
  editCompany,
  deleteCompany,
} from "./services";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [isAddCompanyVisible, setAddCompanyVisible] = useState(false);
  const [isEditCompanyVisible, setEditCompanyVisible] = useState(false);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(
    false
  );
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [companyForm, setCompanyForm] = useState({
    name: "",
    email: "",
    logo: null, // Store the selected logo file
    website: "",
  });

  const fetchCompanies = () => {
    fetchCompanyList()
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddCompanyClick = () => {
    setCompanyForm({
      name: "",
      email: "",
      logo: null,
      website: "",
    });
    setAddCompanyVisible(true);
  };

  const handleEditCompanyClick = (company) => {
    setSelectedCompany(company);
    setCompanyForm({ ...company });
    setEditCompanyVisible(true);
  };

  const handleDeleteCompanyClick = (company) => {
    setSelectedCompany(company);
    setDeleteConfirmationVisible(true);
  };

  const handleConfirmDelete = () => {
    if (selectedCompany) {
      deleteCompany(selectedCompany.id)
        .then(() => {
          fetchCompanies();
          setDeleteConfirmationVisible(false);
          setSelectedCompany(null);
        })
        .catch((error) => {
          console.error("API Error:", error);
          setDeleteConfirmationVisible(false);
        });
    }
  };

  const handleSaveCompany = () => {
    if (companyForm.id) {
      // Edit an existing company
      editCompany(companyForm)
        .then(() => {
          fetchCompanies();
          setEditCompanyVisible(false);
          setCompanyForm({
            name: "",
            email: "",
            logo: null,
            website: "",
          });
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    } else {
      // Add a new company
      const formData = new FormData();
      formData.append("name", companyForm.name);
      formData.append("email", companyForm.email);
      formData.append("website", companyForm.website);
      if (companyForm.logo) {
        formData.append("logo", companyForm.logo);
      }

      addCompany(formData)
        .then(() => {
          fetchCompanies();
          setAddCompanyVisible(false);
          setCompanyForm({
            name: "",
            email: "",
            logo: null,
            website: "",
          });
        })
        .catch((error) => {
          console.error("API Error:", error);
        });
    }
  };

  const handleLogoChange = (e) => {
    // Update the logo property in the companyForm state with the selected file
    setCompanyForm({ ...companyForm, logo: e.target.files[0] });
  };

  return (
    <div>
      <h2>Company List</h2>
      <button onClick={handleAddCompanyClick}>Add Company</button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Logo</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>{company.email}</td>
              <td>{company.logo}</td>
              <td>{company.website}</td>
              <td>
                <button onClick={() => handleEditCompanyClick(company)}>Edit</button>
                <button onClick={() => handleDeleteCompanyClick(company)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddCompanyVisible && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Company</h5>
                <button type="button" className="close" onClick={() => setAddCompanyVisible(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={companyForm.name}
                      onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={companyForm.email}
                      onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Logo:</label>
                    <input
                      type="file"
                      className="form-control form-control-file"
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Website:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={companyForm.website}
                      onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setAddCompanyVisible(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSaveCompany}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditCompanyVisible && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Company</h5>
                <button type="button" className="close" onClick={() => setEditCompanyVisible(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={companyForm.name}
                      onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={companyForm.email}
                      onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Logo:</label>
                    <input
                      type="file"
                      className="form-control form-control-file"
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Website:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={companyForm.website}
                      onChange={(e) => setCompanyForm({ ...companyForm, website: e.target.value })}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditCompanyVisible(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSaveCompany}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteConfirmationVisible && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Company</h5>
                <button type="button" className="close" onClick={() => setDeleteConfirmationVisible(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this company?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setDeleteConfirmationVisible(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyList;
