export const state = () => ({
  tour: undefined
});

export const mutations = {
  setTour (state, tour) {
    state.tour = tour;
  },
  clearTour (state, tour) {
    state.tour = undefined;
  }
};