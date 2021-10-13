import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';

import { Link, useParams } from 'react-router-dom';
import './styles.scss';

const CountryDetails = () => {
  const [countryDetails, setCountryDetails] = useState('');

  const { countryId } = useParams();

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v2/alpha/${countryId}`
        );
        setCountryDetails(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountryDetails();
  }, [countryId]);

  return (
    <main className="countryDetails">
      <Link className="countryDetails__back" to="/">
        <BsArrowLeft />
        <span>Back</span>
      </Link>

      <div className="container">
        <div className="container__img">
          <img src={countryDetails.flag} alt="" />
        </div>
        <div className="container__details">
          <div className="container__details-info">
            <h1>{countryDetails.name}</h1>
            <div>
              <ul>
                <li>
                  Native Name: <span>{countryDetails.nativeName}</span>
                </li>
                <li>
                  Population:
                  <span>
                    {new Intl.NumberFormat('en-US', {
                      maximumSignificanDigits: 3,
                    }).format(countryDetails.population)}
                  </span>
                </li>
                <li>
                  Region: <span>{countryDetails.region}</span>
                </li>
                <li>
                  Sub Region: <span>{countryDetails.subregion}</span>
                </li>
                {countryDetails.capital && (
                  <li>
                    Capital: <span>{countryDetails.capital}</span>
                  </li>
                )}
              </ul>
              <ul>
                {countryDetails.topLevelDomain && (
                  <li>
                    Top Level Domain:{' '}
                    <span>{countryDetails.topLevelDomain[0]}</span>
                  </li>
                )}
                {countryDetails.currencies && (
                  <li>
                    Currencies:
                    {countryDetails.currencies.map((curr, index) => (
                      <span key={index}>{curr.name}</span>
                    ))}
                  </li>
                )}
                {countryDetails.languages && (
                  <li>
                    Languages:
                    {countryDetails.languages.map((language, index) => (
                      <span key={index}>{language.name}</span>
                    ))}
                  </li>
                )}
              </ul>
            </div>
          </div>
          {countryDetails.borders && (
            <div className="container__details-borders">
              <h2>Border Countries:</h2>
              <ul>
                {countryDetails.borders.map((border, index) => (
                  <Link key={index} to={`/country/${border}`}>
                    <li>{border}</li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CountryDetails;
