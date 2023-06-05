import apiClient from "../axios/index";

export async function Agreement(invoiceData) {
  return apiClient
    .post("/legal.service", invoiceData)
    .then((response) => {
      if (response) {
        // console.log({ newuser: response.data });
        return response.data;
      }
      return false;
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
}