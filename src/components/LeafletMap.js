import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useSelector } from "react-redux";
import DrawRectangle from "./DrawRectangle";
import { fetchData } from "../common/api_functions";

//set default icon
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

//map container component
const LeafletMap = (props) => {
  const bbox = useSelector((state) => {
    return state.bbox;
  });

  let [data, setData] = useState({});
  useEffect(() => {
    if (!bbox || !bbox.bbox) return;

    fetchData(bbox).then((response) => {
      if (response && "type" in response) setData(response);
    });
  }, [bbox]);

  //Show Tooltip on features
  const onEachFeat = (feauture, layer) => {
    //console.log(feauture);
    let name = "name" in feauture.properties ? feauture.properties.name : "";
    layer.bindPopup("User: " + feauture.properties.user + "<br/>" + name);
  };

  return (
    <MapContainer
      center={[52.535923713653496, 13.417981457869095]}
      zoom={25}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Use unique key to update data */}
      {"type" in data && (
        <GeoJSON
          key={JSON.stringify(data)}
          data={data}
          onEachFeature={onEachFeat}
        />
      )}
      <DrawRectangle />
    </MapContainer>
  );
};
export default LeafletMap;
