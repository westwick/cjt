<template>
  <section class="container">
    <h1>Tours</h1>
    <div class="tours-container">
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
