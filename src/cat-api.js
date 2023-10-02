import axios from "axios";

axios.defaults.headers.common["x-api-key"] =
  "live_AiMZf0stFjagX1leKvEHB9OHF0RowZHpTaQJ6iBvQ6F7mSWYpD6CNOLuq6R8mdxE";

export function fetchBreeds() {
  return axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then((res) => res.data);
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((res) => res.data);
}