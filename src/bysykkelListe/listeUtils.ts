import { StationInformationType } from "../api/useStationInformation";

export const sortStasjoner = (stasjoner: StationInformationType[]) =>
  stasjoner
    .slice()
    .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
