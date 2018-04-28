import { fromJS } from 'immutable';
import {
  FETCH_META_START,
  FETCH_META_COMPLETE,
  FETCH_META_FAILURE,
  TOGGLE_METHOD
} from '../types';

const initialState = fromJS({
  loading: false,
  error: null,
  meta: {
    packages: {}
  }
});

export default function metaReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_META_START:
      return state.mergeDeep({
        loading: true,
        error: null
      });
    case FETCH_META_COMPLETE:
      for (const package_name in action.meta.packages) {
        for (const service of action.meta.packages[package_name]) {
          for (let i = 0; i < service.methods.length; i++) {
            service.methods[i] = {
              ...{
                loading: false,
                error: null,
                result: null
              },
              ...service.methods[i]
            };
          }
        }
      }
      return {
        ...state,
        ...{
          loading: false,
          error: null,
          meta: action.meta
        }
      };
    case FETCH_META_FAILURE:
      return {
        ...state,
        ...{
          loading: false,
          error: action.error,
          meta: {}
        }
      };
    case TOGGLE_METHOD:
      const newState = { ...state };
      for (const package_name in newState.meta.packages) {
        for (const service of newState.meta.packages[package_name]) {
          for (let i = 0; i < newState.methods.length; i++) {
            service.methods[i] = {
              ...{
                expanded: true
              },
              ...service.methods[i]
            };
          }
        }
      }
      return newState;
    default:
      return state;
  }
}
