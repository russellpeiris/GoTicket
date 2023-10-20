import AllPass from "../Src/AllPass";
import React from "react";
import { render } from "@testing-library/react-native";

describe("AllPass Component", () => {
  it("should render without errors", () => {
    const { getByText } = render(<AllPass />);

    // Asserting that the component rendered without errors
    expect(getByText("Scanned Passengers")).toBeTruthy();
  });

  it("should display scanned usernames", () => {
    const usernames = ["User1", "User2", "User3"];
    const { getByText } = render(<AllPass />);

    // Simulate adding scanned usernames to the component
    usernames.forEach((username) => {
      const usernameElement = getByText(username);
      expect(usernameElement).toBeTruthy();
    });
  });

  it("should not display any scanned usernames initially", () => {
    const { queryByText } = render(<AllPass />);

    // Assert that no scanned usernames are displayed initially
    expect(queryByText("User1")).toBeNull();
  });
});
