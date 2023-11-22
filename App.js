import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import SingleCountry from './pages/SingleCountry';

const App = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // get the initial country list
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountriesList(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []); // ensures this effect runs only once on component mount

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <Router>
      <Container>
        <Row>
          <Col>
            <NavBar handleSearchChange={handleSearchChange} />
            <Routes>
              <Route
                path="/"
                element={<Home countriesList={countriesList} searchTerm={searchTerm} />}
              />
              <Route path="/country/:name" element={<SingleCountry />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default App;
