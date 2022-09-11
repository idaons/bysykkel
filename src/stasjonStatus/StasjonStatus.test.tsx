import { within, render, screen, fireEvent } from "../../test-utils";
import StasjonStatus from "./StasjonStatus";
import {
  mockedStationInformation,
  mockedStationStatus,
} from "../../mocks/mockData";

const station = mockedStationInformation.data.stations[0];
const stationStatuses = mockedStationStatus.data.stations;

describe("StasjonStatus", () => {
  it("shows correct content in a list item", async () => {
    render(<StasjonStatus station={station} />);

    const status = stationStatuses.find(
      (status) => status.station_id === station.station_id
    );

    const heading = screen.getByRole("heading");
    const ledigeSykler = await screen.findByTestId("ledige-sykler");
    const tilgjengeligeLåser = await screen.findByTestId("tilgjengelige-låser");

    expect(heading).toHaveTextContent(station.name);

    expect(ledigeSykler.textContent).toContain(
      `Ledige sykler: ${status?.num_bikes_available}`
    );
    expect(tilgjengeligeLåser.textContent).toContain(
      `Tilgjengelige låser: ${status?.num_docks_available}`
    );
  });
});
