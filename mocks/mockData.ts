import { StationInformationResponse } from "../src/api/useStationInformation";
import { StationStatusResponse } from "../src/api/useStationStatus";

export const mockedStationInformation: StationInformationResponse = {
  data: {
    stations: [
      {
        station_id: "1",
        name: "TestStasjon",
      },
      {
        station_id: "2",
        name: "TestStasjon2",
      },
      {
        station_id: "3",
        name: "TestStasjon3",
      },
    ],
  },
};

export const mockedStationStatus: StationStatusResponse = {
  data: {
    stations: [
      {
        station_id: "1",
        num_bikes_available: 0,
        num_docks_available: 10,
      },
      {
        station_id: "2",
        num_bikes_available: 10,
        num_docks_available: 0,
      },
      {
        station_id: "3",
        num_bikes_available: 5,
        num_docks_available: 6,
      },
    ],
  },
};
