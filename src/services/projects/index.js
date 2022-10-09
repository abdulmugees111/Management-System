import apiClient from '../axios/index'

export async function getProject(app_name) {
  return apiClient
    .get(`/project/${app_name}`, {
    })
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => {
      console.log(err)
      return err
    })
}

export async function getAllProjects(){
  return apiClient
    .get(`/get_projects/`, {
    })
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}