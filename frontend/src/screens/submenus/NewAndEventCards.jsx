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

const NewsAndEventCards = () => {
  const { shows, toggleForm, toggleShow } = useContext(ShowContext);
  const [newsEvents, setNewsEvents] = useState([]);
  const [imageupload, setImageUpload] = useState("");

  const [shortdescription, setShortDescription] = useState("");
  const [longdescription, setLongDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false); // Track edit mode locally
  const [editingId, setEditingId] = useState(null); // Track the ID of the leader being edited

  useEffect(() => {
    fetchNewsEvents();
  }, []);

  const fetchNewsEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/newsEvents");
      setNewsEvents(response.data);
    } catch (error) {
      console.error("Error fetching news and events:", error);
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!shortdescription.trim()) {
      errors.shortdescription = "Short description is required";
      isValid = false;
    }

    if (!longdescription.trim()) {
      errors.longdescription = "Long description is required";
      isValid = false;
    }

    if (!imageupload.trim()) {
      errors.imageupload = "Image is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newNewsEvent = {
        imageupload,
        shortdescription,
        longdescription,
      };
      try {
        await axios.post("http://localhost:5000/newsEvents", newNewsEvent);
        alert("Data Submitted Successfully");
      } catch (error) {
        console.error("Error adding news and event:", error);
      }
      fetchNewsEvents();
      resetForm();
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/newsEvents/${id}`);
      alert("Data Deleted Successfully");
      fetchNewsEvents();
    } catch (error) {
      console.error("Error deleting news and event:", error);
    }
  };
  const handleEditing = async () => {
    const newNewsEvent = { imageupload, shortdescription, longdescription };
    try {
      await axios.put(
        `http://localhost:5000/newsEvents/${editingId}`,
        newNewsEvent
      );
      alert("Data Updated Successfully");
      fetchLeaders();
      resetForm();
      toggleForm(); // Hide the form after submission (handled by context)
      toggleShow(); // Show the table view (handled by context)
      setEditMode(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating leadership:", error);
    }
  };
  const resetForm = () => {
    setImageUpload("");
    setShortDescription("");
    setLongDescription("");
    setErrors({});
  };

  const toggleEdit = (leaderId) => {
    setEditMode(true);
    setEditingId(leaderId);
    toggleForm();
    toggleShow();
  };

  useEffect(() => {
    if (shows) {
      setEditMode(false);
    }
  }, [shows]);

  //problem with image json server
  // const toggleEdit = (memberId) => {
  //     const memberToEdit = team.find((item) => item.id === memberId);
  //     if (memberToEdit) {

  //       setShortDescription(memberToEdit.shortdescription);
  //       setImageUpload(memberToEdit.imageupload);
  //       setLongDescription(memberToEdit.longdescription);

  //       setEditingId(memberId);
  //       setEditMode(true);
  //       toggleForm();
  //       toggleShow();
  //     }
  //   };

  useEffect(() => {
    if (!shows) {
      resetForm();
      setEditMode(false);
      setEditingId(null);
    }
  }, [shows]);

  return (
    <Container>
      {!shows && !editMode ? (
        <Row>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>

                <th>Short Description</th>
                <th>Long Description</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsEvents.map((newsEvent, index) => (
                <tr key={newsEvent.id}>
                  <td>{index + 1}</td>

                  <td>{newsEvent.shortdescription}</td>
                  <td>{newsEvent.longdescription}</td>
                  <td>{newsEvent.imageupload}</td>
                  <td>
                    <div className="d-flex">
                      <Button
                        variant="warning"
                        className="ms-1"
                        onClick={() => toggleEdit(newsEvent.id)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        className="ms-1"
                        onClick={() => handleDelete(newsEvent.id)}
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
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formImage">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Upload image"
                    value={imageupload}
                    onChange={(e) => setImageUpload(e.target.value)}
                  />
                  {errors.imageupload && (
                    <span className="error text-danger">
                      {errors.imageupload}
                    </span>
                  )}
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="formShortDescription">
                  <Form.Label>Short Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter short description"
                    value={shortdescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                  />
                  {errors.shortdescription && (
                    <span className="error text-danger">
                      {errors.shortdescription}
                    </span>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formLongDescription">
                  <Form.Label>Long Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter long description"
                    value={longdescription}
                    onChange={(e) => setLongDescription(e.target.value)}
                  />
                  {errors.longdescription && (
                    <span className="error text-danger">
                      {errors.longdescription}
                    </span>
                  )}
                </Form.Group>
              </Col>
            </Row>
            {editMode ? (
              <Button onClick={handleEditing} variant="outline-success">
                Update
              </Button>
            ) : (
              <Button onClick={handleSubmit} variant="outline-success">
                Submit
              </Button>
            )}
          </Form>
        </Card>
      )}
    </Container>
  );
};

export default NewsAndEventCards;
