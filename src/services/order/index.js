import apiClient from "../axios/index";

export async function getPricings() {
  return apiClient
    .get(`/pricing`)
    .then((response) => {
      if (response) {
        return response.data;
      }
      return false;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}


export async function getStripeSession(plan_id) {
  return apiClient
    .post(`/stripe/create-checkout-session`,{
      plan_id: plan_id
    })
    .then((response) => {
      if (response) {
        return response.data;
      }
      return false;
    })
    .catch((err) => {
      console.log({err});
      return err;
    });
}