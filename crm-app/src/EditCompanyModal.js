import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "./api";

function EditCompanyModal({ show, onHide, fetchCompanies, company }) {
  const [name, setName] = useState(company.name);
  const [email, setEmail] = useState(company.email);
  const [logo, setLogo] = useState(company.logo);
  const [website, setWebsite] = useState(company.website);

  const handleEditCompany = () => {
    const updatedCompany = {
      name,
      email,
      logo,
      website,
    };

    // Send a PUT request to update the company
    api.put(`/companies/${company.id}`, updatedCompany)
      .then(() => {
        fetchCompanies();
        onHide();
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Logo</Form.Label>
            <Form.Control type="text" value={logo} onChange={(e) => setLogo(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Website</Form.Label>
            <Form.Control type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditCompany}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCompanyModal;
