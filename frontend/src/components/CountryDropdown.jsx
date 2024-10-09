import { City, Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import Selector from "./Selector";

const CountryDropdown = () => {
  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const [country, setCountry] = useState(countryData[0]);
  const [state, setState] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state]);

  useEffect(() => {
    if (stateData.length > 0) setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    if (cityData.length > 0) setCity(cityData[0]);
  }, [cityData]);

  return (
    <Container className="min-vh-100 d-flex flex-column justify-content-center">
      <h2 className="text-center text-teal-900 mb-4">
        Country, State and City Selectors
      </h2>
      <Row className="justify-content-center">
        <Col md={8} className="bg-teal-300 rounded-lg p-4">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-teal-800 font-semibold">
                Country:
              </Form.Label>
              <Selector
                data={countryData}
                selected={country}
                setSelected={setCountry}
              />
            </Form.Group>
            {state && (
              <Form.Group className="mb-3">
                <Form.Label className="text-teal-800 font-semibold">
                  State:
                </Form.Label>
                <Selector
                  data={stateData}
                  selected={state}
                  setSelected={setState}
                />
              </Form.Group>
            )}
            {city && (
              <Form.Group className="mb-3">
                <Form.Label className="text-teal-800 font-semibold">
                  City:
                </Form.Label>
                <Selector
                  data={cityData}
                  selected={city}
                  setSelected={setCity}
                />
              </Form.Group>
            )}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CountryDropdown;
