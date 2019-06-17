<template>
  <section class="tour-page">
    <div class="tour-img-main" v-bind:style="{ backgroundImage: 'url(' + tour.gallery[galleryImageIndex] + ')'}">
      <div class="tour-overlay"></div>
      <i class="icon-arrow-left images-btn-left" @click="galleryLeft" v-if="galleryImageCount > 1"></i>
      <i class="icon-arrow-right images-btn-right" @click="galleryRight" v-if="galleryImageCount > 1"></i>
      <div class="gallery-index" v-if="galleryImageCount > 1">
        <span v-for="(x, i) in tour.gallery" :key="x" :class="{active: i === galleryImageIndex}"></span>
      </div>
    </div>
    <div class="tour-page-content">
      <div class="container">
        <div class="columns">
          <div class="column is-8">
            <h1 @click="test()">{{ tour.title }}</h1>
            <div class="tour-info-body">
              <vue-marked>{{ tour.body }}</vue-marked>
              <hr />
              <h3>Schedule</h3>
              <vue-marked>{{ tour.timeLong }}</vue-marked>
              <div class="image-preload">
                <img v-for="g in tour.gallery" :src="g" :key="g"/>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="book-now-card">
              <vue-marked class="pricing-md" v-if="tour.priceLong">{{ tour.priceLong }}</vue-marked>
              <button class="button book-now ld-ext-right" @click="bookTour()">
                Book Now
                <!-- <div class="ld ld-ring ld-spin"></div> -->
              </button>
              <div class="contact">
                <p><i class="icon-envelope-o"></i><a href="mailto:hello@captainjackstours.com">hello@captainjackstours.com</a></p>
                <p><i class="icon-phone"></i><a href="tel:1-805-886-1697">(805) 886-1697</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <app-modal v-if="showModal" v-on:modal-clicked="closeModal()"></app-modal>
  </section>
</template>

<script>
import VueMarked from 'vue-marked'; 
import AppModal from '~/components/AppModal'

export default {
  components: {
    VueMarked, AppModal
  },
  data() {
    return {
      galleryIndex: 0,
      showModal: false,
      stripe: undefined
    }
  },
  methods: {
    galleryLeft() {
      this.galleryIndex--
    },
    galleryRight() {
      this.galleryIndex++
    },
    closeModal() {
      this.showModal = false;
    },
    bookTour() {
      if (this.tour.allowBooking) {
        this.$store.commit('setTour', this.tour);
        this.$router.push({ path: '/checkout' });
      } else {
        this.showModal = true;
      }
    }
  },
  computed: {
    galleryImageCount() {
      return this.tour.gallery.length;
    },
    galleryImageIndex() {
      return Math.abs(this.galleryIndex) % this.tour.gallery.length;
    }
  },
  async asyncData({ params }) {
    // const postPromise = process.BROWSER_BUILD
    //   ? import('~/content/blog/posts/' + params.slug + '.json')
    //   : Promise.resolve(
    //       require('~/content/blog/posts/' + params.slug + '.json')
    //     );

    let tour = await import('~/content/tours/' + params.slug + '.json');
    return { tour };
  }
};
</script>

<style scoped lang="sass">
.image-preload
  height: 0
  visibility: hidden
  img
    width: 1px
    height: 1px
</style>