import {
  StationInformationResponse,
  StationInformationType,
  stationInformationUrl,
} from "../src/api/useStationInformation";
import {
  StationStatusResponse,
  stationStatusUrl,
} from "../src/api/useStationStatus";
import { rest } from "msw";
import { mockedStationInformation, mockedStationStatus } from "./mockData";

export const handlers = [
  rest.get(stationInformationUrl, async (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json(mockedStationInformation));
  }),
  rest.get(stationStatusUrl, async (req, res, ctx) => {
    return res(ctx.json(mockedStationStatus));
  }),
];
