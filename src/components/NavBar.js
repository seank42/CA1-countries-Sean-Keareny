import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const NavBar = ({ handleSearchChange }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    handleSearchChange(searchInput);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <Navbar bg="dark" className='me-5 mb-2'>
      <Navbar.Brand className='text-primary ms-2' href="/">My Countries App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {}
        </Nav>
        <Form inline>
          <FormControl
          
            type="text"
            placeholder="Search Country"
            className="mr-sm-2 ms-2"
            value={searchInput}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            
          />
          
        </Form>
        <Button variant="outline-primary" onClick={handleSearch} className='ms-4'>
            Search
          </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
