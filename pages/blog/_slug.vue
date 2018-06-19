<template>
  <article>
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-12-mobile is-8-desktop">
          <div class="blog-post">
          <h1>{{ title }}</h1>
          <p class="blog-date">Posted by Captain Jack</p>
          <vue-markdown>{{ body }}</vue-markdown>
          </div>
        </div>
      </div>
    </div>
  </article>
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

    let post = await import('~/content/blog/posts/' + params.slug + '.json');
    return post;
  }
};
</script>

<style lang="sass">
.blog-post
  padding: 32px 0
  h1
    font-size: 32px
    margin-bottom: 16px
</style>