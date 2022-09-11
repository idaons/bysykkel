import useSWR from "swr";
import { fetcher } from "./api";

export const stationInformationUrl =
  "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json";

export type StationInformationType = {
  station_id: string;
  name: string;
};

export type StationInformationResponse = {
  data: { stations: StationInformationType[] };
};

export const useStationInformation = () =>
  useSWR<StationInformationResponse>(stationInformationUrl, fetcher);
