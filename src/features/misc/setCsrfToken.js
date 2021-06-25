import axios from 'axios'

export const setCsrfToken = token => {
  if (token) {
    axios.defaults.headers.post['X-CSRF-Token'] = token;
  }
  else {
    delete axios.defaults.headers.post['X-CSRF-Token']
  }
}
