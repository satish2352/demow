// SearchInput.jsx
import React from "react";
import { Button, Form } from "react-bootstrap";
import { FaFileExcel } from "react-icons/fa";

const SearchInput = ({ searchQuery, onSearch, onExport }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <Form.Control
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="me-2"
      />
      <Button variant="outline-primary" onClick={onExport}>
        <FaFileExcel className="me-1" /> Export
      </Button>
    </div>
  );
};

export default SearchInput;
