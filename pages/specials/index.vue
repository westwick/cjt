<template>
  <section class="listing-page">
    <omg-cover class="listing-header specials-hero" :preview="require('~/assets/backgrounds/specialsbg.svg')" :full="require('~/assets/backgrounds/specialsbg.jpg')">
      <div class="container">
        <h1 class="page-title">Captain Jack's Specials</h1>
        <p>Check out our current deals. Here be the proverbial treasure map!</p>
      </div>
    </omg-cover>
    <section class="container">
      <div class="tours-container listing-container">
        <div class="tour" v-for="tour in specials" :key="tour.title">

          <div class="card tour-card specials-card">
            <img class="omg-img" :src="tour.thumbnail">
            <div class="card-content">
              <h2>{{ tour.title }}</h2>
              <h3>{{ tour.subheader }}</h3>
              <h3>{{ tour.subheader2 }}</h3>
              <vue-marked>{{ tour.body }}</vue-marked>

            </div>
          </div>

        </div>
      </div>
    </section>
  </section>
</template>

<script>
import OmgCover from '~/components/OmgCover.vue';
import VueMarked from 'vue-marked'; 

export default {
  components: {
    OmgCover,
    VueMarked
  },
  data() {
    // Using webpacks context to gather all files from a folder
    const specialsContext = require.context('~/content/specials/', false, /\.json$/);

    const specials = specialsContext.keys().map(key => ({
      ...specialsContext(key),
      _path: `/specials/${key.replace('.json', '').replace('./', '')}`
    }));

    specials.sort((a, b) => {
      if (parseInt(a.sort) < parseInt(b.sort))
        return -1;
      if (parseInt(a.sort) > parseInt(b.sort))
        return 1;
      return 0;
    })

    return { specials };
  }
};
</script>

<style scoped lang="sass">

</style>
