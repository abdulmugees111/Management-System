import apiClient from "../axios";

export async function get_tickets() {
    return apiClient
      .get(`/help/tickets`)
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

export async function create_ticket(ticketData) {
  console.log(ticketData)
    return apiClient
      .post(`/help/ticket/create`, ticketData)
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
