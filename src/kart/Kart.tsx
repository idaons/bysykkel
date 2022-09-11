import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import Leaflet, { LatLngBoundsExpression } from "leaflet";
import { StationInformationType } from "../api/useStationInformation";
import StasjonStatus from "../stasjonStatus/StasjonStatus";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";

const markerIcon = Leaflet.icon({ iconUrl: "/images/marker-icon.png" });
const INITIAL_BOUNDS: LatLngBoundsExpression = [
  [59.89843428245928, 10.651118],
  [59.9534114, 10.81431433498766],
];
const INITIAL_ZOOM = 12;

const StyledMapContainer = styled(MapContainer)`
  height: max(20rem, 60vh);
  width: 100%;
  margin-bottom: 20px;

  .leaflet-marker-icon {
    border-radius: 50%;
    filter: drop-shadow(0 0 0.5rem hsl(0, 0%, 40%, 0.5));
  }
`;

const StyledPopup = styled(Popup)`
  p {
    margin: 0;
  }
`;

interface Props {
  stasjoner: StationInformationType[];
}

const MapController = (props: Props) => {
  const map = useMap();

  const bounds = useMemo<LatLngBoundsExpression | null>(() => {
    if (props?.stasjoner?.length > 0) {
      const latitudes = props.stasjoner?.map((stasjoner) => stasjoner.lat);
      const longitudes = props.stasjoner?.map((stasjoner) => stasjoner.lon);
      return [
        [Math.min(...latitudes), Math.min(...longitudes)],
        [Math.max(...latitudes), Math.max(...longitudes)],
      ];
    } else {
      return null;
    }
  }, [props.stasjoner]);

  const [debouncedValue, setDebouncedValue] =
    useState<LatLngBoundsExpression | null>(bounds);

  useDebounce(
    () => {
      setDebouncedValue(bounds);
    },
    500,
    [bounds]
  );

  useEffect(() => {
    if (map && debouncedValue) {
      map.fitBounds(debouncedValue, { maxZoom: 14, padding: [20, 30] });
    } else if (map) {
      map.fitBounds(INITIAL_BOUNDS, { maxZoom: 12, padding: [20, 30] });
    }
  }, [debouncedValue, map]);

  return <></>;
};
const Kart = (props: Props) => {
  return (
    <StyledMapContainer
      bounds={INITIAL_BOUNDS}
      zoom={INITIAL_ZOOM}
      scrollWheelZoom={false}
    >
      <MapController stasjoner={props.stasjoner} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.stasjoner.map((stasjon) => (
        <Marker
          key={stasjon.station_id}
          icon={markerIcon}
          position={[stasjon.lat, stasjon.lon]}
        >
          <StyledPopup>
            <StasjonStatus stasjon={stasjon} />
          </StyledPopup>
        </Marker>
      ))}
    </StyledMapContainer>
  );
};
export default Kart;
