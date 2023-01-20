import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function Movie({ id, title, year, synopsis, coverImg, genres, backImg }) {
  return (
    <div>
      <h1>
        <Link to={`/movie/${id}`}>
          {title} : {year}
        </Link>
      </h1>
      <div>{synopsis}</div>
      <img src={coverImg} />
      <img src={backImg} />
      <ul>
        {genres?.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string),
};

export default Movie;
