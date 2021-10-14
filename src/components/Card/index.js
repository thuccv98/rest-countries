import { Link } from 'react-router-dom';

const Card = ({ id, flag, name, population, region, capital }) => {
  return (
    <div className="card" key={id}>
      <Link to={`/country/${id}`}>
        <div className="card__img">
          <img src={flag} alt="" />
        </div>
        <div className="card__details">
          <h2>{name}</h2>
          <ul>
            <li>
              Population:{' '}
              <span>
                {new Intl.NumberFormat('en-US', {
                  maximumSignificantDigits: 3,
                }).format(population)}
              </span>
            </li>
            <li>
              Region: <span>{region}</span>
            </li>
            {capital && (
              <li>
                Capital: <span>{capital}</span>
              </li>
            )}
          </ul>
        </div>
      </Link>
    </div>
  );
};

export default Card;
