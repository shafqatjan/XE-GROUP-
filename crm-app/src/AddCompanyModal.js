import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "./api";

function AddCompanyModal({ show, onHide, fetchCompanies }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [logo, setLogo] = useState("");
  const [website, setWebsite] = useState("");

  const handleAddCompany = () => {
    const newCompany = {
      name,
      email,
      logo,
      website,
    };

    // Send a POST request to create the new company
    api.post("/companies", newCompany)
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
        <Modal.Title>Add Company</Modal.Title>
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
        <Button variant="primary" onClick={handleAddCompany}>
          Add Company
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCompanyModal;
