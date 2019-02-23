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
              <hr />
              <h3>Schedule</h3>
              <vue-markdown>{{ timeLong }}</vue-markdown>
              <div class="image-preload">
                <img v-for="g in gallery" :src="g" :key="g"/>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <h3 v-if="priceLong">Pricing</h3>
            <vue-markdown class="pricing-md" v-if="priceLong">{{ priceLong }}</vue-markdown>
            <button class="button book-now" @click="bookTour()">Book Now</button>
            <div class="contact">
              <p><i class="icon-envelope-o"></i><a href="mailto:hello@captainjackstours.com">hello@captainjackstours.com</a></p>
              <p><i class="icon-phone"></i><a href="tel:1-805-564-1819">(805) 564-1819</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="booking-overlay" v-if="showBooking" @click="closeBooking()">
      <span class="pleasewait">Please Wait</span>
      <app-spinner></app-spinner>
      <iframe class="booking-widget" :src="getFrameSrc()"></iframe>
    </div>
    <app-modal v-if="showModal" v-on:modal-clicked="closeModal()"></app-modal>
  </section>
</template>

<script>
import VueMarkdown from 'vue-markdown'; 
import AppSpinner from '~/components/AppSpinner'
import AppModal from '~/components/AppModal'

export default {
  components: {
    VueMarkdown, AppSpinner, AppModal
  },
  head() {
    return {
      script: [{ src: 'https://checkout.stripe.com/checkout.js' }],
    }
  },
  data() {
    return {
      galleryIndex: 0,
      showBooking: false,
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
    closeBooking() {
      this.showBooking = false;
    },
    closeModal() {
      this.showModal = false;
    },
    bookTour() {
      this.stripe = StripeCheckout.configure({
        key: 'pk_test_xAGAZgjFcuyzjB1CTB3v60zp',
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        token: (token) => {
          this.chargeCard(token.id)
        }
      });
      this.stripe.open({
        email: 'something@alreadydone.com',
        name: 'Carbonxleague',
        description: 'hehehe',
        amount: 2000
      });
    },
    async chargeCard(token) {
      const hello = await this.$axios.$post('/.netlify/functions/hello', {
        token,
        amount: 123
      });
      console.log('charge card result!', hello);
    },
    getFrameSrc() {
      return 'https://booking.bookinghound.com/rezfe/book.aspx?og=34ebafa9-092a-4e28-aa18-cbd5c5d7cd11&g=null&fcs=null&fca=null&fcg=null&af=null&uniqueId=' + this.rezid + '&mode=a&phref=http://captainjackstours.com&ifstyle=overlay';
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