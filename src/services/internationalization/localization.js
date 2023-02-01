import apiClient from "../axios";

export async function change_language(lang) {
  let languageToSet="en_US" 
  if(lang==="ar"){
    languageToSet="ar_001"
  }
  console.log(languageToSet)
    return apiClient
      .get(`/localization?lang=${languageToSet}`)
      .then((response) => {
        if (response) {
          console.log("Change res",response)
          return response.data;
        }
        return false;
      })
      .catch((err) => {
        console.log("Change res err",err);
        throw new Error(err);
      });
  }
