class EarningsStore {
  constructor() {
    // Initializing earnings for each trip to 0
    this.earnings = {
      trip01: 0,
      trip02: 0,
      trip03: 0,
      trip04: 0,
      trip05: 0,
    };
    // Initializing the list of observers
    this.observers = [];
  }

  // Added an observer to the list
  addObserver(observer) {
    this.observers.push(observer);
  }

  // Removed an observer from the list
  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // Updated earnings for a specific trip
  updateEarnings(trip, newEarnings) {
    this.earnings[trip] = newEarnings;
    // Notify all observers that earnings have been updated
    this.notifyObservers();
  }

  // Notify all observers about the updated earnings
  notifyObservers() {
    this.observers.forEach((observer) => {
      observer.updateEarnings(this.earnings);
    });
  }
}

// Create an instance of the EarningsStore class
const earningsStore = new EarningsStore();

// Export the EarningsStore instance
export default EarningsStore;
