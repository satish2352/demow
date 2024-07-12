


/////new
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import NewReusableForm from "../../components/form/NewResuableForm";
import ReusableTable from "../../components/table/ReusableTable";
import SearchInput from "../../components/search/SearchInput";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const Leadership = () => {
  const { shows, toggleForm, toggleShow } = useContext(ShowContext);
  const [team, setTeam] = useState([]);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});


  const tableColumns = [
    { key: "name", label: "Name" },
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "imageupload", label: "Upload Image" },
    { key: "facebook", label: "facebook url" },
    { key: "instagram", label: "instagram url" },
    { key: "linkedin", label: "linkedin url" },
  ];


  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axios.get("http://localhost:5000/leadership");
      setTeam(response.data);
      setData(response.data); // Update the context data
    } catch (error) {
      console.error(
        "Error fetching team:",
        error.response || error.message || error
      );
    }
  };


  const validateForm = (formData) => {
    let errors = {};
    let isValid = true;

    if (!formData.name?.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.title?.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!formData.description?.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    if (!formData.imageupload?.trim()) {
      errors.imageupload = "Image is required";
      isValid = false;
    }

    if (!formData.facebook?.trim()) {
      errors.facebook = "Facebook link is required";
      isValid = false;
    }

    if (!formData.instagram?.trim()) {
      errors.instagram = "Instagram link is required";
      isValid = false;
    }

    if (!formData.linkedin?.trim()) {
      errors.linkedin = "LinkedIn link is required";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      try {
        if (editMode) {
          await axios.put(
            `http://localhost:5000/leadership/${editingId}`,
            formData
          );
          toast.success("Data Updated Successfully");
        } else {
          await axios.post("http://localhost:5000/leadership", formData);
          toast.success("Data Submitted Successfully");
        }
        fetchTeam();
        toggleForm();
        toggleShow();
        setEditMode(false);
        setFormData({}); // Reset form data after submission
      } catch (error) {
        console.error("Error handling form submission:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/leadership/${id}`);
      toast.success("Data Deleted Successfully");
      fetchTeam();
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Error submitting data");
    }
  };

  const toggleEdit = (leaderId) => {
    const memberToEdit = team.find((item) => item.id === leaderId);
    if (memberToEdit) {
      setEditingId(leaderId);
      setEditMode(true);
      toggleForm();
      toggleShow();
      setFormData(memberToEdit); // Set initial form data for editing
    }
  };

  useEffect(() => {
    if (shows) {
      setEditMode(false);
      setEditingId(null);
      setFormData({});
    }
  }, [shows]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container>
      <Row>
        <Col>
          <SearchInput
            searchQuery={searchQuery}
            onSearch={handleSearch}
            onExport={handleExport}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {!shows && !editMode ? (
            <ReusableTable
              columns={tableColumns}
              data={searchQuery.trim() ? filteredData : team}
              onEdit={toggleEdit}
              onDelete={handleDelete}
            />
          ) : (
            <Card className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row>
                <Col md={6}>
                    <NewReusableForm
                      label={"Name"}
                      placeholder={"Enter Name"}
                      type={"text"}
                      name={"name"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.name && (
                      <span className="error text-danger">{errors.name}</span>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewReusableForm
                      label={"Title"}
                      placeholder={"Enter Title"}
                      type={"text"}
                      name={"title"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.title && (
                      <span className="error text-danger">{errors.title}</span>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewReusableForm
                      label={"Image"}
                      placeholder={"Enter Image URL"}
                      type={"file"}
                      name={"imageupload"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.imageupload && (
                      <span className="error text-danger">
                        {errors.imageupload}
                      </span>
                    )}
                  </Col>

                  <Col md={6}>
                    <NewReusableForm
                      label={"Title"}
                      placeholder={"Enter Title"}
                      type={"text"}
                      name={"title"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.title && (
                      <span className="error text-danger">{errors.title}</span>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewReusableForm
                      label={"Review"}
                      placeholder={"Enter Review"}
                      type={"text"}
                      name={"review"}
                      min={"0"}
                      max={"5"}
                      step={"0.1"}
                      textarea={true}
                      useJodit={true} 
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.review && (
                      <span className="error text-danger">{errors.review}</span>
                    )}
                  </Col>
                  <Col md={6}>
                    <NewReusableForm
                      label={"Star"}
                      placeholder={"Enter Star 0 to 5 (decimal allows)"}
                      type={"text"}
                      name={"star"}
                      onChange={handleChange}
                      initialData={formData}
                    />
                    {errors.star && (
                      <span className="error text-danger">{errors.star}</span>
                    )}
                  </Col>
                  <div className="mt-3">
                    <Button type="submit" variant="primary">
                      {editMode ? "Update" : "Submit"}
                    </Button>
                    <Button
                      onClick={() => setEditMode(false)}
                      variant="secondary"
                      className="ms-2"
                    >
                      Cancel
                    </Button>
                  </div>
                </Row>
              </Form>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Leadership;