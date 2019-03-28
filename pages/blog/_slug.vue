<template>
  <article class="article">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-12-mobile is-8-desktop">
          <div class="blog-post">
          <h1>{{ title }}</h1>
          <p class="blog-info">Posted by Captain Jack</p>
          <vue-marked>{{ body }}</vue-marked>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import VueMarked from 'vue-marked'; 

export default {
  components: {
    VueMarked
  },
  async asyncData({ params }) {
    // const postPromise = process.BROWSER_BUILD
    //   ? import('~/content/blog/posts/' + params.slug + '.json')
    //   : Promise.resolve(
    //       require('~/content/blog/posts/' + params.slug + '.json')
    //     );

    let post = await import('~/content/blog/posts/' + params.slug + '.json');
    return post;
  }
};
</script>

<style lang="sass">

</style>