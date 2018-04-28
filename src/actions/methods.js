/* eslint import/prefer-default-export: 0 */

import axios from 'axios';
import {
  INVOKE_METHOD_START,
  INVOKE_METHOD_SUCCESS,
  INVOKE_METHOD_FAILURE
} from '../types';

export const invokeMethodFailure = error => ({
  type: INVOKE_METHOD_FAILURE,
  error
});

export const invokeMethodStart = () => ({
  type: INVOKE_METHOD_START
});

export const invokeMethodSuccess = result => ({
  type: INVOKE_METHOD_SUCCESS,
  result
});

export const invokeMethod = (
  package_name,
  service_name,
  method_name,
  addr,
  grpc_args
) => dispatch => {
  dispatch(invokeMethodStart());
  axios
    .post('/api/invoke', {
      package_name,
      service_name,
      method_name,
      addr,
      grpc_args
    })
    .then(resp => {
      dispatch(invokeMethodSuccess(resp.data.data));
    })
    .catch(error => {
      if (error.response) {
        dispatch(invokeMethodFailure(error.response.data.error));
      } else {
        dispatch(invokeMethodFailure(error));
      }
    });
};
