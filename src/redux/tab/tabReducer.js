import * as tabActionTypes from './tabActions';

const initialState = {
  isModalVisible: false
}

const tabReducer = (state = initialState, action) => {
  switch (action.type) {
    case tabActionTypes.SET_MODAL_VISIBILITY:
      return {
        ...state,
        isModalVisible: action.payload.isVisible
      }
    default:
      return state
  }
}

export default tabReducer;