<template>
  <section class="container">
    <h1 class="page-title">Captain Jack's Specials</h1>
    <div class="tours-container">
      <div class="tour" v-for="tour in specials" :key="tour.title">

        <div class="card tour-card specials-card">
          <img class="img-main" :src="tour.thumbnail">
          <div class="card-content">
            <h2>{{ tour.title }}</h2>
            <h3>{{ tour.subheader }}</h3>
            <h3>{{ tour.subheader2 }}</h3>
            <vue-markdown>{{ tour.body }}</vue-markdown>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue';
import VueMarkdown from 'vue-markdown'; 

export default {
  components: {
    AppLogo,
    VueMarkdown
  },
  data() {
    // Using webpacks context to gather all files from a folder
    const specialsContext = require.context('~/content/specials/', false, /\.json$/);

    const specials = specialsContext.keys().map(key => ({
      ...specialsContext(key),
      _path: `/specials/${key.replace('.json', '').replace('./', '')}`
    }));

    specials.sort((a, b) => {
      if (a.sort < b.sort)
        return -1;
      if (a.sort > b.sort)
        return 1;
      return 0;
    })

    return { specials };
  }
};
</script>

<style scoped lang="sass">

</style>
