import apiClient from "../axios";


export async function get_article(article_id) {
    return apiClient
      .get(`/kb/article/${article_id}`)
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
  