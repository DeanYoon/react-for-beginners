import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";
function Movie({ id, title, year, synopsis, coverImg, genres, rating }) {
  const [movie, setMovie] = useState({});

  const showMovieInfo = (event) => {
    const parsed = event.target.parentElement.parentElement;
    const movieInfo = parsed.querySelector("div");
    setMovie(movieInfo);
    movieInfo.style.display = "block";
  };
  const unshowMovieInfo = (event) => {
    movie.style.display = "none";
  };
  return (
    <div className={styles.movie}>
      <Link to={`/movie/${id}`}>
        <img
          src={coverImg}
          onMouseOver={showMovieInfo}
          className={styles.movie__img}
        />
        <div className={styles.movie__info} onMouseLeave={unshowMovieInfo}>
          <h3>
            {title} : {year}
          </h3>
          <div>
            {synopsis.length < 237 ? synopsis : `${synopsis.slice(0, 237)},,,`}
          </div>

          <ul>
            {genres?.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <div>Rating : {rating ? rating : "No data"}</div>
        </div>
      </Link>
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
