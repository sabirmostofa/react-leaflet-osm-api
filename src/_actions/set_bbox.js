import { SAVE_DATASET } from "./types";

export function setBbox(LeftBottomRightTop) {
  //console.log(osmtogeojson(request.data));

  return {
    type: SAVE_DATASET,
    bbox: LeftBottomRightTop,
  };
}
