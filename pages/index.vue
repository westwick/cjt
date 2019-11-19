<template>
  <section class="home">
    <omg-cover class="home-hero"
      :preview="require('~/assets/backgrounds/cjtbg.svg')" 
      :full="require('~/assets/backgrounds/cjtbg.jpg')"
    >
      <div class="container">
        <div class="columns">
          <div class="column is-7">
            <h1>Ahoy Matey!</h1>
            <p>From wine tasting tours, to kayaking and sailing, to horseback-riding and more, Captain Jack's Santa Barbara Tours has something for&nbsp;everyone.</p>
            <nuxt-link class="home-btn button" to="/tours/" style="background: #E22813; width: 204px; color: #fff"><span class="icon-calendar"></span>Browse Tours</nuxt-link>
          </div>
        </div>
      </div>
    </omg-cover>
    <section class="home-greeting">
      <div class="container">
        <div class="columns is-desktop">
          <div class="column is-5-desktop">
            <h3>Welcome to Santa Barbara!</h3>
            <p>Captain Jack's Tours is the #1 Tour &amp; Event company in Santa Barbara, offering more fun choices every day. Captain Jack's Tours will provide that special something to every event whether your group consists of 2 people or 200. With so many fun things to do in Santa Barbara, Captain Jack's Tours &amp; Events has something for everyone!</p>
          </div>
          <div class="column is-7-desktop">
            <div class="greeting-images columns is-mobile is-1 is-variable">
              <div class="column is-4">
                <img src="~/assets/images/horseride.jpg" alt="Horseback Riding" />
              </div>
              <div class="column is-4">
                <img src="~/assets/images/valley4.jpg" alt="Santa Ynez Wine Tasting" />
              </div>
              <div class="column is-4">
                <img src="~/assets/images/kayaks.jpg" alt="Santa Barbara Kayaking" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="home-featured">
      <div class="container">
        <div class="columns">
          <div class="column is-4">
            <div class="card">
              <img class="treasure" src="~/assets/images/treasure.jpg" alt="treasure chest" />
              <div class="treasure-featured">Featured</div>
              <img class="img-main" src="~/assets/images/tavern.jpg" alt="Distilleries and the Old West">
              <div class="card-content">
                <h2>Distilleries and the Old West</h2>
                <h3>$125 per person</h3>
                <h3>1:00pm start time</h3>
                <p>This tour offers a “taste” of the Old West. Visit two Distilleries (one in Santa Barbara and one in Goleta) along with Cold Spring Tavern, a Stagecoach stop from 1865. The first distillery has been family run since 1915 and the proprietor will share with you how their product has been made over the years. The second will give you a behind the scenes tour and allow you to discover their high-quality spirits which represent the agricultural roots of the area.</p>
                <nuxt-link class="button btn-outline" to="/tours/distilleries-and-the-old-west/">About This Tour</nuxt-link>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="card">
              <img class="treasure" src="~/assets/images/treasure.jpg" alt="treasure chest" />
              <div class="treasure-featured">Featured</div>
              <img class="img-main" src="~/assets/images/private-charter.jpg" alt="Santa Barbara Private Boat Charters">
              <div class="card-content">
                <h2>Private Charter Cruises</h2>
                <h3>Prices start at low as $250 per hour</h3>
                <h3>Luxury Yachts up to 149 people available</h3>
                <p>Spend a few hours or a whole day aboard our yachts! You pick the yacht size and Captain Jack's Tours will provide you with a US Coast Guard Certified Captain. Your private group will experience the fun and magic of sailing along the Santa Barbara pristine coastline. You can simply enjoy the views or feel free to help sail the yacht.</p>
                <nuxt-link class="button btn-outline" to="/boat-charters/">Private Boat Charters</nuxt-link>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="parrot-card">
              <p>We offer <a href="#">Gift Certificates</a>!</p>
              <div class="parrot-buttons">
                <nuxt-link class="home-btn button" to="/specials/">See All Specials</nuxt-link>
                <nuxt-link class="home-btn button" to="/group-events/">Large Group Events</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="home-awards">
      <div class="container">
        <p class="awards-text">
          <span class="emoji">🏅🎉</span> Voted <strong>"Best Wine Tour In Santa Barbara"</strong> 7&nbsp;years&nbsp;in&nbsp;a&nbsp;row! <span class="emoji2">🎈🏆</span>
        </p>
        <img src="~/assets/images/readerschoice-top.jpg" class="readers-choice-awards" alt="SB News Press Readers Choice Awards" />
        <img src="~/assets/images/readerschoice-bottom.jpg" class="readers-choice-awards" alt="SB News Press Readers Choice Awards" />
        <p class="yelp-tripadvisor-text">Great reviews on Yelp and TripAdvisor!</p>
        <div class="columns is-mobile">
          <div class="column is-6-mobile is-3-tablet is-offset-3-tablet">
            <div class="review-container yelp-reviews">
              <img src="~/assets/images/yelp.jpg" alt="Yelp Logo" />
              <p class="reviews-text">4.5 star average on over 250&nbsp;reviews</p>
            </div>
          </div>
          <div class="column is-6-mobile is-3-tablet">
            <div class="review-container">
              <img src="~/assets/images/tripadvisor.jpg" alt="Trip Advisor Logo" />
              <p class="reviews-text">
                Certificate of Excellence 2012&nbsp;-&nbsp;2019
              </p>
            </div>
          </div>
        </div>
        <a href="https://www.bbb.org/us/ca/santa-barbara/profile/tour-operators/captain-jack-s-tours-events-1236-92027231/#sealclick" target="_blank" rel="noreferrer"><img src="~/assets/images/bbb-seal.png" alt="Captain Jack's Tours BBB Business Review" /></a>
      </div>
    </section>
  </section>
