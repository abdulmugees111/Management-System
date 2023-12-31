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

export async function get_user_data() {
  return apiClient
    .get(`/user-profile`)
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
export async function update_password(formData) {
  return apiClient
    .post(`/update-password`,{
      old:formData.old_password,
      new1:formData.password,
      new2:formData.confirm_password
    })
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
export async function update_user_data(formData) {
  return apiClient
    .post(`/user-profile`, { ...formData, country_id: formData.country_id[0], state_id: formData.state_id[0] })
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

export async function get_countries() {
  return apiClient
    .get(`/res.country`)
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
export async function get_states(country_id) {
      return apiClient
    .get(`/res.country.state?filters=[["country_id", "=", ${country_id}]]`)
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
