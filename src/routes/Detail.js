import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Movie from "../components/Movie";
import styles from "./Detail.module.css";
function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [windowSize, setWindowSize] = useState();
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };
  useEffect(() => {
    getMovie();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return loading ? null : (
    <div
      className={styles.background}
      style={
        windowSize < 900
          ? {
              background: `  url(${movie.background_image}) 0% 0% / cover`,
            }
          : {
              background: `  url(${movie.background_image}) 0% 0% / cover no-repeat `,
              height: "100vh",
            }
      }
    >
      <div
        className={styles.movie__detail}
        style={
          windowSize < 900
            ? { flexDirection: "column" }
            : { flexDirection: "row" }
        }
      >
        <img src={movie.medium_cover_image} className={styles.img} />
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
