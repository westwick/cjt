<template>
  <div class="calltobook-container">
    <div class="modal-overlay" @click="$emit('modal-clicked')">
    </div>
    <div class="calltobook">
      <h2>Online Booking Unavailable</h2>
      <p class="notice">To book this tour, please call or e-mail&nbsp;us.</p>
      <div class="contact">
        <p><i class="icon-envelope"></i><a href="mailto:hello@captainjackstours.com">hello@captainjackstours.com</a></p>
        <p><i class="icon-phone"></i><a href="tel:1-805-564-1819">(805) 564-1819</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
