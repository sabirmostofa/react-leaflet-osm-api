import { fetchData } from "../common/api_functions";

window.alert = jest.fn();

test("GeoJson Data check", () => {
  window.alert.mockClear();
  let bbox1 = {
    bbox: [
      13.416259288787844,
      52.53641008538931,
      13.416430950164797,
      52.53654386595584,
    ],
  };

  return fetchData(bbox1).then((response) =>
    expect("type" in response).toBe(true)
  );
});

test("Too large box for OSM API", () => {
  window.alert.mockClear();
  let bbox2 = {
    bbox: [
      13.3154296875,
      52.30176096373671,
      14.750518798828127,
      52.564664624217016,
    ],
  };

  return fetchData(bbox2).then((response) => expect(response).toBe(undefined));
});
