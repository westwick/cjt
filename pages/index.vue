<template>
  <section class="home">
    <section class="home-hero">
      <div class="container">
        <div class="columns">
          <div class="column is-7">
            <h1>Ahoy Matey!</h1>
            <p>Captain Jack's Santa Barbara Tours can be reserved for any day (subject to availability). All of our tours have been designed with you in mind.</p>
            <nuxt-link class="home-btn button" to="/tours"><span class="icon-calendar"></span>Book a Tour</nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <section class="home-greeting">
      <div class="container">
        <div class="columns">
          <div class="column is-5">
            <h3>Welcome to Santa Barbara!</h3>
            <p>Captain Jack's Tours is the #1 Tour &amp; Event company in Santa Barbara, offering more fun choices every day. Captain Jack's Tours will provide that special something to every event whether your group consists of 2 people or 200. With so many fun things to do in Santa Barbara, Captain Jack's Tours &amp; Events has something for everyone!</p>
          </div>
          <div class="column is-7">
            <div class="greeting-images columns">
              <div class="column is-4">
                <img src="~/assets/horseride.jpg" />
              </div>
              <div class="column is-4">
                <img src="~/assets/valley4.jpg" />
              </div>
              <div class="column is-4">
                <img src="~/assets/fun.png" />
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
              <div class="treasure"></div>
              <img class="img-main" src="~/assets/valley4.jpg">
              <div class="card-content">
                <h2>Hotel and Wine Tour Combo</h2>
                <h3>Only $149 per night Oct 15th – March 14th</h3>
                <h3>Only $169 per night March 15th – Oct 14th</h3>
                <p>Book any tour through Captain Jack’s Tours and you will qualify for our hotel special. Hotel accommodations are at the newly remodeled La Quinta Inn &amp; Suites.</p>
                <a href="#" class="button">Learn More</a>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="card">
              <p>Test</p>
            </div>
          </div>
          <div class="column is-4">
            <div class="card">
              <p>Test</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <h2>Blog</h2>
    <nuxt-link to="tours">
      Browser Tours
    </nuxt-link>
    <nuxt-link to="cool">
      cool
    </nuxt-link>
    <ul>
      <li v-for="post in posts" :key="post.date">
        <nuxt-link :to="post._path">
          {{ post.title }}
        </nuxt-link>
      </li>
    </ul>
    <div class="columns">
    <div class="column">
      First column
    </div>
    <div class="column">
      Second column
    </div>
    <div class="column">
      Third column
    </div>
    <div class="column">
      Fourth column
    </div>
  </div>
    <ul>
      <li v-for="tour in tours" :key="tour.title">
        <nuxt-link :to="tour._path">
          {{ tour.title }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue';

export default {
  components: {
    AppLogo
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

    return { posts, tours };
  }
};
</script>

<style lang="sass">
  .home-hero
    height: 400px
    max-height: 400px
    min-height: 400px
    width: 100vw
    background: linear-gradient(to bottom, rgba(20,20,21,.59), rgba(20,20,19,.63)), url('~/assets/cjt-bg.jpg')
    background-size: cover
    background-position: 50% 100%
    background-repeat: no-repeat
    // background-attachment: fixed
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    color: #fff
    text-align: left
    h1
      font-size: 24px
      font-weight: bold
    p
      font-size: 18px
  .home-btn
    margin-top: 16px
    font-weight: bold
    background: #eb2e19
    color: #fff
    text-transform: uppercase
    font-size: 16px
    border: none
    outline: none
    box-shadow: 0 0 5px rgba(155,155,155,.3)
    padding: 10px 16px
    height: auto
    border-radius: 3px
    transition: all .3s ease-in-out
    &:hover
      color: #fff
      background: darken(#eb2e19, 5%)
    &:focus
      color: #fff
    span
      position: relative
      top: -1px
      margin-right: 8px
  .home-greeting
    padding: 32px 0
    background: #fff
    border-bottom: 3px solid #eb2e19
    h3 
      color: #eb2e19
      font-weight: bold
      text-transform: uppercase
      font-size: 20px
      margin-bottom: 16px
    p
      color: #0a0a0a
      font-size: 14px
      font-weight: 500
  .greeting-images
    img
      width: 100%
      height: 100%
  .home-featured
    padding: 48px 0
</style>
