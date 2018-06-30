<template>
  <section class="listing-page">
    <div class="listing-header tours-hero">
      <div class="container">
        <h1 class="page-title" @click.alt="handleSort">Captain Jack's Tours</h1>
        <p>All tours are available 7 days a week unless otherwise stated. Too much fun stuff!</p>
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
                <h2><span class="toursort" v-if="showSort">{{ tour.sort }}</span><nuxt-link :to="tour._path">{{ tour.title }}</nuxt-link></h2>
                <div class="tour-infos">
                  <span class="price"><i class="icon-bill"></i> {{tour.priceShort}}</span>
                  <span class="starttime"><i class="icon-time"></i> {{tour.timeShort}}</span>
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
      viewMode: 'list',
      showSort: false
    }
  },
  methods: {
    viewModeGrid() {
      this.viewMode = 'grid';
    },
    viewModeList() {
      this.viewMode = 'list';
    },
    toggleSort() {
      this.showSort = !this.showSort
    },
    handleSort(e) {
      this.toggleSort();
    } 
  },
  asyncData() {
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
  .toursort
    color: green
    margin-right: 2px
    font-size: 14px
</style>
