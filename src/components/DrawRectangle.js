import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { useSelector, useDispatch } from "react-redux";
import { setBbox } from "../_actions/set_bbox";
import "leaflet-draw";

var editControlAdded = false;

const DrawRectangle = () => {
  const dispatch = useDispatch();

  var map = useMap();
  var editableLayers = new L.FeatureGroup();
  map.addLayer(editableLayers);

  var options = {
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

  var drawControl = new L.Control.Draw(options);
  if (!editControlAdded) {
    map.addControl(drawControl);
    editControlAdded = true;
  }

  map.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
      layer = e.layer;

    if (type === "marker") {
      layer.bindPopup("A popup!");
    }

    editableLayers.clearLayers();
    editableLayers.addLayer(layer);

    let northEast = e.layer._bounds._northEast;
    let southWest = e.layer._bounds._southWest;
    let LeftBottomRightTop = [
      southWest.lng,
      southWest.lat,
      northEast.lng,
      northEast.lat,
    ];

    dispatch(setBbox(LeftBottomRightTop));
  });

  return null;
};

export default DrawRectangle;
