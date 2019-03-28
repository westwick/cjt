<template>
  <section class="tour-page">
    <div class="tour-img-main" v-bind:style="{ backgroundImage: 'url(' + gallery[galleryImageIndex] + ')'}">
      <div class="tour-overlay"></div>
      <i class="icon-arrow-left images-btn-left" @click="galleryLeft" v-if="galleryImageCount > 1"></i>
      <i class="icon-arrow-right images-btn-right" @click="galleryRight" v-if="galleryImageCount > 1"></i>
      <div class="gallery-index" v-if="galleryImageCount > 1">
        <span v-for="(x, i) in gallery" :key="x" :class="{active: i === galleryImageIndex}"></span>
      </div>
    </div>
    <div class="tour-page-content">
      <div class="container">
        <div class="columns">
          <div class="column is-8">
            <h1>{{ title }}</h1>
            <div class="tour-info-body">
              <vue-marked>{{ body }}</vue-marked>
              <div class="image-preload">
                <img v-for="g in gallery" :src="g" :key="g"/>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <button class="button book-now" @click="bookTour()">Book Now</button>
            <div class="contact">
              <p><i class="icon-envelope-o"></i><a href="mailto:hello@captainjackstours.com">hello@captainjackstours.com</a></p>
              <p><i class="icon-phone"></i><a href="tel:1-805-564-1819">(805) 564-1819</a></p>
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
      showModal: false
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
      this.showModal = true;
    }
  },
  computed: {
    galleryImageCount() {
      return this.gallery.length;
    },
    galleryImageIndex() {
      return Math.abs(this.galleryIndex) % this.gallery.length;
    }
  },
  async asyncData({ params }) {
    // const postPromise = process.BROWSER_BUILD
    //   ? import('~/content/blog/posts/' + params.slug + '.json')
    //   : Promise.resolve(
    //       require('~/content/blog/posts/' + params.slug + '.json')
    //     );

    let tour = await import('~/content/group-events/' + params.slug + '.json');
    return tour;
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