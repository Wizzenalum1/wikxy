import { UPDATE_POSTS } from "./actionTypes.js";
import { APIUrls } from "../helpers/urls";
export function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts();
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(updatePosts(data.posts));
      })
      .catch((err) => {
        console.log("error in fetch posts", err);
      });
  };
}

export function updatePosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}
