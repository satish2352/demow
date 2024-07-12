// import React, { useContext, useState, useEffect } from "react";
// import {
//   Button,
//   Card,
//   Col,
//   Container,
//   Form,
//   Row,
//   Table,
// } from "react-bootstrap";
// import axios from "axios";
// import { ShowContext } from "../../context/ShowContext";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const HeaderContact = () => {
//   const { shows, toggleForm, toggleShow } = useContext(ShowContext);
//   const [team, setTeam] = useState([]);
//   const [mobile1, setmobile1] = useState("");
//   const [mobile2, setmobile2] = useState("");
//   const [errors, setErrors] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchTeam();
//   }, []);

//   const fetchTeam = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/headercontact");
//       setTeam(response.data);
//     } catch (error) {
//       console.error("Error fetching team:", error);
//     }
//   };

//   const validateForm = () => {
//     let errors = {};
//     let isValid = true;

//     if (!mobile1.trim()) {
//       errors.mobile1 = "Mobile 1 is required";
//       isValid = false;
//     } else if (!/^\d{10}$/.test(mobile1)) {
//       errors.mobile1 = "Mobile number must be exactly 10 digits";
//       isValid = false;
//     }

//     if (!mobile2.trim()) {
//       errors.mobile2 = "Mobile 2 is required";
//       isValid = false;
//     } else if (!/^\d{10}$/.test(mobile2)) {
//       errors.mobile2 = "Mobile number must be exactly 10 digits";
//       isValid = false;
//     }

//     setErrors(errors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const newMember = { mobile1, mobile2 };
//       try {
//         await axios.post("http://localhost:5000/headercontact", newMember);
//         alert("Data Submitted Successfully");
//         fetchTeam();
//         resetForm();
//         toggleForm();
//         toggleShow();
//         setEditMode(false);
//       } catch (error) {
//         console.error("Error adding team member:", error);
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/headercontact/${id}`);
//       alert("Data Deleted Successfully");
//       fetchTeam();
//     } catch (error) {
//       console.error("Error deleting team member:", error);
//     }
//   };

//   const handleEditing = async () => {
//     const updatedMember = { mobile1, mobile2 };
//     try {
//       await axios.put(
//         `http://localhost:5000/headercontact/${editingId}`,
//         updatedMember
//       );
//       alert("Data Updated Successfully");
//       fetchTeam();
//       resetForm();
//       toggleForm();
//       toggleShow();
//       setEditMode(false);
//     } catch (error) {
//       console.error("Error updating team member:", error);
//     }
//   };

//   const resetForm = () => {
//     setmobile1("");
//     setmobile2("");
//     setErrors({});
//   };

//   //adding fields to form when im clicking edit btn
//   const toggleEdit = (memberId) => {
//     const memberToEdit = team.find((item) => item.id === memberId);
//     if (memberToEdit) {
//       setmobile1(memberToEdit.mobile1);
//       setmobile2(memberToEdit.mobile2);
//       setEditingId(memberId);
//       setEditMode(true);
//       toggleForm();
//       toggleShow();
//     }
//   };

//   useEffect(() => {
//     if (!shows) {
//       resetForm();
//       setEditMode(false);
//       //set editng value null when monunt.....
//       setEditingId(null);
//     }
//   }, [shows]);

//   return (
//     <Container>
//       {!shows && !editMode ? (
//         <Row>
//           <Table striped bordered hover responsive className="bg-white">
//             <thead className="bg-dark text-white">
//               <tr>
//                 <th>#</th>
//                 <th>Mobile 1</th>
//                 <th>Mobile 2</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {team.map((item, index) => (
//                 <tr key={item.id}>
//                   <td>{index + 1}</td>
//                   <td>{item.mobile1}</td>
//                   <td>{item.mobile2}</td>
//                   <td>
//                     <div className="d-flex">
//                       <Button
//                         variant="warning"
//                         className="ms-1"
//                         onClick={() => toggleEdit(item.id)}
//                       >
//                         <FaEdit />
//                       </Button>
//                       <Button
//                         variant="danger"
//                         className="ms-1"
//                         onClick={() => handleDelete(item.id)}
//                       >
//                         <FaTrash />
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Row>
//       ) : (
//         <Card className="p-4">
//           <Form onSubmit={editMode ? handleEditing : handleSubmit}>
//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="formMobile1">
//                   <Form.Label>Mobile 1</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter Mobile 1"
//                     value={mobile1}
//                     onChange={(e) => setmobile1(e.target.value)}
//                   />
//                   {errors.mobile1 && (
//                     <span className="error text-danger">{errors.mobile1}</span>
//                   )}
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="formMobile2">
//                   <Form.Label>Mobile 2</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter Mobile 2"
//                     value={mobile2}
//                     onChange={(e) => setmobile2(e.target.value)}
//                   />
//                   {errors.mobile2 && (
//                     <span className="error text-danger">{errors.mobile2}</span>
//                   )}
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Button type="submit" variant="outline-success">
//               {editMode ? "Update" : "Submit"}
//             </Button>
//           </Form>
//         </Card>
//       )}
//     </Container>
//   );
// };

