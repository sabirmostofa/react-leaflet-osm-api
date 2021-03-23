import osmtogeojson from "osmtogeojson";
import axios from "axios";

export const fetchData = async (bbox) => {
  let response;
  try {
    response = await axios(
      `https://api.openstreetmap.org/api/0.6/map?bbox=` + bbox.bbox.join(",")
    );
  } catch (err) {
    //test alert
    alert("OSM API error. " + err.message);
    return;
  }

  console.log(osmtogeojson(response.data));
  return osmtogeojson(response.data);
};
