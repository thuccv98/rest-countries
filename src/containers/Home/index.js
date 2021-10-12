import { FaSearch } from 'react-icons/fa';
import { BiChevronLeft } from 'react-icons/bi';
import './styles.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    const fetchCountriesList = async () => {
      try {
        const url = 'https://restcountries.com/v2/all';
        const response = await axios.get(url);
        setCountriesList(response.data);
      } catch (error) {
        console.log('Failed to fetch countries list', error);
      }
    };
    fetchCountriesList();
  }, []);

  return (
    <main className="home">
      {/* search section */}
      <div className="search">
        <div className="search__bar">
          <FaSearch className="icon" />
          <input type="search" placeholder="Search for a country..." />
        </div>
        <details className="search__filter">
          <summary>
            <span>Filter by Region</span>
            <BiChevronLeft className="icon" />
          </summary>
          <div>
            <button type="button" value="Africa">
              Africa
            </button>
            <button type="button" value="America">
              America
            </button>
            <button type="button" value="Asia">
              Asia
            </button>
            <button type="button" value="Europe">
              Europe
            </button>
            <button type="button" value="Oceania">
              Oceania
            </button>
          </div>
        </details>
      </div>

      {/* list contries section */}
      <div className="cardGrid">
        {countriesList.map((country) => {
          return (
            <div className="card">
              <div className="card__img">
                <img src={country.flag} alt="" />
              </div>
              <div className="card__details">
                <h2>{country.name}</h2>
                <ul>
                  <li>
                    Population:{' '}
                    <span>
                      {new Intl.NumberFormat('en-US', {
                        maximumSignificantDigits: 3,
                      }).format(country.population)}
                    </span>
                  </li>
                  <li>
                    Region: <span>{country.region}</span>
                  </li>
                  {country.capital && (
                    <li>
                      Capital: <span>{country.capital}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
