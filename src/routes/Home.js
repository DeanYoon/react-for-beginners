import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";
function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?limit=50&minimum_rating=1&sort_by=year&page=1&genre=comedy`
      )
    ).json();

    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.movies}>
          {movies.map((movie) => (
            <Movie
              id={movie.id}
              key={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              synopsis={movie.synopsis}
              genres={movie.genres}
              year={movie.year}
              backImg={movie.background_image_original}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
