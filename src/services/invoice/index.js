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

export async function get_invoice(invoice_id) {
  return apiClient
    .get(`/invoice/${invoice_id}`)
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
