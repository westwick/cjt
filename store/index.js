export const state = () => ({
  tour: undefined,
  reservation: undefined
});

export const mutations = {
  setTour (state, tour) {
    state.tour = tour;
  },
  clearTour (state) {
    state.tour = undefined;
  },
  setReservation (state, reservation) {
    state.reservation = reservation;
  },
  clearReservation (state) {
    state.reservation = undefined;
  }
};