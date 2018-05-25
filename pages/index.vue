<template>
  <section class="container">
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

<style>

</style>
