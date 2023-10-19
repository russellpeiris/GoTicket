import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import ScanQR from "../Src/ScanQR"; 

describe("ScanQR Component", () => {
  it("should render without errors", () => {
    const { getByText, getByTestId } = render(<ScanQR />);

    // Assert that the component rendered without errors
    expect(getByText("Not yet scanned")).toBeTruthy();
  });

  it('should ask for camera permission and display "Requesting camera permission"', async () => {
    const { getByText } = render(<ScanQR />);

    // Wait for the camera permission request to complete
    await waitFor(() => {
      expect(getByText("Requesting camera permission")).toBeTruthy();
    });
  });

  it('should display "No access to camera" and allow re-requesting permission', async () => {
    const { getByText, getByTestId } = render(<ScanQR />);

    // Simulate no access to camera
    act(() => {
      fireEvent.press(getByText("Allow Camera"));
    });

    // Wait for the "No access to camera" message and "Allow Camera" button
    await waitFor(() => {
      expect(getByText("No access to camera")).toBeTruthy();
      expect(getByText("Allow Camera")).toBeTruthy();
    });
  });

  it("should handle barcode scanning", async () => {
    const { getByText, getByTestId } = render(<ScanQR />);

    // Simulate barcode scanning
    act(() => {
      fireEvent(getByTestId("barcode-scanner"), "onBarCodeScanned", {
        type: "QR_CODE",
        data: "123456789",
      });
    });

    // Waitig for the scanned barcode to be displayed
    await waitFor(() => {
      expect(getByText("123456789")).toBeTruthy();
    });
  });
});
