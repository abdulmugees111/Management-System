import apiClient from "../axios";

export async function get_ticket(ticket_id) {
    return apiClient
      .get(`/help/tickets/${ticket_id}`)
      .then((response) => {
        if (response) {
          return response.data.record;
        }
        return false;
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  }
  
export async function get_ticket_messages(ticket_id) {
    return apiClient
      .get(`/help/messages/${ticket_id}`)
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

  export async function post_ticket_message({ticket_id, message}) {
  console.log(ticket_id, message)
    return apiClient
      .post(`/help/messages/${ticket_id}`,{'message': message})
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

