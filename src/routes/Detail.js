import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Movie from "../components/Movie";
import styles from "./Detail.module.css";
function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return loading ? null : (
    <div
      className={styles.background}
      style={{
        background: `  url(${movie.background_image}) 0% 0% / cover no-repeat `,
      }}
    >
      <div className={styles.movie__detail}>
        <img src={movie.medium_cover_image} />
        <div className={styles.movie__detail__info}>
          <h1 className={styles.movie__detail__info__title}>
            {loading ? "Loading.." : movie.title + "(" + movie.year + ")"}
          </h1>

          <h3>{movie.description_full}</h3>
          <ul>
            {movie.genres?.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <Link to="/">
            <span className={styles.backBtn}>Back</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Detail;
