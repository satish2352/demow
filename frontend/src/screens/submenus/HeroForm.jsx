// // ////test prefilled form
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
// import { useSearchExport } from "../../context/SearchExportContext"; // Adjust the path as per your file structure
// import { FaEdit, FaTrash, FaFileExcel } from "react-icons/fa";

// const HeroForm = () => {
//   const {
//     searchQuery,
//     handleSearch,
//     handleExport,
//     data,
//     setData,
//     filteredData,
//   } = useSearchExport();
//   const { shows, toggleForm, toggleShow } = useContext(ShowContext);
//   const [team, setTeam] = useState([]);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [message, setMessage] = useState("");
//   const [errors, setErrors] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [searchVisible, setSearchVisible] = useState(true); // Show search row initially
//   useEffect(() => {
//     fetchTeam();
//   }, []);

//   const fetchTeam = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/heroform");
//       setTeam(response.data);
//       setData(response.data); // Update the context data
//     } catch (error) {
//       console.error("Error fetching team:", error);
//     }
//   };

//   const validateForm = () => {
//     let errors = {};
//     let isValid = true;

//     if (!name.trim()) {
//       errors.name = "Name is required";
//       isValid = false;
//     }
//     if (!email.trim()) {
//       errors.email = "Email is required";
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       errors.email = "Invalid email address";
//       isValid = false;
//     }

//     if (!mobile.trim()) {
//       errors.mobile = "Mobile is required";
//       isValid = false;
//     } else if (!/^\d{10}$/.test(mobile)) {
//       errors.mobile = "Mobile number must be exactly 10 digits";
//       isValid = false;
//     }

//     if (!message.trim()) {
//       errors.message = "Message is required";
//       isValid = false;
//     }

//     setErrors(errors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const newMember = { name, email, mobile, message };
//       try {
//         await axios.post("http://localhost:5000/heroform", newMember);
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
//       await axios.delete(`http://localhost:5000/heroform/${id}`);
//       alert("Data Deleted Successfully");
//       fetchTeam();
//     } catch (error) {
//       console.error("Error deleting team member:", error);
//     }
//   };

//   const handleEditing = async () => {
//     const updatedMember = { name, email, mobile, message };
//     try {
//       await axios.put(
//         `http://localhost:5000/heroform/${editingId}`,
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
//     setName("");
//     setEmail("");
//     setMobile("");
//     setMessage("");
//     setErrors({});
//   };

//   // const toggleEdit = (leaderId) => {
//   //   setEditMode(true);
//   //   setEditingId(leaderId);
//   //   toggleForm();
//   //   toggleShow();
//   // };

//   // useEffect(() => {
//   //   if (shows) {
//   //     setEditMode(false);
//   //   }
//   // }, [shows]);

//   const toggleEdit = (memberId) => {
//     const memberToEdit = team.find((item) => item.id === memberId);
//     if (memberToEdit) {
//       setName(memberToEdit.name);
//       setEmail(memberToEdit.email);
//       setMobile(memberToEdit.mobile);
//       setMessage(memberToEdit.message);
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
//       setEditingId(null);
//     }
//   }, [shows]);

//   return (
//     <>
//     <Container>
//     <Row className="mb-3">
//         <Col>
//           {searchVisible && (
//             <div className="d-flex justify-content-between align-items-center">
//               <Form.Control
//                 type="text"
//                 placeholder="Search by title"
//                 value={searchQuery}
//                 onChange={(e) => handleSearch(e.target.value)}
//                 className="me-2"
//               />
//               <Button variant="outline-primary" onClick={handleExport}>
//                 <FaFileExcel className="me-1" /> Export
//               </Button>
//             </div>
//           )}
//         </Col>
//       </Row>

//       <Row>
//         <Col>

