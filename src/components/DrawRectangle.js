import React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { useDispatch } from "react-redux";
import { setBbox } from "../_actions/set_bbox";
import "leaflet-draw";

const areEqual = (prevProps, nextProps) => true;

//use memo to not rerender this component
const DrawRectangle = React.memo((props) => {
  const dispatch = useDispatch();
  // const bbox = useSelector((state) => state.bbox);
  const map = useMap();
  const editableLayers = new L.FeatureGroup();
  map.addLayer(editableLayers);

  const options = {
    position: "topleft",
    draw: {
      polyline: false,
      polygon: false,
      marker: false,
      circle: false,
      circlemarker: false,
      rectangle: {
        shapeOptions: {
          clickable: false,
        },
      },
    },
    edit: false,
  };

  const drawControl = new L.Control.Draw(options);
  map.addControl(drawControl);

  map.on(L.Draw.Event.CREATED, function (e) {
    const layer = e.layer;
    editableLayers.clearLayers();
    editableLayers.addLayer(layer);

    let northEast = e.layer._bounds._northEast;
    let southWest = e.layer._bounds._southWest;
    let leftBottomRightTop = [
      southWest.lng,
      southWest.lat,
      northEast.lng,
      northEast.lat,
    ];

    dispatch(setBbox(leftBottomRightTop));
  });

  return null;
}, areEqual);

export default DrawRectangle;
