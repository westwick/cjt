<template>
  <section class="listing-page">
    <div class="listing-header charters-hero">
      <div class="container">
        <h1 class="page-title">Captain Jack's Private Boat Charters</h1>
        <p>Spend a few hours or a whole day aboard our yachts!</p>
      </div>
    </div>
    <section class="container">
      <div class="tours-container listing-container">
        <div class="view-as">
          <i class="icon-grid" :class="{selected: viewMode === 'grid'}" @click="viewModeGrid"></i>
          <i class="icon-list" :class="{selected: viewMode === 'list'}" @click="viewModeList"></i>
        </div>
        <div class="tours-view-as" :class="{gridView: viewMode === 'grid'}">

            <div class="card tour-card" v-for="tour in tours" :key="tour.title">
              <img class="img-main" :src="tour.thumbnail" @click="$router.push({path: tour._path})" v-bind:alt="tour.title">
              <div class="card-content">
                <h2><nuxt-link :to="tour._path">{{ tour.title }}</nuxt-link></h2>
                <div class="tour-infos">
                  <span class="price"><i class="icon-bill"></i> {{tour.priceShort}}</span>
                  <span class="starttime"><i class="icon-users"></i> {{tour.groupSizes}}</span>
                </div>
                
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
    return {
      viewMode: 'list'
    }
  },
  methods: {
    viewModeGrid() {
      this.viewMode = 'grid';
    },
    viewModeList() {
      this.viewMode = 'list';
    } 
  },
  asyncData() {
    // Using webpacks context to gather all files from a folder
    const toursContext = require.context('~/content/boat-charters/', false, /\.json$/);

    const tours = toursContext.keys().map(key => ({
      ...toursContext(key),
      _path: `/boat-charters/${key.replace('.json', '').replace('./', '')}`
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
