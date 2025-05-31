import axios from 'axios';
import { headers } from '../utils';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

class QueryService {

    getQueries(){
        return axios.get(`${apiBaseUrl}/queries`,{
          headers: headers()
        });
    }

    createQuery(query,){
        return axios.post(`${apiBaseUrl}/queries/test`, query,{
          headers: headers()
        });
    }

    getQueryById(queryId){
        return axios.get(`${apiBaseUrl}/queries/${queryId}`,{
          headers: headers()
        });
    }

    updateQuery(query, queryId){
        return axios.put(`${apiBaseUrl}/queries/${queryId}`, query,{
          headers: headers()
        });
    }

    deleteQuery(queryId){
        return axios.delete(`${apiBaseUrl}/queries/${queryId}`,{
          headers: headers()
        });
    }
}

export default new QueryService()