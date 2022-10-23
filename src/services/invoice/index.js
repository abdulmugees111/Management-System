import apiClient from "../axios";

export async function get_invoices() {
  return apiClient
    .get("/invoices")
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
