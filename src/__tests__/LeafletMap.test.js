import { render } from "@testing-library/react";
import LeafletMap from "../components/LeafletMap";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "../_reducers";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

test("LeafletMap component should render:", () => {
  render(
    <Provider store={store}>
      <LeafletMap />
    </Provider>
  );
});
