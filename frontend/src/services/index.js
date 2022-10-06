import axios from 'axios'

export const api = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

/*
export const behavior = (method, urn, body, onSuccess, onFailure) => {
  // Map Request Methods
  const verbs = {
    post: api.post,
    put: api.put,
    get: api.get,
    delete: api.delete
  }

  // Configure Request Call
  const call = body
    ? verbs[method](urn, body) // Create, Update
    : verbs[method](urn) // Read

  // Send Request to Api
  call.then(response => {
    if ([200, 201, 204].includes(response.status)) {
      onSuccess(response)
    }
  }, error => {
    onFailure(error.message + (error.response.status === 422 ? ' => ' + error.response.data.errors : ''))
    return Promise.reject(error)
  })
}

// Map methods for ease function calls
export const request = {
  post: (urn, body, onSuccess, onFailure) => behavior('post', urn, body, onSuccess, onFailure),
  put: (urn, body, onSuccess, onFailure) => behavior('put', urn, body, onSuccess, onFailure),
  get: (urn, onSuccess, onFailure) => behavior('get', urn, null, onSuccess, onFailure),
  delete: (urn, onSuccess, onFailure) => behavior('delete', urn, null, onSuccess, onFailure)
}
 */
