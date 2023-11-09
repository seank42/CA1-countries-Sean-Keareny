import React from 'react';
import { Container, Row } from 'react-bootstrap';
import CountryCard from '../components/CountryCard';

const Home = ({ countriesList, searchTerm }) => {
  let filteredCountries = countriesList;

  if (searchTerm.length > 1) {
    filteredCountries = countriesList.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  let countryCards = filteredCountries.map((country, i) => (
    <CountryCard key={i} flag={country.flags.png} name={country.name.common} region={country.region} />
  ));

  return (
    <Container className='g-4'>
      <Row className='' md={5} xs={1}>
        {countryCards}
      </Row>
    </Container>
  );
};

export default Home;
