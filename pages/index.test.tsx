import { render, screen } from "@testing-library/react";
import Home from "./index.page";

describe("Test that the app renders something", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Bysykler i Oslo/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
