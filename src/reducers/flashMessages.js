import * as actions from "../constants";
import shortid from "shortid";
import findIndex from "lodash/findIndex";

const flashMessages = (state = [], action = {}) => {
  switch (action.type) {
    case actions.ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(), // 生成随机id
          type: action.message.type,
          text: action.message.text,
        },
      ]; // 注意不是{}，因为state原本是数组
    case actions.DELETE_FLASH_MESSAGE:
      // 在一个数组中，返回当前查找元素的位置
      const index = findIndex(state, { id: action.id });
      if (index >= 0) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return state;
    default:
      return state;
  }
};
export default flashMessages;
