import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Spinner, Image, Dropdown } from "react-bootstrap";

const SingleCountry = () => {
  let { name } = useParams();

  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((response) => {
        setCountry(response.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching country information:', error);
        setError('Error fetching country information');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (country && country.latlng) {
        const [latitude, longitude] = country.latlng;

        try {
          const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=aadc597e51dd4018a99131322230211&q=${latitude},${longitude}&aqi=no`);
          setWeather(response.data);
        } catch (error) {
          console.error('Error fetching weather:', error);
          setError('Error fetching weather information. Please check your API key and try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    // Call fetchWeather only if country data is available
    if (country) {
      fetchWeather();
    }
  }, [country]);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Row>
      <Col xs={8}>
        <Image src={country.flags.png} className="border-dark square border border-4 width-100%" />
        <p className="fw-bold"><b className="fw-bold text-primary">Common Name  -  </b>{country.name.common}</p>
        <Dropdown drop="end">
  <Dropdown.Toggle variant="info" id="dropdown-basic">
    Show Weather Information
  </Dropdown.Toggle>

  <Dropdown.Menu>
    {weather && weather?.current ? (
      <div>
        <Dropdown.Item>
          <b className="fw-bold text-primary">Temperature : </b>{weather.current.temp_c}°C
        </Dropdown.Item>
        <Dropdown.Item>
          <b className="fw-bold text-primary">Condition - </b>{weather.current.condition.text}
        </Dropdown.Item>
      </div>
    ) : (
      <Dropdown.Item>No Weather Information Available</Dropdown.Item>
    )}
  </Dropdown.Menu>
</Dropdown>

      </Col>

      <Col xs={4}>
      <p><b className="me-6 fw-bold text-primary">Official Name  -  </b>{country.name.official}</p>
      <p><b className="fw-bold text-primary">Region  -  </b>{country.region}</p>
      <p><b className="fw-bold text-primary">Subregion  -  </b>{country.subregion}</p>
      <p><b className="fw-bold text-primary">Currency  -  </b>{Object.values(country.currencies)[0].name}</p>
      <p><b className="fw-bold text-primary">Population  -  </b>{country.population}</p>
      <p><b className="fw-bold text-primary">Capital  -  </b>{country.capital}</p>
      <p><b className="fw-bold text-primary">Borders  -  </b>{country.borders}</p>

      </Col>
    
      <Col xs={12}>
       
        <hr />
        <p className="fw-bold text-primary">Coat Of Arms</p>
        <Image src={country.coatOfArms.png} rounded />
      </Col>

    </Row>
  );
};

export default SingleCountry;



