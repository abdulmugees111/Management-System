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
export async function update_user_data(partner_id, formData) {
  return apiClient
    .put(`/res.partner/${partner_id}`,formData)
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
