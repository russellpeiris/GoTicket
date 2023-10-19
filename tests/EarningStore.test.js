import EarningsStore from "../Src/EarningsStore";

describe("EarningsStore", () => {
  it("should initialize with zero earnings for all trips", () => {
    const store = new EarningsStore();
    const initialEarnings = store.earnings;

    // Assert all trip earnings are initialized to 0
    Object.keys(initialEarnings).forEach((trip) => {
      expect(initialEarnings[trip]).toBe(0);
    });
  });

  it("should update earnings for a specific trip", () => {
    const store = new EarningsStore();

    // Update earnings for trip01
    store.updateEarnings("trip01", 100);

    // Assert that earnings for trip01 have been updated to 100
    expect(store.earnings["trip01"]).toBe(100);
  });

  it("should notify observers when earnings are updated", () => {
    const store = new EarningsStore();
    const mockObserver = {
      updateEarnings: jest.fn(),
    };

    // Add the observer mockObserver
    store.addObserver(mockObserver);

    // Update earnings for trip02
    store.updateEarnings("trip02", 200);

    // Expect that the observer's updateEarnings method has been called
    expect(mockObserver.updateEarnings).toHaveBeenCalledWith(store.earnings);
  });

  it("should remove an observer", () => {
    const store = new EarningsStore();
    const mockObserver = {
      updateEarnings: jest.fn(),
    };

    // Add mock observer
    store.addObserver(mockObserver);

    // Remove the observer
    store.removeObserver(mockObserver);

    // Update earnings for trip03
    store.updateEarnings("trip03", 300);

    // Expecting that the observer's updateEarnings method has not been called
    expect(mockObserver.updateEarnings).not.toHaveBeenCalled();
  });
});
