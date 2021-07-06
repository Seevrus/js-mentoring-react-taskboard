import axios from 'axios'

export const setCsrfToken = token => {
  if (token) {
    axios.defaults.headers.post['X-CSRF-Token'] = token;
    axios.defaults.headers.delete['X-CSRF-Token'] = token;
  }
  else {
    delete axios.defaults.headers.post['X-CSRF-Token']
    delete axios.defaults.headers.delete['X-CSRF-Token']
  }
}
