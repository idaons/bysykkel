import useSWR from "swr";
import { fetcher } from "./api";

export const stationStatusUrl =
  "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json";

export type StationStatusType = {
  station_id: string;
  num_bikes_available: number;
  num_docks_available: number;
};

type StationStatusResponse = {
  data: { stations: StationStatusType[] };
};

export const useStationStatus = () =>
  useSWR<StationStatusResponse>(stationStatusUrl, fetcher, {
    refreshInterval: 30 * 1000,
  });
