<template>
  <section class="tour-page">
    <div class="container">
      <div class="back-to-page"><nuxt-link to="/tours">Browse All Tours</nuxt-link></div>
      <h1>{{ title }}</h1>
      <div class="columns">
        <div class="column is-8">
          <div class="img-container-container">
            <div class="img-container">
              <img class="img" :src="thumbnail">
            </div>
          </div>
        </div>
        <div class="column is-4">
          <h2>Price Per Person</h2>
          <p class="main-tour-info">${{ price }}
          <h2 class="start-time">Start Time</h2>
          <p class="main-tour-info">9 - 9:30am</p>
          <button class="button book-now">Book Now</button>
          <div class="contact">
            <p><span class="icon-phone"></span> (805) 564-1819</p>
            <p><i class="far fa-envelope"></i> hello@captainjackstours.com</p>
          </div>
          <vue-markdown>{{ body }}</vue-markdown>
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

</style>