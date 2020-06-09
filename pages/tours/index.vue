<template>
  <section class="listing-page">
    <omg-cover class="listing-header tours-hero" :preview="require('~/assets/backgrounds/toursbg.svg')" :full="require('~/assets/backgrounds/toursbg.jpg')">
      <div class="container">
        <h1 class="page-title" @click.alt="handleSort">Captain Jack's Tours</h1>
        <p>All tours are available 7 days a week unless otherwise stated. Too much fun!</p>
      </div>
    </omg-cover>
    <section class="container">
      <div class="tours-container listing-container">
        <div class="view-as">
          <i class="icon-grid" :class="{selected: viewMode === 'grid'}" @click="viewModeGrid()"></i>
          <i class="icon-list" :class="{selected: viewMode === 'list'}" @click="viewModeList()"></i>
        </div>
        <div class="tours-view-as" :class="{gridView: viewMode === 'grid'}">

            <div class="card tour-card" v-for="tour in tours" :key="tour.title">
              <omgimg :src="tour.thumbnail" :alt="tour.title" @click="$router.push({path: tour._path})"></omgimg>
              <div class="card-content">
                <h2><span class="toursort" v-if="showSort">{{ tour.sort }}</span><nuxt-link :to="tour._path">{{ tour.title }}</nuxt-link></h2>
                <div class="tour-infos">
                  <span class="price" v-if="tour.priceShort">
                    <i class="icon-bill"></i><span :class="{special: tour.priceSpecial}">{{tour.priceShort.trim()}}</span>
                    <span v-if="tour.priceSpecial">{{tour.priceSpecial}}</span>
                  </span>
                  <span class="starttime" v-if="tour.timeShort"><i class="icon-time"></i>{{tour.timeShort.trim()}}</span>
                </div>
                
                <p class="tour-card-body">{{ tour.body }}
                  <span class="read-more-link">. . . <nuxt-link :to="tour._path">Read More</nuxt-link></span>
                </p>
                <div class="cta">
                  <button class="button book-now" @click="bookTour(tour)">Book Now</button>
                </div>
              </div>
            </div>

        </div>
      </div>
    </section>
    <app-modal v-if="showModal" v-on:modal-clicked="closeModal()"></app-modal>
  </section>
</template>

<script>
import AppModal from '~/components/AppModal.vue';
import OmgImg from '~/components/OmgImg.vue';
import OmgCover from '~/components/OmgCover.vue';

export default {
  components: {
    AppModal, 'omgimg': OmgImg, OmgCover
  },
  data() {
    return {
      viewMode: 'list',
      showSort: false,
      showModal: false
    }
  },
  methods: {
    viewModeGrid() {
      this.viewMode = 'grid';
      if (process.browser) {
        localStorage.setItem('viewmode', 'grid');
      }
      
    },
    viewModeList() {
      this.viewMode = 'list';
      if (process.browser) {
        localStorage.setItem('viewmode', 'list');
      }
    },
    toggleSort() {
      this.showSort = !this.showSort;
    },
    handleSort(e) {
      this.toggleSort();
    },
    bookTour(tour) {
      if(tour.allowBooking) {
        this.$store.commit('setTour', tour);
        this.$router.push({ path: '/checkout' });
      } else {
        this.showModal = true;
      }
    },
    closeModal() {
      this.showModal = false;
    }
  },
  asyncData() {
    // Using webpacks context to gather all files from a folder
    const toursContext = require.context('~/content/tours/', false, /\.json$/);

    const tours = toursContext.keys().map(key => ({
      ...toursContext(key),
      showBooking: false,
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
  },
  mounted() {
    if (process.browser) {
      const setting = localStorage.getItem('viewmode');
      this.viewMode = setting ? setting : 'list';
    }
  }
};
</script>

<style scoped lang="sass">
  .toursort
    color: green
    margin-right: 2px
    font-size: 14px
</style>
