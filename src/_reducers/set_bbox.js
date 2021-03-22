//import { SAVE_DATASET } from "../_actions/types";

import { SAVE_DATASET } from "../_actions/types";

export default function setBbox(state = {}, action) {
  switch (action.type) {
    case SAVE_DATASET:
      return { ...state, bbox: action.bbox };
    default:
      return state;
  }
}
