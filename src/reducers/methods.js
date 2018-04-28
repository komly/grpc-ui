import {
  INVOKE_METHOD_START,
  INVOKE_METHOD_SUCCESS,
  INVOKE_METHOD_FAILURE
} from '../types';

const initialState = {
  methods: {}
};

export default function metaReducer(state = initialState, action = {}) {
  switch (action.type) {
    case INVOKE_METHOD_START:
      return {
        ...state,
        [action.package_name + action.service_name + action.method_name]: {
          loading: true,
          error: null
        }
      };
    case INVOKE_METHOD_SUCCESS:
      return {
        ...state,
        [action.package_name + action.service_name + action.method_name]: {
          loading: true,
          error: null,
          result: action.result
        }
      };
    case INVOKE_METHOD_FAILURE:
      return {
        ...state,
        ...{
          loading: false,
          error: action.error,
          result: null
        }
      };
    default:
      return state;
  }
}
