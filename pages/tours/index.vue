<template>
  <section class="container">
    <h1>Tours</h1>
    <ul>
      <li v-for="tour in tours" :key="tour.title">
        <nuxt-link :to="tour._path">
          {{ tour.title }}
        </nuxt-link>
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
