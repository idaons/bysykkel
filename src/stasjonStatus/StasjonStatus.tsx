import { StationStatusType, useStationStatus } from "../api/useStationStatus";
import styled from "styled-components";
import React from "react";
import { StationInformationType } from "../api/useStationInformation";

interface Props {
  station: StationInformationType;
}

const StatusWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const StyledStasjonsNavn = styled.h2`
  color: var(--bysykkel-color);
  word-wrap: break-word;
`;

const StasjonStatus = (props: Props) => {
  const { data: statusResponse, error: statusError } = useStationStatus();

  const stasjonStatus = statusResponse?.data.stations.find(
    (it) => it.station_id === props.station.station_id
  );
  return (
    <>
      <StyledStasjonsNavn>{props.station.name}</StyledStasjonsNavn>
      {statusError && <div>Klarte ikke hente status for stasjonen..</div>}
      {stasjonStatus && (
        <StatusWrapper>
          <div data-testid="ledige-sykler">
            <p>Ledige sykler: </p>
            <p>{stasjonStatus.num_bikes_available} 🚲</p>
          </div>
          <div data-testid="tilgjengelige-låser">
            <p>Tilgjengelige låser: </p>
            <p>{stasjonStatus.num_docks_available} 🔒</p>
          </div>
        </StatusWrapper>
      )}
    </>
  );
};
export default StasjonStatus;
