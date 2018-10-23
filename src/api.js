import axios from 'axios';
import qs from 'qs';

export default {
  getInfo(addr) {
    return axios
      .get('/api/info?' + qs.stringify({ addr }))
      .then(({ data: { data } }) => {
        return data;
      })
      .catch(({ response: { data: { error } } }) => {
        throw new Error(error);
      });
  },
  invoke() {
    axios
      .post('/api/invoke', {
        package_name: this.props.package_name,
        service_name: this.props.service_name,
        method_name: this.props.name,
        addr: this.props.addr,
        grpc_args: args,
      })
      .then(resp => {
        return resp.data.data;
      })
      .catch(error => {
        if (error.response) {
          throw new Error(error.response.data.error);
        }
        throw error;
      });
  },
};