//       {!shows && !editMode ? (
//         <Row>
//           <Table striped bordered hover responsive className="bg-white">
//             <thead className="bg-dark text-white">
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Mobile</th>
//                 <th>Message</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               { searchQuery.trim() !==""?(
//                 filteredData.map((item, index) => (
//                 <tr key={item.id}>
//                   <td>{index + 1}</td>
//                   <td>{item.name}</td>
//                   <td>{item.email}</td>
//                   <td>{item.mobile}</td>
//                   <td>{item.message}</td>
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
//               ))
//               ):(
//                   team.map((item,index)=>(
//                     <tr key={item.id}>
//                   <td>{index + 1}</td>
//                   <td>{item.name}</td>
//                   <td>{item.email}</td>
//                   <td>{item.mobile}</td>
//                   <td>{item.message}</td>
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
//                   ))
//               )}
//             </tbody>
//           </Table>
//         </Row>
//       ) : (
//         <Card className="p-4">
//           <Form onSubmit={editMode ? handleEditing : handleSubmit}>
//             <Row>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="formName">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                   {errors.name && (
//                     <span className="error text-danger">{errors.name}</span>
//                   )}
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="formEmail">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                   {errors.email && (
//                     <span className="error text-danger">{errors.email}</span>
//                   )}
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group className="mb-3" controlId="formMobile">
//                   <Form.Label>Mobile</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter mobile"
//                     value={mobile}
//                     onChange={(e) => setMobile(e.target.value)}
//                   />
//                   {errors.mobile && (
//                     <span className="error text-danger">{errors.mobile}</span>
//                   )}
//                 </Form.Group>
//               </Col>
//               <Col md={12}>
//                 <Form.Group className="mb-3" controlId="formMessage">
//                   <Form.Label>Message</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     placeholder="Enter message"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                   />
//                   {errors.message && (
//                     <span className="error text-danger">{errors.message}</span>
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
//       </Col>
//       </Row>
//     </Container>

//     </>
//   );
// };

// export default HeroForm;

// ////2
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
import { useSearchExport } from "../../context/SearchExportContext"; // Adjust the path as per your file structure
import { FaEdit, FaTrash, FaFileExcel } from "react-icons/fa";

const HeroForm = () => {
  const {
    searchQuery,
    handleSearch,
    handleExport,
    data,
    setData,
    filteredData,
  } = useSearchExport();
  const { shows, toggleForm, toggleShow } = useContext(ShowContext);
  const [team, setTeam] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchVisible, setSearchVisible] = useState(true); // Show search row initially

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axios.get("http://localhost:5000/heroform");
      setTeam(response.data);
      setData(response.data); // Update the context data
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
    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }

    if (!mobile.trim()) {
      errors.mobile = "Mobile is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(mobile)) {
      errors.mobile = "Mobile number must be exactly 10 digits";
      isValid = false;
    }

    if (!message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newMember = { name, email, mobile, message };
      try {
        await axios.post("http://localhost:5000/heroform", newMember);
        alert("Data Submitted Successfully");
        fetchTeam();
        resetForm();
        toggleForm();
        toggleShow();
        setEditMode(false);
      } catch (error) {
        console.error("Error adding team member:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/heroform/${id}`);
      alert("Data Deleted Successfully");
      fetchTeam();
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  const handleEditing = async () => {
    const updatedMember = { name, email, mobile, message };
    try {
      await axios.put(
        `http://localhost:5000/heroform/${editingId}`,
        updatedMember
      );
      alert("Data Updated Successfully");
      fetchTeam();
      resetForm();
      toggleForm();
      toggleShow();
      setEditMode(false);
    } catch (error) {
      console.error("Error updating team member:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMobile("");
    setMessage("");
    setErrors({});
  };

  const toggleEdit = (memberId) => {
    const memberToEdit = team.find((item) => item.id === memberId);
    if (memberToEdit) {
      setName(memberToEdit.name);
      setEmail(memberToEdit.email);
      setMobile(memberToEdit.mobile);
      setMessage(memberToEdit.message);
      setEditingId(memberId);
      setEditMode(true);
      toggleForm();
      toggleShow();
    }
  };

  useEffect(() => {
    if (!shows) {
      resetForm();
      setEditMode(false);
      setEditingId(null);
    }
  }, [shows]);

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          {searchVisible && (
            <div className="d-flex justify-content-between align-items-center">
              <Form.Control
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="me-2"
              />
              <Button variant="outline-primary" onClick={handleExport}>
                <FaFileExcel className="me-1" /> Export
              </Button>
            </div>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          {!shows && !editMode ? (
            <Table striped bordered hover responsive >
              <thead >
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchQuery.trim() !== ""
                  ? filteredData.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.mobile}</td>
                        <td>{item.message}</td>
                        <td>
                          <div className="d-flex">
                            <Button
                              variant="warning"
                              className="ms-1"
                              onClick={() => toggleEdit(item.id)}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="danger"
                              className="ms-1"
                              onClick={() => handleDelete(item.id)}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : team.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.mobile}</td>
                        <td>{item.message}</td>
                        <td>
                          <div className="d-flex">
                            <Button
                              variant="warning"
                              className="ms-1"
                              onClick={() => toggleEdit(item.id)}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="danger"
                              className="ms-1"
                              onClick={() => handleDelete(item.id)}
                            >
                              <FaTrash />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          ) : (
            <Card className="p-4">
              <Form onSubmit={editMode ? handleEditing : handleSubmit}>
                <Row>
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
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && (
                        <span className="error text-danger">
                          {errors.email}
                        </span>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formMobile">
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                      {errors.mobile && (
                        <span className="error text-danger">
                          {errors.mobile}
                        </span>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="formMessage">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      {errors.message && (
                        <span className="error text-danger">
                          {errors.message}
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
        </Col>
      </Row>
    </Container>
  );
};

export default HeroForm;
