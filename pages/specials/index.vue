<template>
  <section class="container">
    <h1>Specials</h1>
    <div class="tours-container">
      <div class="tour" v-for="special in specials" :key="special.title">
        <p>Special!</p>
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
    const specialsContext = require.context('~/content/specials/', false, /\.json$/);

    const specials = specialsContext.keys().map(key => ({
      ...specialsContext(key),
      _path: `/specials/${key.replace('.json', '').replace('./', '')}`
    }));

    // tours.sort((a, b) => {
    //   if (a.sort < b.sort)
    //     return -1;
    //   if (a.sort > b.sort)
    //     return 1;
    //   return 0;
    // })

    return { specials };
  }
};
</script>

<style scoped lang="sass">

</style>
