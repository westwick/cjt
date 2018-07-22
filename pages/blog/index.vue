<template>
  <section class="">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-12-mobile is-8-desktop">
          <div class="blogs-container">
            <div v-for="blog in blogs" :key="blog.date" class="blog-post-link">
              <h2>{{blog.title}}</h2>
              <p class="posted-on">Posted on {{ getDate(blog.date) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as moment from 'moment';

export default {
  methods: {
    getDate(date) {
      return moment(date).format('MMMM D, YYYY');
    }
  },
  asyncData() {
    // Using webpacks context to gather all files from a folder
    const blogsContext = require.context('~/content/blog/posts/', false, /\.json$/);

    const blogs = blogsContext.keys().map(key => ({
      ...blogsContext(key),
      _path: `/blog/${key.replace('.json', '').replace('./', '')}`
    }));

    blogs.sort((a, b) => {
      if (a.date < b.date)
        return 1;
      if (a.date > b.date)
        return -1;
      return 0;
    })

    return { blogs };
  }
};
</script>

<style lang="sass">
.blogs-container
  padding: 32px 0 80px
.blog-post-link
  h2
    font-size: 32px
  .posted-on
    color: #9d9d9d
</style>
