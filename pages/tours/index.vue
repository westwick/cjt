<template>
  <section class="listing-page">
    <div class="listing-header tours-hero">
      <div class="container">
        <h1 class="page-title">Captain Jack's Tours</h1>
        <p>All tours are available 7 days a week unless otherwise stated. Too much fun stuff!</p>
      </div>
    </div>
    <section class="container">
      <div class="tours-container listing-container">
        <div class="tour" v-for="tour in tours" :key="tour.title">

            <div class="card tour-card">
              <img class="img-main" :src="tour.thumbnail">
              <div class="card-content">
                <h2><nuxt-link :to="tour._path">{{ tour.title }}</nuxt-link></h2>
                <div class="tour-infos">
                  <span class="price">${{tour.price}} per person</span>
                  <span>11 - 11:30am Start Time</span>
                </div>
                <p>{{ tour.sort }}</p>
                <p>{{ tour.body }}</p>
                <div class="cta">
                  <button class="button book-now">Book Now</button>
                </div>
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
    const toursContext = require.context('~/content/tours/', false, /\.json$/);

    const tours = toursContext.keys().map(key => ({
      ...toursContext(key),
      _path: `/tours/${key.replace('.json', '').replace('./', '')}`
    }));

    tours.sort((a, b) => {
      if (parseInt(a.sort) < parseInt(b.sort))
        return -1;
      if (parseInt(a.sort) > parseInt(b.sort))
        return 1;
      return 0;
    })

    return { tours };
  }
};
</script>

<style scoped lang="sass">

</style>
