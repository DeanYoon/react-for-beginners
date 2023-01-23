import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";
function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(0);
  const [popular, setPopular] = useState("");
  const [year, setYear] = useState("desc");
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?limit=50&minimum_rating=${rating}&order_by=${year}&sort_by=${popular}&page=1&genre=${genre}`
      )
    ).json();

    setMovies(json.data.movies);
    setLoading(false);
  };
  const onChangeGenre = (event) => {
    setGenre(event.target.value);
  };
  const onChangeRating = (event) => {
    setRating(event.target.value);
  };
  const onChangePopular = (event) => {
    event.target.value === "True"
      ? setPopular("download_count")
      : setPopular("");
  };
  const onChangeYear = (event) => {
    event.target.value === "True" ? setYear("desc") : setYear("asc");
  };
  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    getMovies();
  }, [genre, rating, popular, year]);
  return (
    <div>
      <div className="header">
        <select onChange={onChangeGenre}>
          <option>--Choose Genre--</option>
          <option id="comedy" value="comedy">
            comedy
          </option>
          <option id="horror">horror</option>
          <option id="romance">romance</option>
          <option id="action">action</option>
          <option id="thriller">thriller</option>
          <option id="drama">drama</option>
          <option id="animation">animation</option>
          <option id="superhero">superhero</option>
          <option id="fantasy">fantasy</option>
          <option id="mystery">mystery</option>
        </select>
        <select onChange={onChangeRating}>
          <option>--Choose Rating--</option>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
        </select>
        <select onChange={onChangePopular}>
          <option>--Sort by popularity--</option>
          <option>True</option>
          <option>False</option>
        </select>
        <select onChange={onChangeYear}>
          <option>--Sort by year--</option>
          <option>True</option>
          <option>False</option>
        </select>
      </div>
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
              synopsis={movie.description_full}
              genres={movie.genres}
              year={movie.year}
              backImg={movie.background_image_original}
              rating={movie.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
