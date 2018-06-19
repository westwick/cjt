<template>
  <section class="tour-page">
    <div class="tour-img-main" v-bind:style="{ backgroundImage: 'url(' + thumbnail + ')' }">
      
    </div>
    <div class="tour-page-content">
      <div class="container">
        <div class="columns">
          <div class="column is-8">
            <h1>{{ title }}</h1>
            <vue-markdown>{{ body }}</vue-markdown>
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