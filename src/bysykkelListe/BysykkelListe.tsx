import React, { useEffect, useState, useMemo } from "react";

import {
  StationInformationType,
  useStationInformation,
} from "../api/useStationInformation";
import { useStationStatus } from "../api/useStationStatus";
import StasjonStatus from "../stasjonStatus/StasjonStatus";
import styled from "styled-components";

const StyledLabel = styled.label`
  display: block;
`;
const StyledInput = styled.input`
  padding: 4px;
  margin-bottom: 1.5rem;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
`;

const StatusWrapper = styled.div`
  &:not(:last-of-type) {
    padding-bottom: 0.5rem;

    margin-bottom: 0.5rem;
  }
`;
const StyledStasjonsNavn = styled.h2`
  color: var(--bysykkel-color);
  word-wrap: break-word;
`;

const BysykkelListe = () => {
  const { data: stasjonResponse, error: stasjonError } =
    useStationInformation();
  const { data: statusResponse, error: statusError } = useStationStatus();
  const [inputValue, setInputValue] = useState("");
  const sorterteStasjoner = useMemo(
    () =>
      stasjonResponse?.data.stations.sort((a, b) => (a.name > b.name ? 1 : -1)),
    [stasjonResponse]
  );

  const [filtrerteStasjoner, setFiltrerteStasjoner] = useState<
    StationInformationType[] | undefined
  >(sorterteStasjoner);

  useEffect(() => {
    const sokeResultat = sorterteStasjoner?.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFiltrerteStasjoner(sokeResultat);
  }, [inputValue, sorterteStasjoner]);

  if (stasjonError) {
    return <div>Kunne ikke hente bysykkelstasjoner.. </div>;
  }

  return (
    <>
      <StyledLabel htmlFor="sok">Søk etter stativ: </StyledLabel>
      <StyledInput
        type="search"
        id="sok"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <span className="sr-only" aria-live="assertive" aria-atomic="true">
        {filtrerteStasjoner?.length} treff
      </span>
      <StyledGrid>
        {filtrerteStasjoner?.map((station) => {
          const stasjonStatus = statusResponse?.data.stations.find(
            (it) => it.station_id === station.station_id
          );
          return (
            <StatusWrapper key={station.station_id}>
              <StyledStasjonsNavn>{station.name}</StyledStasjonsNavn>
              {statusError && (
                <div>Klarte ikke hente status for stasjonen..</div>
              )}
              {stasjonStatus && <StasjonStatus status={stasjonStatus} />}
            </StatusWrapper>
          );
        })}
      </StyledGrid>
      {filtrerteStasjoner?.length === 0 && stasjonResponse !== undefined && (
        <p>Vi fant ingen stasjoner som matcher søket ditt. </p>
      )}
    </>
  );
};
export default BysykkelListe;
