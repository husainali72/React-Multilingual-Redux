import axios from 'axios';

export default (token = null) => {
  if (token) {
    localStorage.token = token;
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
    return true;
  }
  delete axios.defaults.headers.common.authorization;
  localStorage.removeItem('loggedUser');
  localStorage.removeItem('token');
  localStorage.removeItem('selectedProduct');
  localStorage.removeItem('sectionData');
  localStorage.removeItem('curriculum');
  return true;

};
