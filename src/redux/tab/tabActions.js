export const SET_MODAL_VISIBILITY = 'SET_MODAL_VISIBILITY'

export const setModalVisibilitySuccess = (isVisible) => ({
  type: SET_MODAL_VISIBILITY,
  payload: { isVisible }
})

export function setModalVisibility(isVisible) {
  return dispatch => {
    dispatch(setModalVisibility(isVisible));
  }
  
}