<template>
  <section class="listing-page">
    <div class="listing-header">
      <div class="container">
        <h1 class="page-title">Captain Jack's Group Events</h1>
        <p>If your group has 20 or more people, check out some of our great options below!</p>
      </div>
    </div>
    <section class="container">
      <div class="tours-container listing-container">
        <div class="tour" v-for="tour in tours" :key="tour.title">

            <div class="card tour-card">
              <div class="tour-price">
                ${{ tour.price }}
              </div>
              <img class="img-main" :src="tour.thumbnail">
              <div class="card-content">
                <h2>{{ tour.title }}</h2>
                <h3>{{ tour.subheader }}</h3>
                <h3><i class="far fa-clock"></i> {{ tour.startTime }}</h3>
                <h3 class="price"><i class="fas fa-money-bill"></i> {{ tour.priceDisplay }}</h3>
                <p>{{ tour.body }}</p>

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
