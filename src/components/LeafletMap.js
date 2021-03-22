import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";

import L from "leaflet";
import axios from "axios";
import osmtogeojson from "osmtogeojson";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import { useSelector } from "react-redux";

import DrawRectangle from "./DrawRectangle";

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

  const [data, setData] = useState({});

  useEffect(() => {
    if (!bbox || !bbox.bbox) return;

    //console.log(bbox);

    const fetchData = async () => {
      const result = await axios(
        `https://api.openstreetmap.org/api/0.6/map?bbox=` + bbox.bbox.join(",")
      );

      setData(osmtogeojson(result.data));
    };

    fetchData();
  }, [bbox]);

  return (
    <MapContainer center={[52.52005, 13.405]} zoom={25} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {"type" in data && <GeoJSON data={data} />}
      <DrawRectangle />
    </MapContainer>
  );
};
export default LeafletMap;
