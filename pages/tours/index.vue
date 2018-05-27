<template>
  <section class="container">
    <h1>Tours</h1>
    <div class="columns">
      <div class="column is-4" v-for="tour in tours" :key="tour.title">
        <div class="card tour-card">
          <img class="img-main" :src="tour.thumbnail">
          <div class="card-content">
            <h2>{{ tour.title }}</h2>
            <h3>{{ tour.price }}</h3>
            <p>{{ tour.body }}</p>
            <nuxt-link :to="tour._path" class="button">
              Learn More
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <ul>
      <li >

      </li>
    </ul>
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

    return { tours };
  }
};
</script>

<style>

</style>
