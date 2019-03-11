<template>
  <article class="article thank-you">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-12-mobile is-10-tablet is-7-desktop">
          <div class="blog-post booking-complete" v-if="true">
            <div class="thank-you-card">
              <div class="thank-you-head">
                <img src="~/assets/success.jpg" />
                <h1>Thank You!</h1>
                <p>Your tour has been booked.</p>
                <p>Please check your inbox for a confirmation email with important information about your&nbsp;tour.</p>
              </div>
              <div class="thank-you-receipt">
                <div class="booked-tour-info">
                  <div class="receipt-line"><p>Guest</p><p>John Doe</p></div>
                  <div class="receipt-line"><p>Tour</p><p>Santa Barbara Wine Tasting</p></div>
                  <div class="receipt-line"><p>Date</p><p>Saturday, Feb 28 2019</p></div>
                  <div class="receipt-line"><p>Total Guests</p><p>2</p></div>
                  <div class="receipt-line"><p>Amount Charged</p><p>$178.23</p></div>
                </div>
              </div>
              <div class="thank-you-foot">
                <p>If you have any questions please call or email us. <nuxt-link to="/tours">Browse more tours</nuxt-link>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      bookedTour: undefined
    }
  },
  computed: {
    tour() {
      return this.$store.state.tour;
    }
  },
  created() {
    // if (!this.tour) {
    //   this.$router.push({path: '/tours'});
    // } else {
    //   this.bookedTour = this.tour;
    //   this.$store.commit('clearTour');
    // }
  }
}
</script>

<style lang="sass">
.thank-you
  background: #f8f8f8
  padding: 0 16px
  h1
    text-align: center
    margin-bottom: 16px
  p
    font-size: 18px
    // margin-bottom: 16px
.booking-complete
  min-height: calc(100vh - 96px)
  padding: 0
  display: flex
  align-items: center
  justify-content: center
.thank-you-card
  background: #fff
  border-radius: 6px
  box-shadow: 0 4px 8px rgba(0,0,0,.1)
  border-top: 3px solid #a3da0d
  margin-top: 24px
  margin-bottom: 20vh
  .thank-you-head
    padding: 24px
  .thank-you-foot
    padding: 24px
  .thank-you-receipt
    padding: 24px
    background: #f8f8f8
    border-top: 2px solid #EBEFF1
    border-bottom: 2px solid #EBEFF1
  img
    display: block
    width: 100px
    max-width: 100px
    margin: 0 auto 8px
.booked-tour-info
  border-radius: 6px
  background: #f2f2f2
  padding: 16px
  margin: auto
  .receipt-line
    border-bottom: 2px solid #e8e8e8
    display: flex
    justify-content: space-between
    align-items: flex-start
    padding: 10px 0
    flex-direction: column
    p
      font-size: 14px
      margin: 0
      &:first-child
        font-weight: bold
    @media screen and (min-width: 440px)
      flex-direction: row
      align-items: center
      p:first-child
        font-weight: normal
    &:first-child
      padding-top: 0
    &:last-child
      border-bottom: none
      padding-bottom: 0
</style>