</template>

<script>
import OmgCover from '~/components/OmgCover.vue';

export default {
  components: {
    OmgCover
  },
  data() {
    // Using webpacks context to gather all files from a folder
    const blogContext = require.context('~/content/blog/posts/', false, /\.json$/);
    const toursContext = require.context('~/content/tours/', false, /\.json$/);

    const posts = blogContext.keys().map(key => ({
      ...blogContext(key),
      _path: `/blog/${key.replace('.json', '').replace('./', '')}`
    }));

    const tours = toursContext.keys().map(key => ({
      ...toursContext(key),
      _path: `/tours/${key.replace('.json', '').replace('./', '')}`
    }));

    const loaded = false;

    return { posts, tours, loaded };
  },
  mounted() {
    
  }
};
</script>

<style lang="sass">
  @import "~bulma/sass/utilities/_all.sass"
  @import '../assets/styles/vars'
  .reviews-text
    font-size: 16px !important
  .parrot-card
    background: url('~assets/images/specials.jpg')
    width: 100%
    height: 100%
    min-height: 500px
    background-size: cover
    background-position: 50% 50%
    background-repeat: no-repeat
    border: none
    border-radius: 10px
    box-shadow: 0 4px 12px rgba(0,0,0,.22)
    max-width: 440px
    margin: auto
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: center
    p
      font-weight: bold
      margin-top: 16px
      font-size: 20px
    .parrot-buttons
      margin-bottom: 72px
      display: flex
      flex-direction: column
      align-items: center
      .home-btn
        width: 232px
        margin-top: 0
        margin-bottom: 24px
        text-transform: none
    
  .home-hero.omg-cover-img
    height: 400px
    max-height: 400px
    min-height: 400px
    width: 100vw  
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    color: #fff
    text-align: left
    padding: 0 16px
    @media screen and (min-width: 1400px)
      background-position: 50% 40%
      .omg-cover-loaded
        object-position: 50% 40%

    +desktop
      padding: 0
    h1
      color: #fff
      font-size: 24px
      font-weight: bold
    p
      font-size: 18px
  .home-btn
    margin-top: 16px
    font-weight: bold
    background: $cjred
    color: #fff
    text-transform: uppercase
    font-size: 17px
    border: none
    outline: none
    box-shadow: 0 0 8px rgba(0,0,0,.35)
    height: auto
    transition: all .3s ease-in-out
    &:hover
      color: #fff
      background: darken($cjred, 5%) !important
    &:focus
      color: #fff
    span
      position: relative
      top: -1px
      margin-right: 8px
  .home-greeting
    padding: 32px 0
    background: #fff
    border-bottom: 5px solid $cjred
    h3 
      color: $cjred
      font-weight: bold
      text-transform: uppercase
      font-size: 20px
      margin-bottom: 16px
      padding-left: 16px
      +desktop
        padding-left: 0
    p
      color: #0a0a0a
      font-size: 16px
      font-weight: 500
      padding: 0 16px
      +desktop
        padding: 0
        font-size: 14px
  .greeting-images
    padding: 0 16px
    +desktop
      padding: 0
    img
      width: 100%
      height: auto
  .home-featured
    padding: 48px 16px
  .home-awards
    background: #fff
    padding: 80px 16px
    text-align: center
    p
      margin-bottom: 24px
      font-size: 18px
      color: #444
      +tablet
        font-size: 20px
      +desktop
        font-size: 22px
      .emoji,.emoji2
        display: block
        +tablet
          display: inline-block
        +widescreen
          margin: 0 16px
    .readers-choice-awards
      max-height: 192px
      margin-bottom: 72px
    .review-container
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      height: 100%
      font-size: 18px
      padding: 0 0 0 16px
      img
        margin-bottom: 16px
        max-height: 152px
    .yelp-reviews
      position: relative
      padding: 0 16px 0 0
      &:after
        content: ""
        position: absolute
        right: -13px
        top: 40px
        width: 1px
        height: 104px
        background: #eee

</style>
