import apiClient from "../axios";

export async function get_sections() {
  return apiClient
    .get("/kb/sections")
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

