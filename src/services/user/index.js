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
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
}

export async function get_user_data(partner_id) {
  return apiClient
    .get(`/res.partner/${partner_id}`)
    .then((response) => {
      if (response) {
        return response.data;
      }
      return false;
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
}
