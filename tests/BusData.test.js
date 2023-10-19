import BusData from "../Src/BusData";
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

describe("BusData Component", () => {
  it("should render without errors", () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <BusData />
    );

    // Assert that the component rendered without errors
    expect(getByText("Ride Data")).toBeTruthy();
    expect(getByPlaceholderText("Route No")).toBeTruthy();
    expect(getByPlaceholderText("Start of the ride")).toBeTruthy();
    expect(getByPlaceholderText("End Of the Ride")).toBeTruthy();
    expect(getByText("Submit")).toBeTruthy();
  });

  it("should handle form submission", async () => {
    const { getByPlaceholderText, getByText } = render(<BusData />);

    // Filing form fields
    fireEvent.changeText(getByPlaceholderText("Route No"), "123");
    fireEvent.changeText(getByPlaceholderText("Start of the ride"), "City A");
    fireEvent.changeText(getByPlaceholderText("End Of the Ride"), "City B");

    // Submitting the form
    fireEvent.press(getByText("Submit"));

    // Waitin for the navigation to the "ScanQR" screen
    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith("ScanQR", {
        formData: {
          routeNo: "123",
          startOfRide: "City A",
          endOfRide: "City B",
        },
      });
    });
  });
});
