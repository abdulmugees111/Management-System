import apiClient from "../axios";

export async function register_user(userData) {
  return apiClient
    .post("/register", userData)
    .then((response) => {
      if (response) {
        console.log({ newuser: response.data });
        return response.data;
      }
      return false;
    })
    .catch((err) => console.log(err));
}
