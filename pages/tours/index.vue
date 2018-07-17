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
                  <button class="button book-now" @click="bookTour(tour)">Book Now</button>
                </div>
              </div>
              <div class="booking-overlay" v-if="tour.showBooking" @click="closeBooking(tour)">
                <span class="pleasewait">Please Wait</span>
                <div class="spinner">
                  <div class="bounce1"></div>
                  <div class="bounce2"></div>
                  <div class="bounce3"></div>
                </div>
                <iframe class="booking-widget" :src="getFrameSrc(tour)"></iframe>
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
    },
    bookTour(tour) {
      if(tour.allowBooking && tour.rezid) {
        tour.showBooking = true
      } else {
        // show modal
      }
    },
    closeBooking(tour) {
      tour.showBooking = false
    },
    getFrameSrc(tour) {
      return 'https://booking.bookinghound.com/rezfe/book.aspx?og=34ebafa9-092a-4e28-aa18-cbd5c5d7cd11&g=null&fcs=null&fca=null&fcg=null&af=null&uniqueId=' + tour.rezid + '&mode=a&phref=http://captainjackstours.com&ifstyle=overlay';
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
  created() {

  }
};
</script>

<style scoped lang="sass">
  .toursort
    color: green
    margin-right: 2px
    font-size: 14px
  .booking-overlay
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    z-index: 88888
    background: rgba(0,0,0,.765)
  .booking-widget
    width: 320px
    height: 100vh
    position: fixed
    z-index: 99999
    top: 80px
    left: calc(50vw - 160px)
  
  .pleasewait
    color: #fff
    display: block
    margin: 120px auto 16px
    text-align: center
  
  .spinner 
    margin: 0 auto
    width: 70px
    text-align: center

  .spinner > div
    width: 18px
    height: 18px
    background-color: rgba(255,255,255,.8)
    border-radius: 100%
    display: inline-block
    animation: sk-bouncedelay 1.4s infinite ease-in-out both

  .spinner .bounce1
    -webkit-animation-delay: -0.32s
    animation-delay: -0.32s

  .spinner .bounce2
    -webkit-animation-delay: -0.16s
    animation-delay: -0.16s

  @-webkit-keyframes sk-bouncedelay
    0%, 80%, 100%
      transform: scale(0)
    40%
      transform: scale(1.0)

  @keyframes sk-bouncedelay
    0%, 80%, 100%
      -webkit-transform: scale(0)
      transform: scale(0)
    40% 
      -webkit-transform: scale(1.0)
      transform: scale(1.0)
</style>
