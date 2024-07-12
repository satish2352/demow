import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import axios from "axios";
import { ShowContext } from "../../context/ShowContext";
import { FaEdit, FaTrash } from "react-icons/fa";

const OurTeam = () => {
  const { shows, toggleForm, toggleShow } = useContext(ShowContext);
  const [team, setTeam] = useState([]);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [description, setDescription] = useState("");
  const [imageupload1, setImageUpload1] = useState("");
  const [imageupload2, setImageUpload2] = useState("");
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false); // Track edit mode locally
  const [editingId, setEditingId] = useState(null); // Track the ID of the member being edited

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axios.get("http://localhost:5000/ourteam");
      setTeam(response.data);
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!designation.trim()) {
      errors.designation = "Designation is required";
      isValid = false;
    }

    if (!description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    if (!imageupload1.trim()) {
      errors.imageupload1 = "Image 1 is required";
      isValid = false;
    }

    if (!imageupload2.trim()) {
      errors.imageupload2 = "Image 2 is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newMember = {
        name,
        designation,
        description,
        imageupload1,
        imageupload2,
      };
      try {
        await axios.post("http://localhost:5000/ourteam", newMember);
        alert("Data Submitted Successfully");
        fetchTeam();
        resetForm();
        toggleForm(); // Hide the form after submission (handled by context)
        toggleShow(); // Show the table view (handled by context)
        setEditMode(false); // Exit edit mode
      } catch (error) {
        console.error("Error adding team member:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/ourteam/${id}`);
      alert("Data Deleted Successfully");
      fetchTeam();
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  const handleEditing = async () => {
    const updatedMember = {
      name,
      designation,
      description,
      imageupload1,
      imageupload2,
    };
    try {
      await axios.put(
        `http://localhost:5000/ourteam/${editingId}`,
        updatedMember
      );
      alert("Data Updated Successfully");
      fetchTeam();
      resetForm();
      toggleForm(); // Hide the form after submission (handled by context)
      toggleShow(); // Show the table view (handled by context)
      setEditMode(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating team member:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setDesignation("");
    setDescription("");
    setImageUpload1("");
    setImageUpload2("");
    setErrors({});
  };

  // const toggleEdit = (memberId) => {
  //   setEditMode(true);
  //   setEditingId(memberId);
  //   toggleForm();
  //   toggleShow();
  // };

  // useEffect(() => {
  //   if (shows) {
  //     setEditMode(false);
  //   }
  // }, [shows]);

  // const toggleEdit = (memberId) => {
  //   const memberToEdit = team.find((item) => item.id === memberId);
  //   if (memberToEdit) {
  //     setName(memberToEdit.name);
  //     setTitle(memberToEdit.title);
  //     setDescription(memberToEdit.description);
  //     setImageUpload(memberToEdit.imageupload);
  //     setFacebook(memberToEdit.facebook);
  //     setInstagram(memberToEdit.instagram);
  //     setLinkedin(memberToEdit.linkedin);
  //     setEditingId(memberId);
  //     setEditMode(true);
  //     toggleForm();
  //     toggleShow();
  //   }
  // };

  // useEffect(() => {
  //   if (!shows) {
  //     resetForm();
  //     setEditMode(false);
  //     setEditingId(null);
  //   }
  // }, [shows]);

  return (
    <Container>
      {!shows && !editMode ? (
        <Row>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Description</th>
                <th>Image 1</th>
                <th>Image 2</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map((member, index) => (
                <tr key={member.id}>
                  <td>{index + 1}</td>
                  <td>{member.name}</td>
                  <td>{member.designation}</td>
                  <td>{member.description}</td>
                  <td>{member.imageupload1}</td>
                  <td>{member.imageupload2}</td>
                  <td>
                    <div className="d-flex">
                      <Button
                        variant="warning"
                        className="ms-1"
                        onClick={() => toggleEdit(member.id)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        className="ms-1"
                        onClick={() => handleDelete(member.id)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      ) : (
        <Card className="p-4">
          <Form onSubmit={editMode ? handleEditing : handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formImage1">
                  <Form.Label>Upload Image 1</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Upload image"
                    value={imageupload1}
                    onChange={(e) => setImageUpload1(e.target.value)}
                  />
                  {errors.imageupload1 && (
                    <span className="error text-danger">
                      {errors.imageupload1}
                    </span>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formImage2">
                  <Form.Label>Upload Image 2</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Upload image"
                    value={imageupload2}
                    onChange={(e) => setImageUpload2(e.target.value)}
                  />
                  {errors.imageupload2 && (
                    <span className="error text-danger">
                      {errors.imageupload2}
                    </span>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <span className="error text-danger">{errors.name}</span>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formDesignation">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                  {errors.designation && (
                    <span className="error text-danger">
                      {errors.designation}
                    </span>
                  )}
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && (
                    <span className="error text-danger">
                      {errors.description}
                    </span>
                  )}
                </Form.Group>
              </Col>
            </Row>
            {editMode ? (
              <Button type="submit" variant="outline-success">
                Update
              </Button>
            ) : (
              <Button type="submit" variant="outline-success">
                Submit
              </Button>
            )}
          </Form>
        </Card>
      )}
    </Container>
  );
};

export default OurTeam;
