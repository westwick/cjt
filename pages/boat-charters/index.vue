<template>
  <section class="listing-page">
    <div class="listing-header">
      <div class="container">
        <h1 class="page-title">Captain Jack's Private Boat Charters</h1>
        <p>Spend a few hours or a whole day aboard our yachts!</p>
      </div>
    </div>
    <section class="container">
      <div class="tours-container listing-container">
        <div class="tour" v-for="tour in tours" :key="tour.title">

            <div class="card tour-card">
              <img class="img-main" :src="tour.thumbnail">
              <div class="card-content">
                <h2>{{ tour.title }}</h2>
                <h3>{{ tour.subheader }}</h3>
                <p>{{ tour.body }}</p>
                <p>{{ tour.extra }}</p>

              </div>
            </div>

        </div>
      </div>
    </section>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue';

export default {
  components: {
    AppLogo
  },
  data() {
    // Using webpacks context to gather all files from a folder
    const toursContext = require.context('~/content/boat-charters/', false, /\.json$/);

    const tours = toursContext.keys().map(key => ({
      ...toursContext(key),
      _path: `/boat-charters/${key.replace('.json', '').replace('./', '')}`
    }));

    tours.sort((a, b) => {
      if (a.sort < b.sort)
        return -1;
      if (a.sort > b.sort)
        return 1;
      return 0;
    })

    return { tours };
  }
};
</script>

<style scoped lang="sass">

</style>