// export default HeaderContact;







////

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useSearchExport } from "../../context/SearchExportContext";
import { ShowContext } from "../../context/ShowContext";
import ReusableForm from "../../components/form/ResuableForm";
import ReusableTable from "../../components/table/ReusableTable";
import SearchInput from "../../components/search/SearchInput";

const HeaderContact = () => {
  const {
    searchQuery,
    handleSearch,
    handleExport,
    data,
    setData,
    filteredData,
  } = useSearchExport();

  const { shows, toggleForm, toggleShow } = React.useContext(ShowContext); // Ensure toggleForm is correctly obtained

  const [team, setTeam] = useState([]);
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const formFields = [
    {
      name: "imageupload1",
      label: "Upload Image",
      type: "file",
      placeholder: "Upload image",
      col: 6,
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter title",
      col: 6,
    },
    {
      name: "description",
      label: "Description",
      as: "textarea",
      rows: 3,
      placeholder: "Enter description",
      col: 12,
    },
  ];

  const tableColumns = [
    { key: "imageupload1", label: "Image" },
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
  ];

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axios.get("http://localhost:5000/bloglist");
      setTeam(response.data);
      setData(response.data); // Update the context data
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  };

  const validateForm = (formData) => {
    let errors = {};
    let isValid = true;

    if (!formData.title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
      isValid = false;
    }

    if (!formData.imageupload1.trim()) {
      errors.imageupload1 = "Image is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (formData) => {
    if (validateForm(formData)) {
      try {
        await axios.post("http://localhost:5000/bloglist", formData);
        alert("Data Submitted Successfully");
        fetchTeam();
        toggleForm(); // Ensure toggleForm is called correctly
        toggleShow();
        setEditMode(false);
      } catch (error) {
        console.error("Error adding team member:", error);
      }
    }
  };

  const handleEditing = async (formData) => {
    if (validateForm(formData)) {
      try {
        await axios.put(
          `http://localhost:5000/bloglist/${editingId}`,
          formData
        );
        alert("Data Updated Successfully");
        fetchTeam();
        toggleForm(); // Ensure toggleForm is called correctly
        toggleShow();
        setEditMode(false);
      } catch (error) {
        console.error("Error updating team member:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/bloglist/${id}`);
      alert("Data Deleted Successfully");
      fetchTeam();
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };




  ////for those having no problem to image means no imag
//   // const toggleEdit = (memberId) => {
//   //   const memberToEdit = team.find((item) => item.id === memberId);
//   //   if (memberToEdit) {
//   //     setTitle(memberToEdit.title);
//   //     setDescription(memberToEdit.description);
//   //     setImageUpload1(memberToEdit.imageupload1);
//   //     setEditingId(memberId);
//   //     setEditMode(true);
//   //     toggleForm();
//   //     toggleShow();
//   //   }
//   // };

//   // useEffect(() => {
//   //   if (shows) {
//   //     resetForm();
//   //     setEditMode(false);
//   //     setEditingId(null);
//   //   }
//   // }, [shows]);




  /////for thiose having image problem to server
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
            <ReusableForm
              fields={formFields}
              // add initialdata only when you have image at server
              // initialData={editMode ? team.find((item) => item.id === editingId) : {}}
              onSubmit={editMode ? handleEditing : handleSubmit}
              errors={errors}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HeaderContact;
