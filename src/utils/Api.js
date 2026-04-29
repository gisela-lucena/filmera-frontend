const url = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer ${TOKEN}",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error(err));
