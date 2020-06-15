import * as actions from "../constants";

export const addFlashMessage = (message) => {
  return {
    type: actions.ADD_FLASH_MESSAGE,
    message,
  };
};

export const deleteFlashMessage = (id) => {
  return {
    type: actions.DELETE_FLASH_MESSAGE,
    id,
  };
};
