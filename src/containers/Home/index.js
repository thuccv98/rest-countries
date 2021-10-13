import { FaSearch } from 'react-icons/fa';
import { BiChevronLeft } from 'react-icons/bi';
import './styles.scss';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [search, setSearch] = useState('');
  const [filterKey, setFilterKey] = useState('name');
  const searchRef = useRef(null);

  // function handle search by name
  const handleSearch = () => {
    const value = searchRef.current.value;
    setFilterKey('name');
    setSearch(value);
  };

  // function handle filter by region
  const handleFilter = (e) => {
    const value = e.target.value;

    if (value) {
      setFilterKey('region');
      setSearch(value);
    }
  };

  // danh sach country duoc loc theo yeu cau
  const filteredCountries = countriesData.filter((country) =>
    country[filterKey].toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchCountriesList = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v2/all');
        setCountriesData(response.data);
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
          <input
            ref={searchRef}
            type="search"
            placeholder="Search for a country..."
            onChange={handleSearch}
          />
        </div>
        <details className="search__filter">
          <summary>
            <span>Filter by Region</span>
            <BiChevronLeft className="icon" />
          </summary>
          <div onClick={handleFilter}>
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
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div className="card" key={country.alpha3Code}>
              <Link to={`/country/${country.alpha3Code}`}>
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
              </Link>
            </div>
          ))
        ) : (
          <p>No results found for: {search}</p>
        )}
      </div>
    </main>
  );
};

export default Home;
