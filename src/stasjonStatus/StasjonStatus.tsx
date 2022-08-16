import { StationStatusType } from "../api/useStationStatus";
import styled from "styled-components";

interface Props {
  status: StationStatusType;
}

const StatusWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;
const StasjonStatus = (props: Props) => {
  return (
    <StatusWrapper>
      <div>
        <p>Ledige sykler: </p>
        <p>{props.status.num_bikes_available} 🚲</p>
      </div>
      <div>
        <p>Tilgjengelige låser: </p>
        <p>{props.status.num_docks_available} 🔒</p>
      </div>
    </StatusWrapper>
  );
};
export default StasjonStatus;
