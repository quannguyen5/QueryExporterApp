import axios from 'axios';
import { headers } from '../utils';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

class MetricService {

    getMetrics(){
        return axios.get(`${apiBaseUrl}/metrics`,{
          headers: headers()
      });
    }

    createMetric(metric){
        return axios.post(`${apiBaseUrl}/metrics`, metric,{
          headers: headers()
      });
    }

    getMetricById(metricId){
        return axios.get(`${apiBaseUrl}/metrics/${metricId}`,{
          headers: headers()
      });
    }

    getMetricByName(name){
      return axios.get(`${apiBaseUrl}/metric/?name=${name}`,{
        headers: headers()
    });
  }

    updateMetric(metric, metricId){
        return axios.put(`${apiBaseUrl}/metrics/${metricId}`, metric,{
          headers: headers()
      });
    }

    deleteMetric(metricId){
        return axios.delete(`${apiBaseUrl}/metrics/${metricId}`,{
          headers: headers()
      });
    }
}

export default new MetricService()