import React, { useState, useEffect } from "react";
import api from "./api";
import { fetchCompanyList } from "./services";

import AddCompanyModal from "./AddCompanyModal"; // You should create this component
import EditCompanyModal from "./EditCompanyModal"; // You should create this component

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [isAddCompanyVisible, setAddCompanyVisible] = useState(false);
  const [isEditCompanyVisible, setEditCompanyVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const fetchCompanies = () => {
    // Fetch the list of companies from the API using the `api` service.
    api.get("/companies")
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
    setAddCompanyVisible(true);
  };

  const handleEditCompanyClick = (company) => {
    setSelectedCompany(company);
    setEditCompanyVisible(true);
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
                {/* Add a delete button to delete the company if needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddCompanyVisible && <AddCompanyModal fetchCompanies={fetchCompanies} onClose={() => setAddCompanyVisible(false)} />}
      {isEditCompanyVisible && (
        <EditCompanyModal company={selectedCompany} fetchCompanies={fetchCompanies} onClose={() => setEditCompanyVisible(false)} />
      )}
    </div>
  );
}

export default CompanyList;
