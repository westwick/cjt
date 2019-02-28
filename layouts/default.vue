<template>
  <div id="shell">
    <app-header />
    <section id="main">
      <nuxt/>
    </section>
    <div class="holiday-special" v-if="showModal">
      <a href="#close" class="close" @click="closeModal()">Close</a>
      <h4>Gift Certificates!</h4>
      <h5>Give the Gift of Adventure!!!</h5>
      <p>Gift certificates can be emailed in minutes. Call 805-564-1819 to order.
        People remember a great experience forever... What did you get as a gift last year??? Call now!</p>
    </div>
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader';
import AppFooter from '~/components/AppFooter';

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    closeModal() {
      this.showModal = false;
    }
  }
}
</script>

<style lang="sass">
  @import './icon.css'
  @import './loading.css'
  @import './hamburger.css'
  @import './checkbox.css'

  .holiday-special
    min-width: 300px
    max-width: 500px
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    text-align: center
    background: #fff
    padding: 3rem
    border: 1px solid #E22813
    border-radius: 6px
    z-index: 999999
    .close
      position: absolute
      top: 10px
      right: 10px
    h4
      color: #E22813
      font-size: 24px
      margin-bottom: 1rem
    h5
      color: #0D1521
      font-size: 20px
      margin-bottom: .5rem
</style>
