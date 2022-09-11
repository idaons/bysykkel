import React, { useState } from "react";
import { useStationInformation } from "../api/useStationInformation";
import StasjonStatus from "../stasjonStatus/StasjonStatus";
import styled from "styled-components";
import { headerId } from "../../pages/index.page";
import { sortStasjoner } from "./listeUtils";

const StyledLabel = styled.label`
  display: block;
`;
const StyledInput = styled.input`
  padding: 4px;
  margin-bottom: 1.5rem;
`;

const StyledList = styled.ul`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
`;

const StyledListItem = styled.li`
  list-style: none;
  display: inline-block;
  &:not(:last-of-type) {
    padding-bottom: 0.5rem;

    margin-bottom: 0.5rem;
  }
`;

const BysykkelListe = () => {
  const { data: stasjonResponse, error: stasjonError } =
    useStationInformation();
  const [inputValue, setInputValue] = useState("");
  const sorterteStasjoner = sortStasjoner(stasjonResponse?.data.stations ?? []);

  const filtrerteStasjoner =
    inputValue.length > 0
      ? sorterteStasjoner?.filter((item) =>
          item.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      : sorterteStasjoner;

  if (stasjonError) {
    return <div>Kunne ikke hente bysykkelstasjoner.. </div>;
  }

  return (
    <>
      <StyledLabel htmlFor="sok">Søk etter stativ:</StyledLabel>
      <StyledInput
        type="search"
        id="sok"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <span className="sr-only" aria-live="assertive" aria-atomic="true">
        {filtrerteStasjoner?.length} treff
      </span>
      {filtrerteStasjoner?.length === 0 && stasjonResponse !== undefined ? (
        <p>Vi fant ingen stasjoner som matcher søket ditt. </p>
      ) : (
        <StyledList aria-labelledby={headerId}>
          {filtrerteStasjoner?.map((station) => (
            <StyledListItem key={station.station_id}>
              <StasjonStatus station={station} />
            </StyledListItem>
          ))}
        </StyledList>
      )}
    </>
  );
};
export default BysykkelListe;
