<template>
  <section class="container">
    <h1 class="page-title">Captain Jack's Tours</h1>
    <div class="tours-container">
      <div class="tour" v-for="tour in tours" :key="tour.title">

          <div class="card tour-card">
            <img class="img-main" :src="tour.thumbnail">
            <div class="card-content">
              <h2>{{ tour.title }}</h2>
              <p>{{ tour.body }}</p>
              <div class="tour-stats">
                <div class="tour-stats-price">
                  ${{ tour.price }}
                  <span class="tour-stats-subtext">Per Person</span>
                </div>
                <div class="tour-stats-time">
                  9 - 9:30am
                  <span class="tour-stats-subtext">Start Time</span>
                </div>
                <nuxt-link :to="tour._path" class="button">Learn More</nuxt-link>
              </div>
            </div>
          </div>

      </div>
    </div>
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
    const toursContext = require.context('~/content/tours/', false, /\.json$/);

    const tours = toursContext.keys().map(key => ({
      ...toursContext(key),
      _path: `/tours/${key.replace('.json', '').replace('./', '')}`
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
