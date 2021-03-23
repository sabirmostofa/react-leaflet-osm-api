import { SAVE_DATASET } from "./types";

export function setBbox(LeftBottomRightTop) {
  return {
    type: SAVE_DATASET,
    bbox: LeftBottomRightTop,
  };
}
