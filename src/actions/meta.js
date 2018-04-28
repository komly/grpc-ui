import axios from 'axios';
import qs from 'qs';

import {
  FETCH_META_COMPLETE,
  FETCH_META_START,
  FETCH_META_FAILURE,
  TOGGLE_METHOD
} from '../types';

export const fetchMetaStart = () => ({
  type: FETCH_META_START
});

export const fetchMetaFailure = error => ({
  type: FETCH_META_FAILURE,
  error
});

export const fetchMetaComplete = meta => ({
  type: FETCH_META_COMPLETE,
  meta
});

export const fetchMeta = addr => dispatch => {
  dispatch(fetchMetaStart());
  axios
    .get(`/api/info?${qs.stringify({ addr })}`)
    .then(({ data }) => {
      dispatch(fetchMetaComplete(data.data));
    })
    .catch(({ response: { data: { error } } }) => {
      dispatch(fetchMetaFailure(error));
    });
};

export const toggleMethod = (package_name, service_name, method_name) => ({
  type: TOGGLE_METHOD,
  package_name,
  service_name,
  method_name
});
