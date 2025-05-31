import axios from 'axios';
import { headers } from '../utils';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
class DatabaseService {

  getDatabases() {
    return axios.get(`${apiBaseUrl}/databases`, {
      headers: headers()
    });
  }

  createDatabase(database) {
    return axios.post(`${apiBaseUrl}/databases`, database, {
      headers: headers()
    });
  }

  getDatabaseById(databaseId) {
    return axios.get(`${apiBaseUrl}/databases/${databaseId}`, {
      headers: headers()

    });
  }

  updateDatabase(database, databaseId) {
    return axios.put(`${apiBaseUrl}/databases/${databaseId}`, database, {
      headers: headers()
    });
  }

  deleteDatabase(databaseId) {
    return axios.delete(`${apiBaseUrl}/databases/${databaseId}`, {
      headers: headers()
    });
  }
}

export default new DatabaseService()

// annotations:
//   nginx.ingress.kubernetes.io/configuration-snippet: |
//     add_header Access-Control-Allow-Origin $http_origin;
//     add_header Access-Control-Allow-Methods "POST, GET, OPTIONS";
//     add_header Access-Control-Allow-Credentials true;