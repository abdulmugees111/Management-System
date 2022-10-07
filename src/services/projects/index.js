import apiClient from '../axios/index'

export async function getProject(project_id) {
  return apiClient
    .get(`/kk_odoo_saas.app/${project_id}`, {
    })
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
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