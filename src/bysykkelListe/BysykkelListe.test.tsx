import { within, render, screen, fireEvent } from "../../test-utils";
import BysykkelListe from "./BysykkelListe";
import { mockedStationInformation } from "../../mocks/mockData";
import { sortStasjoner } from "./listeUtils";

const stations = mockedStationInformation.data.stations;

describe("BysykkelListe", () => {
  it("shows all stations when not search is used", async () => {
    render(<BysykkelListe />);

    const stationList = await screen.findByRole("list");
    const listItems = await within(stationList).findAllByRole("listitem");
    expect(listItems).toHaveLength(stations.length);
  });

  it("only shows stations with a match in the searchbox", async () => {
    render(<BysykkelListe />);
    const searchInput = await screen.findByRole("searchbox", {
      name: "Søk etter stativ:",
    });

    fireEvent.change(searchInput, { target: { value: "STasjon3" } });
    const stationList = await screen.findByRole("list");
    const listItem = await within(stationList).findAllByRole("listitem");
    expect(listItem).toHaveLength(1);

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("TestStasjon3");
  });

  it("Sorts list of stations alphabetically", async () => {});
});

describe("Utils", () => {
  it("Sorts list of stations alphabetically", async () => {
    const stations = [
      {
        station_id: "1",
        name: "BB",
        lat: 59,
        lon: 10,
      },
      {
        station_id: "2",
        name: "12number",
        lat: 59,
        lon: 10,
      },
      {
        station_id: "3",
        name: "bc",
        lat: 59,
        lon: 10,
      },
      {
        station_id: "4",
        name: "aa",
        lat: 59,
        lon: 10,
      },
    ];

    const sortedStations = sortStasjoner(stations);

    expect(sortedStations).toEqual([
      stations[1],
      stations[3],
      stations[0],
      stations[2],
    ]);
  });
});
