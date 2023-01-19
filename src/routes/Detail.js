import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

function Detail() {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    console.log(json);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      <h1>
        {movie.title} : {movie.year}
      </h1>
      <img src={movie.medium_cover_image} />
      <h3>{movie.description_full}</h3>
      <ul>
        {movie.genres?.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

export default Detail;
