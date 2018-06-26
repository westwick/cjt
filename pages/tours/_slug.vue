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
              <vue-markdown>{{ body }}</vue-markdown>
              <div class="image-preload">
                <img v-for="g in gallery" :src="g" :key="g"/>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <h2>Pricing</h2>
            <vue-markdown>{{ priceLong }}</vue-markdown>
            <h2 class="start-time">Schedule</h2>
            <vue-markdown>{{ timeLong }}</vue-markdown>
            <button class="button book-now">Book Now</button>
            <div class="contact">
              <p><i class="icon-phone"></i> (805) 564-1819</p>
              <p><i class="icon-envelope-o"></i> hello@captainjackstours.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueMarkdown from 'vue-markdown'; 
export default {
  components: {
    VueMarkdown
  },
  data() {
    return {
      galleryIndex: 0
    }
  },
  methods: {
    galleryLeft() {
      this.galleryIndex--
    },
    galleryRight() {
      this.galleryIndex++
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

    let tour = await import('~/content/tours/' + params.slug + '.json');
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