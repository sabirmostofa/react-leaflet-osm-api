import "../css/App.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import LeafletMap from "./LeafletMap";

function App() {
  return (
    <div className="App">
      <div className="Body">
        <LeafletMap />
      </div>
    </div>
  );
}

export default App;
