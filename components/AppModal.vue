<template>
  <div class="calltobook-container">
    <div class="modal-overlay" @click="$emit('modal-clicked')">
      <span class="pleasewait">Please Wait</span>
      <app-spinner></app-spinner>
    </div>
    <div class="calltobook" v-if="showContent">
      <h2>Online Booking Unavailable</h2>
      <p class="notice">To book this tour, please call or e-mail us.</p>
      <div class="contact">
        <p><i class="icon-envelope"></i><a href="mailto:hello@captainjackstours.com">hello@captainjackstours.com</a></p>
        <p><i class="icon-phone"></i><a href="tel:1-805-564-1819">(805) 564-1819</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import AppSpinner from './AppSpinner'

export default {
  data() {
    return {
      showContent: false
    }
  },
  components: { AppSpinner },
  created() {
    const i = Math.random() * (2000 - 500) + 500;
    setTimeout(() => {
      this.showContent = true;
    }, i);
  },
  methods: {

  }
};
</script>

<style lang="sass">
.calltobook
  position: fixed
  top: 0
  left: 50%
  transform: translateX(-50%)
  width: 100%
  min-width: 320px
  max-width: 500px
  height: auto
  margin: 120px auto 0
  background: #fff
  border-radius: 5px
  z-index: 99999
  padding: 32px
  text-align: center
  h2
    font-size: 14px
    color: #b8b8b8
    font-weight: bold
    text-transform: uppercase
    margin-bottom: 16px
  .notice
    font-size: 18px
    margin-bottom: 16px
    color: #000
    font-weight: bold
  .contact
    i
      margin-right: 8px
      color: #b8b8b8
</style>
