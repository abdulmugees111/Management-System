import apiClient from "../axios";

export async function get_articles(section_id) {
    return apiClient
      .get(`/kb/article/?section_id=${section_id}`)
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
  